const Jugador = require('../models/Jugador');

exports.crearJugador = (req, res) => {
    let jugador = new Jugador(req.body);

    jugador.save()
        .then(() => {
            res.send(jugador);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Hubo un error');
        });
};

exports.obtenerJugadores = (req, res) => {
    Jugador.find()
        .then(jugadores => {
            res.json(jugadores);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Hubo un error');
        });
};

exports.actualizarJugador = (req, res) => {
    const { nombre, posicion, equipo, anotaciones } = req.body;

    Jugador.findById(req.params.id)
        .then(jugador => {
            if (!jugador) {
                res.status(404).json({ msg: 'No existe el jugador' });
            }

            jugador.nombre = nombre;
            jugador.posicion = posicion;
            jugador.equipo = equipo;
            jugador.anotaciones = anotaciones;

            return jugador.save();
        })
        .then(jugador => {
            res.json(jugador);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Hubo un error');
        });
};

exports.obtenerJugador = (req, res) => {
    Jugador.findById(req.params.id)
        .then(jugador => {
            if (!jugador) {
                res.status(404).json({ msg: 'No existe el jugador' });
            }

            res.json(jugador);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Hubo un error');
        });
};

exports.eliminarJugador = (req, res) => {
    Jugador.findById(req.params.id)
        .then(jugador => {
            if (!jugador) {
                res.status(404).json({ msg: 'No existe el jugador' });
            }

            return Jugador.findOneAndRemove({ _id: req.params.id });
        })
        .then(() => {
            res.json({ msg: 'Jugador eliminado con éxito' });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Hubo un error');
        });
};