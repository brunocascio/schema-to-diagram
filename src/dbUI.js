const DB = require('./db');

class DBUI {

  constructor(dbConnection) {
    this.connection = dbConnection;
  }

  getTables(schemaName = 'public') {
    const schema = this.connection.getStructure(schemaName);
    return schema.tables.map(table => {
      const primaryKeys = table.indexes.filter(i => i.isPrimaryKey);
      const uniqueKeys = table.indexes.filter(i => i.isUnique);
      return {
        key: table.name,
        items: table.columns.map(column => {
          const isPrimary = primaryKeys.some(pk => pk.columns.includes(column.name))
          const isUniqueKey = uniqueKeys.some(uk => uk.columns.includes(column.name));
          return {
            name: column.name,
            iskey: isPrimary || isUniqueKey,
            figure: isPrimary ? "Decision" : isUniqueKey ? "TriangleUp" : "Cube1",
            color: isPrimary ? "yellow" : isUniqueKey ? "blue" : "black",
          }
        })
      }
    });
  }

  getRelationships(schemaName = 'public') {
    const schema = this.connection.getStructure(schemaName);
    return schema.tables.map(table => table.constraints
      .filter(constraint => constraint.type === "FOREIGN KEY")
      .map(constraint => ({ from: table.name, to: constraint.parent.split('.').pop() })))
      .reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
  }
}

module.exports = DBUI;