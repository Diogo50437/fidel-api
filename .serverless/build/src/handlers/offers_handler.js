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

// src/handlers/offers_handler.ts
var offers_handler_exports = {};
__export(offers_handler_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(offers_handler_exports);
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");
var import_lib_dynamodb = require("@aws-sdk/lib-dynamodb");
var client = import_lib_dynamodb.DynamoDBDocumentClient.from(new import_client_dynamodb.DynamoDBClient({}));
var handler = async () => {
  const offer = {
    id: "d9b1d9ff-543e-47c7-895f-87f71dcad91b",
    name: "Super Duper Offer",
    brandId: "692126c8-6e72-4ad7-8a73-25fc2f1f56e4",
    locationsTotal: 0,
    locationsId: []
  };
  const command = new import_lib_dynamodb.PutCommand({
    TableName: "OffersTable",
    Item: offer
  });
  await client.send(command);
  return {
    statusCode: 200,
    message: "OffersTable seeded successfully!"
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=offers_handler.js.map
