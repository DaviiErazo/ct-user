import { MongoRepository } from "../../../Shared/infrastructure/Persistence/mongo/MongoRepository";
import { User } from "../../domain/User";
import { UserAlreadyExists } from "../../domain/UserAlreadyExists";
import { UserNotFound } from "../../domain/UserNotFound";
import { UserRepository } from "../../domain/UserRepository";

export class MongoUserRepository extends MongoRepository implements UserRepository {
  public async save(user: User): Promise<void> {
    const userId: string = user.id.toString();

    const collection = await this.collection();

    const document = { ...user.toPrimitives(), _id: userId, id: undefined };

    await collection.updateOne({ _id: userId }, { $set: document }, { upsert: true });
  }

  public async exists(email: string): Promise<void> {
    const collection = await this.collection();
    const user = await collection.findOne({ email: email });
    if (user) {
      throw new UserAlreadyExists(email);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const collection = await this.collection();
    const user = await collection.findOne({ email: email });

    if (!user) {
      throw new UserNotFound(email);
    }
    const userMapped = User.fromPrimitives(user);
    return userMapped;
  }

  protected moduleName(): string {
    return "users";
  }
}
