const cuid = require("cuid");
const fs = require("fs-extra");
const path = require("path");

const utils = {
  collection: ({ collectionFileName, database, dbPath }) => {
    const collectionName = `${collectionFileName}.json`;
    const isCollectionExist = database.includes(collectionName);
    const collectionPath = path.join(__dirname, dbPath, collectionName);
    return { collectionName, collectionPath, isCollectionExist };
  },
  write: async ({ collectionPath, data }) => {
    await fs.writeFile(collectionPath, JSON.stringify(data));
  },
  read: async ({ collectionPath }) => {
    const data = await fs.readFile(collectionPath);
    return JSON.parse(data);
  },
  objectId: (payload) => {
    return {
      ...payload,
      _id: cuid(),
    };
  },
  remove: async ({ collectionPath, payload }) => {
    const data = await utils.read({ collectionPath });
    const filteredData = data.filter((document) => {
      return !Object.entries(payload).every(([key, value]) => {
        return document[key] === value;
      });
    });
    await utils.write({ collectionPath, data: filteredData });
    return data.length - filteredData.length;
  },
};

module.exports = utils;
