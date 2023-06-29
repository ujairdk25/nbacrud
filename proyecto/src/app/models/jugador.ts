export class Jugador {
    _id?: number;
    jugador: string;
    posicion: string;
    equipo: string;
    anotaciones: number;

    constructor(jugador: string, posicion: string, equipo: string, anotaciones: number) {
        this.jugador = jugador;
        this.posicion = posicion;
        this.equipo = equipo;
        this.anotaciones = anotaciones;
    }
}
