const pgStructure = require('pg-structure');

class DBStructure {
  constructor({ 
    host = '0.0.0.0', 
    port = '5432', 
    user = 'postgres', 
    schemas = ['public'],
    database = 'postgres', 
    password = 'example', 
  }) {
    this.schemas = schemas;
    this.crendentials = {
      host,
      port,
      user,
      database,
      password
    }
  }

  async connect() {
    this.connection = await pgStructure(this.crendentials, this.schemas);
    return this;
  }

  getStructure(schemaName = 'public') {
    const schema = this.connection.get(schemaName);
    return JSON.parse(pgStructure.serialize(schema));
  }
}

module.exports = DBStructure;