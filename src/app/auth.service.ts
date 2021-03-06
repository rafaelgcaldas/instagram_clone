import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase'

@Injectable()
export class Auth {

    constructor(private router: Router){}

    public token_id: string

    public cadastrarUsuario(usuario: Usuario): Promise<any> {

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                // removendo o atributo senha do objeto usuario
                delete usuario.senha

                // registrando dados complementares do usuario no path email na base64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set( usuario )
            })
            .catch((error: Error) => {
                console.log(error)
            })
    }

    public login(email: string, senha: string): Promise<any> {

        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem("idToken", idToken)
                        this.router.navigate(["/home"])
                    })
                resolve(resposta)
            })
            .catch((error: Error) => reject(error))
        })
    }

    public autenticado(): boolean {

        if(this.token_id === undefined && localStorage.getItem("idToken") != null){
            this.token_id = localStorage.getItem("idToken")
        }

        if(this.token_id === undefined){
            this.router.navigate(["/"])
        }
        
        return this.token_id !== undefined
    }

    public logout(): void {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem("idToken")
                this.token_id = undefined
                // this.router.navigate(["/"])
            })
    }
}