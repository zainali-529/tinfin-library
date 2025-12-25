import Link from "next/link"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createClient } from "@/lib/supabase-server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export default async function PricingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let isPaid = false;
  if (user) {
    const { data: payments } = await supabaseAdmin
      .from("payments")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "paid")
      .limit(1);
    
    isPaid = !!(payments && payments.length > 0);
  }

  const productId = "1313f7d7-fa7f-4793-b8bb-ed90cf35d574"
  const proHref = user
    ? `/api/checkout?products=${productId}&customerExternalId=${user.id}&customerEmail=${encodeURIComponent(user.email ?? "")}`
    : `/api/checkout?products=${productId}`
  return (
    <div className="container mx-auto py-24 md:py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="max-w-[800px] text-lg text-muted-foreground">
          Choose the plan that's right for you. No hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">Free</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-4xl font-bold mb-6">
              $0<span className="text-lg font-normal text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Access to basic blocks
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Community support
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Open source components
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/blocks" className="w-full">
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col border-primary shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-bl-lg">
            Popular
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Pro</CardTitle>
            <CardDescription>For serious developers</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-4xl font-bold mb-6">
              $19<span className="text-lg font-normal text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                All Free features
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Access to premium blocks
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Priority support
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                Early access to new components
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {isPaid ? (
               <Button className="w-full" variant="outline" disabled>
                  Active Plan
               </Button>
            ) : (
            <Link href={proHref} className="w-full">
              <Button className="w-full">Upgrade to Pro</Button>
            </Link>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
