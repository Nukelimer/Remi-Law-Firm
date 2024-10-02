import RLLP_RegisterForm from "@/components/forms/RLLP_RegisterForm";
import { getUser } from "@/lib/actions/client.action";
import { LockKeyhole } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import RLLP_Image from "../_components/RLLP_Image";

async function Register({ params: { userId } }: SearchParamProps) {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen w-full">
      <div className="text-white flex h-full w-full flex-row">
        <section className="remove-scrollbar container flex flex-col my-auto max-h-screen overflow-y-auto">
          <div className="sub-container max-w-[495px] mx-auto px-4  ">
            <Image
              priority
              src="/assets/icons/logo-full_.png"
              alt="logo"
              width={10000}
              height={10000}
              className="mb-12 h-52 mx-auto w-fit"
            />
            <RLLP_RegisterForm user={user} />

            <div className="text-14-regular mt-6 flex justify-between">
              <p className="justify-items-end text-dark-600 xl:text-left">
                &copy; 2024 RLF
              </p>

              <Link
                href={"/?admin=true"}
                className="text-green-500 hidden  gap-1 items-center">
                <LockKeyhole /> Admin
              </Link>
            </div>
          </div>
        </section>

        {/* Container for the images with a smooth fade transition */}
        <RLLP_Image
          img1={"/assets/images/onboarding-img.png"}
          img2={"/assets/images/onboarding-img_.png"}
        />
      </div>
    </div>
  );
}

export default Register;
