import { Outfit } from "next/font/google";
import "./globals.css";
import NavBar from "./_components/NavBar";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Masad Learning | Interactive & Engaging Educational Platform",
  description:
    "Empowering learners through modern technology. Masad Learning offers a comprehensive, gamified approach to mastering new skills and knowledge.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
