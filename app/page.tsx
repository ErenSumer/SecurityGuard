"use client";

import { useState } from "react";
import { Shield, ShieldAlert, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import ScannerInterface from "@/components/ScannerInterface";
import AgreementModal from "@/components/AgreementModal";

export default function Home() {
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/10 backdrop-blur-sm fixed w-full z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">CyberGuard</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8 py-20">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                Instagram Account Security Scanner
              </h1>
              <p className="text-lg text-muted-foreground">
                Analyze Instagram profiles for potential security vulnerabilities and privacy risks.
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                onClick={() => setShowAgreement(true)}
              >
                Start Scan
                <ShieldAlert className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-20" id="features">
              <div className="p-6 rounded-lg border border-border/10 backdrop-blur-sm">
                <Instagram className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Profile Analysis</h3>
                <p className="text-muted-foreground">Deep scan of public Instagram profile data and security settings.</p>
              </div>
              <div className="p-6 rounded-lg border border-border/10 backdrop-blur-sm">
                <ShieldAlert className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Vulnerability Detection</h3>
                <p className="text-muted-foreground">Identify potential security risks and privacy concerns.</p>
              </div>
              <div className="p-6 rounded-lg border border-border/10 backdrop-blur-sm">
                <Shield className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Security Report</h3>
                <p className="text-muted-foreground">Detailed analysis report with actionable recommendations.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Agreement Modal */}
      <AgreementModal
        open={showAgreement}
        onOpenChange={setShowAgreement}
        onAgree={() => {
          setAgreed(true);
          setShowAgreement(false);
        }}
      />

      {/* Scanner Interface */}
      <Dialog open={agreed} onOpenChange={setAgreed}>
        <ScannerInterface onClose={() => setAgreed(false)} />
      </Dialog>
    </div>
  );
}