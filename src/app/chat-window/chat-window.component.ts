import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as io from 'socket.io-client';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  @ViewChild('chatMessage') input;
  fallBack = true;
  socket;
  chat_messages=[];

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
      this.chat_messages.push(message);
    });
  }


  sendMessage(message){
    let body = {query : message,sender:this.socket.username};
    this.socket.emit('new_message',body);
    this.input.nativeElement.value = '';
  }

}
