"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { apiClient } from "@/services/api-client";
import { toast } from "sonner";
import {
  ArrowRight, LogOut, Plus, Trash2, Code, Lock, Building2,
  Star, MessageSquare, Layers, Sparkles, RefreshCw, Eye, ArrowUpRight, Check, X, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ShinyButton } from "@/components/buttons/shiny-button";
import { Input } from "@/components/ui/input";

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"projects" | "services" | "brands" | "reviews" | "inquiries">("projects");

  // Login form state
  const [email, setEmail] = useState("sarthak@gmail.com");
  const [password, setPassword] = useState("Sarthak@03");

  // Projects state & form
  const [projects, setProjects] = useState<any[]>([]);
  const [pTitle, setPTitle] = useState("");
  const [pSlug, setPSlug] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pCategory, setPCategory] = useState("Fintech");
  const [pClientName, setPClientName] = useState("");
  const [pThumbnailUrl, setPThumbnailUrl] = useState("");
  const [pProjectUrl, setPProjectUrl] = useState("");
  const [pFeatured, setPFeatured] = useState(true);
  const [pTagsInput, setPTagsInput] = useState("");
  const [pStat1Label, setPStat1Label] = useState("");
  const [pStat1Value, setPStat1Value] = useState("");
  const [pStat2Label, setPStat2Label] = useState("");
  const [pStat2Value, setPStat2Value] = useState("");
  const [pChallenge, setPChallenge] = useState("");
  const [pSolution, setPSolution] = useState("");

  // Services state & form
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [sName, setSName] = useState("");
  const [sSlug, setSSlug] = useState("");
  const [sDescription, setSDescription] = useState("");
  const [sFeaturesInput, setSFeaturesInput] = useState("");

  // Brands state & form
  const [brandsList, setBrandsList] = useState<any[]>([]);
  const [bName, setBName] = useState("");

  // Reviews state & form
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [rAuthor, setRAuthor] = useState("");
  const [rRole, setRRole] = useState("");
  const [rCompany, setRCompany] = useState("");
  const [rQuote, setRQuote] = useState("");
  const [rRating, setRRating] = useState(5);
  const [rAvatar, setRAvatar] = useState("");

  // Inquiries state & filter
  const [inquiriesList, setInquiriesList] = useState<any[]>([]);
  const [inquiryFilter, setInquiryFilter] = useState<"All" | "New" | "Contacted" | "Converted">("All");

  // Check auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        verifyAdmin();
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        verifyAdmin();
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const verifyAdmin = async () => {
    try {
      setIsAdmin(true);
      fetchAllData();
    } catch {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    try {
      const p = await apiClient.get<any[]>("/projects");
      setProjects(p || []);
    } catch (e) { console.info(e); }

    try {
      const s = await apiClient.get<any[]>("/services");
      setServicesList(s || []);
    } catch (e) { console.info(e); }

    try {
      const b = await apiClient.get<any[]>("/brands");
      setBrandsList(b || []);
    } catch (e) { console.info(e); }

    try {
      const r = await apiClient.get<any[]>("/testimonials");
      setReviewsList(r || []);
    } catch (e) { console.info(e); }

    try {
      const inq = await apiClient.get<any[]>("/inquiries");
      setInquiriesList(inq || []);
    } catch (e) { console.info(e); }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (email.trim().toLowerCase() === "sarthak@gmail.com" && password === "Sarthak@03") {
        setSession({ user: { email: "sarthak@gmail.com", id: "sarthak-admin" } });
        setIsAdmin(true);
        toast.success("Welcome Sarthak! Signed into Admin Console.");
        fetchAllData();
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Signed into Admin Console.");
    } catch (err: any) {
      toast.error(err.message || "Authentication failed. Use email: sarthak@gmail.com and password: Sarthak@03");
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
    toast.success("Logged out successfully.");
  };

  // Create Handlers
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const tags = pTagsInput.split(",").map((t) => t.trim()).filter(Boolean);
      const stats = [];
      if (pStat1Label && pStat1Value) stats.push({ label: pStat1Label, value: pStat1Value });
      if (pStat2Label && pStat2Value) stats.push({ label: pStat2Label, value: pStat2Value });

      await apiClient.post("/projects", {
        title: pTitle,
        slug: pSlug || pTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: pDescription,
        content: `Challenge:\n${pChallenge}\n\nSolution:\n${pSolution}`,
        category: pCategory,
        tags,
        clientName: pClientName,
        thumbnailUrl: pThumbnailUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
        projectUrl: pProjectUrl,
        featured: pFeatured,
        stats,
      });

      toast.success("Case study project published dynamically!");
      setPTitle(""); setPSlug(""); setPDescription(""); setPClientName("");
      setPThumbnailUrl(""); setPProjectUrl(""); setPTagsInput("");
      setPStat1Label(""); setPStat1Value(""); setPStat2Label(""); setPStat2Value("");
      setPChallenge(""); setPSolution("");
      fetchAllData();
    } catch (err: any) {
      toast.error(err.message || "Failed to create project.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const features = sFeaturesInput.split(",").map((f) => f.trim()).filter(Boolean);
      await apiClient.post("/services", {
        name: sName,
        slug: sSlug || sName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: sDescription,
        features,
      });
      toast.success("Service published dynamically!");
      setSName(""); setSSlug(""); setSDescription(""); setSFeaturesInput("");
      fetchAllData();
    } catch (err: any) {
      toast.error(err.message || "Failed to create service.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await apiClient.post("/brands", { name: bName.toUpperCase() });
      toast.success("Brand added to sliding marquee!");
      setBName("");
      fetchAllData();
    } catch (err: any) {
      toast.error(err.message || "Failed to add brand.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await apiClient.post("/testimonials", {
        author: rAuthor,
        role: rRole,
        company: rCompany,
        quote: rQuote,
        rating: Number(rRating),
        avatar: rAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300",
      });
      toast.success("Review published dynamically!");
      setRAuthor(""); setRRole(""); setRCompany(""); setRQuote(""); setRAvatar("");
      fetchAllData();
    } catch (err: any) {
      toast.error(err.message || "Failed to publish review.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (resource: string, id: string) => {
    if (!confirm(`Are you sure you want to delete this ${resource}?`)) return;
    try {
      await apiClient.delete(`/${resource}/${id}`);
      toast.success(`Deleted successfully.`);
      fetchAllData();
    } catch (err: any) {
      toast.error(err.message || "Delete operation failed.");
    }
  };

  const handleToggleInquiryStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "New" ? "Contacted" : currentStatus === "Contacted" ? "Converted" : "New";
    try {
      await apiClient.patch(`/inquiries/${id}`, { status: nextStatus });
      toast.success(`Inquiry status updated to ${nextStatus}`);
      fetchAllData();
    } catch (e: any) {
      toast.error(e.message || "Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-8 w-8 border-2 border-gold rounded-full border-t-transparent" />
          <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">Initializing Admin Portal...</span>
        </div>
      </div>
    );
  }

  // Login Form Panel
  if (!session || !isAdmin) {
    const handleDemoAccess = () => {
      setSession({ user: { email: "sarthak@gmail.com", id: "sarthak-admin" } });
      setIsAdmin(true);
      toast.success("Welcome Sarthak! Logged into Admin Console.");
      fetchAllData();
    };

    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center px-6 py-24 relative overflow-hidden font-sans">
        {/* Ambient background gold glow orbs */}
        <div className="gold-glow-bg top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md relative z-10 p-8 md:p-10 rounded-3xl border border-white/10 bg-[#0d0d0d]/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col gap-6"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="p-4 rounded-2xl border border-gold/30 bg-gold/10 text-gold mb-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-heading font-extrabold text-white">
              Admin Access Gateway
            </h1>
            <p className="text-xs text-white/70 font-sans max-w-[300px] leading-relaxed">
              Use <span className="text-gold font-mono font-bold">sarthak@gmail.com</span> / <span className="text-gold font-mono font-bold">Sarthak@03</span> or click 1-Click Demo Login.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider uppercase text-white/80">Admin Email</label>
              <Input
                type="email"
                placeholder="sarthak@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                suppressHydrationWarning
                className="bg-[#141414] border-white/10 text-white placeholder:text-white/40 focus-visible:border-gold/50 focus-visible:ring-gold/30 h-11 px-4 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider uppercase text-white/80">Password</label>
              <Input
                type="password"
                placeholder="Sarthak@03"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                suppressHydrationWarning
                className="bg-[#141414] border-white/10 text-white placeholder:text-white/40 focus-visible:border-gold/50 focus-visible:ring-gold/30 h-11 px-4 rounded-xl"
              />
            </div>

            <ShinyButton type="submit" disabled={actionLoading} className="w-full py-4 mt-2 justify-center text-sm font-bold">
              {actionLoading ? "Authenticating..." : "Sign In Console"} <ArrowRight className="ml-2 h-4 w-4" />
            </ShinyButton>

            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full py-3.5 rounded-xl border border-gold/40 bg-gold/10 text-gold font-heading text-xs uppercase font-bold tracking-wider hover:bg-gold/20 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" /> 1-Click Quick Demo Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const filteredInquiries = inquiriesList.filter((inq) => {
    if (inquiryFilter === "All") return true;
    return (inq.status || "New") === inquiryFilter;
  });

  // Main Admin Workspace Page
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      
      {/* ━━━ DEDICATED ADMIN TOP HEADER NAVBAR ━━━ */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-2xl px-6 md:px-12 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          
          {/* Brand & Console Title */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-gold/40 bg-gold/10 flex items-center justify-center text-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-sm tracking-wide text-white">NEXUS ADMIN</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-glow" />
              </div>
              <span className="text-[10px] font-mono text-gold tracking-widest uppercase">
                {session?.user?.email || "sarthak@gmail.com"}
              </span>
            </div>
          </div>

          {/* Navigation Category Action Buttons */}
          <nav className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: "projects", label: "Projects", icon: Code, count: projects.length },
              { id: "services", label: "Services", icon: Layers, count: servicesList.length },
              { id: "brands", label: "Brands", icon: Building2, count: brandsList.length },
              { id: "reviews", label: "Reviews", icon: Star, count: reviewsList.length },
              { id: "inquiries", label: "Inquiries", icon: MessageSquare, count: inquiriesList.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-gold text-black font-extrabold shadow-[0_0_20px_rgba(212,175,55,0.6)] scale-105"
                      : "bg-[#121212] border border-white/10 text-white/80 hover:text-white hover:border-gold/40 hover:bg-[#1a1a1a]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono ${isActive ? "bg-black text-gold" : "bg-white/10 text-white/90"}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              suppressHydrationWarning
              onClick={fetchAllData}
              className="p-2.5 rounded-xl border border-white/10 bg-[#121212] text-white hover:text-gold hover:border-gold/40 cursor-pointer transition-colors"
              title="Refresh All Data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>

            <motion.button
              type="button"
              suppressHydrationWarning
              onClick={handleLogout}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 rounded-xl text-xs font-heading font-semibold uppercase tracking-widest text-red-400 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 cursor-pointer flex items-center gap-1.5"
            >
              Sign Out <LogOut className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* ━━━ MAIN WORKSPACE CONTENT ━━━ */}
      <main className="flex-1 max-w-7xl mx-auto w-full py-10 px-6 md:px-12 flex flex-col gap-8">
        
        {/* ━━━ TAB 1: PROJECTS CASE STUDIES ━━━ */}
        {activeTab === "projects" && (
          <div className="flex flex-col gap-10">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <h1 className="text-2xl font-heading font-extrabold text-white">Project Case Studies Manager</h1>
                <p className="text-xs text-white/70">Publish dynamic case studies that render live on homepage & case studies page.</p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold font-mono text-xs font-bold">
                {projects.length} Published Projects
              </span>
            </div>

            {/* Asymmetric 2-Column: Form Left, Live 3D Preview Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Column */}
              <div className="lg:col-span-7 p-7 rounded-3xl border border-white/10 bg-[#0d0d0d] shadow-2xl flex flex-col gap-6">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <Plus className="h-5 w-5 text-gold" />
                  <h2 className="text-base font-heading font-bold text-white">Publish New Case Study</h2>
                </div>

                <form onSubmit={handleCreateProject} className="flex flex-col gap-4 font-sans text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/80 font-mono uppercase text-[10px]">Project Title *</label>
                      <Input placeholder="Apex Asset Management" value={pTitle} onChange={(e) => setPTitle(e.target.value)} required className="bg-[#141414] border-white/10 text-white placeholder:text-white/30 h-10 px-3 rounded-xl" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/80 font-mono uppercase text-[10px]">Slug *</label>
                      <Input placeholder="apex-finance" value={pSlug} onChange={(e) => setPSlug(e.target.value)} required className="bg-[#141414] border-white/10 text-white placeholder:text-white/30 h-10 px-3 rounded-xl" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/80 font-mono uppercase text-[10px]">Category</label>
                      <select value={pCategory} onChange={(e) => setPCategory(e.target.value)} className="h-10 px-3 rounded-xl bg-[#141414] border border-white/10 text-xs text-white focus:outline-none focus:border-gold">
                        <option value="Fintech">Fintech</option>
                        <option value="AI Platform">AI Platform</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="SaaS Platform">SaaS Platform</option>
                        <option value="Web App">Web App</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/80 font-mono uppercase text-[10px]">Client Name</label>
                      <Input placeholder="Apex Wealth LLC" value={pClientName} onChange={(e) => setPClientName(e.target.value)} className="bg-[#141414] border-white/10 text-white placeholder:text-white/30 h-10 px-3 rounded-xl" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/80 font-mono uppercase text-[10px]">Project URL</label>
                      <Input placeholder="https://apex.com" value={pProjectUrl} onChange={(e) => setPProjectUrl(e.target.value)} className="bg-[#141414] border-white/10 text-white placeholder:text-white/30 h-10 px-3 rounded-xl" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/80 font-mono uppercase text-[10px]">Thumbnail Image URL *</label>
                      <Input placeholder="https://images.unsplash.com/..." value={pThumbnailUrl} onChange={(e) => setPThumbnailUrl(e.target.value)} required className="bg-[#141414] border-white/10 text-white placeholder:text-white/30 h-10 px-3 rounded-xl" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/80 font-mono uppercase text-[10px]">Tags (comma-separated)</label>
                      <Input placeholder="Next.js, Express, Supabase" value={pTagsInput} onChange={(e) => setPTagsInput(e.target.value)} className="bg-[#141414] border-white/10 text-white placeholder:text-white/30 h-10 px-3 rounded-xl" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/80 font-mono uppercase text-[10px]">Short Description *</label>
                    <textarea placeholder="High performance asset management platform..." value={pDescription} onChange={(e) => setPDescription(e.target.value)} required rows={2} className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-white/10 text-xs text-white placeholder:text-white/30 resize-y" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/80 font-mono uppercase text-[10px]">Challenge</label>
                      <textarea placeholder="Developing synchronous real-time feeds..." value={pChallenge} onChange={(e) => setPChallenge(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-white/10 text-xs text-white placeholder:text-white/30 resize-y" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/80 font-mono uppercase text-[10px]">Solution</label>
                      <textarea placeholder="We wired up WebSocket connection threads..." value={pSolution} onChange={(e) => setPSolution(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-white/10 text-xs text-white placeholder:text-white/30 resize-y" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input type="checkbox" id="pFeatured" checked={pFeatured} onChange={(e) => setPFeatured(e.target.checked)} className="h-4 w-4 accent-gold cursor-pointer" />
                    <label htmlFor="pFeatured" className="text-xs text-white/90 cursor-pointer">Pin to Homepage Showcase</label>
                  </div>

                  <ShinyButton type="submit" disabled={actionLoading} className="w-full py-4 justify-center mt-2 font-bold">
                    {actionLoading ? "Publishing Data..." : "Publish Case Study Project"} <ArrowRight className="ml-2 h-4 w-4" />
                  </ShinyButton>
                </form>
              </div>

              {/* Real-time Live 3D Card Preview Column */}
              <div className="lg:col-span-5 flex flex-col gap-4 sticky top-24">
                <div className="flex items-center gap-2 text-gold font-mono text-xs uppercase font-bold tracking-wider">
                  <Eye className="h-4 w-4" /> Live Card Preview
                </div>

                <div className="rounded-2xl border border-gold/30 bg-[#0a0a0a] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col">
                  <div className="relative h-48 w-full bg-[#121212] overflow-hidden">
                    <img
                      src={pThumbnailUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase text-gold">
                      {pCategory || "Fintech"}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-3">
                    <h3 className="text-base font-bold text-white leading-snug">
                      {pTitle || "Your Project Title Preview"}
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed font-sans line-clamp-2">
                      {pDescription || "Project summary description will render live right here as you type into the form..."}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                      {(pTagsInput ? pTagsInput.split(",") : ["Next.js", "Supabase"]).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-gold">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Active Projects Grid */}
            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <h2 className="text-base font-heading font-bold text-white">Active Case Studies ({projects.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((p) => (
                  <motion.div
                    key={p.id || p._id || p.slug}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="p-5 rounded-2xl border border-white/10 bg-[#0a0a0a] flex flex-col justify-between gap-4 shadow-lg"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-gold uppercase font-bold">{p.category}</span>
                        {p.featured && <span className="px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/30 text-[9px]">Featured</span>}
                      </div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{p.title}</h4>
                      <p className="text-xs text-white/70 line-clamp-2">{p.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="text-[10px] font-mono text-white/50">{p.slug}</span>
                      <button onClick={() => handleDelete("projects", p.id || p._id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ━━━ TAB 2: SERVICES OFFERED ━━━ */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 p-7 rounded-3xl border border-white/10 bg-[#0d0d0d] flex flex-col gap-6">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <Plus className="h-5 w-5 text-gold" />
                <h2 className="text-base font-heading font-bold text-white">Add Service Capability</h2>
              </div>
              <form onSubmit={handleCreateService} className="flex flex-col gap-4 text-xs font-sans">
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/80 font-mono uppercase text-[10px]">Service Name *</label>
                  <Input placeholder="MVP Development" value={sName} onChange={(e) => setSName(e.target.value)} required className="bg-[#141414] border-white/10 text-white h-10 px-3 rounded-xl" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/80 font-mono uppercase text-[10px]">Slug *</label>
                  <Input placeholder="mvp-development" value={sSlug} onChange={(e) => setSSlug(e.target.value)} required className="bg-[#141414] border-white/10 text-white h-10 px-3 rounded-xl" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/80 font-mono uppercase text-[10px]">Description *</label>
                  <textarea placeholder="Validate fast. We ship fully functional minimum viable products..." value={sDescription} onChange={(e) => setSDescription(e.target.value)} required rows={3} className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-white/10 text-xs text-white resize-y" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/80 font-mono uppercase text-[10px]">Features (comma-separated)</label>
                  <Input placeholder="Rapid Prototyping, Full-Stack Setup, CI/CD" value={sFeaturesInput} onChange={(e) => setSFeaturesInput(e.target.value)} className="bg-[#141414] border-white/10 text-white h-10 px-3 rounded-xl" />
                </div>
                <ShinyButton type="submit" disabled={actionLoading} className="w-full py-4 justify-center mt-2 font-bold">
                  Publish Service Capabilities
                </ShinyButton>
              </form>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-4">
              <h2 className="text-base font-heading font-bold text-white border-b border-white/10 pb-3">Active Services ({servicesList.length})</h2>
              <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto">
                {servicesList.map((s) => (
                  <motion.div key={s.id || s.slug} whileHover={{ scale: 1.01 }} className="p-5 rounded-2xl border border-white/10 bg-[#0a0a0a] flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-white">{s.name || s.title}</span>
                      <p className="text-xs text-white/70 leading-relaxed">{s.description}</p>
                    </div>
                    <button onClick={() => handleDelete("services", s.id)} className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ━━━ TAB 3: BRAND PARTNERS ━━━ */}
        {activeTab === "brands" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 p-7 rounded-3xl border border-white/10 bg-[#0d0d0d] flex flex-col gap-6">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <Plus className="h-5 w-5 text-gold" />
                <h2 className="text-base font-heading font-bold text-white">Add Brand Partner to Marquee</h2>
              </div>
              <form onSubmit={handleCreateBrand} className="flex flex-col gap-4 text-xs font-sans">
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/80 font-mono uppercase text-[10px]">Brand / Company Name *</label>
                  <Input placeholder="STRIPE" value={bName} onChange={(e) => setBName(e.target.value)} required className="bg-[#141414] border-white/10 text-white h-10 px-3 rounded-xl" />
                </div>
                <ShinyButton type="submit" disabled={actionLoading} className="w-full py-4 justify-center mt-2 font-bold">
                  Add Brand to Sliding Marquee
                </ShinyButton>
              </form>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-4">
              <h2 className="text-base font-heading font-bold text-white border-b border-white/10 pb-3">Active Brands in Marquee ({brandsList.length})</h2>
              <div className="flex flex-wrap gap-3">
                {brandsList.map((b, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.05 }} className="px-4 py-2.5 rounded-xl border border-gold/30 bg-gold/5 flex items-center gap-3 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                    <span className="text-xs font-mono font-bold text-gold">{typeof b === "string" ? b : b.name}</span>
                    {b.id && (
                      <button onClick={() => handleDelete("brands", b.id)} className="text-red-400 hover:text-red-300 cursor-pointer">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ━━━ TAB 4: CLIENT REVIEWS ━━━ */}
        {activeTab === "reviews" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 p-7 rounded-3xl border border-white/10 bg-[#0d0d0d] flex flex-col gap-6">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <Plus className="h-5 w-5 text-gold" />
                <h2 className="text-base font-heading font-bold text-white">Publish Client Review</h2>
              </div>
              <form onSubmit={handleCreateReview} className="flex flex-col gap-4 text-xs font-sans">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/80 font-mono uppercase text-[10px]">Author Name *</label>
                    <Input placeholder="Dr. Sarah Jenkins" value={rAuthor} onChange={(e) => setRAuthor(e.target.value)} required className="bg-[#141414] border-white/10 text-white h-10 px-3 rounded-xl" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/80 font-mono uppercase text-[10px]">Role *</label>
                    <Input placeholder="CTO" value={rRole} onChange={(e) => setRRole(e.target.value)} required className="bg-[#141414] border-white/10 text-white h-10 px-3 rounded-xl" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/80 font-mono uppercase text-[10px]">Company Name *</label>
                    <Input placeholder="Vivid Health" value={rCompany} onChange={(e) => setRCompany(e.target.value)} required className="bg-[#141414] border-white/10 text-white h-10 px-3 rounded-xl" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/80 font-mono uppercase text-[10px]">Star Rating (1-5)</label>
                    <select value={rRating} onChange={(e) => setRRating(Number(e.target.value))} className="h-10 px-3 rounded-xl bg-[#141414] border border-white/10 text-xs text-white">
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Good)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-white/80 font-mono uppercase text-[10px]">Avatar Image URL</label>
                  <Input placeholder="https://images.unsplash.com/..." value={rAvatar} onChange={(e) => setRAvatar(e.target.value)} className="bg-[#141414] border-white/10 text-white h-10 px-3 rounded-xl" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-white/80 font-mono uppercase text-[10px]">Review Quote *</label>
                  <textarea placeholder="Nexus Edge delivered a HIPAA-compliant medical platform..." value={rQuote} onChange={(e) => setRQuote(e.target.value)} required rows={4} className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-white/10 text-xs text-white resize-y" />
                </div>

                <ShinyButton type="submit" disabled={actionLoading} className="w-full py-4 justify-center mt-2 font-bold">
                  Publish Client Review
                </ShinyButton>
              </form>
            </div>

            {/* Live Review Card Preview */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-gold font-mono text-xs uppercase font-bold">
                <Eye className="h-4 w-4" /> Live Review Preview
              </div>

              <div className="p-7 rounded-3xl border border-gold/30 bg-[#0a0a0a] flex flex-col gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: rRating || 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-white/95 italic leading-relaxed font-sans">
                  &ldquo;{rQuote || "Your published review text will render live in this preview card..."}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <img
                    src={rAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300"}
                    alt="Preview"
                    className="h-10 w-10 rounded-full object-cover border border-gold/40"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{rAuthor || "Dr. Sarah Jenkins"}</span>
                    <span className="text-[10px] font-mono text-gold uppercase">{rRole || "CTO"}, {rCompany || "Vivid Health"}</span>
                  </div>
                </div>
              </div>

              <h2 className="text-base font-heading font-bold text-white border-b border-white/10 pb-3 mt-4">Active Reviews ({reviewsList.length})</h2>
              <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
                {reviewsList.map((r) => (
                  <div key={r.id || r.author} className="p-4 rounded-xl border border-white/10 bg-[#0a0a0a] flex items-center justify-between">
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-white">{r.author} ({r.company})</span>
                      <span className="text-[10px] text-white/70 truncate max-w-[300px]">&ldquo;{r.quote}&rdquo;</span>
                    </div>
                    <button onClick={() => handleDelete("testimonials", r.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ━━━ TAB 5: CONTACT INQUIRIES LEAD CENTER ━━━ */}
        {activeTab === "inquiries" && (
          <div className="flex flex-col gap-8">
            {/* Header & Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border border-white/10 bg-[#0a0a0a] flex flex-col gap-1">
                <span className="text-[10px] font-mono text-white/60 uppercase">Total Leads</span>
                <span className="text-2xl font-extrabold text-white">{inquiriesList.length}</span>
              </div>
              <div className="p-5 rounded-2xl border border-gold/30 bg-gold/5 flex flex-col gap-1">
                <span className="text-[10px] font-mono text-gold uppercase">New Inquiries</span>
                <span className="text-2xl font-extrabold text-gold">{inquiriesList.filter((i) => (i.status || "New") === "New").length}</span>
              </div>
              <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col gap-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase">Converted Clients</span>
                <span className="text-2xl font-extrabold text-emerald-400">{inquiriesList.filter((i) => i.status === "Converted").length}</span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                {(["All", "New", "Contacted", "Converted"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setInquiryFilter(filter)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                      inquiryFilter === filter
                        ? "bg-gold text-black shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                        : "bg-[#121212] border border-white/10 text-white/70 hover:text-white"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Cards Feed */}
            {filteredInquiries.length === 0 ? (
              <div className="py-16 text-center text-white/60 text-xs border border-white/10 rounded-2xl bg-[#0a0a0a]">
                No inquiries matching filter &ldquo;{inquiryFilter}&rdquo;.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredInquiries.map((inq) => (
                  <motion.div
                    key={inq.id}
                    whileHover={{ y: -3 }}
                    className="p-6 rounded-2xl border border-white/10 bg-[#0d0d0d] flex flex-col gap-4 shadow-xl justify-between"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex flex-col">
                          <h3 className="text-base font-bold text-white">{inq.name}</h3>
                          <span className="text-xs font-mono text-gold">{inq.email}</span>
                        </div>

                        <button
                          onClick={() => handleToggleInquiryStatus(inq.id, inq.status || "New")}
                          className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold cursor-pointer transition-all ${
                            inq.status === "Converted"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : inq.status === "Contacted"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : "bg-gold/20 text-gold border border-gold/30"
                          }`}
                        >
                          Status: {inq.status || "New"}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs border-y border-white/10 py-2.5">
                        {inq.company && <div><span className="text-white/60 font-mono text-[10px] uppercase">Company:</span> <span className="text-white font-bold">{inq.company}</span></div>}
                        <div><span className="text-white/60 font-mono text-[10px] uppercase">Budget:</span> <span className="text-gold font-bold">{inq.budget || "N/A"}</span></div>
                      </div>

                      <p className="text-xs text-white/90 leading-relaxed bg-black/50 p-3 rounded-xl border border-white/5 font-sans">
                        {inq.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="text-[10px] font-mono text-white/40">Requested: {(inq.services || []).join(", ") || "All"}</span>
                      <button onClick={() => handleDelete("inquiries", inq.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
