import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntakePage from "@/components/IntakePage";

export const metadata: Metadata = {
  title: "Free visa consultation | Khenbridge",
  description:
    "Book a free initial consultation with Khenbridge. Share your details and our team will call you back. Malayalam, Hindi, and English.",
};

export default function IntakeRoutePage() {
  return (
    <>
      <Header />
      <main>
        <IntakePage />
      </main>
      <Footer />
    </>
  );
}
