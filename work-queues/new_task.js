const amqp = require('amqplib/callback_api');

amqp.connect('amqp://10.138.35.153:9098', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'anuwat_task_queue';
        var msg = process.argv.slice(2).join(' ') || "Hello World!";
        
        channel.assertQueue(queue, {
          durable: true
        });
        // channel.sendToQueue(queue, Buffer.from(msg), {persistent: true}); // for persistent in RMQ Server
        channel.sendToQueue(queue, Buffer.from(msg), {
          persistent: true
        });
        console.log(" [x] Sent '%s'", msg);

    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});