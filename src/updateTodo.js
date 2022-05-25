const rookout = require('rookout/lambda');
const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const { Console } = require("console");

const updateTodo = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { completed } = JSON.parse(event.body);

  const { id } = event.pathParameters;


  console.log("This is an id", id)


  await dynamodb.update({
    TableName: "TodoTable",
    Key: { id },
    UpdateExpression: 'set completed = :completed',
    ExpressionAttributeValues: {
        ':completed': completed
    },
    ReturnValues: "ALL_NEW"
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
        msg: "Todo Updtaed"
    }),
  };
};
 
module.exports = {
  handler: updateTodo
};