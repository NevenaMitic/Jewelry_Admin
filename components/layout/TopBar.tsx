"use client"

import { navLinks } from "@/library/constants"
import { UserButton } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const TopBar = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const pathName = usePathname();

    return (
        <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-beige-1 shadow-xl lg:hidden">
         <Image src="/logo.png" alt="logo" width={150} height={70} priority/>

            <div className="flex gap-8 max-md:hidden">
                {navLinks.map((link) => (
                    <Link
                    href={link.url}
                    key={link.label} 
                    className={`flex gap-4 text-body-medium ${pathName === link.url ? "text-white" :"text-grey-1"}`}>
                     <p>{link.label}</p> 
                    </Link>
                ))}
            </div>

            <div className="relative flex gap-4 items-center">
                <Menu 
                className="cursor-pointer md:hidden" 
                onClick={() => setDropdownMenu(!dropdownMenu)}/>

                    {dropdownMenu && (
                        <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
                        {navLinks.map((link) => (
                            <Link
                            href={link.url}
                            key={link.label} 
                            className="flex gap-4 text-body-medium">
                                {link.icon} <p>{link.label}</p> 
                            </Link>
                        ))}
                        </div>
                    )}
              <UserButton afterSignOutUrl="/login" />
            </div>
        </div>
    );
};
export default TopBar;