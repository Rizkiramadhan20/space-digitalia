import midtransClient from "midtrans-client";

// Validate environment variables
const serverKey = process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY;
const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

if (!serverKey || !clientKey) {
  console.error("Midtrans configuration missing:", {
    hasServerKey: !!serverKey,
    hasClientKey: !!clientKey,
  });
  throw new Error("Missing Midtrans configuration");
}

// Initialize Midtrans client
export const snap = new midtransClient.Snap({
  isProduction: true,
  serverKey: serverKey,
  clientKey: clientKey,
});

// Test Midtrans configuration
export const testMidtransConnection = async () => {
  try {
    const testTransaction = {
      transaction_details: {
        order_id: `TEST-${Date.now()}`,
        gross_amount: 10000,
      },
    };

    await snap.createTransaction(testTransaction);
    console.log("Midtrans connection test successful");
    return true;
  } catch (error) {
    console.error("Midtrans connection test failed:", error);
    return false;
  }
};
