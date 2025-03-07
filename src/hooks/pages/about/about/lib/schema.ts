import { Timestamp } from "firebase/firestore";

export interface AboutType {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface AboutItemProps {
  item: AboutType;
  index: number;
}
