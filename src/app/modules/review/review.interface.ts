export interface ICreateReview {
  review: string;
  postId: string;
}

export interface IUpdateReviewStatus {
  id: string;
  review: string;
}

export interface IReviwStatus {
  id: string;
  status: "ACTIVE" | "INACTIVE" | "ONREVIEW" | "REJECTED";
}
