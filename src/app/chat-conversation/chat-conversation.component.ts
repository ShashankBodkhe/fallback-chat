import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.css']
})
export class ChatConversationComponent implements OnInit {

  @Input()
  conversations;

  @Input()
  self;

  constructor() { }

  ngOnInit() {
    console.log('I am:' + self);
  }

}
