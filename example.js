const jsMatesDB = require("./index");

const run = async () => {
  const db = await jsMatesDB("./database");
  await db.createCollection("authors");

  const Authors = await db.getCollection("authors");

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
    { name: "Afrin " },
  ]);

  console.table(authors);
  console.table([author]);
};

// Start the examples
run();
