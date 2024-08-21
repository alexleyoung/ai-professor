import { Button } from "@/components/ui/button"

export default function Landing() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {/* Navbar */}
      <div className='flex flex-row items-center justify-left w-full p-4'>
        <Button variant={"ghost"} className="m-4">Home</Button>
        <Button variant={"ghost"} className="m-4">This button</Button>
        <Button variant={"ghost"} className="m-4">Hello</Button>
        <Button variant={"ghost"} className="m-4">Rate a professor?</Button>
      </div>
      {/* Hero Section */}
      <div className='flex flex-col items-center justify-center w-full h-80% p-8 border'>
        hero
        <p>Lorem ipsem and whatever and hero ahweriowafjsdlifjsdlkfjasldfj</p>
        <p>Lorem ipsem and whatever and hero ahweriowafjsdlifjsdlkfjasldfj</p>
      </div>
      {/* Features */}
      {/* Footer */}
    </main>
  );
}
