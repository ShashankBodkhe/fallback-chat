import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as io from 'socket.io-client';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  fallBack = true;
  socket;

  constructor(private http: HttpClient) { 
  
  }

  ngOnInit() { 
    if(this.socket && this.socket.username){

    }else{
      this.socket = io.connect();
      
    }
  
    this.socket.on('socket_initialized', (info) => {
      let socket = this.socket;
      socket.username = info.username;
    });
    
    this.socket.on('get_message',(message)=>{
      if(message.sender != this.socket.username) {
        console.log('new message from :' + message.sender);
        console.log('new message is :' + message.query);
      }
    });
  }


  sendMessage(message){
    const body = {query : message,sender:this.socket.username};
    if(!this.fallBack) {

    }else {
      this.socket.emit('new_message',body);
    }
  }

}
