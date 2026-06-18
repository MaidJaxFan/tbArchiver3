class MessageEvent {
    constructor(data) {
        this.date = data.date;
        this.nick = data.nick;
        this.color = data.color;
        this.style = data.style;
        this.home = data.home;
        this.msg = data.msg;
    }
    export() {
        var obj = {
            event: {
                type: "msg",
                data: {
                    date: this.date,
                    nick: this.nick,
                    color: this.color,
                    style: this.style,
                    home: this.home,
                    msg: this.msg                
                }            
            }    
        }

        return JSON.stringify(obj);
    }
}
class JoinEvent {
    constructor(data) {
        this.nick = data.nick;
        this.color = data.color;
        this.style = data.style;
        this.home = data.home;
        this.room = data.room;
        this.isBot = data.isBot;
    }
    export() {
        var obj = {
            event: {
                type: "join",
                data: {
                    nick: this.nick,
                    color: this.color,
                    style: this.style,
                    home: this.home,
                    room: this.room,
                    isBot: this.isBot
                }
            }
        }

        return JSON.stringify(obj);
    }
}
class LeaveEvent {
    constructor(data) {
        this.nick = data.nick;
        this.color = data.color;
        this.style = data.style;
        this.home = data.home;
        this.room = data.room;
        this.isBot = data.isBot;
    }
    export() {
        var obj = {
            event: {
                type: "leave",
                data: {
                    nick: this.nick,
                    color: this.color,
                    style: this.style,
                    home: this.home,
                    room: this.room,
                    isBot: this.isBot
                }
            }
        }

        return JSON.stringify(obj);
    }
}
class NickChangeEvent {
    constructor(data) {
        this.oldNick = {
            nick: data[0].nick,
            color: data[0].color,
            style: data[0].style
        },
        this.newNick = {
            nick: data[1].nick,
            color: data[1].color,
            style: data[1].style,
            home: data[1].home,
            room: data[1].room,
            isBot: data[1].isBot
        }
    }
    export() {
        var obj = {
            event: {
                type: "nickChange",
                data: {
                    oldNick: this.oldNick,
                    newNick: this.newNick,
                }
            }
        }

        return JSON.stringify(obj);
    }
}
export { MessageEvent, JoinEvent, LeaveEvent, NickChangeEvent };
