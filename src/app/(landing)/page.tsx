import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link"




export default function Landing() {
  return (
    <main className='flex min-h-screen flex-col justify-between bg-slate-50'>
      {/* Navbar */}
      <div className="flex flex-row items-center justify-between p-4 bg-white">
        <div className="flex flex-row items-center space-x-4 pl-4">
          <Avatar>
            <AvatarImage src="https://yt3.googleusercontent.com/iPhOVJRVwHO5jKZrM83CNXb4-Sxm6J6ciJnkDWg60EdFShT6tf0M9iM4IjaW-ASG8ED7LbiJzg=s900-c-k-c0x00ffffff-no-rj" />
            <AvatarFallback>RMP</AvatarFallback>
          </Avatar>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl py-2'>RateMyBrofessor</h1>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>can put links here</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>link is not cooperating</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  professors
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Something else here
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* Hero Section */}
      <div className='flex flex-row items-center justify-center w-full h-80% p-8 border'>
        <p>hero section. Im not really sure what you want in this part</p>
        {/* put an image here maybe */}
      </div>
      {/* Features */}
      <div className='flex flex-row items-center justify-between bg-slate-100'>
        <div className='w-500 bg-slate-200 flex-col p-4 pl-16'>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-4xl py-2'>Features</h1>
          <Accordion type="single" collapsible className="w-80">
            <AccordionItem value="item-1">
              <AccordionTrigger>Does it have cool features?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Look at those professors!</AccordionTrigger>
              <AccordionContent>
                wow look at them.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Look at this feature!</AccordionTrigger>
              <AccordionContent>
                wow look.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className=" max-w-80 border p-4">
          <h1>put something in the middle here like perhaps a big button to go look for professors?</h1>
        </div>
        <div className='w-80 p-4 px-16'>
          put something else other on the right like maybe our contact info?
        </div>
      </div>
      {/* Footer */}
    </main>
  );
}
