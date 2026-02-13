import Navbar from "@/components/Common/Navbar";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
       <Navbar/>
      {children}
    </>
  );
}

