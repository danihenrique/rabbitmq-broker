const amqp = require('amqplib');

class WorkQueue {

    async connect(url = 'amqp://localhost') {
        try {
            this._conn = await amqp.connect(url)
            this._channel = await this._conn.createChannel()
        } catch (error) {
            throw (`connect amqp error: ${error}`)
        }
    }

    async send(queueName, message) {
        if (!queueName) {
            throw 'queueName missing'
        }
        if (!message) {
            throw 'message missing'
        }
        await this._channel.assertQueue(queueName, { durable: true })
        return this._channel.sendToQueue(queueName, Buffer.from(message), { persistent: true })
    }

    async receive(queueName, onMessage) {
        if (!queueName) {
            throw 'queueName missing'
        }
        if (!onMessage) {
            throw 'onMessage missing'
        }
        await this._channel.assertQueue(queueName, { durable: true });
        await this._channel.prefetch(1);
        this._channel.consume(queueName, onMessage, { noAck: false });
    }

    async close() {
        await this._conn.close()
    }

    ack(message) {
        this._channel.ack(message)
    }
}

module.exports = WorkQueue