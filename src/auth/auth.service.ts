import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return { msg: 'I am signed ' };
  }

  signup() {
    return { msg: 'I am signed up' };
  }
}
