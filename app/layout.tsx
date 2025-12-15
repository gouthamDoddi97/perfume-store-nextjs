import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Moonlight Attar & Perfumes - Discover Your Signature Scent',
  description: 'Premium luxury perfumes, attars, and oud fragrances. Discover your signature scent with our curated collection of exquisite fragrances.',
  keywords: 'perfumes, attar, oud, luxury fragrances, signature scent, premium perfumes',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Moonlight Attar & Perfumes',
    description: 'Discover your signature scent with premium luxury fragrances',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-elegant">
        <ThemeProvider>
          <div className="min-h-screen bg-luxury-cream dark:bg-luxury-black text-gray-900 dark:text-white transition-colors duration-300">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}