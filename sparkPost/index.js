const sparkpost = require('sparkpost')
const app=require("express");
const client = new sparkpost(process.env.SPARK_POS_API_KEY);

app.post('/sign-up', function (req, res) {
    // Encoding the email address is necessary if you expect special characters
    const emailAddress = encodeURIComponent(req.body.emailAddress);

    sparkpost.get({ uri: `/api/v1/recipient-validation/single/${emailAddress}` })
    .then((response) => {
        const validation = response.results

        if (validation.result === 'undeliverable' || validation.result === 'risky') {
            res.status(400).send({
                message: 'Invalid email. Please try a different email address.'
            })
        }
        else {
            // continue creating the account
        }
    })
})