import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/themeProvider";

const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "800"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Care-Plus",
  description: "Medical Booking App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `min-h-screen bg-dark-300 antialiased font-sora`,
          sora.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
