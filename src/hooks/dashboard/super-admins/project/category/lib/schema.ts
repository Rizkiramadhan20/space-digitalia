import { Timestamp } from "firebase/firestore";

export interface CategoryContent {
  id?: string;
  title: string;
  createdAt?: Timestamp;
}
