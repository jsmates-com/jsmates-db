const fs = require("fs-extra");
const dbMethods = require("./methods");
const utils = require("./utils");

// Get Collection
const getCollection = ({ database, dbPath }) => async (collectionFileName) => {
  if (!collectionFileName) throw Error("CollectionName is required");

  const { isCollectionExist, collectionPath } = utils.collection({
    collectionFileName,
    database,
    dbPath,
  });

  // If collection not exist
  if (!isCollectionExist) {
    throw Error("Collection not exist");
  }

  return dbMethods({ collectionPath });
};

// Create collection
const createCollection = ({ database, dbPath }) => async (
  collectionFileName
) => {
  if (!collectionFileName) throw Error("CollectionName is required");

  const { collectionPath, isCollectionExist } = utils.collection({
    collectionFileName,
    database,
    dbPath,
  });

  // If file not exist
  if (!isCollectionExist) {
    await fs.writeFile(collectionPath, JSON.stringify([]));
  }

  return dbMethods({ collectionPath });
};

// Connect to database
const connect = async (dbPath) => {
  if (!dbPath) throw Error("dbPath is required");
  if (!(await fs.exists(dbPath))) {
    await fs.mkdir(dbPath);
  }
  const database = await fs.readdir(dbPath);

  return {
    createCollection: createCollection({ database, dbPath }),
    getCollection: getCollection({ database, dbPath }),
  };
};

module.exports = connect;
