const AWS = require("aws-sdk");
const uuidv1 = require('uuid/v1');
require('dotenv').config();

AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const docClient = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName: "band-names",
    Item: {
        "id": uuidv1(),
        "name": "bongos"
    }
};
docClient.put(params, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log("success", data);
    }
});
