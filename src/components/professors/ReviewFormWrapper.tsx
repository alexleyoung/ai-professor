"use client";

import * as React from "react";
import { useMediaQuery } from "react-responsive";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ReviewForm from "./ReviewForm";

export default function ReviewFormWrapper({ prof }: { prof: Professor }) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant='outline' className='w-full'>
              New Rating
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className='text-left'>
              <DrawerTitle>New Rating</DrawerTitle>
              <DrawerDescription>
                Create a new rating for {prof.name}
              </DrawerDescription>
            </DrawerHeader>
            <ReviewForm prof={prof} setOpen={setOpen} />
            <DrawerFooter className='pt-2'>
              <DrawerClose asChild>
                <Button variant='destructive'>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant='outline' className='w-full'>
              New Rating
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>New Rating</DialogTitle>
              <DialogDescription>
                Create a new rating for {prof.name}
              </DialogDescription>
            </DialogHeader>
            <ReviewForm prof={prof} setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
