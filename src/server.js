const express = require('express');
const { getJSONSchema } = require('./db');

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/json', async (req, res) => {
  try {
    const schema = await getJSONSchema();
    return res.json(schema);
  } catch (error) {
    return res.status(500).send(error);   
  }
});

app.get('/', async (req, res) => {
  try {
    const schema = await getJSONSchema();
    // nodes
    const tables = schema.tables.map(table => ({
      ...table,
      id: table.name,
      label: table.name
    }));
    // edges
    const relationships = schema.tables.map(table => table.constraints
      .filter(constraint => constraint.type === "FOREIGN KEY")
      .map(constraint => ({ from: table.name, to: constraint.parent.split('.').pop() })))
      .reduce((accumulator, currentValue) => accumulator.concat(currentValue));
    // render
    return res.render('index', { 
      tables: JSON.stringify(tables),
      relationships: JSON.stringify(relationships),
    });
  } catch (error) {
    return res.status(500).send(`${error}`);   
  }
});

app.listen(3000);