const Command = require('./command');

module.exports = class Add extends Command {
    static match(message) {
        return message.content.startsWith(process.env.PREFIX + 'setDefault');
    }

    static action(message) {
        let author = message.author;
        let member = message.member;
        let perm = member.permissions.toArray();
        let indAdm = perm.indexOf("ADMINISTRATOR");

        if (indAdm === -1) {
            message.channel.send('Hey dit donc ' + author + ' ! Tu te crois tout permis ?!! :rage:',
                {files: ["https://media.giphy.com/media/jEDdKUXNgVQhW/giphy.gif"]});
            return false;
        }

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

                        if (obj.hasOwnProperty("default") === false) {
                            obj.default = new Object();
                        }

                        obj.default['channel'] = message.channel.id;

                        let json = JSON.stringify(obj);
                        fs.writeFileSync(file, json);

                        message.channel.send('Le channel par défaut a bien été mis a jour. :clap:');
                    }
                });
            } else {
                obj.default = new Object();

                obj.default['channel'] = message.channel.id;

                let json = JSON.stringify(obj);
                fs.writeFileSync(file, json);

                message.channel.send('Le channel par défaut a bien été mis a jour. :clap:');
            }
        });
    }
};