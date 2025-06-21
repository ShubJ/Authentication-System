import { IUserRepository } from "../db/user.repository.interface";
import {
  UserProps,
  UserLoginProps,
  UserPropsWithId,
  UserRole,
} from "../domain/user.type";
import {
  hashPassword,
  comparePasswords as comparePassword,
} from "../../../utils/password.util";
import { signToken } from "../../../utils/jwt.util";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async register(input: UserProps) {
    // Hash password
    const hashedPassword = await hashPassword(input.password);

    // Create user object with all required fields
    const userToCreate = {
      email: input.email,
      name: input.name,
      password: hashedPassword,
      role: input.role || UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to database
    return this.userRepository.create(userToCreate);
  }

  async login(
    input: UserLoginProps
  ): Promise<{ error: string } | { token: string; user: UserPropsWithId }> {
    // Find user by email
    const repositoryUser = await this.userRepository.findByEmail(input.email);
    if (!repositoryUser) return { error: "Invalid email or password" };

    // Verify password
    const isValid = await comparePassword(
      input.password,
      repositoryUser.password
    );
    if (!isValid) return { error: "Invalid email or password" };

    // Generate token
    const token = signToken({
      userId: repositoryUser.id,
      role: repositoryUser.role,
    });

    return {
      token,
      user: repositoryUser,
    };
  }

  async findByEmail(email: string): Promise<UserPropsWithId | null> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<UserPropsWithId | null> {
    return this.userRepository.findById(id);
  }

  async findAll(): Promise<UserPropsWithId[]> {
    return this.userRepository.findAll();
  }
}
