// listTables.js

import { DynamoDB } from "@aws-sdk/client-dynamodb";

const client = new DynamoDB({
  region: "us-east-1",
  endpoint: "http://localhost:5407",
  credentials: {
    accessKeyId: "local",
    secretAccessKey: "local",
  },
});

const result = await client.listTables({});
console.log(result);