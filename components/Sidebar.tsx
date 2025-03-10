"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants/index'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const Sidebar = ({user}: SiderbarProps) => {

    const pathname = usePathname();
    
  return (
    <section className="sidebar">
        <nav className="flex flex-col gap-4">
            <Link href="/"
            className="mb-12 cursor-pointer items-center gap-2"
            >
                <Image 
                    src="/icons/logo.svg"
                    width={34}
                    height={34}
                    alt="Belvora logo"
                    className="size-[24px] max-xl:size-14"
                />
                <h1 className="sidebar-logo">
                    Belvora
                </h1>
            </Link>

            {sidebarLinks.map(
                (link) => {

                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)

                    return (
                        <Link href={link.route} 
                        key={link.label}
                        className={cn('sidebar-link', {'bg-bank-gradient':isActive}, "text-black-2")}
                        >
                            {link.label}
                        </Link> 
                    )
                })
            }
        </nav>
    </section>
  )
}

export default Sidebar