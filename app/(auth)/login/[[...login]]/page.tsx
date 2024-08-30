import { ClerkLoaded, SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0">
        <Image
          src="/background1.jpg"
          alt="Background image"
          fill 
          style={{ objectFit: 'cover' }} 
          quality={100}
        />
      </div>

      <div className="relative flex h-full">
         {/* Leva polovina ekrana sa formom za prijavu */}
        <div className="flex-1 flex justify-center items-center">
          <ClerkLoaded>
            <SignIn path="/login" />
          </ClerkLoaded>
        </div>

        {/* Desna polovina ekrana sa dodatnim informacijama */}
        <div className="flex-1 md:flex hidden flex-col justify-center items-center bg-gray-200 bg-opacity-5 backdrop-blur-sm md:w-1/3 p-4">
          <div className="mb-8 text-center">
            <p className="text-heading1-bold font-playfair text-gray-900 mb-4">
              Welcome to Empearl Store
            </p>
            <p className="text-heading2-bold font-playfair text-yellow-100">
              Admin Portal
            </p>
            <p className="mt-11 text-heading4 font-playfair text-white">
              Please sign in to manage the store, view analytics, and oversee all operations.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

