import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// PP Neue Montreal — used everywhere (headings + body), per the DOSS reference.
const ppnm = localFont({
  variable: "--font-ppnm",
  display: "swap",
  src: [
    { path: "../fonts/ppneuemontreal-book.otf", weight: "400", style: "normal" },
    { path: "../fonts/ppneuemontreal-italic.otf", weight: "400", style: "italic" },
    { path: "../fonts/ppneuemontreal-medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/ppneuemontreal-bold.otf", weight: "700", style: "normal" },
  ],
});

// NOTE: provisional metadata — final title/description copy runs through
// the technical-seo-audit pass before launch.
export const metadata: Metadata = {
  metadataBase: new URL("https://optimile.co"),
  title: {
    default: "Optimile — Intelligent Freight OS",
    template: "%s · Optimile",
  },
  description:
    "The operating system for intelligent freight. Automate the lifecycle from PO to POD across shippers and carriers.",
  icons: { icon: "/brand/optimile-icon.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${ppnm.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ground text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
