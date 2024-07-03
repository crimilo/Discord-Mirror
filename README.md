# Discord Mirror
Make your account behave like a bot and mirror messages from a server to another (through webhooks).

# Showcase

> Original message (from server A):\
![](https://i.imgur.com/ogelJ23.png)\
Mirrored message (to server B):\
![](https://i.imgur.com/C42OT64.png)

# Main Features

- Replace mentions and other content before mirroring a message.
- Disguise mirrored messages as the original author or use a custom webhook profile.
- Allow mirroring categories, forums, threads and regular channels.
- Allow mirroring only messages containing specific keywords.
- Prevent specific users and roles from being mirrored.
- Support mirroring as many channels as you want to as many webhooks as you want.

# How To Use
1. Install [NodeJS](https://nodejs.org/en/download).
2. Clone this repository.
3. Enter to the repository folder.
4. Run `npm install` to install the dependencies.
5. Run `npm run build` to compile the bot.
6. Configure `config.yml`.
7. Run `npm start` to start the bot.

# Configuration guide
Each option in `config.yml` has a comment above describing it:
```yml
# ─────────────────────────────────────────────────────────────────────────────────────────────────────── #
# Token of the personal Discord account that will mirror messages.                                        #
# Learn how to find your account token here: https://www.androidauthority.com/get-discord-token-3149920/  #
token: "insert_your_token_here"                                                                           #
# ─────────────────────────────────────────────────────────────────────────────────────────────────────── #

# ─────────────────────────────────────────────────────────────────────────────────────────────────────── #
# Status of the account that will mirror messages.                                                        #
# Available options: "online", "invisible", "idle", "dnd".                                                #
# NOTE: You must be logged out for this option to take effect.                                            #
status: "online"                                                                                          #
# ─────────────────────────────────────────────────────────────────────────────────────────────────────── #

# ─────────────────────────────────────────────────────────────────────────────────────────────────────── #
# Message sent in the console when a message is mirrored.                                                 #
# You can set this to "" to disable it.                                                                   #
logMessage: "[%date%] Mirrored @%author%'s message from %server% #%channel%."                             #
# ─────────────────────────────────────────────────────────────────────────────────────────────────────── #

mirrors:
   1:
      # ───────────────────────────────────────────────────────────────────────────────────────────────── #
      # Channel IDs to mirror.                                                                            #
      # You can find the ID of a channel by enabling the Developer mode in your                           #
      # Discord account settings, then Right-Click -> Copy ID on a channel.                               #
      # NOTE: You can also mirror categories and forums.                                                  #
      channelIds:                                                                                         #
         - "insert_channel_id_to_mirror_here"                                                             #
      # ───────────────────────────────────────────────────────────────────────────────────────────────── #

      # ───────────────────────────────────────────────────────────────────────────────────────────────── #
      # Webhooks are used to send mirrored messages to specific channels.                                 #
      # You can create a webhook for a channel with:                                                      #
      # Edit channel -> Integrations -> Webhooks -> New webook.                                           #
      webhookUrls:                                                                                        #
         - "insert_destination_webhook_url_here"                                                          #
      # ───────────────────────────────────────────────────────────────────────────────────────────────── #

      # ───────────────────────────────────────────────────────────────────────────────────────────────── #
      # Requirements that a message must meet to be mirrored.                                             #
      requirements:                                                                                       #
         minEmbedsCount: 0                                                                                #
         minContentLength: 0                                                                              #
         minAttachmentsCount: 0                                                                           #
      # ───────────────────────────────────────────────────────────────────────────────────────────────── #

      # ───────────────────────────────────────────────────────────────────────────────────────────────── #
      # Options that define how messages are mirrored.                                                    #
      options:                                                                                            #
         useWebhookProfile: false # Whether to use the custom webhook profile.                            #
         removeAttachments: false # Whether to remove attachments before mirroring.                       #
         mirrorMessagesFromBots: true # Whether to mirror messages coming from bots.                      #
         mirrorReplyMessages: true # Whether to mirror messages that are replies to other messages.       #
         mirrorMessagesOnEdit: false # Whether to mirror messages when they are edited.                   #
      # ───────────────────────────────────────────────────────────────────────────────────────────────── #

      # ───────────────────────────────────────────────────────────────────────────────────────────────── #
      # Replacements to perform before mirroring a message.                                               #
      #                                                                                                   #
      # The where: option is used to specify which part of a message should be replaced.                  #
      # Available options:                                                                                #
      # "everywhere", "message_content", "embed_author", "embed_author_url", "embed_author_icon_url",     #
      # "embed_title", "embed_description", "embed_url", "embed_field_name", "embed_field_value",         #
      # "embed_image_url", "embed_thumbnail_url", "embed_footer", "embed_footer_icon_url", "embed_color". #
      replacements:                                                                                       #
         1:                                                                                               #
            replace: "insert_text_to_replace_here"                                                        #
            with: "insert_replaced_text_here"                                                             #
            where: "everywhere"                                                                           #
      # To replace mentions of @roles, @users or #channels, you have to replace their IDs. For example:   #
      #  2:                                                                                               #
      #     replace: "insert_role_id_to_replace_here"                                                     #
      #     with: "insert_replaced_role_id_here"                                                          #
      #     where: "everywhere"                                                                           #
      # To replace everything with a specific text, you can use the wildcard (*). For example:            #
      #  3:                                                                                               #
      #     replace: "*"                                                                                  #
      #     with: "this_text_will_replace_everything"                                                     #
      #     where: "everywhere"                                                                           #
      # ───────────────────────────────────────────────────────────────────────────────────────────────── #

      # ───────────────────────────────────────────────────────────────────────────────────────────────── #
      # Filters allows you to only mirror messages that meet certain criteria.                            #
      #                                                                                                   #
      # The type: option is used to specify the type of filter. Available options:                        #
      # - "whitelist": only mirror messages that contain at least one of the keywords.                    #
      # - "blacklist": only mirror messages that do not contain any of the keywords.                      #
      #                                                                                                   #
      # The where: option is used to specify where the filter should be applied.                          #
      # Available options: "message", "post_tag", "username", "guild_nickname", "user_roles".             #
      #                                                                                                   #
      # NOTE: Filters are applied in the order they are defined. If a message                             #
      # matches a filter, it will not be checked against the others below.                                #
      filters:                                                                                            #
         1:                                                                                               #
            type: "blacklist"                                                                             #
            keywords:                                                                                     #
               - "insert_keyword_here"                                                                    #
            where: "message"                                                                              #
      # For example, to only mirror messages from the user "crimilo", you can use:                        #
      #  1:                                                                                               #
      #     type: "whitelist"                                                                             #
      #     keywords:                                                                                     #
      #        - "crimilo"                                                                                #
      #     where: "username"                                                                             #
      # ───────────────────────────────────────────────────────────────────────────────────────────────── #
   2:
      # ───────────────────────────────────────────────────────────────────────────────────────────────── #
      # You can add more mirrors by copying the structure of the first one. For example:                  #
      channelIds:                                                                                         #
         - "insert_channel_id_to_mirror_here"                                                             #
      webhookUrls:                                                                                        #
         - "insert_destination_webhook_url_here"                                                          #
      # ───────────────────────────────────────────────────────────────────────────────────────────────── #
```

# Disclaimer

Note that using a Discord self bot is against the Discord TOS, and i take no responsibility for any consequences that may arise from using it.
