import { decode } from 'html-entities';
export async function sendToDiscord(event, webhook) {
    switch (event.constructor.name) {
        case "MessageEvent":
            var data = JSON.parse(event.export());
            var params = {
                embeds: [{
                    "title": `Message from ${decode(data.event.data.nick)}`,
                    "description": decode(data.event.data.msg),
                    "color": 139,
                    "fields": [
                        {
                            "name": "Date",
                            "value": new Date(data.event.data.date).toString()
                        }
                    ]
                }]
            }
            await fetch(webhook, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },

                body: JSON.stringify(params)
            })
            break;
            case "JoinEvent":
                var data = JSON.parse(event.export());
                var params = {
                    embeds: [{
                        "title": `User joined: ${decode(data.event.data.nick)}`,
                        "color": 139,
                        "fields": [
                            {
                                "name": "Date (approximate, see pinned message for details)",
                                "value": new Date().toString()
                            }
                        ]
                    }]
                }
                await fetch(webhook, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json'
                    },

                    body: JSON.stringify(params)
                })
            break;
            case "LeaveEvent":
                var data = JSON.parse(event.export());
                var params = {
                    embeds: [{
                        "title": `User left: ${decode(data.event.data.nick)}`,
                        "color": 139,
                        "fields": [
                            {
                                "name": "Date (approximate, see pinned message for details)",
                                "value": new Date().toString()
                            }
                        ]
                    }]
                }
                await fetch(webhook, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json'
                    },

                    body: JSON.stringify(params)
                })
            break;
            case "NickChangeEvent":
                var data = JSON.parse(event.export());
                var params = {
                    embeds: [{
                        "title": "User changed nick",
                        "color": 139,
                        "fields": [
                            {
                                "name": "Old nickname",
                                "value": decode(data.event.data.oldNick.nick)
                            },
                            {
                                "name": "New nickname",
                                "value": decode(data.event.data.newNick.nick)
                            },
                            {
                                "name": "Date (approximate, see pinned message for details)",
                                "value": new Date().toString()
                            }
                        ]
                    }]
                }
                await fetch(webhook, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    
                    body: JSON.stringify(params)
                });
            break;
    }
}