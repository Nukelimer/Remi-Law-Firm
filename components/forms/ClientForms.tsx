"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import RLLP_Forms from "./RLLP_Forms";
import RLLP_SubmitBtn from "./RLLP_SubmitBtn";
import { useState } from "react";
import { RLLP_UserValidation } from "@/lib/RLLP_validation";
import { useRouter } from "next/navigation";
export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  PHONEINPUT = "phoneInput",
  TEXTAREA = "textarea",
  SELECT = "select",
  SKELETON = "skeleton",
  DATE_PICKER = "datePicker",
}

 function ClientForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router =  useRouter() 
  const form = useForm<z.infer<typeof RLLP_UserValidation>>({
    resolver: zodResolver(RLLP_UserValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

   function onSubmit({ name, email, phone }: z.infer<typeof RLLP_UserValidation>) {
    setIsLoading(true);

    try {
      // const userData = { name, email, phone };
      // const user = await createUser(userData)

      // if (user) {
      //   router.push(`/patients/${user.$id}/register`)
      // }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header !text-2xl">Welcome To Remi LLP</h1>
          <p className="text-dark-700">
            Book your appointment with your favourite lawyers!
          </p>
        </section>
        <RLLP_Forms
          control={form.control}
          name="Name"
          label="Name"
          placeholder="E.g Adekunle Rabi Chinasa"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          fieldType={FormFieldType.INPUT}
        />

        <RLLP_Forms
          control={form.control}
          name="Email"
          label="Email"
          placeholder="E.g Remi@lifework.live"
          iconSrc="/assets/icons/email.svg"
          iconAlt="user"
          fieldType={FormFieldType.INPUT}
        />

        <RLLP_Forms
          control={form.control}
          name="Phone"
          label="Phone"
          placeholder="E.g +(234)811-520-788"
          iconSrc="/assets/icons/email.svg"
          fieldType={FormFieldType.PHONEINPUT}
        />

        <RLLP_SubmitBtn isLoading={isLoading} className={""}>
          Submit
        </RLLP_SubmitBtn>
      </form>
    </Form>
  );
}

export default ClientForm;
