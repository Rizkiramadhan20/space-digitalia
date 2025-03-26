export interface CompanyType {
  id: string;
  imageUrl: string;
  createdAt: string;
}

export interface CompanyGridProps {
  companies: CompanyType[]
}
