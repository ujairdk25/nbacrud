import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';
declare var $: any;

@Component({
  selector: 'app-crear-jugador',
  templateUrl: './crear-jugador.component.html',
  styleUrls: ['./crear-jugador.component.css']
})
export class CrearJugadorComponent implements OnInit {
  jugadorForm: FormGroup;
  titulo = 'Crear jugador';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _jugadorService: JugadorService,
              private aRouter: ActivatedRoute) {
    this.jugadorForm = this.fb.group({
      jugador: ['', Validators.required],
      posicion: ['', Validators.required],
      equipo: ['', Validators.required],
      anotaciones: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    $(document).ready(function() {
      var div = $(".card");
      div.animate({height: '300px', opacity: '0.4'}, "slow");
      div.animate({width: '300px', opacity: '0.8'}, "slow");
      div.animate({height: '100px', opacity: '0.4'}, "slow");
      div.animate({width: '1000px', opacity: '1'}, "slow", function() {
        // Aquí se ejecuta al finalizar la animación
        div.animate({height: '400px', width: '600px'}, "slow");
      });
    });
  }
  
  

  agregarJugador() {
    const JUGADOR: Jugador = {
      jugador: this.jugadorForm.get('jugador')?.value,
      posicion: this.jugadorForm.get('posicion')?.value,
      equipo: this.jugadorForm.get('equipo')?.value,
      anotaciones: this.jugadorForm.get('anotaciones')?.value
    };

    if (this.id !== null) {
      this._jugadorService.editarJugador(this.id, JUGADOR).subscribe(data => {
          this.toastr.warning('El jugador fue actualizado con éxito', 'Jugador actualizado', {
            closeButton: true,
            progressBar: true,
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
          this.jugadorForm.reset();
        }
      );
    } else {
      console.log(JUGADOR);
      this._jugadorService.guardarJugador(JUGADOR).subscribe(data => {
          this.toastr.success('El jugador se ha registrado correctamente', 'Jugador Registrado', {
            closeButton: true,
            progressBar: true,
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar jugador';
      this._jugadorService.obtenerJugador(this.id).subscribe(data => {
        this.jugadorForm.setValue({
          jugador: data.jugador,
          posicion: data.posicion,
          equipo: data.equipo,
          anotaciones: data.anotaciones
        });
      });
    }
  }

}

