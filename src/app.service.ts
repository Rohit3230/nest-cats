import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Its Rohit (A MEAN Stack Developer) From Here.';
  }
}
