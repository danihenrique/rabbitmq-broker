(async () => {
    const { PubSubQueue } = require('../../')
    const pubSubQueue = new PubSubQueue()
    await pubSubQueue.connect()
    pubSubQueue.subscribe('exnameeeeeeee', 'routeKeyyyyyyyyyyyy', message => {
       console.log(message.content.toString())
    })
})()