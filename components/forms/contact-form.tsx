"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Sparkles, Send, ShieldCheck, Layers, DollarSign, Mail, User, Building } from "lucide-react";
import { ShinyButton } from "../buttons/shiny-button";
import { Input } from "../ui/input";
import { apiClient } from "@/services/api-client";

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
  "AI & LLM Systems",
  "UI/UX Architecture",
  "Web Development",
  "Mobile Apps",
];

const budgetOptions = [
  "$10k - $25k",
  "$25k - $50k",
  "$50k - $100k",
  "$100k+",
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
    budget: "$25k - $50k",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>(["MVP Development"]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      if (selectedServices.length === 1) return; // keep at least one
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      ...formData,
      services: selectedServices,
    };

    const result = contactSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    try {
      await apiClient.post("/inquiries", payload);
      setSubmitted(true);
      toast.success("Inquiry sent directly to CodeNova engineering leads!");
    } catch (err: any) {
      toast.error("Submission failed.", {
        description: err.message || "Network error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto p-10 rounded-3xl border border-gold/40 bg-black/80 backdrop-blur-2xl text-center flex flex-col items-center gap-6 shadow-[0_20px_60px_rgba(212,175,55,0.15)]"
      >
        <div className="h-20 w-20 rounded-full border border-gold bg-gold/10 flex items-center justify-center text-gold shadow-[0_0_30px_rgba(212,175,55,0.4)]">
          <CheckCircle2 className="h-10 w-10 animate-bounce" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-heading font-extrabold text-white">Inquiry Received!</h3>
          <p className="text-sm text-steel leading-relaxed font-sans max-w-md">
            Thank you for reaching out to <span className="text-gold font-bold">CodeNova</span>. Our solution architects are reviewing your specifications and will respond within 24 hours.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", company: "", description: "", budget: "$25k - $50k" });
          }}
          className="px-6 py-2.5 rounded-xl border border-white/20 bg-white/5 text-xs font-mono tracking-widest text-gold uppercase hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer"
        >
          Send Another Inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-7 w-full max-w-xl mx-auto p-8 md:p-12 rounded-3xl border border-white/10 bg-black/70 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.6)] overflow-hidden"
    >
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" />
            <h3 className="text-xl font-heading font-extrabold text-white tracking-tight">Start a Engagement</h3>
          </div>
          <p className="text-xs text-steel font-sans">
            Architect your next product with CodeNova senior engineering team.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-[9px] font-mono tracking-widest text-gold font-bold uppercase">
          Direct Line
        </span>
      </div>

      {/* Service Selection Chips */}
      <div className="flex flex-col gap-2.5">
        <label className="text-[10px] font-mono tracking-widest uppercase text-gold font-bold flex items-center gap-1.5">
          <Layers className="h-3 w-3" /> Select Project Scope *
        </label>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((service) => {
            const isSelected = selectedServices.includes(service);
            return (
              <motion.button
                key={service}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleService(service)}
                className={`px-3.5 py-2 rounded-xl text-xs font-heading tracking-wider uppercase cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border border-gold text-black bg-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    : "border border-white/10 text-steel hover:text-white hover:border-gold/40 bg-white/[0.03]"
                }`}
              >
                {service}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-mono tracking-widest uppercase text-steel font-semibold flex items-center gap-1">
            <User className="h-3 w-3 text-gold" /> Full Name *
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Sarthak Bhatnagar"
            required
            className="h-11 bg-white/[0.03] border-white/10 text-white placeholder:text-steel/40 focus-visible:ring-1 focus-visible:ring-gold rounded-xl text-xs font-sans"
          />
          {errors.name && <span className="text-[10px] text-red-400">{errors.name}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-mono tracking-widest uppercase text-steel font-semibold flex items-center gap-1">
            <Mail className="h-3 w-3 text-gold" /> Work Email *
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="sarthak@codenova.com"
            required
            className="h-11 bg-white/[0.03] border-white/10 text-white placeholder:text-steel/40 focus-visible:ring-1 focus-visible:ring-gold rounded-xl text-xs font-sans"
          />
          {errors.email && <span className="text-[10px] text-red-400">{errors.email}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-mono tracking-widest uppercase text-steel font-semibold flex items-center gap-1">
            <Building className="h-3 w-3 text-gold" /> Organization
          </label>
          <Input
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="CodeNova Inc."
            className="h-11 bg-white/[0.03] border-white/10 text-white placeholder:text-steel/40 focus-visible:ring-1 focus-visible:ring-gold rounded-xl text-xs font-sans"
          />
        </div>

        {/* Budget Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-mono tracking-widest uppercase text-steel font-semibold flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-gold" /> Target Budget
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="h-11 px-3 rounded-xl bg-black border border-white/10 text-xs font-mono text-gold focus:outline-none focus:border-gold cursor-pointer"
          >
            {budgetOptions.map((b) => (
              <option key={b} value={b} className="bg-black text-white">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description Textarea */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-mono tracking-widest uppercase text-steel font-semibold">
          Project Roadmap & Requirements *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe your tech stack preferences, target deployment date, and architecture goals..."
          rows={4}
          required
          className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-steel/40 focus:outline-none focus:border-gold transition-colors font-sans resize-y min-h-[110px]"
        />
        {errors.description && <span className="text-[10px] text-red-400">{errors.description}</span>}
      </div>

      {/* Submit Button */}
      <ShinyButton type="submit" disabled={loading} className="w-full py-4 text-center justify-center mt-2 bg-gold text-black font-extrabold hover:bg-white transition-all">
        {loading ? (
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 animate-spin" /> Processing Transmission...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Submit Specifications <Send className="h-4 w-4" />
          </span>
        )}
      </ShinyButton>
    </motion.form>
  );
}
