import AWS from 'aws-sdk';
import { Offer, Location } from './types';

const ddb = new AWS.DynamoDB.DocumentClient();

const offers: Offer[] = [
  {
    id: "d9b1d9ff-543e-47c7-895f-87f71dcad91b",
    name: "Super Duper Offer",
    brandId: "692126c8-6e72-4ad7-8a73-25fc2f1f56e4",
    locationsTotal: 0
  }
];

const locations: Location[] = [
  {
    id: "03665f6d-27e2-4e69-aa9b-5b39d03e5f59",
    address: "Address 1",
    brandId: "692126c8-6e72-4ad7-8a73-25fc2f1f56e4",
    hasOffer: false
  },
  {
    id: "1c7a27de-4bbd-4d63-a5ec-2eae5a0f1870",
    address: "Address 3",
    brandId: "692126c8-6e72-4ad7-8a73-25fc2f1f56e4",
    hasOffer: false
  }
];

async function seed() {
  for (const offer of offers) {
    await ddb
      .put({
        TableName: process.env.OFFERS_TABLE!,
        Item: offer,
      })
      .promise();
    console.log(`Inserted offer: ${offer.name}`);
  }

  for (const location of locations) {
    await ddb
      .put({
        TableName: process.env.LOCATIONS_TABLE!,
        Item: location,
      })
      .promise();
    console.log(`Inserted location: ${location.address}`);
  }

  console.log("✅ Seeding complete.");
}

seed().catch(console.error);