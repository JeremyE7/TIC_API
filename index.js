// app.js
import express from 'express'
import { run } from './api.js'
import { rateLimiter } from './rateLimiterMiddleware.js';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
    // Permitir solicitudes desde cualquier origen (puedes restringir esto si es necesario)
    res.setHeader('Access-Control-Allow-Origin', '*'); // Cambia '*' por un dominio específico si lo necesitas
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Si es una solicitud OPTIONS, responder inmediatamente
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Pasar al siguiente middleware
    next();
});

app.get("/:text", async (req, res) => {
    const text = req.params.text;
    console.log(text);
    
    if(!text) return res.send({code: 400, message: 'Falta la pregunta en la url xd'})
    const data = JSON.parse(await run(text)).response
    console.log(data)

    res.send({code: 200, message: data})
})

app.put('/', async (req, res) => {
    console.log("adwdawd", req);
    if(!req.body.text) return res.send({code: 400, message: "Bad Request"});
    const data = JSON.parse(await run(req.body.text)).response
    console.log(data)
    
    
    res.send({code: 200, message: data});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);  
});
