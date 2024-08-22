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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link"
import Hero from "@/components/landing/Hero"
import Features from "@/components/landing/Features"



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
        <NavigationMenu className="pr-4">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Sign in  
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Hero />
      <Features />
      {/* Footer */}
    </main>
  );
}
