# Botniversaire

Install the bot :
```sh
$ git clone git@github.com:thomasmerel/Botniversaire.git
$ npm install
```

Launch the bot :
```sh
$ node index.js
```


ENV settings :
- `TOKEN` : Discord bot token.
- `PREFIX` : Command prefix.
- `SERVER_PATH` : Path where the .json files are located.
- `DATE_FORMAT` : Date format the users have to respect. It's like the law but way cooler.

Dependencies :
- [NodeJS](https://nodejs.org/en/)
- [Discord.js](https://www.npmjs.com/package/discord)
- [Cron](https://www.npmjs.com/package/cron)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Moment](https://www.npmjs.com/package/moment)

# Commands
| Command | Action |
| ------ | ------ |
| --help | Show help |
| --add [DATE_FORMAT] | Add birthday |
| --delete | Delete user's birthday |
| --setDefault | Set default channel where birthday are wished (Admin only) |
| --source | Give bot's Github |
| --ping | Pong. |

# ToDo

- Log file : Record all the actions done by the bot.

# Invite this bot to your server

[Invite](https://discordapp.com/api/oauth2/authorize?client_id=579998659161227285&scope=bot&permissions=518145)

# Licence

This project is on Beer-Ware licence :

>  "THE BEER-WARE LICENSE" (Revision 42):
>  <thomas.merel.44@gmail.com> wrote this project.  As long as you retain this
>  notice you can do whatever you want with this stuff. If we meet some day,
>  and you think this stuff is worth it, you can buy me a beer in return.
>
>  Poul-Henning Kamp

# Links

[Twitter](https://twitter.com/Vulture___) | [Website](https://thomas-merel.fr) | [Github](https://github.com/thomasmerel)