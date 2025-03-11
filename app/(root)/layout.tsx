import Sidebar from "@/components/Sidebar"
import MobileNav from "@/components/MobileNav"
import Image from "next/image"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = {firstname: "David", lastname: "Gustav"}

  return (
   <main className="flex h-screen w-full font-inter">
    <Sidebar user={loggedIn} />
    
    <div className="flex size-full flex-col">
      <div className="root-layout ">
        <Image 
          src="/icons/logo.svg"
          alt="Belvora logo"
          width={30}
          height={30}
          className="size-10"
        />
        <div>
          <MobileNav user={loggedIn} />
        </div>
      </div>
      {children}
    </div>
   </main>
  );
}