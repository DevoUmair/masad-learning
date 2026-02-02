import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Masad Learning | Interactive & Engaging Educational Platform",
  description:
    "Empowering learners through modern technology. Masad Learning offers a comprehensive, gamified approach to mastering new skills and knowledge.",
  keywords: [
    "Masad Learning",
    "online education",
    "interactive learning",
    "e-learning platform",
    "skills development",
    "educational app",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}