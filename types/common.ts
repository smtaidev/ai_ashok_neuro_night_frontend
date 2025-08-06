export interface IActiveProps {
  isActive: boolean;
}

export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export interface IAdmin {
  id: string;
  userName: string;
  password: string;
  securityCode: number;
  adminImg: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBlog {
  id: string;
  blogTitle: string;
  blogContent: string;
  blogImg?: string;
  blogStatus: boolean;
  author: IAdmin;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: string;
  categoryTitle: string;
  categoryDescription: string;
  categoryImg?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IService {
  id: string;
  serviceTitle: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  category: ICategory;
  authorId: string;
  author: IAdmin;
}

export interface IWork {
  id: string;
  title: string;
  description: string;
  workImg?: string;
  author: IAdmin;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITeamMember {
  id: string;
  name: string;
  teamPersonImg?: string;
  designation: string;
  linkedin?: string;
  github?: string;
  email?: string;
  portfolio?: string;
  author: IAdmin;
  authorId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFounder {
  id: string;
  name: string;
  designation: string;
  founderPersonImg?: string;
  linkedin?: string;
  github?: string;
  email?: string;
  portfolio?: string;
  author: IAdmin;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEmailRecord {
  id: string;
  email: string;
  name: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEmailRecord {
  id: string;
  ip: string;
  browser_name?: string;
  createdAt: string;
  updatedAt: string;
}
