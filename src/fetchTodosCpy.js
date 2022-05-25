const rookout = require('rookout/lambda');
const AWS = require("aws-sdk");
const { Console } = require("console");

const fetchTodosCpy = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let todos;

  try {
    const results = await dynamodb.scan({ TableName: "TodoTable" }).promise();
    todos = results.Items;
    } catch (error) {
        console.log(error)
     
 }

 
  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};

module.exports = {
  handler: rookout.wrap(fetchTodosCpy, 
    {token: 'df882711cbb621193f2bdde654a44fb9b5d827c16cf3c6b8ac0189da405ad3d8', labels: {env: "dev"}})
}