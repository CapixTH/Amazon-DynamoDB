import dynamoose from "dynamoose";

const DYNAMODB_ENDPOINT =
  process.env.DYNAMODB_ENDPOINT || "http://localhost:5407";

const AWS_REGION = process.env.AWS_REGION || "us-east-1";

dynamoose.aws.ddb.set(
  new dynamoose.aws.ddb.DynamoDB({
    region: AWS_REGION,
    endpoint: DYNAMODB_ENDPOINT,
    credentials: {
      accessKeyId: "local",
      secretAccessKey: "local",
    },
  }),
);

export default dynamoose;
