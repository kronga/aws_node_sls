// const rookout = require('rookout/lambda');
const { v4 } = require("uuid");
const AWS = require("aws-sdk");
// const { Console } = require("console");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const addTodo = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { todo } = event.body;
  const createdAt = new Date().toISOString();
  const id = v4();

  console.log("This is an id", id)

  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false
  }

  await dynamodb.put({
    TableName: "TodoTable",
    Item: newTodo
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = { 
  handler: middy(addTodo).use(httpJsonBodyParser())
}

// module.exports = rookout.wrap(
//   { handler: middy(addTodo).use(httpJsonBodyParser())}, 
//   {token: 'df882711cbb621193f2bdde654a44fb9b5d827c16cf3c6b8ac0189da405ad3d8', 
//   labels: {env: "dev"}}
//   );
