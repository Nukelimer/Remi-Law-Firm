"use server";
// ADDING A "USE SERVER" DECLARATION STATEMENT AT THE TOP MADE THE ACCOUNT CREATION FUNCTION TRIGGER ON SUBMISSION OF THE FORM.

import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  CLIENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
import { CreateUserParams, RegisterUserParams } from "@/types";
export const createUser = async (user: CreateUserParams) => {
  try {
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    // console.log({ newuser });
    return parseStringify(newuser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);
      return existingUser.users[0];
    }

    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async ({
  identification_document,
  ...client
}: RegisterUserParams) => {
  try {
    let file;

    if (identification_document) {
      const inputFile = InputFile.fromBuffer(
        identification_document?.get("blobFile") as Blob,
        identification_document?.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // console.log({
    //   identificationDocumentId: file?.$id ? file.$id : null,
    //   identification_document_link: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
    //   ...Client,
    // });

    const newClient = await databases.createDocument(
      DATABASE_ID!,
      CLIENT_COLLECTION_ID!,
      ID.unique(),

      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identification_document_link: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...client,
      }
    );
    return parseStringify(newClient);
  } catch (error) {
    console.log(error);
  }
};

export const getClient = async (userId: string) => {
  try {
    const clients = await databases.listDocuments(
      DATABASE_ID!,
      CLIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    return parseStringify(clients.documents[0]);
  } catch (error) {
    console.log(error);
  }
};
