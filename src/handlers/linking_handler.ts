import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const offerId = body.id;
    const locationId = body.locationId;

    if (!offerId || !locationId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Offer ID is required for update' }),
      };
    }

    //Update the offer entry
    const updateOfferCommand = new UpdateCommand({
        TableName: 'OffersTable',
        Key: { id: offerId },
        UpdateExpression: `
        SET #locationsTotal = if_not_exists(#locationsTotal, :zero) + :inc,
            #locationsId = list_append(if_not_exists(#locationsId, :emptyList), :newLocation)
        `,
        ExpressionAttributeNames: {
            '#locationsTotal': 'locationsTotal',
            '#locationsId': 'locationsId',
        },
        ExpressionAttributeValues: {
            ':inc': 1,
            ':zero': 0,
            ':emptyList': [],
            ':newLocation': [locationId],
        },
        ReturnValues: 'UPDATED_NEW',
    });
    
    await client.send(updateOfferCommand);

    //Update the location entry
    const updateLocationCommand = new UpdateCommand({
      TableName: 'LocationsTable',
      Key: { id: locationId },
      UpdateExpression: 'SET #hasOffer = :true',
      ExpressionAttributeNames: {
        '#hasOffer': 'hasOffer',
      },
      ExpressionAttributeValues: {
        ':true': true,
      },
    });

    await client.send(updateLocationCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Location linked to Offer successfully'}),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', details: (error as Error).message }),
    };
  }
};