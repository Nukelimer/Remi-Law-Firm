"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import RLLP_Forms from "./RLLP_Forms";
import RLLP_SubmitBtn from "./RLLP_SubmitBtn";
import { useState } from "react";
import { ClientsFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser, registerUser } from "@/lib/actions/client.action";
import { FormFieldType } from "./ClientForms";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  ClientsFormDefaultValues,
  GenderOptions,
  IdentificationTypes,
  Lawyers,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import { blob } from "stream/consumers";

function RLLP_RegisterForm({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof ClientsFormValidation>>({
    resolver: zodResolver(ClientsFormValidation),
    defaultValues: {
      ...ClientsFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ClientsFormValidation>) {
    setIsLoading(true);
    let formData;

    if (
      values.identification_document &&
      values.identification_document.length > 0
    ) {
      const blobFile = new Blob([values.identification_document[0]], {
        type: values.identification_document[0].type,
      });
      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identification_document[0].name);
    }

    // try {
    //   const user = await createUser(userData);

    //   if (user) {
    //     router.push(`/clients/${user.$id}/register`);
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
    try {
      const clientData = {
        ...values,
        userId: user.$id,
        d_o_b: new Date(values.d_o_b),
        identification_document: formData,
      };
      // @ts-ignore
      const Client = await registerUser(clientData);
      if (Client) {
        router.push(`/clients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 ">
        <section className=" space-y-4">
          <h1 className="header !text-2xl">Welcome {"User Name"}.</h1>
          <p className="text-dark-700">Can we know you more?</p>
        </section>

        <section className=" space-y-6 pt-6">
          <div className="mb-9 space-y-1">
            <p className="  text-lg">Personal Information.</p>
          </div>
        </section>

        <RLLP_Forms
          control={form.control}
          name="name"
          label="Full Name"
          placeholder=" Adekunle Rabi Chinasa"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          fieldType={FormFieldType.INPUT}
        />
        <div className="flex flex-col gap-8 xl:flex-row">
          <RLLP_Forms
            control={form.control}
            name="email"
            label="Email"
            placeholder=" Remi@lifework.live"
            iconSrc="/assets/icons/email.svg"
            iconAlt="user"
            fieldType={FormFieldType.INPUT}
          />

          <RLLP_Forms
            control={form.control}
            name="phone"
            label="Phone"
            placeholder=" +(234)811-520-788"
            iconSrc="/assets/icons/email.svg"
            fieldType={FormFieldType.PHONEINPUT}
          />
        </div>

        <div className="flex flex-col gap-8">
          <RLLP_Forms
            control={form.control}
            name="d_o_b"
            label="Date Of Birth"
            placeholder=" 19-11-1920 || 19/11/1920"
            iconSrc="/assets/icons/email.svg"
            iconAlt="user"
            fieldType={FormFieldType.DATE_PICKER}
          />

          <RLLP_Forms
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className=" flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  {GenderOptions.map((opt) => (
                    <div key={opt} className="radio-group ">
                      <RadioGroupItem value={opt} id={opt} />
                      <Label
                        htmlFor={opt}
                        className="cursor-pointer  text-white">
                        {opt}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            iconSrc="/assets/icons/email.svg"
            fieldType={FormFieldType.SKELETON}
          />
        </div>

        <div className="flex flex-col gap-8 xl:flex-row">
          <RLLP_Forms
            control={form.control}
            name="address"
            label="Address"
            placeholder=" Ikeja Lagos"
            fieldType={FormFieldType.INPUT}
          />

          <RLLP_Forms
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder=" T-Pain, Trader, Activist"
            fieldType={FormFieldType.INPUT}
          />
        </div>
        <div className="flex flex-col gap-8 xl:flex-row">
          <RLLP_Forms
            control={form.control}
            label="Next-Of-Kin"
            name="family_member_contact_name"
            placeholder=" Itah Enor Oyibo"
            fieldType={FormFieldType.INPUT}
          />

          <RLLP_Forms
            control={form.control}
            name="family_member_contact_number"
            label="Next-Of-Kin Phone"
            placeholder=" +(234)811-520-788"
            iconSrc="/assets/icons/email.svg"
            fieldType={FormFieldType.PHONEINPUT}
          />
        </div>

        <section className=" space-y-6 pt-6">
          <div className="mb-9 space-y-1">
            <p className="  text-lg">Legal Information.</p>
          </div>
        </section>

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

        <div className="flex flex-col gap-8  pt-6">
          <RLLP_Forms
            control={form.control}
            name="past_criminal_record"
            label="Any Criminal  Record? "
            fieldType={FormFieldType.CHECKBOX}
          />

          <RLLP_Forms
            control={form.control}
            name="past_criminal_record_details"
            label="Past Criminal Record Details."
            fieldType={FormFieldType.TEXTAREA}
          />
        </div>

        {/* identification_document */}

        <section className=" space-y-6 pt-6">
          <div className="mb-9 space-y-1">
            <p className="  text-lg">Identification Document.</p>
          </div>
        </section>

        <div className="flex flex-col gap-8 ">
          <RLLP_Forms
            control={form.control}
            name="identification_type"
            label="I.D Type Document"
            placeholder="Select an ID type"
            fieldType={FormFieldType.SELECT}>
            {IdentificationTypes?.map((docs) => (
              <SelectItem
                className="!w-full"
                value={docs}
                key={docs + crypto.randomUUID()}>
                <div className=" min-w-full w-fit">
                  <div className=" flex  cursor-pointer  items-center gap-2  rounded w-full ">
                    <p className="text-white">{docs}</p>
                  </div>
                </div>
              </SelectItem>
            ))}
          </RLLP_Forms>

          <RLLP_Forms
            control={form.control}
            name="identification_number"
            label="Identification Number(If Any)."
            placeholder=" 34E493FFF"
            fieldType={FormFieldType.INPUT}
          />
          {/*    */}
          {/* <RLLP_Forms
            control={form.control}
            name="identification_document"
            label="Identification Document URL."
            placeholder="google.com/dgffggdsgss_33"
            fieldType={FormFieldType.INPUT}
          /> */}

          <RLLP_Forms
            control={form.control}
            name="identification_document_url"
            label="Identification URL(If Any)."
            placeholder=" 34E493FFF"
            fieldType={FormFieldType.INPUT}
          />
        </div>

        <RLLP_Forms
          control={form.control}
          name="identification_document"
          label="Upload ID Document."
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
          fieldType={FormFieldType.SKELETON}
        />

        <div className="flex flex-col gap-8 xl:flex-row">
          <RLLP_Forms
            control={form.control}
            name="privacy_and_consent"
            label="I consent to RLF Privacy Policies."
            fieldType={FormFieldType.CHECKBOX}
          />
        </div>

        <div className="flex flex-col gap-8 xl:flex-row"></div>

        <RLLP_SubmitBtn isLoading={isLoading} className={""}>
          Submit
        </RLLP_SubmitBtn>
      </form>
    </Form>
  );
}

export default RLLP_RegisterForm;
