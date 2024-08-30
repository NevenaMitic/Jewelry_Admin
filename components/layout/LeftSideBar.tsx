"use client";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { navLinks } from "@/library/constants";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const LeftSideBar = () => {
    const pathName = usePathname();
    const { user } = useUser(); // Fetch user data

    // Check if the user data is available
    const userName = user ? user.firstName || 'User' : 'User';

    return (
        <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-beige-1 shadow-xl max-lg:hidden">
            <Image src="/logo.png" alt="logo" width={170} height={100} priority />

            <div className="flex flex-col gap-12">
                {navLinks.map((link) => (
                    <Link
                        href={link.url}
                        key={link.label}
                        className={`flex gap-4 text-body-medium ${pathName === link.url ? "text-white" : "text-grey-1"}`}
                    >
                        {link.icon} <p>{link.label}</p>
                    </Link>
                ))}
            </div>

            <div className="flex gap-4 text-body-medium items-center">
                <UserButton afterSignOutUrl="/login" />
                <p>{userName}</p>
            </div>
        </div>
    );
};

export default LeftSideBar;

