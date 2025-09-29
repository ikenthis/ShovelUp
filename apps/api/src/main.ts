import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SocialBuildEnumRegistry } from './common/enums/registry';

async function bootstrap() {

  // Register al GraphQL Enums
  console.log('🏗️  Initializing SocialBuild CMS API... API service...');
  SocialBuildEnumRegistry.registerAll();
  console.log('✅  SocialBuild CMS API initialized successfully.');

  //Log enum registry for debugging
  const stats = SocialBuildEnumRegistry.getStats();
  console.log(`  Enum  Registry Stats`, stats);

  // Start the server
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  //enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });


  const port = process.env.PORT || 9500;
  await app.listen(port);
  
  console.log(`🚀 SocialBuild API running on: http://localhost:${port}`);
  console.log(`🎮 GraphQL Playground: http://localhost:${port}/graphql`);
}
bootstrap().catch((error) => {
  console.error('❌ Failed to start SocialBuild API:', error);
  process.exit(1);
});