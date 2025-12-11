export interface IUserFilterRequest {
  searchTerm?: string | undefined;
}

export interface IUserStatus {
  status: "ACTIVE" | "BLOCKED" | "DELETED";
}
