"use client"

import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { sidebarLinks } from '@/constants/index'
import { usePathname } from 'next/navigation'
const MobileNav = ({user}: MobileNavProps) => {

    const pathname = usePathname();
  return (
    <section className="w-full max-w-[256px]">
        <Sheet>
            <SheetTrigger>
                <Image 
                    src="/icons/hamburger.svg"
                    alt="menu icon"
                    width={30}
                    height={39}
                />
            </SheetTrigger>
            <SheetContent side="left">
                <Link href="/"
                className="mb-12 cursor-pointer flex items-center gap-1 px-4"
                >
                    <Image 
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Belvora logo"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                        Belvora
                    </h1>
                </Link>
                <div className='mobilenav-sheet'>
                    <SheetClose asChild>
                        <nav className='flex h-full flex-col gap-6 pt-16 text-white'>
                            {sidebarLinks.map(
                                (link) => {
                                const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)

                                return (
                                    <SheetClose asChild key={link.route}>
                                         <Link href={link.route} 
                                            key={link.label}
                                            className={cn('mobilenav-sheet_close w-full', {'bg-bank-gradient':isActive})}
                                            >
                                                <Image
                                                    src={link.imgURL}
                                                    alt={link.label}
                                                    width={20}
                                                    height={20}
                                                    className={cn({"brightness-[3] invert-0":isActive})}
                                                />
                                                <p className={cn("text-16 font-semibold text-black-2", {"!text-white":isActive})}>
                                                    {link.label}
                                                </p>
                                            </Link>
                                    </SheetClose>
                                )
                            })}
                        USER
                        </nav>
                    </SheetClose>
                    FOOTER
                </div>
            </SheetContent>
        </Sheet>

    </section>
  )
}

export default MobileNav