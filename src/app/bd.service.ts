import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

    constructor(private progressoService: Progresso){}

    public publicar(publicacao: any): void {
        // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        //     .push({ titulo: publicacao.titulo })

        let nomeImagem = Date.now()

        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot: any) => { // Acompanhamento do progresso o Upload
                    this.progressoService.status = "andamento"
                    this.progressoService.estado = snapshot
                }, 
                (error) => { 
                    this.progressoService.status = "erro"
                },
                () => {  //Fianlização do processo
                    this.progressoService.status = "concluido"
                }
            )
    }
}