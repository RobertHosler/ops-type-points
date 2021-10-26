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

  refreshing = false;

  refreshMsg = '';

  pw: string;

  constructor(private socket: Socket) {
    this.socket.on('refreshComplete', (result) => {
      this.refreshing = false;
      var endTime = performance.now()
      this.refreshMsg = 'Refresh Complete in ' + Math.round(endTime / 10)/100 + ' seconds';
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
    var startTime = performance.now();
    this.refreshMsg = 'Refreshing';
    this.socket.emit('refresh');
  }

  auth() {
    this.authMsg = '';
    this.socket.emit("authenticate", this.pw);
 
  }

}
