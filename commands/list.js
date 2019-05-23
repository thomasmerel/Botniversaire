const Command = require('./command');

module.exports = class List extends Command {
    static match(message, bot) {
        return message.content.startsWith(process.env.PREFIX + 'list');
    }

    static action(message, bot) {
        let server = message.guild;
        let author = message.author;
        let member = message.member;
        let perm = member.permissions.toArray();
        let indAdm = perm.indexOf("ADMINISTRATOR");

        if (indAdm === -1) {
            message.channel.send('Hey ' + author + ' ! Cette commande est réservé aux admins !',
                {files: ["https://media.tenor.com/images/538487d51bfcb883ed86c8ecbc1aec73/tenor.gif"]});
            return false;
        }

        let path = './anniversaries';
        let file = path + '/' + server.id + '.json';

        let fs = require('fs');

        let obj = {};

        fs.exists(file, function (exists) {
            if (exists) {
                fs.readFile(file, function readFileCallback(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        obj = JSON.parse(data);

                        let list = [];

                        for (let key in obj.bdays) {

                            let bdate = new Date(obj.bdays[key]);
                            let guild = message.guild;
                            let user = guild.members.find(val => val.id === key);
                            console.log(user.tag);

                            let month = [
                                "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet",
                                "Aout", "Septembre", "Octobre", "Novembre", "Décembre"
                            ];
                            console.log(bdate.getDate() + " " + month[bdate.getMonth()] + " " + bdate.getFullYear());
                        }
                    }
                });
            }
        });
    }
};