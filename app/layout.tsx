import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", inter.variable)}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
