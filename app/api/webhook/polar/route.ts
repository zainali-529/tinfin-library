import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    // Handle the payload
    console.log("Polar Webhook Received:", payload.type);
    
    // Example:
    // if (payload.type === 'subscription.created') {
    //   const subscription = payload.data;
    //   // Update user in database
    // }
  },
});
