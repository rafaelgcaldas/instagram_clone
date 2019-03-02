import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Usuario } from '../usuario.model';
import { Auth } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()
  public erro: any = ""

  public form: FormGroup = new FormGroup({
    "email" : new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
  })

  constructor(private authService: Auth) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit("cadastro")
  }

  public autenticar(): void {
    if (this.form.status === "INVALID"){
      this.form.get("email").markAsTouched(),
      this.form.get("senha").markAsTouched()
    } else {
      this.authService.login( this.form.value.email, this.form.value.senha )
        .catch((erro: any) => {
          this.erro = erro
        })
    }
  }

}
