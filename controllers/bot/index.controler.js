const dialogflow = require('./../../libs/dialogflow');

const index = (req, res, next) => {
    res.render('pages/index');
}

const chat = async (req, res, next) => {
    let { text = "" } = req.body;

    // send message to dialogflow
    let responses = await dialogflow.detectIntent(text);
    const result = responses[0].queryResult;

    return res.json({
        reply: result.fulfillmentText
    });
}
  
module.exports = [
    index,
    chat
]