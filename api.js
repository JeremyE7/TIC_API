// app.js
import express from 'express'
import { run } from './index.js'
import { rateLimiter } from './rateLimiterMiddleware.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(rateLimiter);

app.post('/', async (req, res) => {
    console.log("adwdawd");
    
    const data = JSON.parse(await run(req.body.text)).response
    console.log(data)
    
    
    res.send({code: 200, message: data});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);  
});
