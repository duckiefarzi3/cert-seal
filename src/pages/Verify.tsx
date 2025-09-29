import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Search, QrCode, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type VerificationStatus = "idle" | "valid" | "invalid" | "revoked" | "not-found";

export default function Verify() {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState("");
  const [status, setStatus] = useState<VerificationStatus>("idle");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast.success("Certificate file loaded");
    }
  };

  const handleVerify = () => {
    toast.info("Blockchain verification coming soon!");
    // Demo: randomly show different statuses
    const statuses: VerificationStatus[] = ["valid", "invalid", "revoked", "not-found"];
    setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
  };

  const getStatusDisplay = () => {
    switch (status) {
      case "valid":
        return {
          icon: <CheckCircle className="h-16 w-16 text-accent" />,
          title: "Certificate Valid ✓",
          description: "This certificate is authentic and has been verified on the blockchain.",
          color: "border-accent",
        };
      case "invalid":
        return {
          icon: <XCircle className="h-16 w-16 text-destructive" />,
          title: "Certificate Invalid",
          description: "This certificate has been tampered with or is not authentic.",
          color: "border-destructive",
        };
      case "revoked":
        return {
          icon: <AlertCircle className="h-16 w-16 text-orange-500" />,
          title: "Certificate Revoked",
          description: "This certificate has been revoked by the issuer.",
          color: "border-orange-500",
        };
      case "not-found":
        return {
          icon: <XCircle className="h-16 w-16 text-muted-foreground" />,
          title: "Certificate Not Found",
          description: "No certificate found with this hash on the blockchain.",
          color: "border-muted-foreground",
        };
      default:
        return null;
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-primary bg-clip-text text-transparent">Verify Certificate</span>
            </h1>
            <p className="text-muted-foreground">Upload certificate file or enter hash to verify authenticity</p>
          </div>

          <div className="grid gap-6">
            {/* Verification Methods */}
            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Verification Methods
                </CardTitle>
                <CardDescription>Choose how you want to verify the certificate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload Method */}
                <div className="space-y-2">
                  <Label>Method 1: Upload Certificate File</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="verify-file"
                      className="hidden"
                      accept=".pdf,.json"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="verify-file" className="cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {file ? file.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">PDF or JSON</p>
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                {/* Hash Input Method */}
                <div className="space-y-2">
                  <Label htmlFor="hash-input">Method 2: Enter Certificate Hash</Label>
                  <Input
                    id="hash-input"
                    placeholder="0x1234567890abcdef..."
                    value={hash}
                    onChange={(e) => setHash(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                {/* QR Scan Method */}
                <div className="space-y-2">
                  <Label>Method 3: Scan QR Code</Label>
                  <Button variant="glass" className="w-full" size="lg">
                    <QrCode className="mr-2 h-5 w-5" />
                    Open QR Scanner
                  </Button>
                </div>

                <Button variant="hero" className="w-full" size="lg" onClick={handleVerify}>
                  <Search className="mr-2 h-5 w-5" />
                  Verify on Blockchain
                </Button>
              </CardContent>
            </Card>

            {/* Verification Result */}
            {statusDisplay && (
              <Card className={`glass-card border-2 ${statusDisplay.color} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                <CardContent className="p-8 text-center">
                  <div className="mb-4">{statusDisplay.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{statusDisplay.title}</h3>
                  <p className="text-muted-foreground mb-6">{statusDisplay.description}</p>
                  
                  {status === "valid" && (
                    <div className="glass-card p-4 rounded-lg space-y-2 text-left">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Issuer:</span>
                        <span className="font-mono">0x1234...5678</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Issue Date:</span>
                        <span>Jan 15, 2024</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Transaction:</span>
                        <a href="#" className="text-accent hover:underline">View on Explorer</a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Information Card */}
            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">1.</span>
                    <span>Upload your certificate file or enter the certificate hash</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">2.</span>
                    <span>We compute the keccak256 hash of your certificate</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">3.</span>
                    <span>The hash is verified against the Ethereum blockchain</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">4.</span>
                    <span>Instant verification result with issuer information</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
