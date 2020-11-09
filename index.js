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

const run = async () => {
  const db = await connect("./database");
  await db.createCollection("authors");

  const Authors = await db.getCollection("authors");

  // Insert data to the collection
  const author = await Authors.insert({
    name: "Param",
  });
  // Insert many data to collection
  const authors = await Authors.insertMany([
    {
      name: "Joshua",
    },
    { name: "Afrin " },
  ]);

  console.log(author, authors);
};

run();
