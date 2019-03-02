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
      apiKey: "AIzaSyCFi5I2eDNEjuSCepkfH2d8oLdsE_85JjA",
      authDomain: "clone-instagram-b0dd8.firebaseapp.com",
      databaseURL: "https://clone-instagram-b0dd8.firebaseio.com",
      projectId: "clone-instagram-b0dd8",
      storageBucket: "clone-instagram-b0dd8.appspot.com",
      messagingSenderId: "899339049781"
    };
    firebase.initializeApp(config)
  }
}
