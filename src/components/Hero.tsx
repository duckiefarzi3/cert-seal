import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, CheckCircle, Lock, QrCode } from "lucide-react";
import heroImage from "@/assets/hero-blockchain.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 gradient-hero opacity-90" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Lock className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">Blockchain-Secured Certificate Verification</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Tamper-Proof
            </span>
            <br />
            Certificate Verification
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Issue, verify, and manage certificates on the blockchain. 
            Immutable, transparent, and trusted by institutions worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/issuer">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                <Shield className="mr-2 h-5 w-5" />
                Issue Certificate
              </Button>
            </Link>
            <Link to="/verify">
              <Button variant="glass" size="lg" className="w-full sm:w-auto">
                <CheckCircle className="mr-2 h-5 w-5" />
                Verify Certificate
              </Button>
            </Link>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { icon: Shield, text: "Blockchain Secured" },
              { icon: QrCode, text: "QR Code Support" },
              { icon: Lock, text: "IPFS Storage" },
              { icon: CheckCircle, text: "Instant Verification" },
            ].map((feature, index) => (
              <div key={index} className="glass-card px-4 py-2 rounded-lg flex items-center gap-2">
                <feature.icon className="h-4 w-4 text-accent" />
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
