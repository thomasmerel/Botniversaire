const Command = require('./command');

module.exports = class Help extends Command {
    static match(message) {
        return message.content.startsWith(process.env.PREFIX + 'help');
    }

    static action(message) {
        message.channel.send('Voici les commandes qu vous pouvez utiliser :' + '\n' +
            '`--help` -> Affiche ce message.' + '\n' +
            '`--add [AAAA-MM-JJ]` -> Ajouter son anniversaire' + '\n' +
            '`--list` -> Affiche la liste des anniversaires' + '\n' +
            '`--delete` -> Supprime la date lié a son pseudo' + '\n' +
            '`--setDefault` -> Défini le channel où seront souhaité les anniversaires (Admin only)' + '\n' +
            '`--ping` -> Pong.'
        );
    }
};