/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Utils
import { Config } from "@utils";

// Types
import type { PartialUser } from "@types";

// MIAB Class
class MIAB {
  private readonly base_url: string;
  private readonly username: string;
  private readonly password: string;

  constructor(
    base_url: string,
    username: string,
    password: string
  ) {
    this.base_url = base_url;
    this.username = username;
    this.password = password;
  }

  public getCount = async (): Promise<number> => {
    const body = await(await fetch(`${this.base_url}/mail/users?format=json`, {
      headers: {
        "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
      }
    })).json();

    const domain = body.filter(({ domain }: { domain: string }) => domain === Config.get<string>("miab", "domain"))[0];

    if(!domain)
      return 0;

    return domain.users.reduce((
      acc: number,
      curr: PartialUser
    ) => acc + (curr.box_count === "?" ? 0 : curr.box_count), 0);
  }
}

export default MIAB;