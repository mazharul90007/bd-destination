import { email, z } from "zod";
import { UserStatus } from "../../../../generated/prisma/enums";

const updateStatus = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
  }),
});

const updateUser = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const userValidation = {
  updateStatus,
  updateUser,
};
