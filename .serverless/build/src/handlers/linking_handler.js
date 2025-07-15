"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/handlers/linking_handler.ts
var linking_handler_exports = {};
__export(linking_handler_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(linking_handler_exports);
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");
var import_lib_dynamodb = require("@aws-sdk/lib-dynamodb");
var client = import_lib_dynamodb.DynamoDBDocumentClient.from(new import_client_dynamodb.DynamoDBClient({}));
var handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const offerId = body.id;
    const locationId = body.locationId;
    if (!offerId || !locationId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Offer ID is required for update" })
      };
    }
    const updateOfferCommand = new import_lib_dynamodb.UpdateCommand({
      TableName: "OffersTable",
      Key: { id: offerId },
      UpdateExpression: `
        SET #locationsTotal = if_not_exists(#locationsTotal, :zero) + :inc,
            #locationsId = list_append(if_not_exists(#locationsId, :emptyList), :newLocation)
        `,
      ExpressionAttributeNames: {
        "#locationsTotal": "locationsTotal",
        "#locationsId": "locationsId"
      },
      ExpressionAttributeValues: {
        ":inc": 1,
        ":zero": 0,
        ":emptyList": [],
        ":newLocation": [locationId]
      },
      ReturnValues: "UPDATED_NEW"
    });
    await client.send(updateOfferCommand);
    const updateLocationCommand = new import_lib_dynamodb.UpdateCommand({
      TableName: "LocationsTable",
      Key: { id: locationId },
      UpdateExpression: "SET #hasOffer = :true",
      ExpressionAttributeNames: {
        "#hasOffer": "hasOffer"
      },
      ExpressionAttributeValues: {
        ":true": true
      }
    });
    await client.send(updateLocationCommand);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Location linked to Offer successfully" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error", details: error.message })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=linking_handler.js.map
