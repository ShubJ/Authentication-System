import { UserProps, UserPropsWithId } from "../domain/user.type";

export interface IUserRepository {
  findByEmail(email: string): Promise<UserPropsWithId | null>;
  create(user: UserProps): Promise<UserPropsWithId>;
  findById(id: string): Promise<UserPropsWithId | null>;
  findAll(): Promise<UserPropsWithId[]>;
}
