// apps/api/src/organization/types/organization.types.ts
import { Organization } from '@prisma/client';

// Extended Organization type with Prisma counts
export interface OrganizationWithCounts extends Organization {
  _count?: {
    professionals?: number;
    projects?: number;
    constellations?: number;
    collaborations?: number;
    collaboratedWith?: number;
    posts?: number;
  };
}