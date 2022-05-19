import { Admin, createAdmin } from "../dtos/admin-dto";

export interface AdminRepository {
  create(admin: createAdmin): Promise<Admin>;
  findByEmail(email: string): Promise<Admin | null>;
  findByUsername(username: string): Promise<Admin | null>;
  findById(id: string): Promise<Admin | null>;
  update(adminId: string, isActive: boolean): Promise<void>;
  updatePassword(adminId: string, password: string): Promise<void>;
  saveToken(token: string, adminId: string): Promise<void>;
  findToken(token: string): Promise<any | null>;
}
