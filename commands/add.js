const Command = require('./command');
const moment = require('moment');

module.exports = class Add extends Command {
    static match(message) {
        return message.content.startsWith(process.env.PREFIX + 'add');
    }

    static action(message) {
        let bPerson = message.author;
        let server = message.guild;

        let args = message.content.split(' ');

        let dateFormat = process.env.DATE_FORMAT;

        if (moment(args[1], dateFormat, true).isValid()) {
            let bDate = moment(args[1], dateFormat);
            bDate.add(12, 'h');

            let potentialAge = moment().year() - bDate.year();
            if (potentialAge < 13) {
                message.reply("tu as " + potentialAge + " ans ? Qu'est-ce que tu branle là ? Rentre chez toi, " +
                    "ta mère t'a fait des gaufres. \n" +
                    "https://media.giphy.com/media/ac7MA7r5IMYda/giphy.gif")
                    .then()
                    .catch();
                return false;
            } else if (potentialAge > 90) {
                message.reply("Mmmh... :thinking: Tu as " + potentialAge + " ans ? T'es sûr de toi ? :older_man:" +
                    ":older_woman: \n" +
                    "ttps://media.giphy.com/media/BgBf6pW9qOgQU/giphy.gif")
                    .then()
                    .catch();
                return false;
            }

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
        } else {
            message.reply("C'est quoi cette date pourrie ? Tu ne connais plus ton anniversaire ? :face_palm:" +
                '\n' + "Pour rappel, le format c'est : `" + dateFormat + "`")
                .then()
                .catch();
            return false;
        }
    }
};