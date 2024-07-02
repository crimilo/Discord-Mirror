import { Message, MessageEmbed, ThreadChannel } from "discord.js-selfbot-v13";
import { getParentChannel } from "./utils";

enum FilterType {
  WHITELIST = "whitelist",
  BLACKLIST = "blacklist",
}

enum FilterLocation {
  MESSAGE = "message",
  POST_TAG = "post_tag",
  USERNAME = "username",
  GUILD_NICKNAME = "guild_nickname",
  USER_ROLES = "user_roles",
}

export interface FilterConfig {
  type: FilterType;
  keywords: string[];
  where: FilterLocation;
}

class Filter {
  private type: FilterType;
  private location: FilterLocation;
  private keywords: string[];

  public constructor({ type, keywords, where }: FilterConfig) {
    if (!Object.values(FilterType).includes(type)) {
      throw new Error(`Invalid filter type: ${type}`);
    }
    if (!Object.values(FilterLocation).includes(where)) {
      throw new Error(`Invalid filter location: ${where}`);
    }
    this.type = type;
    this.location = where;
    this.keywords = keywords.map((keyword) => keyword.toLowerCase());
  }

  public match(message: Message): boolean {
    switch (this.location) {
      case FilterLocation.MESSAGE:
        return this.messageMatches(message);
      case FilterLocation.POST_TAG:
        return this.postTagMatches(message);
      case FilterLocation.USERNAME:
        return this.usernameMatches(message);
      case FilterLocation.GUILD_NICKNAME:
        return this.nicknameMatches(message);
      case FilterLocation.USER_ROLES:
        return this.userRolesMatch(message);
      default:
        return true;
    }
  }

  private messageMatches(message: Message): boolean {
    return this.contentMatches(message) || this.embedsMatch(message);
  }

  private contentMatches(message: Message): boolean {
    const content = message.content.toLowerCase();
    return this.stringMatches(content);
  }

  private embedsMatch(message: Message): boolean {
    return (
      message.embeds.length > 0 &&
      message.embeds.every((embed) => this.embedMatches(embed))
    );
  }

  private embedMatches(embed: MessageEmbed): boolean {
    const fullEmbed = [
      embed.title,
      embed.description,
      embed.fields.map((field) => field.name + field.value).join(""),
      embed.footer?.text,
      embed.author?.name,
    ]
      .join("")
      .toLowerCase();

    return this.stringMatches(fullEmbed);
  }

  private postTagMatches(message: Message): boolean {
    const parent = getParentChannel(message);
    if (!parent) {
      return true;
    }
    if (parent.type !== "GUILD_FORUM") {
      return true;
    }

    const channel = message.channel as ThreadChannel;
    const tags = parent.availableTags
      .filter((tag) => channel.appliedTags.includes(tag.id))
      .map((tag) => tag.name.toLowerCase())
      .join("");

    return this.stringMatches(tags);
  }

  private usernameMatches(message: Message): boolean {
    const username = message.author.username.toLowerCase();
    return this.stringMatches(username);
  }

  private nicknameMatches(message: Message): boolean {
    if (!message.member) {
      return false;
    }
    const nickname = message.member.displayName.toLowerCase();
    return this.stringMatches(nickname);
  }

  private userRolesMatch(message: Message): boolean {
    if (!message.member) {
      return false;
    }
    const roles = message.member.roles.cache
      .map((role) => role.name.toLowerCase())
      .join("");

    return this.stringMatches(roles);
  }

  private stringMatches(content: string): boolean {
    return this.type == FilterType.WHITELIST
      ? this.keywords.some((keyword) => content.includes(keyword))
      : !this.keywords.some((keyword) => content.includes(keyword));
  }
}

export class MirrorFilters {
  private filters: Filter[] = [];

  public constructor(filtersConfig: Record<number, FilterConfig>) {
    this.filters = Object.values(filtersConfig).map(
      (config) => new Filter(config)
    );
  }

  public match(message: Message): boolean {
    return !this.filters.length || this.filters.some((filter) => filter.match(message));
  }
}
