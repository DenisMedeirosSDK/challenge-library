import { Admin, createAdmin } from "../../dtos/admin-dto";
import { prisma } from "../../libs/prisma";
import { AdminRepository } from "../../repositories/admin-repository";

export class PrismaAdminRepository implements AdminRepository {
  async findToken(token: string): Promise<any> {
    return await prisma.tokenActive.findFirst({
      where: {
        token,
      },
    });
  }
  async update(adminId: string, isActive: boolean): Promise<void> {
    await prisma.user.update({
      where: {
        id: adminId,
      },
      data: {
        isActive,
      },
    });
  }
  async saveToken(token: string, adminId: string): Promise<void> {
    await prisma.tokenActive.create({
      data: {
        token,
        user: {
          connect: {
            id: adminId,
          },
        },
      },
    });
  }
  async create(admin: createAdmin): Promise<Admin> {
    const user = await prisma.user.create({
      data: {
        name: admin.name,
        username: admin.username,
        email: admin.email,
        password: admin.password,
        isAdmin: admin.isAdmin,
        isActive: admin.isActive,
      },
    });

    return user;
  }
  async findByEmail(email: string): Promise<Admin | null> {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
  async findByUsername(username: string): Promise<Admin | null> {
    return await prisma.user.findFirst({
      where: {
        username,
      },
    });
  }
}
