import { LockKeyhole } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RLLP_Image from "../_components/RLLP_Image";
import AppointmentForms from "@/components/forms/AppointmentForms";
import { getClient } from "@/lib/actions/client.action";

async function NewAppointment({ params: { userId } }: SearchParamProps) {
  const clientAppointment = await getClient(userId);
  return (
    <div className="text-white flex h-screen max-h-screen flex-row ">
      <section className="remove-scrollbar container my-auto h-screen">
        <div className="sub-container max-w-[495px] !pt-0">
          <Image
            priority
            src="/assets/icons/logo-full_.png"
            alt="logo"
            width={10000}
            height={10000}
            className="mb-12 h-40 mx-auto w-fit"
          />
          <AppointmentForms
            type="create"
            userId={userId}
            clientId={clientAppointment?.$id}
          />

          <div className="text-14-regular mt-6 flex justify-between ">
            <p className="justify-items-end text-dark-600 xl:text-left">
              {" "}
              &copy; 2024 RLF
            </p>

            <Link
              href={"/?admin=true"}
              className="text-green-500 gap-1 items-center hidden">
              <LockKeyhole /> Admin
            </Link>
          </div>
        </div>
      </section>

      {/* Container for the images with a smooth fade transition */}
      <RLLP_Image
        img1={"/assets/images/appointment_.png"}
        img2={"/assets/images/appointment.png"}
      />
    </div>
  );
}

export default NewAppointment;
