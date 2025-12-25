"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Copy, RefreshCw, Trash2, Check, Key } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Token {
  id: string;
  name: string;
  jti: string;
  created_at: string;
  last_used_at: string | null;
  expires_at: string;
  token_hash: string; // We don't show the full token again, just metadata
}

interface DocsInterfaceProps {
  isPaid: boolean;
  userEmail?: string;
}

export function DocsInterface({ isPaid, userEmail }: DocsInterfaceProps) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [newToken, setNewToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isPaid) {
      fetchTokens();
    }
  }, [isPaid]);

  const fetchTokens = async () => {
    try {
      const res = await fetch("/api/tokens");
      if (res.ok) {
        const data = await res.json();
        setTokens(data);
      }
    } catch (error) {
      console.error("Failed to fetch tokens", error);
    }
  };

  const generateToken = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "CLI Token" }),
      });
      if (res.ok) {
        const data = await res.json();
        setNewToken(data.token);
        toast.success("Token generated successfully! Copy it now, you won't see it again.");
        fetchTokens();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to generate token");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const revokeToken = async (jti: string) => {
    try {
      const res = await fetch("/api/tokens", {
        method: "DELETE",
        body: JSON.stringify({ jti }),
      });
      if (res.ok) {
        toast.success("Token revoked");
        fetchTokens();
      } else {
        toast.error("Failed to revoke token");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Documentation & Registry</h1>
        <p className="text-lg text-muted-foreground">
          Access our component registry and manage your access tokens.
        </p>
      </div>

      <Tabs defaultValue="free" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="free">Free Blocks</TabsTrigger>
          <TabsTrigger value="pro">Pro Blocks</TabsTrigger>
        </TabsList>

        <TabsContent value="free" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Free Registry</CardTitle>
              <CardDescription>
                Open source components available for everyone.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Registry URL</Label>
                <div className="flex items-center space-x-2">
                  <Input readOnly value="https://tinfin.xyz/r" />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard("https://tinfin.xyz/r")}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Example Installation</Label>
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  npx shadcn add https://tinfin.xyz/r/auth-1.json
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pro" className="space-y-6">
          {!isPaid ? (
            <Card className="border-primary/20 bg-muted/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center space-y-4 p-6 bg-card rounded-lg shadow-lg border">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Pro Access Required</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">
                    Upgrade to TinFin Pro to access premium blocks and advanced features.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/pricing">Get Pro Access</Link>
                  </Button>
                </div>
              </div>
              {/* Blurred Content Placeholder */}
              <CardHeader className="opacity-50">
                <CardTitle>Pro Registry</CardTitle>
                <CardDescription>Premium components for professional developers.</CardDescription>
              </CardHeader>
              <CardContent className="opacity-50 space-y-4">
                <div className="h-10 bg-muted rounded w-full" />
                <div className="h-32 bg-muted rounded w-full" />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pro Registry Configuration</CardTitle>
                  <CardDescription>
                    Configure your environment to access Pro blocks.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Registry URL</Label>
                    <div className="flex items-center space-x-2">
                      <Input readOnly value="http://localhost:3000/r/index.json" />
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard("http://localhost:3000/r/index.json")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Setup Instructions</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">1. Generate a token below.</p>
                      <p className="text-sm text-muted-foreground">2. Add this configuration to your <code>components.json</code>:</p>
                      <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                        <pre>{`"@tinfin-library": {
  "url": "http://localhost:3000/r/{name}.json",
  "headers": {
    "Authorization": "Bearer \${TINFIN_REGISTRY_TOKEN}",
    "TINFIN_REGISTRY_TOKEN": "\${TINFIN_REGISTRY_TOKEN}"
  }
}`}</pre>
                      </div>
                      <p className="text-sm text-muted-foreground">3. Add token to environment:</p>
                      <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                        <span className="text-muted-foreground"># PowerShell</span><br/>
                        $env:TINFIN_REGISTRY_TOKEN="your_token_here"<br/><br/>
                        <span className="text-muted-foreground"># Bash / Mac</span><br/>
                        export TINFIN_REGISTRY_TOKEN="your_token_here"
                      </div>
                      <p className="text-sm text-muted-foreground">4. Install components:</p>
                      <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                        npx shadcn add @tinfin-library/auth-3
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Access Tokens</CardTitle>
                      <CardDescription>Manage your registry access tokens.</CardDescription>
                    </div>
                    <Button onClick={generateToken} disabled={loading}>
                      {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Key className="h-4 w-4 mr-2" />}
                      Generate New Token
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {newToken && (
                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-md space-y-2">
                      <Label className="text-green-700 dark:text-green-400">New Token Generated (Copy immediately)</Label>
                      <div className="flex items-center space-x-2">
                        <Input readOnly value={newToken} className="font-mono bg-background" />
                        <Button variant="outline" size="icon" onClick={() => copyToClipboard(newToken)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {tokens.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No active tokens found.</p>
                    ) : (
                      <div className="grid gap-4">
                        {tokens.map((token) => (
                          <div key={token.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                            <div className="space-y-1">
                              <p className="font-medium flex items-center gap-2">
                                {token.name}
                                <span className="text-xs text-muted-foreground font-normal font-mono">
                                  (...{token.jti.substring(0, 8)})
                                </span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Expires: {new Date(token.expires_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => revokeToken(token.jti)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Revoke
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
