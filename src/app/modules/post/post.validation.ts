import { z } from "zod";
const descriptionItemSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  details: z.string().min(1, "Details is required"),
});
const createPost = z.object({
  title: z.string().nonempty("Title is required"),
  videoUrl: z.string().optional(),
  description: z.array(descriptionItemSchema).optional(),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  postOffice: z.string().min(1, "PostOffice is required"),
  postCode: z.string().min(1, "PostCode is required"),
});

const updatePost = z.object({
  title: z.string().optional(),
  videoUrl: z.string().optional(),
  description: z.array(descriptionItemSchema).optional(),
  division: z.string().optional(),
  district: z.string().optional(),
  postOffice: z.string().optional(),
  postCode: z.string().optional(),
});

export const postValidation = {
  createPost,
  updatePost,
};
