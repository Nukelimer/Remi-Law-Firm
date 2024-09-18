"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./ClientForms";
import Image from "next/image";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";

interface FormProps {
  control: Control<any>;
  id?: string; //Be Careful
  fieldType: FormFieldType;
  name: string;
  placeholder?: string;
  label?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  showTimeSelect?: boolean;
  dateFormat?: string;
  children?: (field: any) => React.ReactNode;
}

type E164Number = string;

function RLLP_FormField({ field, prop }: { field: any; prop: FormProps }) {
  const [value, setValue] = useState();
  const {
    control,
    name,
    fieldType,
    label,
    iconAlt,
    id,
    dateFormat,
    iconSrc,
    placeholder,
    disabled,
    showTimeSelect,
  } = prop;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md  border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              alt={iconAlt || "Input Icon"}
              src={iconSrc}
              className="mx-2 w-auto h-auto"
              height={20}
              width={20}
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="focus:border active:border active:border-l-0 focus:border-l-0 focus:rounded-l-none"
            />
          </FormControl>
        </div>
      );

      break;

    case FormFieldType.PHONEINPUT:
      return (
        <div className="flex rounded-md  border-dark-500 bg-dark-400">
          <FormControl>
            <PhoneInput
              defaultCountry="NG"
              international
              withCountryCallingCode
              placeholder={placeholder}
              value={field.value as E164Number | string}
              onChange={field.onChange}
              className='input-phone w-full border-none focus:border active:border outline-none placeholder:text-white'
             
            />
          </FormControl>
        </div>
      );

    default:
      break;
  }
}

function RLLP_Forms(prop: FormProps) {
  const {
    control,
    name,
    fieldType,
    label,
    id,
    iconAlt,
    dateFormat,
    iconSrc,
    placeholder,
    disabled,
    showTimeSelect,
  } = prop;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className=" flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel> {label}</FormLabel>
          )}

          <RLLP_FormField field={field} prop={prop} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}

export default RLLP_Forms;
