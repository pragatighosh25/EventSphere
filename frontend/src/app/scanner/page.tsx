"use client";

import { useEffect, useState } from "react";

import { Html5QrcodeScanner } from "html5-qrcode";

import { api } from "@/lib/api";

type VerificationResult = {
  success: boolean;
  message: string;
  attendee?: string;
  email?: string;
  event?: string;
};

export default function ScannerPage() {
  const [result, setResult] =
    useState<VerificationResult | null>(
      null
    );

  useEffect(() => {
    const scanner =
      new Html5QrcodeScanner(
        "reader",
        {
          fps: 5,
          qrbox: 250,
        },
        false
      );

    scanner.render(
      async (decodedText) => {
        try {
          const qrData =
            JSON.parse(decodedText);

          const res =
            await api.post(
              "/tickets/verify",
              {
                registrationId:
                  qrData.registrationId,
              }
            );

          setResult(res.data);
        } catch (error) {
          console.log(error);

          setResult({
            success: false,
            message:
              "Invalid QR Code",
          });
        }
      },

      (error) => {
        console.log(error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="min-h-screen pt-28 bg-black text-white p-8">
      <h1 className="text-5xl font-bold mb-10 text-center">
        Ticket Scanner 📷
      </h1>

      <div className="max-w-2xl mx-auto">
        <div
          id="reader"
          className="rounded-3xl overflow-hidden"
        />

        {result && (
          <div
            className={`mt-8 p-8 rounded-3xl ${
              result.success
                ? "bg-green-500/20 border border-green-500"
                : "bg-red-500/20 border border-red-500"
            }`}
          >
            <h2 className="text-3xl font-bold">
              {result.message}
            </h2>

            {result.success && (
              <div className="mt-6 space-y-3 text-lg">
                <p>
                  👤{" "}
                  {result.attendee}
                </p>

                <p>
                  📧 {result.email}
                </p>

                <p>
                  🎉 {result.event}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}