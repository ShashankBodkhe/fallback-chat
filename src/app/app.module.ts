import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatWindowComponent,
    ChatConversationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
