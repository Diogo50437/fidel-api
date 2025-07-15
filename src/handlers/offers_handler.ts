import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async () => {
  const offer = {
    id: 'd9b1d9ff-543e-47c7-895f-87f71dcad91b',
    name: 'Super Duper Offer',
    brandId: '692126c8-6e72-4ad7-8a73-25fc2f1f56e4',
    locationsTotal: 0,
    locationsId: []
  };

  const command = new PutCommand({
    TableName: 'OffersTable',
    Item: offer,
  });

  await client.send(command);

  return {
    statusCode: 200,
    message: 'OffersTable seeded successfully!',
  };
};
