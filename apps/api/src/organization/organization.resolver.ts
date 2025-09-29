// apps/api/src/organization/organization.resolver.ts
import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent, Int } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { OrganizationFilterInput } from './dto/organization-filter.input';
import { OrganizationPaginationInput } from './dto/pagination.input';
import { createPaginatedResponse } from '../common/dtos/pagination.response';
import type { OrganizationWithCounts } from './types/organization.types';

// Create paginated response type for Organizations
const PaginatedOrganizations = createPaginatedResponse(Organization, 'Organizations');

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  // Mutations
  @Mutation(() => Organization, { description: 'Create a new organization' })
  async createOrganization(
    @Args('createOrganizationInput') createOrganizationInput: CreateOrganizationInput
  ) {
    return this.organizationService.create(createOrganizationInput);
  }

  @Mutation(() => Organization, { description: 'Update an existing organization' })
  async updateOrganization(
    @Args('updateOrganizationInput') updateOrganizationInput: UpdateOrganizationInput
  ) {
    return this.organizationService.update(updateOrganizationInput.id, updateOrganizationInput);
  }

  @Mutation(() => Organization, { description: 'Soft delete an organization' })
  async removeOrganization(@Args('id', { type: () => ID }) id: string) {
    return this.organizationService.remove(id);
  }

  @Mutation(() => Organization, { description: 'Verify an organization' })
  async verifyOrganization(
    @Args('id', { type: () => ID }) id: string,
    @Args('verifiedBy') verifiedBy: string
  ) {
    return this.organizationService.verifyOrganization(id, verifiedBy);
  }

  @Mutation(() => Organization, { description: 'Remove verification from an organization' })
  async unverifyOrganization(@Args('id', { type: () => ID }) id: string) {
    return this.organizationService.unverifyOrganization(id);
  }

  @Mutation(() => Number, { description: 'Recalculate and update organization reputation score' })
  async updateOrganizationReputationScore(@Args('id', { type: () => ID }) id: string) {
    return this.organizationService.updateReputationScore(id);
  }

  // Queries
  @Query(() => PaginatedOrganizations, { 
    name: 'organizations',
    description: 'Get paginated list of organizations with optional filters'
  })
  async findAllOrganizations(
    @Args('filter', { nullable: true }) filter?: OrganizationFilterInput,
    @Args('pagination', { nullable: true }) pagination?: OrganizationPaginationInput
  ) {
    return this.organizationService.findAll(filter, pagination);
  }

  @Query(() => Organization, { 
    name: 'organization',
    description: 'Get a single organization by ID'
  })
  async findOneOrganization(@Args('id', { type: () => ID }) id: string) {
    return this.organizationService.findOne(id);
  }

  @Query(() => Organization, { 
    name: 'organizationBySlug',
    description: 'Get a single organization by slug'
  })
  async findOrganizationBySlug(@Args('slug') slug: string) {
    return this.organizationService.findBySlug(slug);
  }

  @Query(() => [Organization], { 
    name: 'searchOrganizations',
    description: 'Search organizations by name, description, or specialties'
  })
  async searchOrganizations(
    @Args('query') query: string,
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit: number
  ) {
    return this.organizationService.searchOrganizations(query, limit);
  }

  @Query(() => [Organization], { 
    name: 'topOrganizations',
    description: 'Get top-rated verified organizations'
  })
  async getTopOrganizations(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number
  ) {
    return this.organizationService.getTopOrganizations(limit);
  }

  // Field Resolvers for computed fields
  @ResolveField(() => Int, { description: 'Number of active professionals in this organization' })
  async membersCount(@Parent() organization: OrganizationWithCounts): Promise<number> {
    // Check if count is already included from the query
    if (organization._count?.professionals !== undefined) {
      return organization._count.professionals;
    }
    // Otherwise, fetch it
    return this.organizationService.getMembersCount(organization.id);
  }

  @ResolveField(() => Int, { description: 'Total number of projects this organization is involved in' })
  async projectsCount(@Parent() organization: OrganizationWithCounts): Promise<number> {
    // Check if count is already included from the query
    if (organization._count?.projects !== undefined) {
      return organization._count.projects;
    }
    // Otherwise, fetch it
    return this.organizationService.getProjectsCount(organization.id);
  }

  @ResolveField(() => Int, { description: 'Number of constellations this organization participates in' })
  async constellationsCount(@Parent() organization: OrganizationWithCounts): Promise<number> {
    // Check if count is already included from the query
    if (organization._count?.constellations !== undefined) {
      return organization._count.constellations;
    }
    // Otherwise, fetch it
    return this.organizationService.getConstellationsCount(organization.id);
  }

  @ResolveField(() => Int, { description: 'Number of active collaborations with other organizations' })
  async collaborationsCount(@Parent() organization: OrganizationWithCounts): Promise<number> {
    // Calculate from both collaboration directions if available
    const collaborationsA = organization._count?.collaborations || 0;
    const collaborationsB = organization._count?.collaboratedWith || 0;
    
    if (collaborationsA > 0 || collaborationsB > 0) {
      return collaborationsA + collaborationsB;
    }
    
    // Otherwise, fetch it
    return this.organizationService.getCollaborationsCount(organization.id);
  }
}