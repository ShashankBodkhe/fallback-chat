import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as io from 'socket.io-client';
import { AgentDataService } from "app/agent-data.service";
import { Router } from "@angular/router";

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
  agentService: AgentDataService;
  constructor(private router: Router, private http: HttpClient,_agentDataService : AgentDataService) {
    this.agentService = _agentDataService;
  }

  ngOnInit() {
    if(this.agentService.getAgentId().trim() === ''){
      this.router.navigate(['/user-login']);
    }else{
      this.socket = io.connect();
      this.socket.on('socket_initialized', (info) => {
        let socket = this.socket;
        socket.username = this.agentService.getAgentId();
      });

      this.socket.on('get_message',(message)=>{
        this.chat_messages.push(message);
      });
    }
  }


  sendMessage(message){
    let body = {query : message,sender:this.socket.username};
    this.socket.emit('new_message',body);
    this.input.nativeElement.value = '';
  }

  gotoLogin() {
    this.agentService.setAgentId('');
    this.router.navigate(['/user-login']);
  }

}
