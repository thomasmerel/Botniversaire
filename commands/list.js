const Command = require('./command');

module.exports = class List extends Command {
    static match(message) {
        return message.content.startsWith(process.env.PREFIX + 'list');
    }

    static action(message) {
        return false;
        // let server = message.guild;
        //
        // let path = './anniversaries';
        // let file = path + '/' + server.id + '.json';
        //
        // let fs = require('fs');
        //
        // let obj = {};
        //
        // fs.exists(file, function (exists) {
        //     if (exists) {
        //         fs.readFile(file, function readFileCallback(err, data) {
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 obj = JSON.parse(data);
        //
        //
        //             }
        //         });
        //     }
        // });
    }
};