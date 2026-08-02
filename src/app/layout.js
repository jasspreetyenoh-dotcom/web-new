import { Inter } from "next/font/google";
import GlobalDock from "@/components/GlobalDock";
import ClickSpark from "@/components/ClickSpark";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: "YENOH | We Build Brands That Grow",
  description: "YENOH is an award-winning creative studio and digital growth partner. We design high-performance web systems, craft memorable brand identities, and scale digital experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <ClickSpark sparkColor="#F6C000" sparkSize={3} sparkRadius={14} sparkCount={6} duration={385}>
          {children}
          <GlobalDock />
        </ClickSpark>
      </body>
    </html>
  );
}
