require('dotenv').config({path: `.env`});

const Discord = require('discord.js');
const CronJob = require('cron').CronJob;
const fs = require('fs');
const moment = require('moment');

const bot = new Discord.Client();

const Ping = require('./commands/ping');
const Pong = require('./commands/pong');
const Help = require('./commands/help');
const Add = require('./commands/add');
const Delete = require('./commands/delete');
const List = require('./commands/list');
const Default = require('./commands/setDefault');
const Sources = require('./commands/sources');

let prefix = process.env.PREFIX;

bot.on('ready', function () {
    bot.user.setActivity(prefix + 'help').catch();
    wish();
});

bot.on('message', function (message) {
    if (message.author.bot) {
        return false;
    }

    if (message.channel.type === 'dm' || message.channel.type === 'group') {
        return false;
    }

    if (message.content.lastIndexOf(prefix, 0) === 0) {
        let commandUsed =
            Ping.parse(message) ||
            Pong.parse(message) ||
            Add.parse(message) ||
            Delete.parse(message) ||
            List.parse(message) ||
            Default.parse(message) ||
            Sources.parse(message) ||
            Help.parse(message);
    }
});

bot.on('error', console.error);

new CronJob('0 0 7 * * *', function () {
    wish();
}, null, true, 'Europe/Paris');

function wish() {
    let allguild = bot.guilds.array();

    allguild.forEach(function (guild) {

        let path = process.env.SERVER_PATH;
        let file = path + '/' + guild.id + '.json';

        fs.exists(file, function (exists) {
            if (exists) {
                fs.readFile(file, function readFileCallback(err, data) {
                    if (err) {
                    } else {
                        let obj = JSON.parse(data);

                        let today = moment();
                        let todayYear = today.year();
                        today.year(1970);

                        for (let key in obj.bdays) {


                            let bdate = moment(obj.bdays[key]);
                            let bdateYear = bdate.year();
                            bdate.year(1970);

                            if (today.isSame(bdate, 'd')) {
                                let age = todayYear - bdateYear;

                                let defaultChan = guild.channels.find(val => val.id === obj.default['channel']);
                                let user = guild.members.find(val => val.id === key);

                                if (defaultChan !== null) {

                                    let random = Math.random() * (100 - 1) + 1;

                                    if (random < 25) {
                                        defaultChan.send(
                                            "Hey " + user + " ! C'est pas ton anniversaire aujourd'hui ? Bon " +
                                            "anniversaire ! ça te fais quoi ? " + age + " ans ? 'tain t'es une vielle" +
                                            " personne maintenant !\n" +
                                            "https://media.giphy.com/media/3oEhn78T277GKAq6Gc/giphy.gif"
                                        );
                                    } else if (random > 25 && random < 50) {
                                        defaultChan.send(
                                            ":tada: :gift: Joyeux anniversaire à " + user + " ! C'est ses " + age +
                                            " ans aujourd'hui ! :gift: :tada:\n" +
                                            "https://media.giphy.com/media/3oKIPidnxHJQ3SuwwM/giphy.gif"
                                        );
                                    } else if (random > 50 && random < 75) {
                                        defaultChan.send(
                                            ":boom: Boom ! C'est l'anniversaire de " + user +
                                            " ! AH ! Tu l'as pas vu venir ! Fêtes lui ses " + age + " ! :clap:\n" +
                                            "https://media.giphy.com/media/kwSZzHYRwd4Lm/giphy.gif"
                                        );
                                    } else {
                                        defaultChan.send(
                                            "WOW ! ARRETEZ TOUT ! C'EST L'ANNIVERSAIRE DE " + user + " ! JOYEUX DE " +
                                            "PUTAIN DE " + age + " ANS !\n" +
                                            "https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif"
                                        );
                                    }
                                }
                            }
                        }
                    }
                });
            }
        });
    })
}

bot.login(process.env.TOKEN);