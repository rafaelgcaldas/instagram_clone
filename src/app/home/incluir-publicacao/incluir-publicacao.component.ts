import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms'
import * as firebase from 'firebase'
import { Bd } from '../../bd.service'

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string
  public imagem: any

  public formulario: FormGroup = new FormGroup({
    "titulo": new FormControl(null)
  })

  constructor(private bdService: Bd) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void {
    this.bdService.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })
  }

  public preparaImageUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
