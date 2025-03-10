import { NextResponse } from "next/server";

import { snap } from "@/utils/midtrans";

import { db } from "@/utils/firebase/firebase-admin";

import { Timestamp, Transaction } from "firebase-admin/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.projectId || !body.userId || !body.amount || !body.projectTitle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check project existence and stock
    const projectRef = db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT!)
      .doc(body.projectId);
    const projectSnap = await projectRef.get();

    if (!projectSnap.exists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const projectData = projectSnap.data();

    // Only check stock for paid items
    if (!projectData || (body.amount > 0 && projectData.stock <= 0)) {
      return NextResponse.json(
        { error: "Product is out of stock" },
        { status: 400 }
      );
    }

    // Generate order ID
    const orderId = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    // Create Midtrans transaction
    const transactionData = {
      transaction_details: {
        order_id: orderId,
        gross_amount: Math.round(body.amount),
      },
      item_details: [
        {
          id: body.projectId,
          price: Math.round(body.amount),
          quantity: 1,
          name: body.projectTitle.substring(0, 50),
        },
      ],
      customer_details: {
        first_name: body.userName,
        email: body.userEmail,
        ...(body.deliveryMethod === "delivery" &&
          body.deliveryAddress && {
            shipping_address: {
              first_name: body.deliveryAddress.fullName,
              phone: body.deliveryAddress.phone,
              address: `${body.deliveryAddress.streetAddress}, ${body.deliveryAddress.details}`,
              city: body.deliveryAddress.city,
              postal_code: body.deliveryAddress.postalCode,
              country_code: "IDN",
            },
          }),
      },
    };

    // Create Midtrans transaction
    const midtransResponse = await snap.createTransaction(transactionData);

    if (!midtransResponse || !midtransResponse.token) {
      throw new Error("Failed to create Midtrans transaction");
    }

    // Prepare transaction data
    const firestoreData = {
      orderId,
      projectId: body.projectId,
      userId: body.userId,
      amount: Math.round(body.amount),
      projectTitle: body.projectTitle,
      licenseType: body.licenseType,
      deliveryMethod: body.deliveryMethod,
      paymentMethod: body.deliveryMethod,
      statusDelivery: body.deliveryMethod === "delivery" ? "pending" : null,
      downloadUrl: body.deliveryMethod === "download" ? body.downloadUrl : null,
      imageUrl: body.imageUrl,
      deliveryAddress:
        body.deliveryMethod === "delivery" ? body.deliveryAddress : null,
      status: "pending",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      paymentToken: midtransResponse.token,
      redirectUrl: midtransResponse.redirect_url,
      userEmail: body.userEmail,
      userName: body.userName,
      userPhotoURL: body.userPhotoURL,
      linkTransaction: `${process.env.NEXT_PUBLIC_URL}/payment/status/${orderId}`,
    };

    // Use transaction to ensure atomicity
    await db.runTransaction(async (transaction: Transaction) => {
      // Create transaction document
      const transactionRef = db
        .collection(process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS!)
        .doc(orderId);
      transaction.set(transactionRef, firestoreData);

      // Update project stock and sold count
      transaction.update(projectRef, {
        stock: projectData.stock - 1,
        sold: (projectData.sold || 0) + 1,
      });
    });

    return NextResponse.json({
      success: true,
      token: midtransResponse.token,
      orderId: orderId,
      transactionId: orderId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Payment gateway error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
