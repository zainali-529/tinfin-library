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

export default function PricingPage() {
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
        {/* Free Plan */}
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

        {/* Pro Plan */}
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
            {/* 
               IMPORTANT: Replace 'YOUR_POLAR_PRODUCT_ID' with your actual Polar Product ID.
               The Checkout helper expects a 'products' query parameter.
               
               Link href="/api/checkout?products=YOUR_PRODUCT_ID"
            */}
            <Link href="/api/checkout?products=1313f7d7-fa7f-4793-b8bb-ed90cf35d574" className="w-full">
              <Button className="w-full">Upgrade to Pro</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
