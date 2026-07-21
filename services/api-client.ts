import { supabase } from "@/lib/supabase";

// Fallback high-fidelity data if Supabase tables are unpopulated or schema is missing
export const fallbackProjects = [
  {
    id: "apex-finance",
    _id: "apex-finance",
    title: "Apex Finance — Enterprise Asset Management Dashboard",
    slug: "apex-finance",
    description: "Architected a secure portfolio management interface processing $1.2B in transactions with 99.99% uptime and sub-12ms latency.",
    content: "Challenge:\nDeveloping synchronous real-time dashboards mapping updates from multiple stock indices.\n\nSolution:\nWe wired up WebSocket connection threads decoupled from primary request pipelines.",
    category: "Fintech",
    tags: ["Next.js", "Express", "Supabase", "Redis"],
    clientName: "Apex Wealth LLC",
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    projectUrl: "https://apex-platform.com",
    featured: true,
    stats: [
      { label: "Uptime", value: "99.99%" },
      { label: "Latency", value: "<12ms" },
      { label: "Volume", value: "8.4TB" },
    ],
  },
  {
    id: "nova-ai",
    _id: "nova-ai",
    title: "Nova AI — Generative Language Co-processor API",
    slug: "nova-ai",
    description: "High-throughput API gateway processing 1.2M requests per minute with parallel stream validation and intelligent token routing.",
    content: "Challenge:\nHandling variable latency constraints on AI prompt completion streams.\n\nSolution:\nWe structured progressive parser wrappers utilizing native Node streams.",
    category: "AI Platform",
    tags: ["Node.js", "Zod", "Supabase", "AWS"],
    clientName: "Nova Labs Inc",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
    projectUrl: "https://nova-ai.io",
    featured: true,
    stats: [
      { label: "Throughput", value: "1.2M/min" },
      { label: "TTFB", value: "85ms" },
      { label: "Cost Saved", value: "42%" },
    ],
  },
];

export const fallbackBrands = [
  "APEX WEALTH", "NOVA LABS", "AURA COMMERCE", "VIVID HEALTH",
  "MICROSOFT", "VERCEL", "AWS", "STRIPE", "OPENAI", "DOCKER", "REDIS"
];

export const fallbackServices = [
  {
    id: "mvp-development",
    slug: "mvp-development",
    name: "MVP Development",
    description: "Validate fast. We ship fully functional minimum viable products with decoupled architectures and CI/CD from day one.",
    features: ["Rapid Prototyping", "Full-Stack Setup", "CI/CD Deployment"],
  },
  {
    id: "ai-development",
    slug: "ai-development",
    name: "AI Integration",
    description: "Embed intelligence. We design API gateways for LLM orchestration, RAG pipelines, and real-time inference endpoints.",
    features: ["LLM Fine-tuning", "RAG Systems", "Streaming Endpoints"],
  },
  {
    id: "saas-development",
    slug: "saas-development",
    name: "SaaS Platforms",
    description: "Scale without limits. Multi-tenant databases, Stripe billing, role-based access, and real-time analytics dashboards.",
    features: ["Multi-Tenant Architecture", "Stripe Billing", "Analytics Engine"],
  },
  {
    id: "web-development",
    slug: "web-development",
    name: "Web Development",
    description: "Pixel-perfect execution. Server components, edge rendering, custom animations, and Lighthouse scores above 95.",
    features: ["Next.js & React", "High Performance", "SEO Optimized"],
  },
  {
    id: "mobile-app-development",
    slug: "mobile-app-development",
    name: "Mobile Apps",
    description: "Native performance. Cross-platform applications with offline-first architecture, biometric auth, and push notifications.",
    features: ["React Native", "Offline Auth", "Biometrics"],
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    name: "UI/UX Design",
    description: "Award-worthy interfaces. Design systems, micro-interactions, accessibility compliance, and user research-driven layouts.",
    features: ["Design Systems", "Figma Components", "Micro-Animations"],
  },
];

export const fallbackTestimonials = [
  {
    id: "1",
    quote: "Nexus Edge delivered a HIPAA-compliant medical platform with obsessive attention to micro-interactions. Their architecture decisions saved us months of technical debt.",
    author: "Dr. Sarah Jenkins",
    role: "CTO",
    company: "Vivid Health",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300",
  },
  {
    id: "2",
    quote: "Our API latency dropped from 800ms to 45ms. The engineering team genuinely understood performance at a systems level — not just surface optimization.",
    author: "Marcus Vance",
    role: "VP of Product",
    company: "Nova Labs",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
  },
  {
    id: "3",
    quote: "The visual finish of our enterprise dashboard has been compared to Linear and Vercel. Our clients are completely wowed by the level of polish.",
    author: "Elena Rostova",
    role: "CEO",
    company: "Apex Wealth",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300",
  },
  {
    id: "4",
    quote: "They rebuilt our entire checkout flow in 6 weeks — zero downtime migration, fully type-safe, and conversion rates jumped 34%. Remarkable execution.",
    author: "James Park",
    role: "Head of Engineering",
    company: "Aura Commerce",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300",
  },
];

export const fallbackTeamMembers = [
  {
    id: "1",
    name: "Alex Vance",
    role: "Chief Architect & Founder",
    description: "Leading system design, distributed data models, and high-throughput cloud infrastructure with 12+ years of engineering experience across Silicon Valley unicorns.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800",
  },
  {
    id: "2",
    name: "Elena Rostova",
    role: "Head of Product Design",
    description: "Architecting award-worthy UI/UX design systems, micro-interactions, and visual direction. Specializing in high-converting SaaS interfaces and design engineering.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
  },
  {
    id: "3",
    name: "Marcus Sterling",
    role: "Lead AI & Security Engineer",
    description: "Spearheading LLM orchestration, RAG pipelines, cryptographic auth systems, and zero-trust security audits for enterprise client deployments.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
  },
];

// Set of tables that are missing in remote schema to avoid redundant 404 network requests
const missingTables = new Set<string>(["projects", "testimonials", "brands", "services", "contacts", "team"]);

function formatProject(row: any) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    content: row.content || "",
    category: row.category,
    tags: row.tags || [],
    clientName: row.client_name || row.clientName || "",
    thumbnailUrl: row.thumbnail_url || row.thumbnailUrl || "",
    mediaUrls: row.media_urls || row.mediaUrls || [],
    projectUrl: row.project_url || row.projectUrl || "",
    featured: row.featured ?? false,
    stats: row.stats || [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

class ApiClient {
  public async get<T>(endpoint: string): Promise<T> {
    const cleanEndpoint = endpoint.split("?")[0];
    const hasFeaturedQuery = endpoint.includes("featured=true");

    try {
      // Team / About Items
      if (cleanEndpoint === "/team" || cleanEndpoint === "/about-team") {
        if (typeof window !== "undefined") {
          const localStored = localStorage.getItem("codenova_team_members");
          if (localStored) {
            try {
              const parsed = JSON.parse(localStored);
              if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed as unknown as T;
              }
            } catch (e) {
              console.error("Error parsing codenova_team_members", e);
            }
          }
        }
        return fallbackTeamMembers as unknown as T;
      }
      // 1. Projects
      if (cleanEndpoint === "/projects") {
        if (missingTables.has("projects")) {
          return fallbackProjects as unknown as T;
        }
        let query = supabase.from("projects").select("*").order("created_at", { ascending: false });
        if (hasFeaturedQuery) {
          query = query.eq("featured", true);
        }
        const { data, error } = await query;
        if (error) {
          missingTables.add("projects");
          return fallbackProjects as unknown as T;
        }
        if (!data || data.length === 0) {
          return fallbackProjects as unknown as T;
        }
        return data.map(formatProject) as unknown as T;
      }

      // 2. Single Project by slug
      if (cleanEndpoint.startsWith("/projects/")) {
        const slug = cleanEndpoint.replace("/projects/", "");
        if (missingTables.has("projects")) {
          const matchedFallback = fallbackProjects.find((p) => p.slug === slug || p.id === slug);
          return (matchedFallback || fallbackProjects[0]) as unknown as T;
        }
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (error || !data) {
          const matchedFallback = fallbackProjects.find((p) => p.slug === slug || p.id === slug);
          return (matchedFallback || fallbackProjects[0]) as unknown as T;
        }
        return formatProject(data) as unknown as T;
      }

      // 3. Brands
      if (cleanEndpoint === "/brands") {
        if (missingTables.has("brands")) {
          return fallbackBrands as unknown as T;
        }
        const { data, error } = await supabase.from("brands").select("*").order("created_at", { ascending: false });
        if (error || !data || data.length === 0) {
          missingTables.add("brands");
          return fallbackBrands as unknown as T;
        }
        return data.map((b) => b.name) as unknown as T;
      }

      // 4. Services
      if (cleanEndpoint === "/services") {
        if (missingTables.has("services")) {
          return fallbackServices as unknown as T;
        }
        const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: false });
        if (error || !data || data.length === 0) {
          missingTables.add("services");
          return fallbackServices as unknown as T;
        }
        return data as unknown as T;
      }

      // 5. Testimonials / Reviews
      if (cleanEndpoint === "/testimonials" || cleanEndpoint === "/reviews") {
        if (missingTables.has("testimonials")) {
          return fallbackTestimonials as unknown as T;
        }
        const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
        if (error || !data || data.length === 0) {
          missingTables.add("testimonials");
          return fallbackTestimonials as unknown as T;
        }
        return data as unknown as T;
      }

      // 6. Inquiries (Contact Leads)
      if (cleanEndpoint === "/inquiries" || cleanEndpoint === "/contacts") {
        if (missingTables.has("contacts")) {
          return [] as unknown as T;
        }
        const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
        if (error || !data) {
          missingTables.add("contacts");
          return [] as unknown as T;
        }
        return data as unknown as T;
      }

      // 7. Auth me
      if (cleanEndpoint === "/auth/me") {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          throw new Error("No active session.");
        }
        return {
          id: session.user.id,
          email: session.user.email,
          role: "Admin",
        } as unknown as T;
      }

      return [] as unknown as T;
    } catch {
      return [] as unknown as T;
    }
  }

  public async post<T>(endpoint: string, body: any): Promise<T> {
    try {
      // Projects
      if (endpoint === "/projects") {
        missingTables.delete("projects");
        const payload = {
          title: body.title,
          slug: body.slug,
          description: body.description,
          content: body.content || "",
          category: body.category,
          tags: body.tags || [],
          client_name: body.clientName || body.client_name,
          thumbnail_url: body.thumbnailUrl || body.thumbnail_url,
          media_urls: body.mediaUrls || body.media_urls || [],
          project_url: body.projectUrl || body.project_url,
          featured: body.featured ?? false,
          stats: body.stats || [],
        };

        const { data, error } = await supabase.from("projects").insert([payload]).select().single();
        if (error) throw new Error(error.message);
        return formatProject(data) as unknown as T;
      }

      // Services
      if (endpoint === "/services") {
        missingTables.delete("services");
        const payload = {
          name: body.name,
          slug: body.slug,
          description: body.description,
          features: body.features || [],
          icon_name: body.iconName || "Code",
        };
        const { data, error } = await supabase.from("services").insert([payload]).select().single();
        if (error) throw new Error(error.message);
        return data as unknown as T;
      }

      // Brands
      if (endpoint === "/brands") {
        missingTables.delete("brands");
        const payload = {
          name: body.name,
          logo_url: body.logoUrl || "",
        };
        const { data, error } = await supabase.from("brands").insert([payload]).select().single();
        if (error) throw new Error(error.message);
        return data as unknown as T;
      }

      // Testimonials / Reviews
      if (endpoint === "/testimonials" || endpoint === "/reviews") {
        missingTables.delete("testimonials");
        const payload = {
          quote: body.quote,
          author: body.author,
          role: body.role,
          company: body.company,
          rating: body.rating || 5,
          avatar: body.avatar || "",
        };
        const { data, error } = await supabase.from("testimonials").insert([payload]).select().single();
        if (error) throw new Error(error.message);
        return data as unknown as T;
      }

      // Inquiries
      if (endpoint === "/inquiries" || endpoint === "/contacts") {
        missingTables.delete("contacts");
        const payload = {
          name: body.name,
          email: body.email,
          company: body.company || "",
          services: body.services || [],
          budget: body.budget || "",
          description: body.description,
          status: "New",
        };
        const { data, error } = await supabase.from("contacts").insert([payload]).select().single();
        if (error) throw new Error(error.message);
        return { success: true, data } as unknown as T;
      }

      // Team / About Items
      if (endpoint === "/team" || endpoint === "/about-team") {
        const newMember = {
          id: Date.now().toString(),
          name: body.name,
          role: body.role,
          description: body.description,
          imageUrl: body.imageUrl || body.image_url || "",
        };
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("codenova_team_members");
          let list = stored ? JSON.parse(stored) : [...fallbackTeamMembers];
          list.push(newMember);
          localStorage.setItem("codenova_team_members", JSON.stringify(list));
        }
        return newMember as unknown as T;
      }

      return { success: true } as unknown as T;
    } catch (error: any) {
      console.error(`ApiClient.post request to ${endpoint} error:`, error.message || error);
      throw error;
    }
  }

  public async patch<T>(endpoint: string, body: any): Promise<T> {
    try {
      if (endpoint.startsWith("/inquiries/") || endpoint.startsWith("/contacts/")) {
        const id = endpoint.split("/").pop();
        const { data, error } = await supabase
          .from("contacts")
          .update(body)
          .eq("id", id)
          .select()
          .single();
        if (error) throw new Error(error.message);
        return data as unknown as T;
      }
      return { success: true } as unknown as T;
    } catch (error: any) {
      console.error(`ApiClient.patch error on ${endpoint}:`, error.message || error);
      throw error;
    }
  }

  public async delete<T>(endpoint: string): Promise<T> {
    try {
      const parts = endpoint.split("/");
      const resource = parts[1];
      const id = parts[2];

      if (resource === "team" || resource === "about-team") {
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("codenova_team_members");
          let list = stored ? JSON.parse(stored) : [...fallbackTeamMembers];
          list = list.filter((m: any) => m.id !== id);
          localStorage.setItem("codenova_team_members", JSON.stringify(list));
        }
        return { success: true } as unknown as T;
      }

      let tableName = "projects";
      if (resource === "services") tableName = "services";
      if (resource === "brands") tableName = "brands";
      if (resource === "testimonials" || resource === "reviews") tableName = "testimonials";
      if (resource === "inquiries" || resource === "contacts") tableName = "contacts";

      const { error } = await supabase.from(tableName).delete().eq("id", id);
      if (error) {
        await supabase.from(tableName).delete().eq("slug", id);
      }
      return { success: true } as unknown as T;
    } catch (error: any) {
      console.error(`ApiClient.delete request to ${endpoint} error:`, error.message || error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
