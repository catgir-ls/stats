/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Utils
import { Config, Logger, MIAB } from "@utils"

// Models
import { Users, Images } from "@models";

// Data
import Database from "@database";
import Redis from "@redis";

// Types
import type { DatabaseOpts, RedisConnectOptions } from "@types";

// Config
const config = Deno.env.get("CONFIG") ?? (
  Deno.env.get("ENVIRONMENT") === "development"
    ? "config.dev.toml"
    : "config.toml"
);

await Config.load(config);

Logger.log(`Loaded ${Object.keys(Config.get()).length} item(s) into the config!`);

// Database
if(!await Database.init(Config.get<DatabaseOpts>("postgres"))) {
  Logger.error("Unable to connect to the PostgreSQL database - please check credentials!");

  Deno.exit();
}

Logger.log("Succesfully connected to PostgreSQL!");

// Redis
if(!await Redis.init(Config.get<RedisConnectOptions>("redis"))) {
  Logger.error("Unable to connect to the Redis instance - please check credentials!");

  Deno.exit();
}

Logger.log("Succesfully connected to Redis!");

// Variables
const miab = new MIAB(
  Config.get<string>("miab", "base_url"),
  Config.get<string>("miab", "username"),
  Config.get<string>("miab", "password")
);

if(await Redis.set("statistics", JSON.stringify({
  users: await Users.count(),
  images: await Images.count(),
  emails: await miab.getCount()
})) !== "OK") {
  Logger.error("Unable to cache statistics - Redis returned non-OK response!");

  Deno.exit();
}

Logger.log("Succesfully cached statistics!");

Deno.exit();