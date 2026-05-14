import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react"; // 1. Import ReactNode

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ar CHAAP Newa Jacche NA | ECE Vault",
  description: "The official archive of last-minute lab reports, questionable assignments, and notes we didn't read until 3 AM. Proceed with panic.",
  keywords: ["ECE", "Engineering", "Lab Reports", "Notes", "Survival Guide"],
  openGraph: {
    title: "The ECE Course Vault",
    description: "Official archive of lab reports and notes. Help the squad survive the semester.",
    siteName: "Ar CHAAP Newa Jacche NA",
    images: [
      {
        // Pro-tip: Create a quick 1200x630 image with your "Ar Chaap Newa Jacche Na" title, 
        // put it in your /public folder as 'og-image.jpg', and it will show up in WhatsApp!
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: "The ECE Course Vault",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ar CHAAP Newa Jacche NA | ECE Vault",
    description: "The central repository for surviving Semester 4.",
    images: ['/og-image.jpg'],
  },
};

// 2. Define the props type to tell TypeScript what 'children' is
interface RootLayoutProps {
  children: ReactNode;
}

// 3. Apply the type to the component
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}