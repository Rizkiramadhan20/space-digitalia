export interface HomeType {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  description: string;
  button1: Button;
  button2: Button;
}

export interface Button {
  link: string;
  text: string;
}
