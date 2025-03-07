export interface FeaturedType {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  createdAt: string;
}

export interface FeaturedGridProps {
  featured: FeaturedType[];
}
