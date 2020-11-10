const cuid = require("cuid");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
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
};
