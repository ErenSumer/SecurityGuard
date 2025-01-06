"use client";

import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, XCircle, User, Shield, Activity } from "lucide-react";

interface ScanResult {
  username: string;
  profileInfo: {
    followers: number;
    following: number;
    posts: number;
    accountAge: string;
  };
  vulnerabilities: {
    severity: "high" | "medium" | "low";
    issue: string;
    recommendation: string;
  }[];
  statistics: {
    securityScore: number;
    privacyScore: number;
    overallRisk: "High" | "Medium" | "Low";
  };
}

// Mock initial blurred data
const MOCK_BLURRED_DATA: ScanResult = {
  username: "••••••••",
  profileInfo: {
    followers: 9999,
    following: 999,
    posts: 299,
    accountAge: "• years, • months",
  },
  vulnerabilities: [
    {
      severity: "high",
      issue: "•••••• •••••• ••••••",
      recommendation: "•••••• •••••• ••••••",
    },
    {
      severity: "medium",
      issue: "•••••• •••••• ••••",
      recommendation: "•••••• •••••• ••••",
    },
    {
      severity: "low",
      issue: "•••••• •••• •••••",
      recommendation: "•••••• •••••• ••••",
    },
  ],
  statistics: {
    securityScore: 75,
    privacyScore: 82,
    overallRisk: "Medium",
  },
};

// Mock API endpoint
const mockScanApi = async (username: string): Promise<ScanResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate API response
  return {
    username,
    profileInfo: {
      followers: Math.floor(Math.random() * 10000),
      following: Math.floor(Math.random() * 1000),
      posts: Math.floor(Math.random() * 500),
      accountAge: "2 years, 3 months",
    },
    vulnerabilities: [
      {
        severity: "high",
        issue: "Public Email Address Exposed",
        recommendation: "Consider hiding email from public profile",
      },
      {
        severity: "medium",
        issue: "Weak Privacy Settings",
        recommendation: "Enable two-factor authentication",
      },
      {
        severity: "low",
        issue: "Location Data in Posts",
        recommendation: "Review location sharing settings",
      },
    ],
    statistics: {
      securityScore: Math.floor(Math.random() * 40) + 60,
      privacyScore: Math.floor(Math.random() * 40) + 60,
      overallRisk: "Medium",
    },
  };
};

export default function ScannerInterface({ onClose }: { onClose: () => void }) {
  const [username, setUsername] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ScanResult>(MOCK_BLURRED_DATA);

  const validateUsername = (username: string) => {
    const regex = /^[a-zA-Z0-9._]{1,30}$/;
    return regex.test(username);
  };

  const handleScan = async () => {
    if (!validateUsername(username)) {
      setError("Invalid username format. Please use only letters, numbers, dots, and underscores.");
      return;
    }

    setError("");
    setIsScanning(true);
    setProgress(0);

    try {
      // Simulate progress while waiting for API response
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      // Make API request
      const scanResult = await mockScanApi(username);
      
      clearInterval(progressInterval);
      setProgress(100);
      setResult(scanResult);
    } catch (err) {
      setError("An error occurred during scanning. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Instagram Security Scanner</DialogTitle>
        <DialogDescription>
          Enter an Instagram username to perform a simulated security analysis.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter Instagram username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1"
              disabled={isScanning}
            />
            <Button onClick={handleScan} disabled={isScanning}>
              {isScanning ? "Scanning..." : "Start Scan"}
            </Button>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Scanning Progress */}
        {isScanning && (
          <div className="space-y-4">
            <Progress value={progress} />
            <p className="text-center text-sm text-muted-foreground">
              Scanning profile: {progress}% complete
            </p>
          </div>
        )}

        {/* Results Section */}
        <div className={`space-y-6 transition-opacity duration-300 ${isScanning ? 'opacity-50' : 'opacity-100'}`}>
          {/* Profile Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <User className="h-5 w-5 mx-auto mb-2" />
              <div className="text-sm font-medium">Followers</div>
              <div className="text-2xl font-bold">{result.profileInfo.followers}</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Activity className="h-5 w-5 mx-auto mb-2" />
              <div className="text-sm font-medium">Posts</div>
              <div className="text-2xl font-bold">{result.profileInfo.posts}</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Shield className="h-5 w-5 mx-auto mb-2" />
              <div className="text-sm font-medium">Security Score</div>
              <div className="text-2xl font-bold">{result.statistics.securityScore}%</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <AlertCircle className="h-5 w-5 mx-auto mb-2" />
              <div className="text-sm font-medium">Risk Level</div>
              <div className="text-2xl font-bold">{result.statistics.overallRisk}</div>
            </div>
          </div>

          {/* Vulnerabilities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Detected Vulnerabilities</h3>
            {result.vulnerabilities.map((vuln, index) => (
              <Alert key={index} variant={vuln.severity === "high" ? "destructive" : "default"}>
                <div className="flex items-start">
                  {vuln.severity === "high" ? (
                    <XCircle className="h-4 w-4 mt-0.5 mr-2" />
                  ) : vuln.severity === "medium" ? (
                    <AlertCircle className="h-4 w-4 mt-0.5 mr-2" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 mt-0.5 mr-2" />
                  )}
                  <div>
                    <p className="font-medium">{vuln.issue}</p>
                    <p className="text-sm text-muted-foreground">{vuln.recommendation}</p>
                  </div>
                </div>
              </Alert>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => {
              setResult(MOCK_BLURRED_DATA);
              setUsername("");
            }}>
              New Scan
            </Button>
            <Button variant="default" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}