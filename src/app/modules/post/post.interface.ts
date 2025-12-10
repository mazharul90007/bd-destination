export interface IPostDescriptionItem {
  heading: string;
  details: string;
}
export interface Ipost {
  title: string;
  photoUrl?: string;
  photoUrlPublicId: string;
  videoUrl?: string;
  description?: IPostDescriptionItem[];
  division: string;
  district: string;
  postOffice: string;
  postCode: string;
}

export interface IPostFilterRequest {
  searchTerm?: string | undefined;
}
