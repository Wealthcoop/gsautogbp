
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import SessionProvider from '@/components/session-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gold Standard GBP - Google Business Profile Automation',
  description: 'The gold standard in Google Business Profile automation. Create, schedule, and manage your business posts with AI-powered tools.',
  keywords: 'Google Business Profile, automation, social media, scheduling, AI, business posts',
  authors: [{ name: 'Gold Standard' }],
  openGraph: {
    title: 'Gold Standard GBP - Google Business Profile Automation',
    description: 'The gold standard in Google Business Profile automation. Create, schedule, and manage your business posts with AI-powered tools.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Standard GBP - Google Business Profile Automation',
    description: 'The gold standard in Google Business Profile automation. Create, schedule, and manage your business posts with AI-powered tools.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
