"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export function Auth1() {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
             <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" className="h-11" />
            </div>
            
            <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me for 30 days
                </Label>
            </div>

            <Button className="w-full h-11 text-base">Sign in</Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-11">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" className="h-11">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </div>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="#" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-l">
        <div className="absolute inset-0 bg-zinc-900" />
        
        {/* Abstract Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute -top-[20%] -right-[20%] h-[80%] w-[80%] rounded-full bg-primary/20 blur-[100px]"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                className="absolute top-[20%] -left-[20%] h-[60%] w-[60%] rounded-full bg-blue-500/20 blur-[80px]"
            />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            {/* Floating Elements */}
            <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-1/4 h-64 w-64 rounded-xl bg-gradient-to-tr from-white/10 to-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl transform -rotate-12"
            />
            <motion.div 
                animate={{ y: [0, 30, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-gradient-to-bl from-primary/30 to-transparent backdrop-blur-2xl border border-white/5 shadow-2xl"
            />
        </div>

        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="h-8 w-8 rounded-lg bg-primary mr-2 flex items-center justify-center">
             <span className="text-primary-foreground font-bold">T</span>
          </div>
          TinFin Library
        </div>
        
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has completely transformed how we build web applications. The components are not just beautiful, they are built with performance and accessibility in mind.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
