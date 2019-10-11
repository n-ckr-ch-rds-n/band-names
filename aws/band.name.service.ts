import AWS from "aws-sdk";
import uuidv1 from "uuid/v1";
import {config} from "dotenv";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import PutItemInput = DocumentClient.PutItemInput;


export class BandNameService {
    client: DocumentClient;

    constructor() {
        config();
        AWS.config.update({
            region: "us-east-1",
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        });
        this.client = new AWS.DynamoDB.DocumentClient();
    }

    toParams(name: string): PutItemInput {
        return {
            TableName: "band-names",
            Item: {
                "id": uuidv1(),
                "name": name
            }
        }
    }

    async putBandName(name: string): Promise<void> {
        await this.client.put(this.toParams(name)).promise();
    }
}


