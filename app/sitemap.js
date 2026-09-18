import { getAllBlogs } from './lib/blogs';
import { getAllProjects } from './lib/projects';

export default async function sitemap() {
  const baseUrl = 'https://anonsoft.com';

  const coreRoutes = [
    '',
    '/about',
    '/services',
    '/features',
    '/agents',
    '/ai',
    '/health',
    '/careers',
    '/contact',
    '/bookademo',
    '/free-consultation',
    '/telemedicine-software-for-clinics',
    '/healthcare-saas-mvp-development',
    '/wellness-platform-development',
    '/blog',
    '/privacy',
    '/terms',
    '/refund-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.9,
  }));

  const blogs = getAllBlogs().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const projects = getAllProjects().map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug}`,
    lastModified: '2026-07-25',
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...coreRoutes, ...projects, ...blogs];
}
