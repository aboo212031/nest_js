import { Injectable } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaModule){}
  signin() {
    return { msg: 'I am signed in' };
  }

  signup() {
    return { msg: 'I am signed up' };
  }
}
