const utils = require("./utils");

const insert = ({ collectionPath }) => async (payload) => {
  const data = await utils.read({ collectionPath });
  data.push(payload);
  await utils.write({ collectionPath, data });
  return { inserted: true, data: payload };
};

const insertMany = ({ collectionPath }) => async (payload) => {
  let data = await utils.read({ collectionPath });
  data = data.concat(payload);
  await utils.write({ collectionPath, data });
  return { inserted: true, data: payload };
};

const dbMethods = ({ collectionPath }) => {
  return {
    insert: insert({ collectionPath }),
    insertMany: insertMany({ collectionPath }),
  };
};

module.exports = dbMethods;
