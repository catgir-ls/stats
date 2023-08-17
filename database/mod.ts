/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>>
 */

// Dependencies
import { PostgresConnector, Database as DB } from "@deps";

// Models
import { Users, Images } from "@models";

// Types
import type { DatabaseOpts } from "@types";

// Database Class
class Database {
  public static db: DB | null = null;

  public static init = async (opts: DatabaseOpts): Promise<boolean> => {
    this.db = new DB(new PostgresConnector(opts));

    this.db.link([ Users, Images ]);

    try {
      await this.db.ping();

      return true;
    } catch {
      return false;
    }
  }
}

export default Database;