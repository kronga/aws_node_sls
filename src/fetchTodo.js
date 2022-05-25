
const AWS = require("aws-sdk");
const { Console } = require("console");

const fetchTodos = async (event) => {

    const { id } = event.pathParameters;

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    let todo;

    try {
        const result = await dynamodb.get({
            TableName: "TodoTable",
            Key: { id }
        }).promise();
        todo = result.Item;
    } catch (error) {
        console.log(error)

    }


    return {
        statusCode: 200,
        body: JSON.stringify(todo),
    };
};

module.exports = {
    handler: fetchTodo
}