import { Injectable } from '@angular/core';

@Injectable()
export class AgentDataService {
  agentId :string = '';
  constructor() { }

  getAgentId() {
    return this.agentId;
  }

  setAgentId(agentId: string) {
    this.agentId = agentId;
  }

}
