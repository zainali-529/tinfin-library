"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Mail, ArrowRight, Command } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export function Auth2() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-muted/40 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 h-full w-full bg-white dark:bg-zinc-950">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>
      </div>
      
      {/* Ambient Light */}
      <div className="absolute top-0 left-0 right-0 z-0 mx-auto h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px] opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-muted/60 shadow-xl backdrop-blur-sm bg-background/80">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                <Command className="h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="#" 
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="bg-background/50"
              />
            </div>
            
            <div className="flex items-center space-x-2">
                <Checkbox id="remember-2" />
                <Label htmlFor="remember-2" className="text-sm font-normal text-muted-foreground">
                    Remember me
                </Label>
            </div>

            <Button className="w-full group" size="lg">
              Sign in
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full bg-background/50">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" className="w-full bg-background/50">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-center text-xs text-muted-foreground w-full">
              Don&apos;t have an account?{" "}
              <Link href="#" className="font-medium text-primary hover:underline">
                Sign up for free
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <p className="mt-4 text-center text-xs text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
            </Link>
            .
        </p>
      </motion.div>
    </div>
  )
}
