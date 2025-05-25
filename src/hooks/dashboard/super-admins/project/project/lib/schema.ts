export interface LicenseDetail {
  title?: string;
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
  statusProject: "development" | "finished";
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
  linkPreview: string;
  frameworks: {
    title: string;
    imageUrl: string;
  }[];
  statusProject: "development" | "finished";
}

export interface Framework {
  id: string;
  title: string;
  imageUrl: string;
}
