import type { Metadata } from "next";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/900.css";
import "@fontsource/playfair-display/700-italic.css";
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/500.css";
import "@fontsource/lexend/600.css";
import "@fontsource/lexend/700.css";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "March '91 ",
  description: "The student magazine of MARCOMS, NUST Islamabad.",
  openGraph: {
    title: "March '91",
    description: "The student magazine of MARCOMS, NUST Islamabad.",
    images: ["/images/brand-banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "March '91",
    description: "The student magazine of MARCOMS, NUST Islamabad.",
    images: ["/images/brand-banner.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#E9E2D0]">
        <SiteHeader />
        <main className="flex-1 flex justify-center">
          <div className="w-full max-w-6xl bg-[#F6F1E4]">{children}</div>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
