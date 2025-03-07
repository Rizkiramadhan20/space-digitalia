import { FieldValue } from "firebase-admin/firestore";

export interface ProjectData {
  downloads?: number;
  delivery?: number;
  downloadUrl?: string;
}

export interface TransactionData {
  projectId: string;
  deliveryMethod: "download" | "delivery";
}

export type FirestoreUpdateData = {
  [field: string]: number | FieldValue;
};
