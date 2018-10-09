import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

    constructor(private progressoService: Progresso){}

    public publicar(publicacao: any): void {

        

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {

                let nomeImagem = resposta.key
                
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
                        () => {  //Finalização do processo
                            this.progressoService.status = "concluido"
                        }
                    )
            })

        
    }

    public consultaPublicacoes(emailUsario: string): Promise<any> {

        return new Promise((resolve, reject) => {

            // Consultar as publicações (database)
            firebase.database().ref(`publicacoes/${btoa(emailUsario)}`)
            .once('value')
            .then((snapshot: any) => {

                let publicacoes: Array<any> = []

                snapshot.forEach((childSnapshot: any) => {

                    let publicacao = childSnapshot.val()

                    // consultar a url da imagem (storage)
                    firebase.storage().ref()
                        .child(`imagens/${childSnapshot.key}`)
                        .getDownloadURL()
                        .then((url: string) => {
                            publicacao.urlImagem = url

                            // consultar o nome do usuario
                            firebase.database().ref(`usuario_detalhe/${btoa(emailUsario)}`)
                                .once('value')
                                .then((snapshot: any) => {
                                    publicacao.nomeUsuario = snapshot.val().nome_usuario
                                    publicacoes.push(publicacao)
                                })
                        })
                })
                resolve(publicacoes)
            })
        })
    }
}