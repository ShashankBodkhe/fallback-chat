import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { AgentDataService } from "app/agent-data.service";

@Component({
  selector: 'agent-login',
  templateUrl: './agent-login.component.html',
  styleUrls: ['./agent-login.component.css']
})
export class AgentLoginComponent implements OnInit {

  agentId : any;
  password : string = '';
  agentService : AgentDataService;
  constructor(private router: Router, agentDataService : AgentDataService) { 
    this.agentService = agentDataService;
  }

  ngOnInit() {
    if(this.agentService.getAgentId().trim() !== ''){
      this.router.navigate(['/conversation']);
    }
  }

  redirect() {
    this.agentService.setAgentId(this.agentId);
    this.router.navigate(['/conversation']);
  }

}
