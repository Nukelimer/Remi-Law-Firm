"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { encryptKey } from "@/lib/utils";

function PassKeyModal() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
//   console.log({ passkey });

    const validateHander = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault() 
        
        if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encriptedKey = encryptKey(passkey);
            console.log({ encriptedKey });
            localStorage.setItem('accessKey', encriptedKey)
            
        } else {
            setError('Invalid PassKey!')
        }
    }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification.
            <Image
              src=" /assets/icons/close.svg"
              alt=" close"
              className="cursor-pointer"
              width={20}
              height={20}
              onClick={() => {
                setOpen(false);
                router.push("/");
              }}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="w-full flex flex-col justify-center items-center m-4">
              To access the admin page, please enter the passkey.
              <div className="mt-6">
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={passkey}
                  onChange={(value) => {
                    setPasskey(value);
                  }}>
                  <InputOTPGroup className="shad-otp">
                    <InputOTPSlot index={0} className="shad-otp-slot" />
                    <InputOTPSlot index={1} className="shad-otp-slot" />
                    <InputOTPSlot index={2} className="shad-otp-slot" />
                    <InputOTPSlot index={3} className="shad-otp-slot" />
                    <InputOTPSlot index={4} className="shad-otp-slot" />
                    <InputOTPSlot index={5} className="shad-otp-slot" />
                  </InputOTPGroup>
                </InputOTP>

                {error && (
                  <p className="shad-error text-14-regular mt-4 flex justify-center">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                  <AlertDialogAction className="border bg-green-500" onClick={(e) => validateHander(e)}>Verify Pass Key</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PassKeyModal;
