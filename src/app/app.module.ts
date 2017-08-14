import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';
import { AgentLoginComponent } from './agent-login/agent-login.component';
import { AgentDataService } from "app/agent-data.service";

const appRoutes: Routes = [
  { path: 'user-login', component: AgentLoginComponent },
  { path: 'conversation', component: ChatWindowComponent },
  { path: '', redirectTo: '/user-login',pathMatch:'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ChatWindowComponent,
    ChatConversationComponent,
    AgentLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [AgentDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
