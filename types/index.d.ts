/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "male" | "female" | "trans";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  d_o_b: Date;
  gender: Gender;
  address: string;
  occupation: string;
  family_member_contact_name: string;
  family_member_contact_number: string;
  primary_counsel_or_lawyer: string;
  past_criminal_record: boolean | undefined;
  past_criminal_record_details: string | undefined;
  identification_document_url?: string | undefined;
  identification_type: string | undefined;
  identification_number: string | undefined;
  identification_document: FormData | undefined;
  privacy_and_consent: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;
  CLIENT_COLLECTION_ID: string;
  primary_counsel_or_lawyer: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};
