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

// src/handlers/locations_handler.ts
var locations_handler_exports = {};
__export(locations_handler_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(locations_handler_exports);
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");
var import_lib_dynamodb = require("@aws-sdk/lib-dynamodb");
var client = import_lib_dynamodb.DynamoDBDocumentClient.from(new import_client_dynamodb.DynamoDBClient({}));
var handler = async () => {
  const locations = [
    {
      id: "03665f6d-27e2-4e69-aa9b-5b39d03e5f59",
      address: "Address 1",
      brandId: "692126c8-6e72-4ad7-8a73-25fc2f1f56e4",
      hasOffer: false
    },
    {
      id: "706ef281-e00f-4288-9a84-973aeb29636e",
      address: "Address 2",
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
  for (const location of locations) {
    const command = new import_lib_dynamodb.PutCommand({
      TableName: "LocationsTable",
      Item: location
    });
    await client.send(command);
  }
  return {
    statusCode: 200,
    message: "LocationsTable seeded successfully!"
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=locations_handler.js.map
