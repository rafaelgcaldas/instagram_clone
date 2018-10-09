import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    let config = {
      apiKey: "AIzaSyAUqrTErTveVGZ4FaeSR7FsO92IX80KFEw",
      authDomain: "jta-clone-instagram.firebaseapp.com",
      databaseURL: "https://jta-clone-instagram.firebaseio.com",
      projectId: "jta-clone-instagram",
      storageBucket: "jta-clone-instagram.appspot.com",
      messagingSenderId: "253019515539"
    };
    firebase.initializeApp(config)
  }
}
