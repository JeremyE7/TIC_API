// Definimos el tiempo de espera en milisegundos (10 segundos)
const WAIT_TIME = 60 * 1000;

// Diccionario para almacenar el tiempo de la última solicitud por usuario
const requestTimestamps = {};

// Middleware de rate limiting
export function rateLimiter(req, res, next) {
    const userId = req.ip; // Utiliza la IP del usuario como identificador

    const currentTime = Date.now();

    if (requestTimestamps[userId]) {
        const lastRequestTime = requestTimestamps[userId];
        
        // Verificar si han pasado menos de 10 segundos desde la última solicitud
        if (currentTime - lastRequestTime < WAIT_TIME) {
            return res.status(429).json({
                message: `Por favor espera ${Math.ceil((WAIT_TIME - (currentTime - lastRequestTime)) / 1000)} segundos antes de hacer otra solicitud.`,
            });
        }
    }

    // Actualizar el tiempo de la última solicitud
    requestTimestamps[userId] = currentTime;

    next(); // Continúa con el siguiente middleware o manejador de ruta
}
