import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Usuario } from '../usuario.model';
import { Auth } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public form: FormGroup = new FormGroup({
    "email" : new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(private authService: Auth) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit("cadastro")
  }

  public autenticar(): void {
    this.authService.login( this.form.value.email, this.form.value.senha )
  }

}
