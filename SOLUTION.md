

# npm i --save-dev <package_name>

curl -X PUT https://4nce5hmggf.execute-api.eu-west-1.amazonaws.com/dev/offers/update \
  -H "Content-Type: application/json" \
  -d '{
    "id":"d9b1d9ff-543e-47c7-895f-87f71dcad91b",
    "locationId":"692126c8-6e72-4ad7-8a73-25fc2f1f56e4"
  }'

endpoint: PUT - https://4nce5hmggf.execute-api.eu-west-1.amazonaws.com/dev/offers/update


# Offers API (Fidel API Coding Challenge)

This project implements a simplified Offers API platform.

## 🚀 Tech Stack

- **Language**: Node.js / JavaScript
- **Cloud Provider**: AWS
- **Serverless Framework**
- **AWS Services Used**:
  - Cloud Formation
  - AWS Lambda
  - DynamoDB
  - API Gateway

## 📦 Features
- Seed the locations table (hardcoded entries)
- Seed the offers table (hardcoded entries)
- Link locations to offers

## 📁 DynamoDB Tables
### `OffersTable`
Stores offer data.
- `id` (UUID)
- `name` (String)
- `brandId` (UUID)
- `locationsTotal` (Number)
- `locationsId` (Array of UUIDs)

### `LocationsTable`
Stores physical store location data.
- `id` (UUID)
- `address` (String)
- `brandId` (UUID)
- `hasOffer` (Boolean)

## 🔧 Available API Endpoints

### `PUT /offers/update`
Updates an existing offer by:
- Incrementing `locationsTotal`
- Adding `locationId` to `locationsId` array

Updates an existing location by:
- Changing `hasOffer` to `true`


## Important Commands
``` npx serverless deploy ```
``` npx serverless invoke -f seedOffers ```
``` npx serverless invoke -f seedLocations ```

**Request Example:**

```
curl -X PUT https://4nce5hmggf.execute-api.eu-west-1.amazonaws.com/dev/offers/update \
  -H "Content-Type: application/json" \
  -d '{
    "id":"d9b1d9ff-543e-47c7-895f-87f71dcad91b",
    "locationId":"03665f6d-27e2-4e69-aa9b-5b39d03e5f59"
  }'
```