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

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link"



export default function Landing() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {/* Navbar */}
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

      {/* Hero Section */}
      <div className='flex flex-row items-center justify-center w-full h-80% p-8 border'>
        <p>hero section. Im not really sure what you want in this part</p>
        {/* put an image here */}
      </div>
      {/* Features */}
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
      </Accordion>

      {/* Footer */}
    </main>
  );
}
