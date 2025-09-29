import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { Professional } from './entities/professional.entity';
import { CreateProfessionalInput } from './dto/create-professional.input';
import { UpdateProfessionalInput } from './dto/update-professional.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@Resolver(() => Professional)
export class ProfessionalResolver {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Mutation(() => Professional)
  @UseGuards(JwtAuthGuard)
  createProfessional(
    @Args('createProfessionalInput') createProfessionalInput: CreateProfessionalInput,
    @CurrentUser() currentUser: Professional
  ) {
    // Podrías usar currentUser.id para asociar datos o validar permisos
    return this.professionalService.create(createProfessionalInput);
  }

  @Query(() => [Professional], { name: 'professionals' })
  findAll() {
    return this.professionalService.findAll();
  }

  @Query(() => Professional, { name: 'professional' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.professionalService.findOne(id);
  }

  @Query(() => Professional, { name: 'myProfile' })
  @UseGuards(JwtAuthGuard)
  getMyProfile(@CurrentUser() currentUser: Professional): Professional {
    // Retorna directamente el usuario autenticado (más eficiente)
    return currentUser;
  }

  @Mutation(() => Professional)
  @UseGuards(JwtAuthGuard)
  updateProfessional(
    @Args('updateProfessionalInput') updateProfessionalInput: UpdateProfessionalInput,
    @CurrentUser() currentUser: Professional
  ) {
    // Asegurar que solo puedan actualizar su propio perfil
    return this.professionalService.update(currentUser.id, updateProfessionalInput);
  }

  @Mutation(() => Professional)
  @UseGuards(JwtAuthGuard)
  updateMyProfile(
    @Args('updateProfessionalInput') updateProfessionalInput: UpdateProfessionalInput,
    @CurrentUser() currentUser: Professional
  ) {
    // Mutación específica para actualizar el perfil propio
    return this.professionalService.update(currentUser.id, updateProfessionalInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  removeProfessional(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() currentUser: Professional
  ) {
    // Aquí podrías validar permisos (ej: solo admin o el mismo usuario)
    return this.professionalService.remove(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  deleteMyAccount(@CurrentUser() currentUser: Professional) {
    // Eliminar la cuenta propia
    return this.professionalService.remove(currentUser.id);
  }
}