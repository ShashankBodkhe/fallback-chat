import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
      let socket = io();
      socket.on('time', function(timeString) {
        console.log('Server time: ' + timeString);
      });
    }

  title = 'app';
}
