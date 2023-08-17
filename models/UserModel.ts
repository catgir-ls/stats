/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Dependencies
import { Model, DataTypes } from "@deps";

// User Class
class User extends Model {
  static table = "users";

  static fields = {
    id: { types: DataTypes.UUID, primaryKey: true },
    uid: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    permissions: DataTypes.INTEGER
  }
}

export default User;