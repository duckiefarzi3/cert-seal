import { Shield, FileCheck, QrCode, Lock, Database, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import iconCertificate from "@/assets/icon-certificate.png";
import iconSecurity from "@/assets/icon-security.png";
import iconVerify from "@/assets/icon-verify.png";

const features = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Certificates stored as immutable hashes on Ethereum blockchain, ensuring tamper-proof verification.",
    highlight: "Immutable",
  },
  {
    icon: FileCheck,
    title: "IPFS/Arweave Storage",
    description: "Actual certificate files stored on decentralized storage for permanent accessibility.",
    highlight: "Decentralized",
  },
  {
    icon: QrCode,
    title: "QR Code Integration",
    description: "Each certificate comes with a unique QR code for instant verification via mobile devices.",
    highlight: "Instant Scan",
  },
  {
    icon: Lock,
    title: "Access Control",
    description: "Multi-issuer role support with OpenZeppelin AccessControl for authorized issuance only.",
    highlight: "Authorized Only",
  },
  {
    icon: Database,
    title: "Smart Contracts",
    description: "Solidity-based smart contracts with events for indexing, revocation tracking, and analytics.",
    highlight: "Transparent",
  },
  {
    icon: Users,
    title: "Multi-Issuer Support",
    description: "Support for multiple authorized issuers with role-based permissions and batch issuance.",
    highlight: "Scalable",
  },
];

export const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-primary bg-clip-text text-transparent">CertifyChain</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built on cutting-edge blockchain technology with security and transparency at its core.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] group">
              <CardContent className="p-6">
                <div className="inline-flex p-3 rounded-lg gradient-primary mb-4 group-hover:glow-primary transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold mb-3">
                  {feature.highlight}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
