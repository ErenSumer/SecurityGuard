"use client";

import { useState } from "react";
import {
  Shield,
  ShieldAlert,
  Instagram,
  User,
  Lock,
  Globe,
  Bell,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import ScannerInterface from "@/components/ScannerInterface";
import { Mail, Phone, KeyRound, User2 } from "lucide-react";
import AgreementModal from "@/components/AgreementModal";
import Image from "next/image";
const dummyInstagramData = {
  username: "hsdflmizah",
  followers: 371,
  following: 319,
  posts: 51,
  accountType: "Private",
  joinDate: "November 2023",
  lastActivity: "Not Found",
  securityScore: 65,
};
const securityAlerts = [
  {
    type: "Email Leak",
    details: "Email address exposed in 2 data breaches",
    severity: "high",
    date: "2023-12-15",
    icon: Mail,
    affectedServices: ["Instagram", "WhatsApp"],
  },
  {
    type: "Phone Number",
    details: "Phone number found in public databases",
    severity: "medium",
    date: "2023-11-20",
    icon: Phone,
    affectedServices: ["Instagram"],
  },
  {
    type: "Password",
    details: "Similar passwords found in dark web",
    severity: "critical",
    date: "2024-01-05",
    icon: KeyRound,
    affectedServices: ["Unknown Source"],
  },
  {
    type: "Personal Info",
    details: " location data exposed",
    severity: "low",
    date: "2023-10-30",
    icon: User2,
    affectedServices: ["Instagram"],
  },
];
export default function ScanPage() {
  const [showAgreement, setShowAgreement] = useState(true);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/10 backdrop-blur-sm fixed w-full z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">CyberGuard</span>
          </div>
        </div>
      </header>

      <main className="pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-6 rounded-lg border border-border/10 backdrop-blur-sm">
              <div className="flex items-center space-x-4 mb-6">
                <Image
                  src="/pfp.jpg"
                  width={100}
                  height={100}
                  alt="profile_picture"
                  className=" text-blue-500"
                />
                <div>
                  <h1 className="text-2xl font-bold">
                    {dummyInstagramData.username}
                  </h1>
                  <p className="text-muted-foreground">
                    Instagram Profile Analysis
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Image
                      src="/pfp.jpg"
                      width={20}
                      height={20}
                      alt="profile_picture"
                      className=" text-blue-500"
                    />
                    <span className="font-semibold">Followers</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {dummyInstagramData.followers.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold">Account Type</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {dummyInstagramData.accountType}
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold">Security Score</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {dummyInstagramData.securityScore}%
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Account Details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground">Join Date</p>
                    <p className="font-semibold">
                      {dummyInstagramData.joinDate}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground">
                      Last Activity
                    </p>
                    <p className="font-semibold">
                      {dummyInstagramData.lastActivity}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6 mt-8">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-destructive" />
                  Security Alerts
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {securityAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border hover:border-destructive/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <alert.icon
                            className={`h-5 w-5 ${
                              alert.severity === "critical"
                                ? "text-destructive"
                                : alert.severity === "high"
                                ? "text-orange-500"
                                : alert.severity === "medium"
                                ? "text-yellow-500"
                                : "text-blue-500"
                            }`}
                          />
                          <span className="font-semibold">{alert.type}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {alert.date}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.details}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {alert.affectedServices.map((service, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-secondary px-2 py-1 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AgreementModal
        open={showAgreement}
        onOpenChange={setShowAgreement}
        onAgree={() => {
          setAgreed(true);
          setShowAgreement(false);
        }}
      />
    </div>
  );
}
