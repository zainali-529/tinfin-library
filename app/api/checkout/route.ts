import { Checkout } from "@polar-sh/nextjs";

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?success=true`,
  returnUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing`,
  server: process.env.POLAR_SERVER === 'production' ? 'production' : 'sandbox',
});
