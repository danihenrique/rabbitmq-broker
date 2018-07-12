(async () => {
    const { WorkQueue } = require('../../')
    const workQueue = new WorkQueue()
    await workQueue.connect()
    await workQueue.send('qnameeeeeeeeeeeeeee', '第四条消息')
})()