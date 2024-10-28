// app.js
import express from 'express'
import { run } from './index.js'

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    const data = run()
    res.send({code: 200, message: data});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
