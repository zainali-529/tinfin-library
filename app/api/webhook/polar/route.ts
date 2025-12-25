import { Webhooks } from "@polar-sh/nextjs";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onOrderPaid: async (payload) => {
    const order = payload.data;
    const supabase = supabaseAdmin;
    const customerEmail =
      (order.customer && (order.customer.email as string | undefined)) || undefined;
    const externalCustomerId =
      (order.customer && (order.customer.externalId as string | undefined)) || undefined;
    let userId: string | null = null;
    if (externalCustomerId) {
      userId = externalCustomerId;
    } else if (customerEmail) {
      const { data: users } = await supabase.auth.admin.listUsers();
      const match = users?.users?.find((u) => u.email === customerEmail);
      userId = match?.id ?? null;
    }
    const productId =
      (order.product && (order.product.id as string | undefined)) || undefined;
    const productName =
      (order.product && (order.product.name as string | undefined)) || undefined;
    const checkoutId = order.checkoutId ?? undefined;
    const amount = (order.totalAmount as number | undefined) ?? undefined;
    const currency = (order.currency as string | undefined) ?? undefined;
    await supabase.from("payments").insert({
      order_id: order.id,
      checkout_id: checkoutId,
      product_id: productId,
      product_name: productName,
      amount,
      currency,
      customer_id: order.customer?.id ?? null,
      external_customer_id: externalCustomerId ?? null,
      customer_email: customerEmail ?? null,
      user_id: userId,
      status: order.status ?? "paid"
    });
  }
});
