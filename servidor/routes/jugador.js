const express = require('express');
const router = express.Router();
const jugadorController = require('../controllers/jugadorController');

// api/jugadores
router.post('/', jugadorController.crearJugador);
router.get('/', jugadorController.obtenerJugadores);
router.put('/:id', jugadorController.actualizarJugador);
router.get('/:id', jugadorController.obtenerJugador);
router.delete('/:id', jugadorController.eliminarJugador);

module.exports = router;