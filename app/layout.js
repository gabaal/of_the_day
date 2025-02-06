import { Montserrat, Merriweather } from "next/font/google";
import "./globals.css";
import CookieConsentBanner from "../components/CookieConsentBanner"; // Import Cookie Banner

// Import fonts
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // Choose the weights you need
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"], // Choose the weights you need
});

export const metadata = {
  title: "Of The Day",
  description:
    "Get daily quotes, historical events, and notable births & deaths.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${merriweather.variable} antialiased bg-primary text-light`}
      >
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
