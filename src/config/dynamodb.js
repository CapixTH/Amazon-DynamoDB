import dynamoose from "dynamoose";

const DYNAMODB_ENDPOINT = process.env.DYNAMODB_ENDPOINT || "http://localhost:5407";

dynamoose.aws.ddb.local(DYNAMODB_ENDPOINT);

export default dynamoose;