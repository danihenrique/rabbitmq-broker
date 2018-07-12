(async ()=> {
    const { WorkQueue } = require('../../')
    const workQueue = new WorkQueue()
    await workQueue.connect()
    workQueue.receive('qnameeeeeeeeeeeeeee', message => {
        console.log(message.content.toString())
        workQueue.ack(message)
    })
})()