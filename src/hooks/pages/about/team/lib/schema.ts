import { Timestamp } from "firebase/firestore";

export interface TeamType {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface TeamMemberProps {
  member: TeamType;
  index: number;
}
