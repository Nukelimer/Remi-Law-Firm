"use client";
import { useState, useEffect } from "react";
import { LockKeyhole } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ClientForm from "@/components/forms/ClientForms";
import PassKeyModal from "@/components/PassKeyModal";

export default function Home({ searchParams }: SearchParamProps) {
  const [showFirstImage, setShowFirstImage] = useState(true);

  const isAdmin = searchParams.admin === "true";

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstImage((prev) => !prev); // Toggle the image state
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="text-white flex h-screen max-h-screen flex-row ">
      {isAdmin && <PassKeyModal />}
      <section className="remove-scrollbar container my-auto h-screen">
        <div className="sub-container max-w-[495px] !pt-0">
          <Link href={'/'}>
          
          <Image
            priority
            src="/assets/icons/logo-full_.png"
            alt="logo"
            width={10000}
            height={10000}
            className="mb-12 h-80 mx-auto w-fit"
          />
          
          </Link>
          <ClientForm />

          <div className="text-14-regular mt-6 flex justify-between ">
            <p className="justify-items-end text-dark-600 xl:text-left">
              {" "}
              &copy; 2024 RLF
            </p>

            <Link
              href={"/?admin=true"}
              className="text-green-500 flex gap-1 items-center">
              <LockKeyhole /> Admin
            </Link>
          </div>
        </div>
      </section>

      {/* Container for the images with a smooth fade transition */}
      <div className="relative w-1/2 h-full  md:flex hidden">
        <Image
          priority
          src={"/assets/images/onboarding-img_.png"}
          height={10000}
          alt="onboarding"
          width={10000}
          className={`transition-opacity duration-1000 ease-in-out ${
            showFirstImage ? "opacity-100" : "opacity-0"
          } absolute inset-0 object-cover w-full h-full`}
        />
        <Image
          priority
          src={"/assets/images/onboarding-img.png"}
          height={10000}
          alt="onboarding"
          width={10000}
          className={`transition-opacity duration-1000 ease-in-out ${
            showFirstImage ? "opacity-0" : "opacity-100"
          } absolute inset-0 object-cover w-full h-full`}
        />
      </div>
    </div>
  );
}
