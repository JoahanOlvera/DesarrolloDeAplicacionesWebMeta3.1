const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/index.js');
const ubicacionesRouterBD = require('./rutas/ubicacionesBD.js');
const responsablesRouterBD = require('./rutas/responsablesBD.js');
const activoRouterBD = require('./rutas/activosBD.js');
const https = require('https');
const fs = require('fs');

const app = express();
const cert = fs.readFileSync('server.cer');
const key = fs.readFileSync('server.key');
const sequelize = db.sequelize;

app.set('port', 4000);

// Configurar body-parser con un límite de tamaño mayor
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use('/activos', activoRouterBD);
app.use('/responsables', responsablesRouterBD);
app.use('/ubicaciones', ubicacionesRouterBD);

async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true });
        console.log('Base de datos sincronizada correctamente');
        https.createServer({ key: key, cert: cert }, app).listen(4000, () => {
            console.log('Servidor HTTPS en puerto 4000');
        });
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
}

syncDatabase();
