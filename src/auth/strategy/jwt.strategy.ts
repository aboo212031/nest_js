import { Injectable, PayloadTooLargeException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    
    constructor(config: ConfigService) {
        const jwtSecret = config.get('JWT_SECRET');

        if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
        }
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
        });
    }
 
    async validate(payload: any) {
    return { payload };
  }

 }