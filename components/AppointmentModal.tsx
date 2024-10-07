"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import AppointmentForms from "./forms/AppointmentForms";
import { Appointment } from "@/types/appwrite.types";
function AppointmentModal({
  type,
  clientId,
  userId,
  appointment,
}: {
  type: "cancel" | "schedule";
  clientId: string;
  userId: string;
  appointment?: Appointment;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className={`capitalize ${type === "schedule" && "text-green-500"}`}>
            {type}
          </Button>
        </DialogTrigger>
        <DialogContent className="shaa-dialog sm:max-w-md bg-black">
          <DialogHeader className="mb-4 space-y-3">
            <DialogTitle className="capitalize">
              {type} Appointment?
            </DialogTitle>
            <DialogDescription>
              Fill in the following details to {type} an appointment.
            </DialogDescription>
          </DialogHeader>

                  <AppointmentForms userId={ userId} clientId={clientId} type={type} setOpen={setOpen} appointment={appointment} /> 
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AppointmentModal;
