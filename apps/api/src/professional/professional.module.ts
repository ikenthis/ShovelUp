import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalResolver } from './professional.resolver';
import { PrismaModule } from '../prisma/prisma.module'; // Agrega esta importación

@Module({
  imports: [PrismaModule], // Agrega esta línea
  providers: [ProfessionalResolver, ProfessionalService],
})
export class ProfessionalModule {}