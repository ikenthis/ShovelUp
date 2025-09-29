import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PostModule } from './post/post.module';
import { OrganizationModule } from './organization/organization.module';
import { ProjectModule } from './project/project.module';
import { ProjectPhaseModule } from './project-phase/project-phase.module';
import { TaskModule } from './task/task.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProfessionalModule } from './professional/professional.module';
import { KnowledgeModule } from './modules/knowledge/knowledge.module';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { RiskModule } from './risk/risk.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PostModule,
    OrganizationModule,
    ProjectModule,
    ProjectPhaseModule,
    TaskModule,
    TagModule,
    AuthModule,
    ProfessionalModule,
    KnowledgeModule,
    RiskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
