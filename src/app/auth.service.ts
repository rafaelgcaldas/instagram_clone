import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase'

export class Auth {
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

    public login(email: string, senha: string): void {
        console.log("email: ", email)
        console.log("senha: ", senha)
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => console.log(resposta))
            .catch((error: Error) => console.log(error))
    }
}