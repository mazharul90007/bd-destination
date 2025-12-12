import { UserRole } from "../../generated/prisma/enums";
import { prisma } from "./prisma";
import * as bcrypt from "bcrypt";

export const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });

    if (isExistSuperAdmin) {
      console.log("Super admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash("superadmin", 10);

    const superAdminData = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "superadmin@gmail.com",
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    console.log("Super Admin created Successfully", superAdminData);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
