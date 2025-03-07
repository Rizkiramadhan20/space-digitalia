import { Timestamp } from "firebase/firestore";

export interface LicenceContent {
  id?: string;
  title: string;
  createdAt?: Timestamp;
}
