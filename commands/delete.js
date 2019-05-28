const Command = require('./command');

module.exports = class Delete extends Command {
    static match(message) {
        return message.content.startsWith(process.env.PREFIX + 'delete');
    }

    static action(message) {
        let bPerson = message.author;
        let server = message.guild;

        let path = process.env.SERVER_PATH;
        let file = path + '/' + server.id + '.json';

        let fs = require('fs');

        let obj = {};

        fs.exists(file, function (exists) {
            if (exists) {
                fs.readFile(file, function readFileCallback(err, data) {
                    if (err) {
                    } else {
                        obj = JSON.parse(data);

                        if (obj.bdays.hasOwnProperty(bPerson.id)) {

                            delete obj.bdays[bPerson.id];

                            let json = JSON.stringify(obj);
                            fs.writeFileSync(file, json);

                            message.reply("Ton anniversaire a bien été supprimé :sob:")
                                .then()
                                .catch();
                        } else {
                            message.reply("Tu n'existes pas, comment pourrais-tu être supprimé ?! :thinking:")
                                .then()
                                .catch();
                        }
                    }
                });
            }
        });
    }
};