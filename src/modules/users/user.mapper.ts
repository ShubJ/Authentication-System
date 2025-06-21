import { IUser } from "../../models/user.model";
import { UserPropsWithId } from "./domain/user.type";
import { ObjectId } from "mongodb";

export class UserMapper {
  toDomain(persistence: IUser): UserPropsWithId {
    return {
      id: (persistence._id as ObjectId).toString(),
      email: persistence.email,
      name: persistence.name,
      role: persistence.role,
      password: persistence.password,
      createdAt: persistence.createdAt,
      updatedAt: persistence.updatedAt,
    };
  }

  toResponse(domain: UserPropsWithId) {
    return {
      id: domain.id,
      email: domain.email,
      name: domain.name,
    };
  }
}
