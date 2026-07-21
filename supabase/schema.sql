-- =========================================================================
-- DATABASE: NEXUS EDGE ENTERPRISE SCHEMAS
-- Database Engine: PostgreSQL (Supabase)
-- =========================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom updated_at column timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================================================================
-- 1. USERS PROFILE TABLE (Maps Supabase Auth UIDs to App Roles)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid UUID UNIQUE NOT NULL, -- References auth.users(id) in Supabase Auth
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('Client', 'Editor', 'Admin', 'SuperAdmin')) DEFAULT 'Client',
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing for sub-millisecond search performance
CREATE INDEX IF NOT EXISTS idx_users_uid ON public.users(uid);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- Attach timestamp update triggers
CREATE TRIGGER trigger_update_users_timestamp
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row-Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own profile record."
    ON public.users FOR SELECT
    USING (auth.uid() = uid);

CREATE POLICY "Users can update their own profile record."
    ON public.users FOR UPDATE
    USING (auth.uid() = uid);

CREATE POLICY "Admins have full write permissions."
    ON public.users FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE public.users.uid = auth.uid() AND public.users.role IN ('Admin', 'SuperAdmin')
        )
    );


-- =========================================================================
-- 2. SERVICES TABLE (Our Core Development Capabilities)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    features TEXT[] NOT NULL DEFAULT '{}',
    icon_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);

CREATE TRIGGER trigger_update_services_timestamp
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view active services catalog."
    ON public.services FOR SELECT
    USING (true);

CREATE POLICY "Only Admin/SuperAdmin accounts can edit services catalog."
    ON public.services FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE public.users.uid = auth.uid() AND public.users.role IN ('Admin', 'SuperAdmin')
        )
    );


-- =========================================================================
-- 3. PROJECTS TABLE (Our Premium Dynamic Case Studies)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL, -- Markdown content format
    category TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    client_name TEXT,
    thumbnail_url TEXT NOT NULL,
    media_urls TEXT[] NOT NULL DEFAULT '{}',
    project_url TEXT,
    featured BOOLEAN NOT NULL DEFAULT false,
    stats JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured) WHERE featured = true;

CREATE TRIGGER trigger_update_projects_timestamp
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view published projects and case studies."
    ON public.projects FOR SELECT
    USING (true);

CREATE POLICY "Only Admin/SuperAdmin accounts can edit case studies database."
    ON public.projects FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE public.users.uid = auth.uid() AND public.users.role IN ('Admin', 'SuperAdmin')
        )
    );


-- =========================================================================
-- 4. CONTACTS TABLE (Business Inquiry Leads)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    services TEXT[] NOT NULL DEFAULT '{}',
    budget TEXT,
    description TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('New', 'Contacted', 'Proposal_Sent', 'Converted', 'Rejected')) DEFAULT 'New',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON public.contacts(created_at DESC);

CREATE TRIGGER trigger_update_contacts_timestamp
    BEFORE UPDATE ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can submit a project inquiry lead."
    ON public.contacts FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Only Admin/SuperAdmin accounts can view or edit inquiries list."
    ON public.contacts FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE public.users.uid = auth.uid() AND public.users.role IN ('Admin', 'SuperAdmin')
        )
    );


-- =========================================================================
-- 5. TESTIMONIALS TABLE (Client Endorsements)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT,
    company_logo TEXT,
    avatar TEXT,
    rating INTEGER DEFAULT 5,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trigger_update_testimonials_timestamp
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view customer testimonials."
    ON public.testimonials FOR SELECT
    USING (true);

CREATE POLICY "Only Admin accounts can manage testimonials."
    ON public.testimonials FOR ALL
    TO authenticated
    USING (true);


-- =========================================================================
-- BRANDS TABLE (Partner Companies for Sliding Marquee)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view partner brands."
    ON public.brands FOR SELECT
    USING (true);

CREATE POLICY "Only Admin accounts can manage partner brands."
    ON public.brands FOR ALL
    TO authenticated
    USING (true);



-- =========================================================================
-- 6. NEWSLETTER TABLE (Newsletter subscription registrations)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.newsletter (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter(email);

CREATE TRIGGER trigger_update_newsletter_timestamp
    BEFORE UPDATE ON public.newsletter
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.newsletter ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can subscribe to the technical newsletters."
    ON public.newsletter FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Only Admin/SuperAdmin accounts can view newsletter subscribers."
    ON public.newsletter FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE public.users.uid = auth.uid() AND public.users.role IN ('Admin', 'SuperAdmin')
        )
    );


-- =========================================================================
-- STORAGE BUCKETS CONFIGURATION (Supabase Storage Admin Policies)
-- =========================================================================
-- Note: Buckets are typically initialized via API, but we specify access controls
-- for a target bucket named 'portfolio-assets'.

-- 1. Insert bucket definition SQL injection logic safely (if it does not exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Create RLS access rules for 'portfolio-assets' bucket
CREATE POLICY "Allow public read access to portfolio files."
    ON storage.objects FOR SELECT
    USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Allow authenticated admins full writes to portfolio bucket."
    ON storage.objects FOR ALL
    TO authenticated
    USING (
        bucket_id = 'portfolio-assets' AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE public.users.uid = auth.uid() AND public.users.role IN ('Admin', 'SuperAdmin')
        )
    );
