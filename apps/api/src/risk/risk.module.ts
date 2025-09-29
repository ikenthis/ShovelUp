import { Module } from '@nestjs/common';
import { RiskService } from './risk.service';
import { RiskResolver } from './risk.resolver';

@Module({
  providers: [RiskResolver, RiskService],
})
export class RiskModule {}
