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
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
interface FormProps {
  control: Control<any>;
  // id: string; //Be Careful
  fieldType: FormFieldType;
  name: string;
  placeholder?: string;
  label?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  showTimeSelect?: boolean;
  dateFormat?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

type E164Number = string;

function RLLP_FormField({ field, props }: { field: any; props: FormProps }) {
  // const [value, setValue] = useState("");
  const {
    control,
    name,
    fieldType,
    label,
    iconAlt,
    renderSkeleton,
    dateFormat,
    iconSrc,
    placeholder,
    disabled,
    showTimeSelect,
  } = props;
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
              className="focus:border active:border active:border-l focus:border-l focus:rounded-l"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="gap-4 flex items-center">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">{props.label }</label>
          </div>
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea 
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl className="">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content ">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.PHONEINPUT:
      return (
        <div className="flex rounded-md  border-dark-500 bg-dark-400">
          <FormControl>
            <PhoneInput
              defaultCountry="NG"
              international
              withCountryCallingCode
              placeholder={placeholder}
              value={field.value as E164Number | undefined}
              onChange={field.onChange}
              className="input-phone w-full border-none focus:border active:border outline-none placeholder:text-white"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src={"/assets/icons/calendar.svg"}
            alt="calendar"
            height={24}
            width={24}
            className="ml-2 w-fit h-fit"
            id="calendar"
          />
          <FormControl>
            <DatePicker
              showTimeSelect={showTimeSelect ?? false}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    default:
      return null;
  }
}

function RLLP_Forms(prop: FormProps) {
  const { control, name, fieldType, label } = prop;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className=" flex-1 ">
          {prop.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label"> {label}</FormLabel>
          )}

          <RLLP_FormField field={field} props={prop} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}

export default RLLP_Forms;
