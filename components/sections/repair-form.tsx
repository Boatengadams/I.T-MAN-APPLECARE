"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

interface FormData {
  device: string;
  issue: string;
}

const DEVICES = ["iPhone", "iPad", "MacBook"];
const ISSUES = ["Screen Broken", "Battery Issue", "Not Charging", "Other"];

const WHATSAPP_NUMBER = "233549665779";

const steps = [
  { num: 1, label: "Select Device" },
  { num: 2, label: "Select Issue" },
  { num: 3, label: "Get Quote" },
];

export function RepairForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({ device: "", issue: "" });

  const handleDeviceSelect = (device: string) => {
    setFormData((prev) => ({ ...prev, device }));
    setStep(2);
  };

  const handleIssueSelect = (issue: string) => {
    setFormData((prev) => ({ ...prev, issue }));
    setStep(3);
  };

  const handleSubmit = () => {
    const message = `Hello, I want to repair my ${formData.device}. Issue: ${formData.issue}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <section className="container mx-auto px-6 max-w-2xl">
      <div className="flex justify-center gap-4 mb-8">
        {steps.map((s) => (
          <div
            key={s.num}
            className={`flex items-center gap-2 ${
              step >= s.num ? "text-amber-500" : "text-gray-500"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s.num
                  ? "bg-amber-600 text-white"
                  : "bg-white/10 text-gray-400"
              }`}
            >
              {s.num}
            </div>
            <span className="text-sm font-medium hidden md:inline">{s.label}</span>
          </div>
        ))}
      </div>

      <GlassCard className="p-8">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Select Your Device</h3>
            <div className="grid grid-cols-3 gap-4">
              {DEVICES.map((device) => (
                <button
                  key={device}
                  onClick={() => handleDeviceSelect(device)}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all duration-150 font-semibold"
                >
                  {device}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">What&apos;s the Issue?</h3>
            <div className="grid grid-cols-2 gap-4">
              {ISSUES.map((issue) => (
                <button
                  key={issue}
                  onClick={() => handleIssueSelect(issue)}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all duration-150 font-semibold"
                >
                  {issue}
                </button>
              ))}
            </div>
            <Button variant="outline" onClick={handleBack} className="mt-4">
              Back
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Summary</h3>
            <div className="space-y-2">
              <p className="text-gray-300 font-medium">Device: <span className="text-white font-bold">{formData.device}</span></p>
              <p className="text-gray-300 font-medium">Issue: <span className="text-white font-bold">{formData.issue}</span></p>
            </div>
            <Button variant="primary" onClick={handleSubmit}>
              Get Quote on WhatsApp
            </Button>
            <div>
              <button
                onClick={handleBack}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </GlassCard>
    </section>
  );
}