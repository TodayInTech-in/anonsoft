import '../style.css';
import '../liquid-glass.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  metadataBase: new URL('https://todayintech.in'),
  title: {
    default: 'TodayInTech — Launch Your Health Platform in 4–8 Weeks | Software Agency',
    template: '%s | TodayInTech',
  },
  description:
    'TodayInTech builds HIPAA-compliant telemedicine, EHR, RPM, and healthcare SaaS platforms in 4–8 weeks with zero upfront payment.',
  keywords: [
    'healthcare software development',
    'telemedicine app developer',
    'HIPAA compliant software',
    'white label healthcare software',
    'zero upfront payment software agency',
  ],
  authors: [{ name: 'TodayInTech' }],
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
    url: 'https://todayintech.in/',
    siteName: 'TodayInTech',
    title: 'TodayInTech — Launch Your Health Platform in 4–8 Weeks',
    description:
      'HIPAA-compliant white-label software for telemedicine, EHR, pharmacy, and wellness with zero upfront payment.',
    images: [{ url: 'https://todayintech.in/assets/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@todayintech',
    title: 'TodayInTech — Health Software Agency',
    description:
      'Launch your branded health platform in 4–8 weeks with zero upfront payment.',
    images: ['https://todayintech.in/assets/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light-mode">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'TodayInTech',
              url: 'https://todayintech.in',
              logo: 'https://todayintech.in/assets/logo.png',
              description:
                'TodayInTech is an AI-powered software agency providing zero upfront payment custom healthcare and SaaS platform development.',
            }),
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
