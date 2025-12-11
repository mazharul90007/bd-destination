import { z } from "zod";
import { UserStatus } from "../../../../generated/prisma/enums";

const updateStatus = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
  }),
});
