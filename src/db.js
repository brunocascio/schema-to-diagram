const pgStructure = require('pg-structure');

const getDB = async () => {
  return await pgStructure({
    database: 'postgres',
    user: 'postgres', 
    password: 'example'
  }, ['public']);
}

const getSchema = async (schemaName = 'public') => {
  const db = await getDB();
  return db.get(schemaName);
}

const getJSONSchema = async (schemaName = 'public') => {
  const schema = await getSchema(schemaName);
  return JSON.parse(pgStructure.serialize(schema));
}

module.exports = {
  getJSONSchema
}