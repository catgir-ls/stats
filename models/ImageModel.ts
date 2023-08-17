/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Dependencies
import { Model, DataTypes } from "@deps";

// Image Class
class Image extends Model {
  static table = "images"

  static fields = {
    id: { types: DataTypes.UUID, primaryKey: true },
    filename: DataTypes.STRING,
    uploaded_by: DataTypes.UUID,
    uploaded_at: DataTypes.TIMESTAMP
  }
}

export default Image;