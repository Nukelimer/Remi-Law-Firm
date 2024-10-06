"use server";

import { ID, Query } from "node-appwrite";
import {
  databases,
  DATABASE_ID,
  APPOINTMENT_COLLECTION_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { scheduler } from "timers/promises";
import { Appointment } from "@/types/appwrite.types";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  console.log({ appointment });
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      JSON.stringify(appointment)
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log("An error occurred while creating a new appointment:", error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing client:",
      error
    );
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    //
    const intitialCounts = {
      scheduleCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (accumulator, appointment) => {
        if (appointment.status === "scheduled") {
          accumulator.scheduleCount += 1;
        } else if (appointment.status === "pending") {
          accumulator.pendingCount += 1;
        } else if (appointment.status === "cancelled") {
          accumulator.cancelledCount += 1;
        }
        return accumulator;
      },
      intitialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the list of existing client:",
      error
    );
  }
};
