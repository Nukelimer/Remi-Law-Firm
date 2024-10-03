"use server";

import { ID } from "node-appwrite";
import {
  databases,
  DATABASE_ID,
  APPOINTMENT_COLLECTION_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";

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
