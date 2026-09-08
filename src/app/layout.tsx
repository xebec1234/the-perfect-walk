import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { PwaRegister } from "@/components/PwaRegister";

export const metadata: Metadata = {
  title: "The Perfect Walk",
  description: "A five-part morning walking practice.",
  applicationName: "The Perfect Walk",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icons/icon-512.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icons/icon-512.svg", type: "image/svg+xml" }],
  },
};
export const viewport: Viewport = {
  themeColor: "#f7edda",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          {children}
          <BottomNav />
        </div>
        <PwaRegister />
      </body>
    </html>
  );
}
