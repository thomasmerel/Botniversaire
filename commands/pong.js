const Command = require('./command');

module.exports = class Ping extends Command {
    static match(message) {
        return message.content.startsWith(process.env.PREFIX + 'pong');
    }

    static action(message) {
        
        // Secret command.

        message.channel.send('Non.',
            {files: ["https://amp.businessinsider.com/images/58a7024e01fe580f018b5282-960-639.jpg"]});
    }
};