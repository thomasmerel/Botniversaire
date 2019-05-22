module.exports = class command{
    static parse (message) {
        if(this.match(message)) {
            this.action(message);
            return true;
        }
        return false;
    }

    static match (message) {
        return false;
    }
};