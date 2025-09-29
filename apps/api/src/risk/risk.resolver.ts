import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RiskService } from './risk.service';
import { RiskFactor } from './entities/risk-factor.entity';
import { CreateRiskInput } from './dto/create-risk.input';
import { UpdateRiskInput } from './dto/update-risk.input';

@Resolver(() => RiskFactor)
export class RiskResolver {
  constructor(private readonly riskService: RiskService) {}

  @Mutation(() => RiskFactor)
  createRisk(@Args('createRiskInput') createRiskInput: CreateRiskInput) {
    return this.riskService.create(createRiskInput);
  }

  @Query(() => [RiskFactor], { name: 'risk' })
  findAll() {
    return this.riskService.findAll();
  }

  @Query(() => RiskFactor, { name: 'risk' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.riskService.findOne(id);
  }

  @Mutation(() => RiskFactor)
  updateRisk(@Args('updateRiskInput') updateRiskInput: UpdateRiskInput) {
    return this.riskService.update(updateRiskInput.id, updateRiskInput);
  }

  @Mutation(() => RiskFactor)
  removeRisk(@Args('id', { type: () => Int }) id: number) {
    return this.riskService.remove(id);
  }
}
