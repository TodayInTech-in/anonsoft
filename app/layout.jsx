import '../style.css';
import '../liquid-glass.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  metadataBase: new URL('https://anonsoft.in'),
  title: {
    default: 'Anonsoft — Custom Startup Software Development Agency',
    template: '%s | Anonsoft',
  },
  description:
    'We help startups launch scalable software quickly: SaaS platforms, AI tools, and mobile apps—production-ready in weeks. Book a free strategy call.',
  keywords: [
    'custom startup software development agency',
    'SaaS development company',
    'AI tool development',
    'mobile app development',
    'healthcare software development',
    'telemedicine app developer',
    'HIPAA compliant software',
    'zero upfront payment software agency',
  ],
  authors: [{ name: 'Anonsoft' }],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anonsoft.in/',
    siteName: 'Anonsoft',
    title: 'Anonsoft — Custom Startup Software Development Agency',
    description:
      'HIPAA-compliant white-label software for telemedicine, EHR, pharmacy, and wellness with zero upfront payment.',
    images: [{ url: 'https://anonsoft.com/assets/anon-soft-og.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@anonsoft',
    title: 'Anonsoft — Health & Startup Software Agency',
    description:
      'Launch your branded health platform in 4–8 weeks with zero upfront payment.',
    images: ['https://anonsoft.com/assets/anon-soft-og.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light-mode" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Anonsoft',
              alternateName: ['Anonsoft', 'Anonsoft Software'],
              url: 'https://www.anonsoft.in/',
              logo: 'https://www.anonsoft.in/assets/logo.png',
              image: 'https://www.anonsoft.in/assets/og-image.png',
              description:
                'Anonsoft is a leading software development company helping startups and businesses build SaaS platforms, AI tools, and mobile apps quickly.',
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
