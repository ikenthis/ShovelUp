import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from '../auth.service';
import { Professional } from '../../professional/entities/professional.entity';
import { convertPrismaProfessionalToGraphQL } from '../../../utils/prisma-to-graphql';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private prismaService: PrismaService,
        private authService: AuthService
    ) {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not set');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: AuthJwtPayload): Promise<Professional> {
        // Find the professional user in the database
        const professionalFromDb = await this.prismaService.professional.findUnique({
            where: { 
                id: payload.sub,
                isActive: true 
            }
        });

        if (!professionalFromDb) {
            throw new UnauthorizedException('Professional not found or inactive');
        }

        // Convert Prisma types to GraphQL-compatible types
        return convertPrismaProfessionalToGraphQL(professionalFromDb);
    }
}