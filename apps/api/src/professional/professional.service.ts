import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfessionalInput } from './dto/create-professional.input';
import { UpdateProfessionalInput } from './dto/update-professional.input';
import { Professional } from './entities/professional.entity';
import { convertPrismaProfessionalToGraphQL } from '../../utils/prisma-to-graphql';

@Injectable()
export class ProfessionalService {
  constructor(private prisma: PrismaService) {}

  async create(createProfessionalInput: CreateProfessionalInput): Promise<Professional> {
    const professionalFromDb = await this.prisma.professional.create({
      data: createProfessionalInput,
    });
    
    return convertPrismaProfessionalToGraphQL(professionalFromDb);
  }

  async findAll(): Promise<Professional[]> {
    const professionalsFromDb = await this.prisma.professional.findMany({
      where: { isActive: true }, // Solo profesionales activos
      orderBy: { createdAt: 'desc' },
    });
    
    return professionalsFromDb.map(professional => 
      convertPrismaProfessionalToGraphQL(professional)
    );
  }

  async findOne(id: string): Promise<Professional | null> {
    const professionalFromDb = await this.prisma.professional.findUnique({
      where: { 
        id,
        isActive: true // Solo si está activo
      },
    });

    if (!professionalFromDb) {
      return null;
    }
    
    return convertPrismaProfessionalToGraphQL(professionalFromDb);
  }

  async findByEmail(email: string): Promise<Professional | null> {
    const professionalFromDb = await this.prisma.professional.findUnique({
      where: { 
        email,
        isActive: true // Solo si está activo
      },
    });

    if (!professionalFromDb) {
      return null;
    }
    
    return convertPrismaProfessionalToGraphQL(professionalFromDb);
  }

  async update(id: string, updateProfessionalInput: UpdateProfessionalInput): Promise<Professional> {
    const professionalFromDb = await this.prisma.professional.update({
      where: { id },
      data: {
        ...updateProfessionalInput,
        updatedAt: new Date(), // Actualizar timestamp
      },
    });
    
    return convertPrismaProfessionalToGraphQL(professionalFromDb);
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.professional.update({
        where: { id },
        data: { 
          isActive: false,
          updatedAt: new Date(),
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Métodos adicionales útiles
  async findById(id: string): Promise<Professional | null> {
    return this.findOne(id);
  }

  async searchProfessionals(searchTerm: string): Promise<Professional[]> {
    const professionalsFromDb = await this.prisma.professional.findMany({
      where: {
        isActive: true,
        OR: [
          { firstName: { contains: searchTerm, mode: 'insensitive' } },
          { lastName: { contains: searchTerm, mode: 'insensitive' } },
          { displayName: { contains: searchTerm, mode: 'insensitive' } },
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { bio: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      orderBy: { reputationScore: 'desc' },
    });

    return professionalsFromDb.map(professional => 
      convertPrismaProfessionalToGraphQL(professional)
    );
  }

  async getProfessionalsByDiscipline(discipline: string): Promise<Professional[]> {
    const professionalsFromDb = await this.prisma.professional.findMany({
      where: {
        isActive: true,
        discipline: discipline as any, // Cast to enum type
      },
      orderBy: { reputationScore: 'desc' },
    });

    return professionalsFromDb.map(professional => 
      convertPrismaProfessionalToGraphQL(professional)
    );
  }

  async updateLastActiveAt(id: string): Promise<void> {
    await this.prisma.professional.update({
      where: { id },
      data: { lastActiveAt: new Date() },
    });
  }
}