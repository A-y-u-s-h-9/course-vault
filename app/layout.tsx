import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react"; // 1. Import ReactNode

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ar Chaap Newa Jacche Na",
  description: "Engineering Labs, Assignments, and Notes",
};

// 2. Define the props type to tell TypeScript what 'children' is
interface RootLayoutProps {
  children: ReactNode;
}

// 3. Apply the type to the component
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}