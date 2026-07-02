import type { Metadata } from "next";
import { Poppins, Shadows_Into_Light } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const shadowsIntoLight = Shadows_Into_Light({
  variable: "--font-shadows-into-light",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Khenbridge | Leading Visa Consultants in Kerala | Immigration Experts in Kochi",
  description: "Khenbridge is Kerala's most trusted visa consultancy. Expert immigration guidance, visa refusal appeals, student visas, and work permits. Office in Kochi, serving clients across Kerala.",
  keywords: "visa consultants Kerala, UK immigration Kerala, visa consultants Kochi, visa consultants Trivandrum, UK visa refusal appeal, student visa Kerala, work permit visa India, best visa agency Kerala, Khenbridge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${shadowsIntoLight.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-indigo font-sans">
        {children}
      </body>
    </html>
  );
}
