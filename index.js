require('dotenv').config({path: `./.env`});

const Discord = require('discord.js');
const CronJob = require('cron').CronJob;
const fs = require('fs');
const bot = new Discord.Client();

const Ping = require('./commands/ping');
const Help = require('./commands/help');
const Add = require('./commands/add');
const Delete = require('./commands/delete');
// const List = require('./commands/list');
const Default = require('./commands/setDefault');
const Sources = require('./commands/sources');

let prefix = process.env.PREFIX;

bot.on('ready', function () {
    bot.user.setActivity('--help').catch(console.error)
    wish();
});

bot.on('message', function (message) {
    if (message.author.bot) {
        return false;
    }

    if (message.content.lastIndexOf(prefix, 0) === 0) {
        let commandUsed =
            Ping.parse(message) ||
            Add.parse(message) ||
            Delete.parse(message) ||
            // List.parse(message) ||
            Default.parse(message) ||
            Sources.parse(message) ||
            Help.parse(message);
    }
});

bot.on('error', console.error);

new CronJob('0 0 7 * * *', function () {
    wish();
}, null, true, 'Europe/Paris');

function wish(){
    let allguild = bot.guilds.array();

    allguild.forEach(function (guild) {

        let path = './anniversaries';
        let file = path + '/' + guild.id + '.json';

        fs.exists(file, function (exists) {
            if (exists) {
                fs.readFile(file, function readFileCallback(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        let obj = JSON.parse(data);

                        let today = new Date();
                        today.setHours(0, 0, 0, 0);
                        let todayYear = today.getFullYear();
                        today.setYear(0);

                        for (let key in obj.bdays) {

                            let bdate = new Date(obj.bdays[key]);
                            bdate.setHours(0, 0, 0, 0);
                            let bdateYear = bdate.getFullYear();
                            bdate.setYear(0);

                            if (today.valueOf() === bdate.valueOf()) {
                                let age = todayYear - bdateYear;

                                let defaultChan = guild.channels.find(val => val.id === obj.default['channel']);
                                let user = guild.members.find(val => val.id === key);

                                console.log(new Date());
                                console.log(user.username);

                                // defaultChan.send(
                                //     ":tada: :gift: Joyeux anniversaire à " +user + " ! C'est ses " + age +
                                //     " ans aujourd'hui ! :gift: :tada:",
                                //     {files: ["https://media.giphy.com/media/3oKIPidnxHJQ3SuwwM/giphy.gif"]}
                                //     );
                            }
                        }
                    }
                });
            }
        });
    })
}

bot.login(process.env.TOKEN);