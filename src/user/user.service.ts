import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}


    async editUser(userId: number, dto: EditUserDto){
        const user = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data : {
                ...dto,
            }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }
        const { hash, ...userWithoutHash } = user;

        return userWithoutHash;
    }
}
