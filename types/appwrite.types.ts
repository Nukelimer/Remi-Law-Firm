import { Models } from "node-appwrite";
import { Gender, Status } from ".";

export interface Client extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  d_o_b: Date;
  gender: Gender;
  address: string;
  occupation: string;
  family_member_contact_name: string;
  family_member_contact_number: string;
  primary_counsel_or_lawyer: string;
  past_criminal_record: boolean | undefined;
  past_criminal_record_details: string | undefined;

  identification_document_url: string | undefined;
  identification_type: string | undefined;
  identification_number: string | undefined;
  identification_document: FormData | undefined;
  privacy_and_consent: boolean;
}

export interface Appointment extends Models.Document {
  client_collection: Client;
  schedule: Date;
  status: Status;
  primary_counsel_or_lawyer: string;
  reason: string;
  note: string;
  userId: string;
  cancellation_reason: string | null;
}

// CLIENT_COLLECTION
