import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, QrCode, FileText, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Issuer() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast.success("Certificate file uploaded");
    }
  };

  const handleIssue = () => {
    toast.info("Blockchain integration coming soon! This will issue the certificate on-chain.");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-primary bg-clip-text text-transparent">Issuer Dashboard</span>
            </h1>
            <p className="text-muted-foreground">Issue blockchain-secured certificates with immutable verification</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Issue Certificate Card */}
            <Card className="glass-card border-border md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Issue New Certificate
                </CardTitle>
                <CardDescription>Upload certificate and issue on blockchain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Address (0x...)</Label>
                  <Input id="recipient" placeholder="0x742d35Cc6634C0532925a3b844Bc454e4438f44e" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificate-name">Certificate Name</Label>
                  <Input id="certificate-name" placeholder="Bachelor of Science in Computer Science" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea id="description" placeholder="Additional certificate details..." className="resize-none" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificate-file">Certificate File (PDF/JSON)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="certificate-file"
                      className="hidden"
                      accept=".pdf,.json"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="certificate-file" className="cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {file ? file.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">PDF or JSON (max 10MB)</p>
                    </label>
                  </div>
                </div>

                <Button variant="hero" className="w-full" size="lg" onClick={handleIssue}>
                  <Send className="mr-2 h-5 w-5" />
                  Issue Certificate on Blockchain
                </Button>
              </CardContent>
            </Card>

            {/* Statistics Cards */}
            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Certificates Issued</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">0</p>
                <p className="text-sm text-muted-foreground mt-2">Total issued on-chain</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Verification Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold gradient-accent bg-clip-text text-transparent">0%</p>
                <p className="text-sm text-muted-foreground mt-2">Successfully verified</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Issuances */}
          <Card className="glass-card border-border mt-6">
            <CardHeader>
              <CardTitle>Recent Issuances</CardTitle>
              <CardDescription>Your latest certificate issuances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <QrCode className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No certificates issued yet</p>
                <p className="text-sm mt-1">Start issuing to see them here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
