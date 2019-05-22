const Command = require('./command');

module.exports = class Ping extends Command {
    static match(message) {
        return message.content.startsWith(process.env.PREFIX + 'sources');
    }

    static action(message) {
        message.channel.send(":beer: Voici les sources du bot : https://github.com/thomasmerel/Botniversaire");
    }
};