import { Timestamp } from "firebase/firestore";

export interface TestimonialProps {
  id: string;
  company: string;
  createdAt: Timestamp;
  imageUrl: string;
  message: string;
  name: string;
  role: string;
}

export interface TestimonialCardProps {
  testimonial: TestimonialProps;
  index: number;
  showAll: boolean;
  totalDisplayed: number;
}

export interface LoadMoreButtonProps {
  showAll: boolean;
  onClick: () => void;
}

export interface TestimonialCardBodyProps {
  testimonial: TestimonialProps;
}

export interface TestimonialCardHeaderProps {
  testimonial: TestimonialProps;
}