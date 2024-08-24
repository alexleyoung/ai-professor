import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"


export default function Footer() {
    return (
        <div className="flex flex-row h-20 items-center align-middle bg-slate-200 justify-between">
            <h1 className="w-1/3 text-slate-600 text-xs m-4">
                Copyright Alex Corps International Inc.
            </h1>
            <div className='flex flex-row space-x-8 align-middle justify-center w-1/3'>
                <Link href='/page'>
                    Terms of Service
                </Link>
                <Link href='/page'>
                    Support
                </Link>
            </div>
            <div className="flex flex-row-reverse w-1/3">
            <Button variant="ghost">
                <Link href="/docs">
                    Contact Us
                </Link>
            </Button>
            </div>

        </div>
    )
}
