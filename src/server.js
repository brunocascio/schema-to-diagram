const express = require('express');
const DBUI = require('./dbUI');
const DB = require('./db');

const isProd = process.env.NODE_ENV === 'production';

const app = express();

app.use(express.json());       // to support JSON-encoded bodies
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

app[isProd ? 'post' : 'get']('/html', async (req, res) => {
  try {
    const params = isProd ? req.body : req.query;
    const connection = await new DB(params).connect();
    const dbUI = await new DBUI(connection);
    // nodes
    const tables = dbUI.getTables();
    // edges
    const relationships = dbUI.getRelationships();
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