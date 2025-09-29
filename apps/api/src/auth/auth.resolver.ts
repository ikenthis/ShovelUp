import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signin.input';
import { RegisterInput } from './dto/register.input';
import { AuthPayload } from './entities/auth-payload.entity';
import { Professional } from '../professional/entities/professional.entity';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signIn(@Args('signInInput') signInInput: SignInInput): Promise<AuthPayload> {
    const user = await this.authService.validateLocalProfessional(signInInput);
    return await this.authService.login(user);
  }

  @Mutation(() => AuthPayload)
  async register(@Args('registerInput') registerInput: RegisterInput): Promise<AuthPayload> {
    const user = await this.authService.register(registerInput);
    return await this.authService.login(user);
  }

  @Query(() => Professional)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: Professional): Promise<Professional> {
    // El usuario ya viene completo del JWT strategy, no necesitamos otra consulta
    return user;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async logout(@CurrentUser() user: Professional): Promise<boolean> {
    // JWT es stateless, así que solo retornamos true
    // En el frontend eliminarán el token del storage
    return true;
  }

  @Mutation(() => AuthPayload)
  async refreshToken(@Args('token') refreshToken: string): Promise<AuthPayload> {
    return await this.authService.refreshAccessToken(refreshToken);
  }
}