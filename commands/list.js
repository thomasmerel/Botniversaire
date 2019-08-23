const Command = require('./command');

module.exports = class List extends Command {
    static match(message) {
        return message.content.startsWith(process.env.PREFIX + 'list');
    }

    static action(message) {

        let random = Math.random() * (100 - 1) + 1;

        if(random < 33){
            message.channel.send("Cette commande n'est pas RGPD friendly.\n" +
                "http://deansomerset.com/wp-content/uploads/2014/02/shoulder-shrug.jpg");
        }else if(random > 66){
            message.channel.send("Ici la police du web ! Cette commande n'est pas RGPD friendly !\n" +
                "https://media.giphy.com/media/HzhNzgzL9WXTy/giphy.gif");
        }else{
            message.channel.send('"RGPD" ça te dis quelque chose ?!! :rage:\n' +
                'https://media.giphy.com/media/AzdZrT9OGEIyQ/giphy.gif');
        }

        return false;
    }
};