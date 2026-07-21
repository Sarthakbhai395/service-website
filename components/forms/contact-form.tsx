"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { ShinyButton } from "../buttons/shiny-button";
import { Input } from "../ui/input";
import { apiClient } from "@/services/api-client";
import { env } from "@/config/env";


const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  services: z.array(z.string()).min(1, "Please select at least one service."),
  budget: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters."),
});

const serviceOptions = [
  "MVP Development",
  "SaaS Platform",
  "AI Development",
  "UI/UX Design",
  "Web Development",
  "Mobile Apps",
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
    budget: "$10k - $25k",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name] : "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      ...formData,
      services: selectedServices,
    };

    // Client side validation
    const result = contactSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Form validation failed. Please review fields.");
      return;
    }

    setLoading(true);
    try {
      await apiClient.post("/inquiries", payload);

      toast.success("Inquiry submitted successfully!", {
        description: "Our solutions architect will contact you shortly.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        description: "",
        budget: "$10k - $25k",
      });
      setSelectedServices([]);
    } catch (err: any) {
      toast.error("Submission failed.", {
        description: err.message || "An unexpected network error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-xl mx-auto p-6 md:p-10 rounded-2xl border border-platinum/40 bg-[#0d0d0d]/40 backdrop-blur-md">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-heading font-semibold text-white">Send a Message</h3>
        <p className="text-xs text-muted-foreground font-sans">
          Tell us about your project requirements and timelines.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Full Name *</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
            className="bg-[#050505] border-platinum text-white focus-visible:ring-1 focus-visible:ring-gold"
          />
          {errors.name && <span className="text-[10px] text-red-400 font-sans">{errors.name}</span>}
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Work Email *</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@company.com"
            required
            className="bg-[#050505] border-platinum text-white focus-visible:ring-1 focus-visible:ring-gold"
          />
          {errors.email && <span className="text-[10px] text-red-400 font-sans">{errors.email}</span>}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Company Name</label>
          <Input
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Acme Corp"
            className="bg-[#050505] border-platinum text-white focus-visible:ring-1 focus-visible:ring-gold"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Approximate Budget</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={(e: any) => setFormData({ ...formData, budget: e.target.value })}
            className="h-10 px-3 rounded-md bg-[#050505] border border-platinum text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <option>$10k - $25k</option>
            <option>$25k - $50k</option>
            <option>$50k - $100k</option>
            <option>$100k+</option>
          </select>
        </div>
      </div>

      {/* Services Checklist */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Requested Services *</label>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((service) => {
            const isSelected = selectedServices.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`px-3 py-1.5 rounded-md text-xs border font-heading uppercase tracking-widest cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border-gold text-gold bg-gold/5"
                    : "border-platinum text-muted-foreground hover:text-white hover:border-neutral-700"
                }`}
              >
                {service}
              </button>
            );
          })}
        </div>
        {errors.services && <span className="text-[10px] text-red-400 font-sans">{errors.services}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">Project Details *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Please describe your software product roadmap, target audience, and engineering constraints..."
          rows={4}
          required
          className="w-full px-3 py-2 rounded-md bg-[#050505] border border-platinum text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold min-h-[100px] resize-y"
        />
        {errors.description && <span className="text-[10px] text-red-400 font-sans">{errors.description}</span>}
      </div>

      <ShinyButton type="submit" disabled={loading} className="w-full py-4 text-center justify-center mt-2">
        {loading ? "Registering Lead..." : "Submit Inquiry"} <ArrowRight className="ml-2 h-4 w-4" />
      </ShinyButton>
    </form>
  );
}
