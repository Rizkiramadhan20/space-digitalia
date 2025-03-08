export interface ServiceType {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  description: string;
  profile: {
    image: string;
    title: string;
    text: string;
  };
  createdAt: string;
}

export interface ServiceItemProps {
  item: ServiceType;
  index: number;
}

export interface ServicePathsProps {
  serviceLength: number;
  visibleSections: number[];
}
