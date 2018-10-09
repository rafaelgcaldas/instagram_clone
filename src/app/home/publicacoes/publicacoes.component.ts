import { Component, OnInit } from '@angular/core';
import { Bd } from '../../bd.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public publicacoes: any

  constructor(private bdService: Bd) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => { 
      this.atualizarTimeLine(user.email)
    })
  }

  public atualizarTimeLine(email: string): void {
    this.bdService.consultaPublicacoes(email)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes
        console.log(this.publicacoes)
      })
  }

}
