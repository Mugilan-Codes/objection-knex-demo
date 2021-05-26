import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello from Objection-Knex Tut</h1>');
  console.log('I am working');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port} -> http://localhost:${port}`);
});
