import { Injectable } from '@angular/core';
import { LogFormatterService } from '@flight-workspace/logger-lib';
    // ^^^ Perhaps you have to type this manually

@Injectable()
export class CustomLogFormatterService implements LogFormatterService {
  
    format(message: string): string {
        const now = new Date().toISOString();
        return `[${now}] ${message}`;
    }

}