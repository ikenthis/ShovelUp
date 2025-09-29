import { Module } from '@nestjs/common';
import { InnovationService } from './services/innovation/innovation.service';
import { LessonLearnedService } from './services/lesson-learned/lesson-learned.service';
import { InnovationResolver } from './resolvers/innovation/innovation.resolver';
import { LessonLearnedResolver } from './resolvers/lesson-learned/lesson-learned.resolver';

@Module({
  providers: [InnovationService, LessonLearnedService, InnovationResolver, LessonLearnedResolver]
})
export class KnowledgeModule {}
