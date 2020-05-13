const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//set static path

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const publicVapidKey = 'BK-yh6DD8Lf6fd4h_gmqC-Oz9fS2CUNf6KP06hh3w8P9Tr173yPQTPKEaokEkZ2rGpjzMdU3K5sDBCl2de9XhKA';
const privateVapidKey = 'WFr50TZ2Ny2od4IF1q37-OZX9sLKuUgXkKAN0ltCXCI';

webPush.setVapidDetails('mailto:temitoyosi@gmail.com', publicVapidKey, privateVapidKey);


//subscribe route

app.post('/sendpush',(req,res)=>{
    console.log(req.body);
    var titleInput = req.body.title
    var bodyInput = req.body.body
    console.log(titleInput, bodyInput);
    //console.log(title,body)

    return res.json({
        responseHeader: titleInput,
        responseText: bodyInput,
        success: "Updated Successfully",
        status: 200,

    });

})

app.post('/subscribe', (req, res) => {

    //console.log(req.body);
    var titleInput = req.body.title
    var bodyInput = req.body.body
    //console.log(titleInput, bodyInput);
    // Get PushSubscription Object
    //console.log(req.body);
   
    const subscription = req.body;
    //console.log(subscription);
    //send 201 - resource created
    res.status(201).json({});

    //create payload

    const payload = JSON.stringify({ title: 'title' });

    //pass object into send notificaion
    webPush.sendNotification(subscription, payload).catch(err => console.error(err));

});

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
