import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Card, CardContent } from "@/components/ui/card";
import { FileCheck, Zap, Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      
      {/* How It Works Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="gradient-accent bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to issue and verify tamper-proof certificates
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: FileCheck,
                step: "1",
                title: "Upload & Hash",
                description: "Upload certificate file. We compute keccak256 hash and push to IPFS/Arweave for permanent storage.",
              },
              {
                icon: Zap,
                step: "2",
                title: "Blockchain Storage",
                description: "Certificate hash is stored on Ethereum blockchain with metadata, making it immutable and tamper-proof.",
              },
              {
                icon: Globe,
                step: "3",
                title: "Instant Verification",
                description: "Anyone can verify certificate authenticity via file upload, hash input, or QR code scanning.",
              },
            ].map((item, index) => (
              <Card key={index} className="glass-card border-border relative">
                <CardContent className="p-6 pt-12">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-xl font-bold glow-primary">
                    {item.step}
                  </div>
                  <div className="flex justify-center mb-4">
                    <item.icon className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                  <p className="text-muted-foreground text-center text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border glass-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Built with Solidity, Hardhat, IPFS, React, and Ethers.js
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2024 CertifyChain. Blockchain Certificate Verification System.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
