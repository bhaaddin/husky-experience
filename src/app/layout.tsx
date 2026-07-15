import type { Metadata } from 'next'
import { Inter, Playfair_Display, Montserrat } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { I18nProvider } from '@/lib/i18n/I18nContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: {
    default: 'The Husky Experience | Premium Pet Photography & Encounters',
    template: '%s | The Husky Experience',
  },
  description: 'Create lifelong memories with our pack of 14 Siberian Huskies. Professional photography sessions and unforgettable encounters for dog lovers.',
  keywords: ['husky photography', 'dog encounter', 'pet photography', 'siberian husky', 'dog experience', 'professional photos', 'family photos'],
  authors: [{ name: 'The Husky Experience' }],
  creator: 'The Husky Experience',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thehuskyexperience.com',
    siteName: 'The Husky Experience',
    title: 'The Husky Experience | Premium Pet Photography & Encounters',
    description: 'Create lifelong memories with our pack of 14 Siberian Huskies.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Husky Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Husky Experience',
    description: 'Create lifelong memories with our pack of 14 Siberian Huskies.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${montserrat.variable} font-sans antialiased`}>
        <I18nProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}
