const Command = require('./command');

module.exports = class Ping extends Command {
    static match(message) {
        return message.content.startsWith(process.env.PREFIX + 'ping');
    }

    static action(message) {
        message.channel.send('Pong! :ping_pong:');
    }
};