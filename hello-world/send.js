const amqp = require('amqplib/callback_api');

amqp.connect('amqp://10.138.35.153:9098', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'anuwat-hello-q';
        var msg = 'What the fuck inside this que....';

        

        channel.assertQueue(queue, {
            durable: false
        });
        i = 0;
        while (i<500){
            ++i;
            text = msg+"["+i+"]";
            channel.sendToQueue(queue, Buffer.from(text));
            console.log(" [x] Sent %s", text);
        }

    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});