import { Timestamp } from "firebase/firestore";

export interface StatusProjectContent {
  id?: string;
  title: string;
  createdAt?: Timestamp;
}
