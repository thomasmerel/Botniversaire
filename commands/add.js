const Command = require('./command');

module.exports = class Add extends Command {
    static match(message) {
        return message.content.startsWith(process.env.PREFIX + 'add');
    }

    static action(message) {
        let bPerson = message.author;
        let server = message.guild;

        let args = message.content.split(' ');

        let dateReg = /^\d{4}([./-])\d{2}\1\d{2}$/;

        if (args[1].match(dateReg) === null) {
            message.reply("Date non-valide... Tu ne sais plus écrire une date ? :face_palm:" + '\n' +
                "Pour rappel, le format c'est : `AAAA/MM/JJ`")
                .then()
                .catch();

            return false;
        }

        let bDate = new Date(args[1]);

        let path = './anniversaries';
        let file = path + '/' + server.id + '.json';

        let fs = require('fs');

        let obj = {};

        fs.exists(file, function (exists) {
            if (exists) {
                fs.readFile(file, function readFileCallback(err, data) {
                    if (err) {
                    } else {
                        obj = JSON.parse(data);

                        if (obj.hasOwnProperty("bdays")) {
                            if (obj.bdays.hasOwnProperty(bPerson.id)) {
                                message.reply("ton anniversaire a bien été mis a jour.")
                                    .then()
                                    .catch();
                            } else {
                                message.reply("ton anniversaire a bien été ajouté.")
                                    .then()
                                    .catch();
                            }

                        } else {
                            obj.bdays = new Object();

                            message.reply("ton anniversaire a bien été ajouté (félicitation tu es le premier. :clap:).")
                                .then()
                                .catch();
                        }

                        obj.bdays[bPerson.id] = bDate;

                        let json = JSON.stringify(obj);
                        fs.writeFileSync(file, json);
                    }
                });
            } else {
                obj.bdays = new Object();

                obj.bdays[bPerson.id] = bDate;

                let json = JSON.stringify(obj);
                fs.writeFileSync(file, json);

                message.reply("ton anniversaire a bien été ajouté (félicitation tu es le premier. :clap:).")
                    .then()
                    .catch();
            }
        });
    }
};