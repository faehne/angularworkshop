import { shareNgZone } from '@angular-architects/module-federation-tools';
import {Component, NgZone} from '@angular/core';
import { LoggerService } from '@flight-workspace/logger-lib';
import { AuthLibService } from '@flight-workspace/shared/auth-lib';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private loggerService: LoggerService,
    private authService: AuthLibService,
    private ngZone: NgZone
  ) {
    shareNgZone(ngZone);
    this.authService.login('Max', '');
    this.loggerService.log('log');
    this.loggerService.debug('debug');
  }
}
