"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import RLLP_Forms from "./RLLP_Forms";
import RLLP_SubmitBtn from "./RLLP_SubmitBtn";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/client.action";
import { FormFieldType } from "./ClientForms";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import { Lawyers } from "@/constants";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.types";
import { Status } from "@/types";

function AppointmentForms({
  userId,
  clientId,
  type,
  appointment,
  setOpen,
}: {
  userId: string;
  clientId: string;
  type: "cancel" | "create" | "schedule";
  appointment?: Appointment;
  setOpen: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primary_counsel_or_lawyer: appointment
        ? appointment.primary_counsel_or_lawyer
        : "",
      reason: (appointment && appointment.reason) || "",
      note: appointment ? appointment.note : "",
      cancellation_reason:  appointment?.cancellation_reason || " ",
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
    },
  });

  let btnLabel;

  switch (type) {
    case "cancel":
      btnLabel = "Cancel Appointment";

      break;
    case "create":
      btnLabel = "Create Appointment";

      break;

    case "schedule":
      btnLabel = "Schedule Appointment";

      break;

    default:
      break;
  }
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    console.log({ type, clientId });

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";

        break;
      case "cancel":
        status = "cancelled";

        break;

      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && clientId) {
        // router.push(`/clients/${user.$id}/register`);
        const appointmentData = {
          userId,
          s_client_collection_id: clientId,
          primary_counsel_or_lawyer: values.primary_counsel_or_lawyer,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };

        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/clients/${userId}/new-appointment/success?appointment=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primary_counsel_or_lawyer: values.primary_counsel_or_lawyer,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellation_reason: values.cancellation_reason,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type != "create" ? undefined : (
          <section className="mb-12 space-y-4">
            <h1 className="header !text-2xl">New Appointment</h1>
            <p className="text-dark-700">
              Book your appointment with your favourite lawyers in less than 10
              seconds!
            </p>
          </section>
        )}
        {type !== "cancel" && (
          <>
            {/* <FormControl>
                


            </FormControl> */}

            <RLLP_Forms
              control={form.control}
              name="primary_counsel_or_lawyer"
              label="Choice Lawyer"
              placeholder="Pick Your Lawyer"
              fieldType={FormFieldType.SELECT}>
              {Lawyers?.map((lawyer) => (
                <SelectItem
                  className="!w-full"
                  value={lawyer.name}
                  key={lawyer.name + crypto.randomUUID()}>
                  <div className=" min-w-full w-fit">
                    <div className=" flex  cursor-pointer  items-center gap-2  rounded w-full ">
                      <Image
                        src={lawyer.image}
                        alt={lawyer.name}
                        priority
                        width={32}
                        height={32}
                        className="rounded-full h-9 w-9"
                      />{" "}
                      <div className="">
                        <p className="text-white">{lawyer.name}</p>
                        <p className="text-white text-xs font-thin">
                          {lawyer.area}
                        </p>
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </RLLP_Forms>

            <RLLP_Forms
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected Appointment Date and Time"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />

            <div className="flex flex-col gap-6  pt-6">
              <RLLP_Forms
                control={form.control}
                name="reason"
                label="Reason for Appointment? "
                placeholder="Enter your reason(s) for booking this appointment."
                fieldType={FormFieldType.TEXTAREA}
              />

              <RLLP_Forms
                control={form.control}
                name="note"
                placeholder="Enter any additional reason(s) for booking this appointment."
                label="Additional Note About this Appointment."
                fieldType={FormFieldType.TEXTAREA}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <RLLP_Forms
            control={form.control}
            name="cancellation_reason"
            placeholder="Enter your reason(s) for cancelling this appointment."
            label="Reason for Cancelling."
            fieldType={FormFieldType.TEXTAREA}
          />
        )}

        <RLLP_SubmitBtn
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}>
          {btnLabel}
        </RLLP_SubmitBtn>
      </form>
    </Form>
  );
}

export default AppointmentForms;
