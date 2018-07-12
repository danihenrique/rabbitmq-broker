const amqp = require('amqplib');

class PubSubQueue {
    constructor(url) {
        this._url = url || 'amqp://localhost'
    }

    async connect() {
        try {
            this._conn = await amqp.connect(this._url)
            this._channel = await this._conn.createChannel()
        } catch (error) {
            throw (`connect amqp error: ${error}`)
        }
    }

    async publish(exchangeName, routeKey, message) {
        if (!exchangeName) {
            throw 'exchangeName missing'
        }
        if (!routeKey) {
            throw 'routeKey missing'
        }
        await this._channel.assertExchange(exchangeName, 'topic', { durable: true })
        return this._channel.publish(exchangeName, routeKey, Buffer.from(message))
    }

    async subscribe(exchangeName, routeKey, onMessage) {
        if (!exchangeName) {
            throw 'exchangeName missing'
        }
        if (!routeKey) {
            throw 'routeKey missing'
        }
        if (!onMessage) {
            throw 'onMessage missing'
        }
        await this._channel.assertExchange(exchangeName, 'topic', { durable: true })
        const _queue = await this._channel.assertQueue('', { exclusive: true })
        await this._channel.bindQueue(_queue.queue, exchangeName, routeKey)
        return this._channel.consume(_queue.queue, onMessage)
    }

    async close() {
        await this._conn.close()
    }

    ack(message) {
        this._channel.ack(message)
    }
}

module.exports = PubSubQueue