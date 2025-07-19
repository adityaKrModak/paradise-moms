import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-[108px] md:pt-44">{children}</main>
      <Footer />
    </>
  );
}
