// prisma/seed.ts
import { seedPart1 } from './Seeds/seedpart1';
import { seedPart2 } from './Seeds/seedpart2';
import { seedPart3 } from './Seeds/seedpart3';
import { seedPart4 } from './Seeds/seedpart4';
import { seedPart5 } from './Seeds/seedpart5';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting complete database seed...');
  
  try {
    console.log('📦 Executing Part 1: Core Foundation Data...');
    const foundationData = await seedPart1();
    console.log('✅ Part 1 completed successfully');

    console.log('📦 Executing Part 2: Relationships and Projects...');
    const relationshipsData = await seedPart2(foundationData);
    console.log('✅ Part 2 completed successfully');

    console.log('📦 Executing Part 3: Social Features...');
    const socialData = await seedPart3(foundationData, relationshipsData);
    console.log('✅ Part 3 completed successfully');

    console.log('📦 Executing Part 4: Knowledge Management...');
    const knowledgeData = await seedPart4(foundationData, relationshipsData, socialData);
    console.log('✅ Part 4 completed successfully');

    console.log('📦 Executing Part 5: Supporting Entities...');
    const supportingData = await seedPart5(foundationData, relationshipsData, socialData, knowledgeData);
    console.log('✅ Part 5 completed successfully');

    console.log('🎉 Database seed completed successfully!');
    
    // Agregar conteo de registros para verificar
    const counts = {
      constellations: await prisma.constellation.count(),
      organizations: await prisma.organization.count(),
      professionals: await prisma.professional.count(),
      projects: await prisma.project.count(),
      posts: await prisma.post.count(),
    };
    console.log('📊 Records created:', counts);

  } catch (error) {
    console.error('❌ Error during database seed:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});