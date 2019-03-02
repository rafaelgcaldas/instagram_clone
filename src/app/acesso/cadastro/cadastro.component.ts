import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { Usuario } from '../usuario.model'
import { Auth } from '../../auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirLogin: EventEmitter<string> = new EventEmitter<string>()

  public error: any

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
    'nome_completo': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
    'nome_usuario': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
  })

  constructor( private authService: Auth ) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    this.exibirLogin.emit("login")
  }

  public cadastrarUsuario(): void {

    if (this.formulario.status === 'INVALID') {
      this.formulario.get("email").markAsTouched()
			this.formulario.get("nome_completo").markAsTouched()
			this.formulario.get("nome_usuario").markAsTouched()
			this.formulario.get("senha").markAsTouched()
    } else {
      let usuario = new Usuario(
        this.formulario.value.email,
        this.formulario.value.nome_completo,
        this.formulario.value.nome_usuario,
        this.formulario.value.senha
      )

      this.authService.cadastrarUsuario(usuario)
        .then(() => this.exibirPainelLogin())
    }
    
  }

}
