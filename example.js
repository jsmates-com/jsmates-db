const jsMatesDB = require("./index");

const run = async () => {
  const db = await jsMatesDB("./database");
  await db.createCollection("authors");

  const Authors = await db.getCollection("authors");

  // Remove data
  const removeAuthorById = await Authors.remove({
    _id: "ckhc7kqp800004jzvcad675k0",
  });
  const removeByKeys = await Authors.remove({
    name: "Joshua",
    _id: "ckhc7kqp800014jzv1cqd0a8u",
  });
  const dontRemove = await Authors.remove({
    name: "Af",
    _id: "ckhc7kqp900024jzvd1kj4ptq",
  });

  console.table([removeAuthorById, removeByKeys, dontRemove]);
};

// Start the examples
run();

/**
  // Delete all data in the collection
  await Authors.remove({});

  // Insert data to the collection
  const author = await Authors.insert({
    name: "Param",
  });
  // Insert many data to collection
  const authors = await Authors.insertMany([
    {
      name: "Joshua",
    },
    { name: "Afrin" },
  ]);
 */
