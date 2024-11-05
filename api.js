// app.js
import express from 'express'
import { run } from './index.js'
import { rateLimiter } from './rateLimiterMiddleware.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(rateLimiter);

app.get('/', async (req, res) => {
    const data = JSON.parse(await run()).response
    console.log(data)
    
    
    res.send({code: 200, message: data});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);  
});
