import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms'
import * as firebase from 'firebase'
import { interval, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { Bd } from '../../bd.service'
import { Progresso } from '../../progresso.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string
  public imagem: any
  public progressoPublicacao: string = "pendente"
  public porcentagemUpload: number

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()

  public formulario: FormGroup = new FormGroup({
    "titulo": new FormControl(null)
  })

  constructor(
    private bdService: Bd,
    private progressoService: Progresso
  ) { }

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

    let acompanhamentoUpload = interval(1500)

    let continua = new Subject()
    continua.next(true)

    acompanhamentoUpload.pipe(
      takeUntil(continua))
      .subscribe(() => {

        this.progressoPublicacao = 'andamento'

        this.porcentagemUpload = Math.round((this.progressoService.estado.bytesTransferred / this.progressoService.estado.totalBytes) * 100) 

        if(this.progressoService.status === 'concluido') {
          this.progressoPublicacao = 'concluido'

          // emitir um evento do componente pai
          this.atualizarTimeLine.emit()
          continua.next(false)

          setTimeout(() => {
            this.progressoPublicacao = 'pendente'
            this.formulario.reset()
          }, 3000);
        }
      })
  }

  public preparaImageUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
