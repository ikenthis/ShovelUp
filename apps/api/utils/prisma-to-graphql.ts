// utils/prisma-to-graphql.ts
import { Professional as PrismaProfessional } from '@prisma/client';
import { Professional } from '../src/professional/entities/professional.entity';

// Helper function to safely convert Decimal or number to number
function safeToNumber(value: any): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return value;
  if (value && typeof value.toNumber === 'function') return value.toNumber();
  return Number(value);
}

export function convertPrismaProfessionalToGraphQL(
  prismaProfessional: PrismaProfessional
): Professional {
  return {
    ...prismaProfessional,
    reputationScore: safeToNumber(prismaProfessional.reputationScore) ?? 0,
    contributionScore: safeToNumber(prismaProfessional.contributionScore) ?? 0,
    mentorshipScore: safeToNumber(prismaProfessional.mentorshipScore) ?? 0,
    helpfulnessRating: safeToNumber(prismaProfessional.helpfulnessRating) ?? 0,
    responseTime: safeToNumber(prismaProfessional.responseTime),
    hourlyRate: safeToNumber(prismaProfessional.hourlyRate),
  };
}