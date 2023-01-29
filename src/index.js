import express from 'express';
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Pagina de inicio')
})

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
})