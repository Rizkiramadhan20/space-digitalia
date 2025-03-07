import { NextResponse } from "next/server";

import { db } from "@/utils/firebase/firebase-admin";

import { Timestamp } from "firebase-admin/firestore";

import { ProjectData } from "@/hooks/pages/api/free/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate all required fields
    const requiredFields = [
      "projectId",
      "userId",
      "projectTitle",
      "licenseType",
      "deliveryMethod",
      "userEmail",
      "userName",
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingFields.join(", ")}`,
          received: Object.keys(body),
        },
        { status: 400 }
      );
    }

    // Check delivery address if delivery method is selected
    if (body.deliveryMethod === "delivery" && !body.deliveryAddress) {
      return NextResponse.json(
        {
          error: "Delivery address is required for delivery method",
        },
        { status: 400 }
      );
    }

    // Fetch project data
    const projectRef = db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT!)
      .doc(body.projectId);
    const projectSnap = await projectRef.get();

    if (!projectSnap.exists) {
      return NextResponse.json(
        {
          error: "Project not found",
          projectId: body.projectId,
        },
        { status: 404 }
      );
    }

    const projectData = projectSnap.data() as ProjectData;

    if (!projectData) {
      return NextResponse.json(
        {
          error: "Invalid project data",
          projectId: body.projectId,
        },
        { status: 404 }
      );
    }

    // Validate license details
    const licenseDetail = projectData.licenseDetails?.find((license) => {
      // Try matching against both title and licenseTitle
      const requestedType = body.licenseType.toLowerCase().trim();
      const titleMatch = license.title?.toLowerCase().trim() === requestedType;
      const licenseTitleMatch =
        license.licenseTitle?.toLowerCase().trim() === requestedType;

      return titleMatch || licenseTitleMatch;
    });

    if (!licenseDetail) {
      return NextResponse.json(
        {
          error: "License type not found",
          details: `Could not find license type "${
            body.licenseType
          }". Available types: ${projectData.licenseDetails
            ?.map((l) => l.licenseTitle || l.title)
            .join(", ")}`,
          requestedLicense: body.licenseType,
        },
        { status: 404 }
      );
    }

    // Validate price is actually free
    if (licenseDetail.price !== 0) {
      return NextResponse.json(
        {
          error: "This license is not free",
          price: licenseDetail.price,
        },
        { status: 400 }
      );
    }

    // Check download URL for download method
    if (body.deliveryMethod === "download" && !licenseDetail.downloadUrl) {
      return NextResponse.json(
        {
          error: "Download URL not available",
          licenseType: body.licenseType,
        },
        { status: 400 }
      );
    }

    // Check stock
    if (typeof projectData.stock === "number" && projectData.stock <= 0) {
      return NextResponse.json(
        {
          error: "Product is out of stock",
          currentStock: projectData.stock,
        },
        { status: 400 }
      );
    }

    // Generate unique IDs
    const orderId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const transactionId = `${Math.random().toString(36).substr(2, 9)}`;

    // Prepare transaction data
    const transactionData = {
      orderId,
      transactionId,
      projectId: body.projectId,
      userId: body.userId,
      amount: 0,
      projectTitle: body.projectTitle,
      licenseType: body.licenseType,
      deliveryMethod: body.deliveryMethod,
      paymentMethod: "free",
      downloadUrl:
        body.deliveryMethod === "download" ? licenseDetail.downloadUrl : null,
      imageUrl: projectData.imageUrl,
      deliveryAddress:
        body.deliveryMethod === "delivery" ? body.deliveryAddress : null,
      status: "success",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      userEmail: body.userEmail,
      userName: body.userName,
      paymentDetails: {
        transaction_status: "success",
        status_message: "Free transaction completed successfully",
        transaction_id: transactionId,
        order_id: orderId,
        gross_amount: "0",
        payment_type: "free",
        transaction_time: new Date().toISOString(),
        status_code: "200",
        fraud_status: "accept",
      },
      linkTransaction: `${process.env.NEXT_PUBLIC_URL}/payment/status/${orderId}`,
      isProcessing: false,
    };

    try {
      await db.runTransaction(async (transaction) => {
        const transactionRef = db
          .collection(process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS!)
          .doc(orderId);
        const projectRef = db
          .collection(process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT!)
          .doc(body.projectId);

        try {
          // STEP 1: Perform all reads first
          const [existingDoc, projectDoc] = await Promise.all([
            transaction.get(transactionRef),
            transaction.get(projectRef),
          ]);

          // Verify documents
          if (existingDoc.exists) {
            throw new Error(`Transaction document already exists: ${orderId}`);
          }

          if (!projectDoc.exists) {
            throw new Error(
              `Project document no longer exists: ${body.projectId}`
            );
          }

          const currentProjectData = projectDoc.data() as ProjectData;

          // Prepare update data
          const updateData = {
            sold: (currentProjectData.sold || 0) + 1,
            stock:
              typeof currentProjectData.stock === "number"
                ? Math.max(0, currentProjectData.stock - 1)
                : currentProjectData.stock,
            ...(body.deliveryMethod === "download"
              ? { downloads: (currentProjectData.downloads || 0) + 1 }
              : { delivery: (currentProjectData.delivery || 0) + 1 }),
          };

          // STEP 2: Perform all writes after reads are complete
          transaction.set(transactionRef, transactionData);
          transaction.update(projectRef, updateData);
        } catch (innerError) {
          throw innerError;
        }
      });

      return NextResponse.json({
        success: true,
        orderId,
        transactionId,
        redirectUrl: `${process.env.NEXT_PUBLIC_URL}/payment/status/${orderId}`,
        message:
          "Transaction processed successfully. Redirecting to status page...",
      });
    } catch (transactionError) {
      return NextResponse.json(
        {
          error: "Failed to process free transaction",
          details:
            transactionError instanceof Error
              ? `${transactionError.message} (${transactionError.name})`
              : "Unknown transaction error",
          code:
            transactionError instanceof Error
              ? transactionError.name
              : "UNKNOWN",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to process free transaction",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
