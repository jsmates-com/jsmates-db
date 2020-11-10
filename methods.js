const utils = require("./utils");

const insert = ({ collectionPath }) => async (payload) => {
  const data = await utils.read({ collectionPath });
  data.push(utils.objectId(payload));
  await utils.write({ collectionPath, data });
  return { inserted: true, data: payload };
};

const insertMany = ({ collectionPath }) => async (payload) => {
  let data = await utils.read({ collectionPath });
  data = data.concat(payload.map(utils.objectId));
  await utils.write({ collectionPath, data });
  return { inserted: true, data: payload };
};

const remove = ({ collectionPath }) => async (payload) => {
  if (!payload) throw Error("Payload is required");
  let data = [];
  if (Object.keys(payload).length !== 0) {
    // Whatever the payload says
  }
  await utils.write({ collectionPath, data });
  return { isDeleted: true };
};

const dbMethods = ({ collectionPath }) => {
  return {
    insert: insert({ collectionPath }),
    insertMany: insertMany({ collectionPath }),
    remove: remove({ collectionPath }),
  };
};

module.exports = dbMethods;
