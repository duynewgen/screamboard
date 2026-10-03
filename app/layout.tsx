import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// Free rounded fallback for Windows/Linux — Apple devices prefer SF Pro Rounded via the stack.
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Screamboard | Spam your keyboard. It screams.",
  description: "Spam your keyboard. It screams.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body
        className="flex min-h-full flex-col bg-background font-sans text-foreground"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
