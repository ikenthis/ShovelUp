import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInInput } from './dto/signin.input';
import { RegisterInput } from './dto/register.input';
import { PrismaService } from '../prisma/prisma.service';
import { verify, hash } from 'argon2';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { Professional } from '@prisma/client';
import { AuthPayload } from './entities/auth-payload.entity';
import { Professional as GraphQLProfessional } from '../professional/entities/professional.entity';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService, 
        private jwtService: JwtService
    ) {}

    async validateLocalProfessional({ email, password }: SignInInput) {
        const professional = await this.prismaService.professional.findUnique({
            where: {
                email,
                isActive: true
            }
        });
        
        if (!professional) throw new UnauthorizedException('Invalid credentials');

        const passwordMatched = await verify(professional.password, password);

        if (!passwordMatched) throw new UnauthorizedException('Invalid credentials');

        return professional;
    }

    async register(registerInput: RegisterInput) {
        const { email, password, firstName, lastName, discipline, ...rest } = registerInput;

        // Check if professional already exists
        const existingProfessional = await this.prismaService.professional.findUnique({
            where: { email },
        });

        if (existingProfessional) {
            throw new ConflictException('Professional with this email already exists');
        }

        // Generate username from email
        const username = email.split('@')[0] + '_' + Date.now();

        // Hash password
        const hashedPassword = await hash(password);

        // Create professional
        const professional = await this.prismaService.professional.create({
            data: {
                email,
                username,
                firstName,
                lastName,
                discipline,
                password: hashedPassword,
                emailVerified: false,
                isActive: true,
                ...rest,
            },
        });

        return professional;
    }

    async generateJwtToken(professionalId: string) {
        const payload: AuthJwtPayload = { sub: professionalId };
        const accessToken = await this.jwtService.signAsync(payload);
        
        return { accessToken };
    }

    private transformProfessionalForGraphQL(professional: any): GraphQLProfessional {
        const { password, ...professionalWithoutPassword } = professional;
        
        return {
            ...professionalWithoutPassword,
            hourlyRate: professional.hourlyRate ? Number(professional.hourlyRate) : null,
        } as GraphQLProfessional;
    }

    async login(professional: Professional): Promise<AuthPayload> {
        const { accessToken } = await this.generateJwtToken(professional.id);

        // Update last login time
        await this.prismaService.professional.update({
            where: { id: professional.id },
            data: { lastActiveAt: new Date() }
        });

        return {
            access_token: accessToken,
            user: this.transformProfessionalForGraphQL(professional)
        };
    }

    async findById(id: string) {
        const professional = await this.prismaService.professional.findUnique({
            where: { id },
        });

        if (!professional) return null;

        return this.transformProfessionalForGraphQL(professional);
    }

    async validateJwtPayload(payload: AuthJwtPayload) {
        const professional = await this.prismaService.professional.findUnique({
            where: { id: payload.sub, isActive: true },
        });

        if (!professional) throw new UnauthorizedException('Invalid token');

        return this.transformProfessionalForGraphQL(professional);
    }

    async refreshAccessToken(refreshToken: string): Promise<AuthPayload> {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const professional = await this.prismaService.professional.findUnique({
                where: { id: payload.sub }
            });
            
            if (!professional) {
                throw new UnauthorizedException('Professional not found');
            }

            return this.login(professional);
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}