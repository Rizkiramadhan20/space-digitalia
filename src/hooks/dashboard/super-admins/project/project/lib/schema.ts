export interface LicenseDetail {
  title?: string;
  price?: number;
  downloadUrl?: string;
  deliveryType?: "download" | "delivery";
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  images: string[];
  slug: string;
  typeCategory: string;
  typeTitle: string;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
  content: string;
  author: {
    name: string;
    role: string;
    uid: string;
    photoURL?: string;
  };
  stock: number;
  sold: number;
  delivery: number;
  downloads: number;
  licenseTitle: string;
  licenseDetails: LicenseDetail[];
  linkPreview?: string;
  frameworks: {
    title: string;
    imageUrl: string;
  }[];
}

export interface ProjectType {
  id: string;
  title: string;
  category: string;
}

export interface LicenseProject {
  id: string;
  title: string;
}

export interface FormInputs {
  title: string;
  description: string;
  slug: string;
  typeCategory: string;
  typeTitle: string;
  status: string;
  content: string;
  stock: number;
  licenseTitle: string;
  licenseDetails: LicenseDetail[];
  linkPreview: string;
  frameworks: {
    title: string;
    imageUrl: string;
  }[];
}

export interface Framework {
  id: string;
  title: string;
  imageUrl: string;
}
