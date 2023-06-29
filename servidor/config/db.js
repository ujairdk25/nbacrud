const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.DB_MONGO, {
                useNewUrlParser: true,
                useUnifiedTopology: true,

            })
            .then(() => {
                console.log('MongoDB Conectado');
                resolve();
            })
            .catch(error => {
                console.log(error);
                process.exit(1); // Detenemos la app
            });
    });
};

module.exports = conectarDB;