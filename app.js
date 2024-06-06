const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/index.js');

const ubicacionesRouterBD = require('./rutas/ubicacionesBD.js');
const responsablesRouterBD = require('./rutas/responsablesBD.js');
const activoRouterBD = require('./rutas/activosBD.js');
const loginRouter = require('./rutas/login.js');

const https = require('https');
const fs = require('fs');

const session = require('express-session');
const passport = require("./middlewares/google.js");

const app = express();
const cert = fs.readFileSync('server.cer');
const key = fs.readFileSync('server.key');
const sequelize = db.sequelize;

app.set('port', 4000);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
// Configurar body-parser con un límite de tamaño mayor
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Google Authentication Route
const loginRoute = require('./rutas/login.js');
app.use('/auth', loginRoute);

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use('/activos', activoRouterBD);
app.use('/responsables', responsablesRouterBD);
app.use('/ubicaciones', ubicacionesRouterBD);
app.use('/uploads', express.static('uploads'));

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
