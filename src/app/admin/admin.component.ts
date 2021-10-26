import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  authenticated = false;
  authMsg = '';
  pw: string;

  refreshing = false;
  refreshMsg = '';
  refreshStart;

  constructor(private socket: Socket) {
    this.socket.on('refreshComplete', (result) => {
      this.refreshing = false;
      let refreshTime = performance.now() - this.refreshStart;
      this.refreshMsg = 'Refresh Complete in ' + Math.round(refreshTime / 10)/100 + ' seconds';
    });
    this.socket.on('authenticateComplete', (result) => {
      this.authenticated = result;
      if (!this.authenticated) {
        this.authMsg = 'Authentication failed';
      }
    });
  }

  ngOnInit(): void {
  }

  refresh() {
    this.refreshing = true;
    this.refreshStart = performance.now();
    this.refreshMsg = 'Refreshing';
    this.socket.emit('refresh');
  }

  auth() {
    this.authMsg = '';
    this.socket.emit("authenticate", this.pw);
 
  }

}
