import { Button } from "@/components/ui/button";
import { Lawyers } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function SuccessPage({
  searchParams,
  params: { userId },
}: SearchParamProps) {
  const appointmentId = (searchParams?.appointment as string) || "";
  const appointment = await getAppointment(appointmentId);

  const counsel_or_lawyer = Lawyers.find(
    (lawyer) => lawyer.name === appointment.primary_counsel_or_lawyer
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href={"/"}>
          <Image
            priority
            src="/assets/icons/logo-full_.png"
            alt="logo"
            width={10000}
            height={10000}
            className="m b-12 h-60 mx-auto w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            priority
            src="/assets/gifs/success.gif"
            alt="success"
            width={150}
            height={150}
            // className="mb-12 h-60 mx-auto w-fit"
          />
        </section>

        <div className="">
          <h2 className="heade r mb-6 max-w[600px] text-center">
            Your <span className="text-green-400">appointment request</span> has
            been successfully submitted.
          </h2>
          <p className="max-w[600px] text-center">
            We will get in touch shortly to confirm.
          </p>
        </div>

        <section className="request-details">
          <p>Requested appointment details:</p>

          {counsel_or_lawyer ? (
            <div className="">
              <div className="flex  flex-col items-center gap-3 ">
                <Image
                  src={counsel_or_lawyer?.image!}
                  className="rounded-full h-14 w-14 border"
                  alt={"lawyer"}
                  height={50}
                  width={50}
                />
                <p>{counsel_or_lawyer?.name} Esq.</p>
              </div>
              <div className="flex gap-2">
                <Image
                  src={"/assets/icons/calendar.svg"}
                  alt={"calendar"}
                  width={20}
                  height={20}
                />
                <p>{formatDateTime(appointment.schedule).dateTime}</p>
              </div>
            </div>
          ) : null}
        </section>

        <Button variant={"outline"} className="shad-primary-b" asChild>
          <Link href={`/clients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
        <p className="justify-items-end text-dark-600 xl:text-left">
          {" "}
          &copy; 2024 RLF
        </p>
      </div>
    </div>
  );
}

export default SuccessPage;
