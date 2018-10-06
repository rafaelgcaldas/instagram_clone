import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'

import { Usuario } from '../usuario.model'
import { Auth } from '../../auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirLogin: EventEmitter<string> = new EventEmitter<string>()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor( private authService: Auth ) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    this.exibirLogin.emit("login")
  }

  public cadastrarUsuario(): void {

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
