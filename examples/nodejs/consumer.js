const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094'],
})

const consumer = kafka.consumer({ groupId: 'consumer-group' })
const topic = 'animals'

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        })
      },
    })
}

run().catch(console.error)