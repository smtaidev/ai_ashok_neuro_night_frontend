import Footer from "@/components/shared/Footer";
import MainNavbar from "@/components/shared/Navbar";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";


interface WebLayoutProps {
  children: React.ReactNode;
}

export default async function WebLayout({ children }: WebLayoutProps) {

  return (
    <main className=''>
      <>
        <div className="bg-white/96 sticky top-0 z-10 py-4">
          <MainNavbar />
        </div>
        {children}
        <Footer />

        <ScrollToTopButton />
      </>
    </main>
  );
}