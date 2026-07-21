-- =========================================================================
-- COMPLETE SEED DATA FOR NEXUS EDGE IN SUPABASE
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- =========================================================================

-- 1. BRANDS
INSERT INTO public.brands (name) VALUES
('APEX WEALTH'),
('NOVA LABS'),
('AURA COMMERCE'),
('VIVID HEALTH'),
('MICROSOFT'),
('VERCEL'),
('AWS'),
('STRIPE'),
('OPENAI'),
('DOCKER'),
('REDIS')
ON CONFLICT (name) DO NOTHING;

-- 2. TESTIMONIALS / REVIEWS
INSERT INTO public.testimonials (author, role, company, quote, rating, avatar) VALUES
(
  'Dr. Sarah Jenkins',
  'CTO',
  'Vivid Health',
  'Nexus Edge delivered a HIPAA-compliant medical platform with obsessive attention to micro-interactions. Their architecture decisions saved us months of technical debt.',
  5,
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300'
),
(
  'Marcus Vance',
  'VP of Product',
  'Nova Labs',
  'Our API latency dropped from 800ms to 45ms. The engineering team genuinely understood performance at a systems level — not just surface optimization.',
  5,
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300'
),
(
  'Elena Rostova',
  'CEO',
  'Apex Wealth',
  'The visual finish of our enterprise dashboard has been compared to Linear and Vercel. Our clients are completely wowed by the level of polish.',
  5,
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300'
),
(
  'James Park',
  'Head of Engineering',
  'Aura Commerce',
  'They rebuilt our entire checkout flow in 6 weeks — zero downtime migration, fully type-safe, and conversion rates jumped 34%. Remarkable execution.',
  5,
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300'
)
ON CONFLICT DO NOTHING;

-- 3. PROJECTS
INSERT INTO public.projects (title, slug, description, content, category, tags, client_name, thumbnail_url, media_urls, project_url, featured, stats)
VALUES 
(
  'Apex Finance — Enterprise Asset Management Dashboard',
  'apex-finance',
  'Architected a secure portfolio management interface processing $1.2B in transactions with 99.99% uptime and sub-12ms latency.',
  'Challenge:
Developing synchronous real-time dashboards mapping updates from multiple stock indices and trading feeds without locking client thread execution loops.

Solution:
We wired up WebSocket connection threads decoupled from primary request pipelines, leveraging Redis caching layers for instant database reads.',
  'Fintech',
  ARRAY['Next.js', 'Express', 'Supabase', 'Redis'],
  'Apex Wealth LLC',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200',
  ARRAY['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200'],
  'https://apex-platform.com',
  true,
  '[{"label": "Uptime", "value": "99.99%"}, {"label": "Latency", "value": "<12ms"}, {"label": "Volume", "value": "8.4TB"}]'::jsonb
),
(
  'Nova AI — Generative Language Co-processor API',
  'nova-ai',
  'High-throughput API gateway processing 1.2M requests per minute with parallel stream validation and intelligent token routing.',
  'Challenge:
Handling variable latency constraints on AI prompt completion streams, ensuring backend validation checks did not buffer or choke responses.

Solution:
We structured progressive parser wrappers utilizing native Node streams, feeding chunks to Zod schemas in real-time as they arrived.',
  'AI Platform',
  ARRAY['Node.js', 'Zod', 'Supabase', 'AWS'],
  'Nova Labs Inc',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
  ARRAY['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200'],
  'https://nova-ai.io',
  true,
  '[{"label": "Throughput", "value": "1.2M/min"}, {"label": "TTFB", "value": "85ms"}, {"label": "Cost Saved", "value": "42%"}]'::jsonb
)
ON CONFLICT (slug) DO UPDATE 
SET title = EXCLUDED.title,
    description = EXCLUDED.description,
    content = EXCLUDED.content,
    category = EXCLUDED.category,
    tags = EXCLUDED.tags,
    client_name = EXCLUDED.client_name,
    thumbnail_url = EXCLUDED.thumbnail_url,
    media_urls = EXCLUDED.media_urls,
    project_url = EXCLUDED.project_url,
    featured = EXCLUDED.featured,
    stats = EXCLUDED.stats;
