const express = require('express');
const DB = require('./db');

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.post('/json', async (req, res) => {
  try {
    const schema = await new DB(req.params).connect();
    return res.json(schema.getStructure());
  } catch (error) {
    console.log(error);
    return res.status(500).send(`${error}`);
  }
});

app.get('/', async (req, res) => {
  try {
    const schema = (await new DB(req.params).connect()).getStructure();
    // nodes
    const tables = schema.tables.map(table => {
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
    // edges
    const relationships = schema.tables.map(table => table.constraints
      .filter(constraint => constraint.type === "FOREIGN KEY")
      .map(constraint => ({ from: table.name, to: constraint.parent.split('.').pop() })))
      .reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
    // render
    return res.render('index', {
      tables: JSON.stringify(tables),
      relationships: JSON.stringify(relationships)
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`${error}`);
  }
});

app.listen(3000);