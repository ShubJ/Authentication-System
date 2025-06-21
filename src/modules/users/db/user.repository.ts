import { UserModel } from "../../../models/user.model";
import { IUserRepository } from "./user.repository.interface";
import { UserProps, UserPropsWithId } from "../domain/user.type";
import { UserMapper } from "../user.mapper";

export class UserRepository implements IUserRepository {
  constructor(private readonly userMapper: UserMapper) {}

  async findByEmail(email: string): Promise<UserPropsWithId | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    return this.userMapper.toDomain(user);
  }

  async create(userData: UserProps): Promise<UserPropsWithId> {
    const user = await UserModel.create(userData);
    return this.userMapper.toDomain(user);
  }

  async findById(id: string): Promise<UserPropsWithId | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;
    return this.userMapper.toDomain(user);
  }

  async findAll(): Promise<UserPropsWithId[]> {
    const users = await UserModel.find();
    return users.map((user) => this.userMapper.toDomain(user));
  }
}
