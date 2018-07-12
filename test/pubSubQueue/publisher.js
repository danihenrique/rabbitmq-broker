(async () => {
    const { PubSubQueue } = require('../../')
    const pubSubQueue = new PubSubQueue()
    await pubSubQueue.connect()
    const publishFlag = await pubSubQueue.publish('exnameeeeeeee', 'routeKeyyyyyyyyyyyy', 'testtttt')
})()