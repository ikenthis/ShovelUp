import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Part 5: Supporting Entities (Milestones, Risk Factors, Attachments, Achievements, etc.)
async function seedPart5(foundationData: any, relationshipsData: any, socialData: any, knowledgeData: any) {
  console.log('🏆 Seeding Part 5: Supporting Entities...');

  const { professionals } = foundationData;
  const { projects } = relationshipsData;
  const { posts } = socialData;
  const { lessonsLearned, innovations } = knowledgeData;

  // Create Project Dependencies
  const dependency1 = await prisma.projectDependency.create({
    data: {
      dependentId: projects[0].id, // Smart Plaza Central depends on
      requiredId: projects[1].id,  // Residential Tower Alpha (infrastructure)
      dependencyType: 'TECHNICAL_DEPENDENCY',
      description: 'La infraestructura eléctrica del tower alpha debe completarse antes de conectar sistemas IoT de la plaza',
      criticalPath: true,
      leadTime: 14, // Days
      bufferTime: 5,
      status: 'PENDING',
      createdBy: professionals[0].id // Carlos
    }
  });

  const dependency2 = await prisma.projectDependency.create({
    data: {
      dependentId: projects[2].id, // Heritage Pavilion depends on
      requiredId: projects[0].id,  // Smart Plaza Central (design approval)
      dependencyType: 'REGULATORY_DEPENDENCY',
      description: 'La aprobación de diseño inteligente para la plaza establece precedente para el pabellón patrimonial',
      criticalPath: false,
      leadTime: 21,
      bufferTime: 10,
      status: 'IN_PROGRESS',
      createdBy: professionals[1].id // Ana
    }
  });

  // Create Milestones
  const milestone1 = await prisma.milestone.create({
    data: {
      name: 'Instalación Completa de Sensores IoT',
      description: 'Instalación y configuración de todos los sensores IoT en Smart Plaza Central con pruebas de conectividad',
      targetDate: new Date('2024-06-15'),
      status: 'PENDING',
      progressPercentage: 65.0,
      isRequired: true,
      weight: 1.5,
      projectId: projects[0].id,
      dependencies: [], // No milestone dependencies yet
      createdBy: professionals[0].id
    }
  });

  const milestone2 = await prisma.milestone.create({
    data: {
      name: 'Certificación BREEAM Excellent',
      description: 'Obtención de certificación BREEAM Excellent para Residential Tower Alpha',
      targetDate: new Date('2024-09-30'),
      actualDate: new Date('2024-09-28'), // Completed early
      status: 'COMPLETED',
      progressPercentage: 100.0,
      isRequired: true,
      weight: 2.0,
      projectId: projects[1].id,
      dependencies: [],
      createdBy: professionals[0].id
    }
  });

  const milestone3 = await prisma.milestone.create({
    data: {
      name: 'Aprobación Patrimonio Nacional',
      description: 'Aprobación final de diseño de restauración por parte de Patrimonio Nacional',
      targetDate: new Date('2024-05-20'),
      status: 'IN_PROGRESS',
      progressPercentage: 80.0,
      isRequired: true,
      weight: 3.0, // Very important
      projectId: projects[2].id,
      dependencies: [],
      createdBy: professionals[1].id
    }
  });

  const milestone4 = await prisma.milestone.create({
    data: {
      name: 'Sistema HVAC Inteligente Operativo',
      description: 'Sistema HVAC con IA predictiva completamente operativo en Residential Tower Alpha',
      targetDate: new Date('2024-08-10'),
      actualDate: new Date('2024-08-08'),
      status: 'COMPLETED',
      progressPercentage: 100.0,
      isRequired: false,
      weight: 1.2,
      projectId: projects[1].id,
      dependencies: [],
      createdBy: professionals[2].id
    }
  });

  // Create Risk Factors
  const risk1 = await prisma.riskFactor.create({
    data: {
      name: 'Retrasos en Aprobaciones Patrimoniales',
      description: 'Posibles retrasos en aprobaciones de patrimonio que pueden afectar cronograma general del proyecto',
      category: 'REGULATORY',
      probability: 0.4, // 40% chance
      impact: 0.8, // High impact if occurs
      riskScore: 0.32, // probability * impact
      mitigation: 'Presentación temprana de documentación, consulta previa con autoridades, plan de contingencia con diseños alternativos',
      contingency: 'Implementar fases alternativas que no requieren aprobación patrimonial mientras se procesan permisos',
      owner: professionals[1].id, // Ana owns this risk
      status: 'IDENTIFIED',
      priority: 'HIGH',
      targetDate: new Date('2024-05-30'),
      projectId: projects[2].id,
      identifiedBy: professionals[1].id
    }
  });

  const risk2 = await prisma.riskFactor.create({
    data: {
      name: 'Interferencias Electromagnéticas en Sistemas IoT',
      description: 'Posibles interferencias entre sistemas IoT y infraestructura urbana existente',
      category: 'TECHNICAL',
      probability: 0.3,
      impact: 0.6,
      riskScore: 0.18,
      mitigation: 'Análisis de espectro electromagnético, pruebas de compatibilidad, selección de frecuencias libres',
      contingency: 'Sistemas de respaldo con protocolos alternativos, redundancia en comunicaciones críticas',
      owner: professionals[2].id, // Miguel owns technical risks
      status: 'MONITORING',
      priority: 'MEDIUM',
      targetDate: new Date('2024-06-01'),
      projectId: projects[0].id,
      identifiedBy: professionals[2].id
    }
  });

  const risk3 = await prisma.riskFactor.create({
    data: {
      name: 'Escalada de Costos de Materiales Sostenibles',
      description: 'Incremento en precios de materiales certificados sostenibles puede afectar presupuesto',
      category: 'FINANCIAL',
      probability: 0.6,
      impact: 0.5,
      riskScore: 0.30,
      mitigation: 'Contratos con precios fijos, proveedores alternativos, materiales sustitutos precalificados',
      contingency: 'Reducir especificaciones no críticas, negociar extensión de presupuesto con cliente',
      owner: professionals[0].id, // Carlos owns financial risks
      status: 'PLANNED',
      priority: 'MEDIUM',
      targetDate: new Date('2024-07-15'),
      projectId: projects[1].id,
      identifiedBy: professionals[0].id
    }
  });

  const risk4 = await prisma.riskFactor.create({
    data: {
      name: 'Condiciones Climáticas Adversas',
      description: 'Temporadas de lluvia intensa pueden retrasar trabajos exteriores en la plaza',
      category: 'EXTERNAL',
      probability: 0.7, // High probability in Spain
      impact: 0.4,
      riskScore: 0.28,
      mitigation: 'Planificación de trabajos interiores durante temporadas lluviosas, equipos de protección climática',
      contingency: 'Extensión de cronograma, trabajo en turnos extendidos en días buenos',
      owner: professionals[0].id,
      status: 'RESOLVED', // Weather planning completed
      priority: 'LOW',
      resolvedAt: new Date('2024-04-01'),
      projectId: projects[0].id,
      identifiedBy: professionals[0].id
    }
  });

  // Create Attachments
  const attachment1 = await prisma.attachment.create({
    data: {
      fileName: 'smart-plaza-progress-march.jpg',
      fileUrl: '/attachments/projects/smart-plaza/progress-march-2024.jpg',
      fileType: 'IMAGE',
      mimeType: 'image/jpeg',
      fileSize: 2048576, // 2MB
      title: 'Progreso de Construcción - Marzo 2024',
      description: 'Vista aérea del progreso de construcción de Smart Plaza Central en marzo 2024',
      tags: ['progress', 'construction', 'aerial-view', 'march-2024'],
      dimensions: { width: 1920, height: 1080 },
      visibility: 'PROJECT',
      isPublic: false,
      uploadedById: professionals[0].id,
      postId: posts[0].id // Attached to Carlos's progress post
    }
  });

  const attachment2 = await prisma.attachment.create({
    data: {
      fileName: 'bim-coordination-methodology.pdf',
      fileUrl: '/attachments/lessons/bim-coordination-methodology-v2.pdf',
      fileType: 'DOCUMENT',
      mimeType: 'application/pdf',
      fileSize: 5242880, // 5MB
      title: 'Metodología de Coordinación BIM',
      description: 'Guía completa de implementación de coordinación BIM interdisciplinaria',
      tags: ['bim', 'methodology', 'coordination', 'guidelines'],
      visibility: 'NETWORK',
      isPublic: true,
      uploadedById: professionals[1].id,
      postId: posts[1].id // Attached to Ana's lesson learned post
    }
  });

  const attachment3 = await prisma.attachment.create({
    data: {
      fileName: 'energy-system-demo.mp4',
      fileUrl: '/attachments/innovations/energy-recovery-demo.mp4',
      fileType: 'VIDEO',
      mimeType: 'video/mp4',
      fileSize: 15728640, // 15MB
      title: 'Demostración Sistema de Recuperación de Calor',
      description: 'Video demostrativo del funcionamiento del sistema de recuperación de calor con IA',
      tags: ['energy', 'hvac', 'demonstration', 'ai', 'innovation'],
      dimensions: { width: 1280, height: 720 },
      duration: 180, // 3 minutes
      thumbnail: '/thumbnails/energy-recovery-demo-thumb.jpg',
      visibility: 'CONSTELLATION',
      isPublic: false,
      uploadedById: professionals[2].id,
      postId: posts[2].id // Attached to Miguel's innovation post
    }
  });

  // Create Lesson Attachments
  const lessonAttachment1 = await prisma.lessonAttachment.create({
    data: {
      fileName: 'bim-coordination-checklist.xlsx',
      fileUrl: '/attachments/lessons/bim-coordination-checklist.xlsx',
      fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      fileSize: 1024000, // 1MB
      description: 'Lista de verificación para sesiones de coordinación BIM',
      lessonId: lessonsLearned[0].id,
      uploadedBy: professionals[1].id
    }
  });

  const lessonAttachment2 = await prisma.lessonAttachment.create({
    data: {
      fileName: 'iot-implementation-guide.pdf',
      fileUrl: '/attachments/lessons/iot-implementation-guide.pdf',
      fileType: 'application/pdf',
      fileSize: 3145728, // 3MB
      description: 'Guía técnica para implementación de sensores IoT en espacios públicos',
      lessonId: lessonsLearned[1].id,
      uploadedBy: professionals[0].id
    }
  });

  // Create Innovation Attachments
  const innovationAttachment1 = await prisma.innovationAttachment.create({
    data: {
      fileName: 'heat-recovery-technical-specs.pdf',
      fileUrl: '/attachments/innovations/heat-recovery-specs.pdf',
      fileType: 'application/pdf',
      fileSize: 2097152, // 2MB
      description: 'Especificaciones técnicas del sistema de recuperación de calor con IA',
      innovationId: innovations[0].id,
      uploadedBy: professionals[2].id
    }
  });

  const innovationAttachment2 = await prisma.innovationAttachment.create({
    data: {
      fileName: 'heritage-protocol-flowchart.png',
      fileUrl: '/attachments/innovations/heritage-protocol-flowchart.png',
      fileType: 'image/png',
      fileSize: 1572864, // 1.5MB
      description: 'Diagrama de flujo del protocolo de integración no invasiva',
      innovationId: innovations[1].id,
      uploadedBy: professionals[1].id
    }
  });

  // Create Achievements
  const achievement1 = await prisma.achievement.create({
    data: {
      name: 'Mentor Excepcional',
      description: 'Ha mentoreado exitosamente a más de 3 profesionales en desarrollo de carrera',
      category: 'MENTORSHIP',
      points: 150,
      level: 'GOLD',
      rarity: 'UNCOMMON',
      icon: '/icons/achievements/mentor-gold.svg',
      badge: '/badges/mentor-exceptional.png',
      color: '#FFD700',
      isRepeatable: false,
      timesEarned: 1,
      professionalId: professionals[0].id, // Carlos
      contextType: 'global',
      earnedAt: new Date('2024-03-15')
    }
  });

  const achievement2 = await prisma.achievement.create({
    data: {
      name: 'Innovador Sostenible',
      description: 'Ha creado innovaciones que mejoran la sostenibilidad en más del 30%',
      category: 'INNOVATION',
      points: 200,
      level: 'PLATINUM',
      rarity: 'RARE',
      icon: '/icons/achievements/innovation-platinum.svg',
      badge: '/badges/sustainable-innovator.png',
      color: '#E5E4E2',
      isRepeatable: false,
      timesEarned: 1,
      professionalId: professionals[2].id, // Miguel
      contextType: 'constellation',
      contextId: foundationData.constellations[0].id,
      earnedAt: new Date('2024-04-01')
    }
  });

  const achievement3 = await prisma.achievement.create({
    data: {
      name: 'Guardián del Patrimonio',
      description: 'Especialista en preservación patrimonial con proyectos certificados',
      category: 'KNOWLEDGE_SHARING',
      points: 175,
      level: 'GOLD',
      rarity: 'RARE',
      icon: '/icons/achievements/heritage-gold.svg',
      badge: '/badges/heritage-guardian.png',
      color: '#8B4513',
      isRepeatable: false,
      timesEarned: 1,
      professionalId: professionals[1].id, // Ana
      contextType: 'global',
      earnedAt: new Date('2024-02-20')
    }
  });

  const achievement4 = await prisma.achievement.create({
    data: {
      name: 'Colaborador Estrella',
      description: 'Ha recibido más de 50 likes en contribuciones comunitarias',
      category: 'COLLABORATION',
      points: 75,
      level: 'SILVER',
      rarity: 'COMMON',
      icon: '/icons/achievements/collaboration-silver.svg',
      badge: '/badges/star-collaborator.png',
      color: '#C0C0C0',
      isRepeatable: true,
      timesEarned: 2,
      professionalId: professionals[1].id, // Ana
      contextType: 'constellation',
      contextId: foundationData.constellations[0].id,
      earnedAt: new Date('2024-03-01')
    }
  });

  // Create some Invitations (for completeness)
  const invitation1 = await prisma.invitation.create({
    data: {
      email: 'lucia.fernandez@estructuras.es',
      role: 'Structural Engineer',
      message: 'Te invitamos a unirte a nuestro proyecto Smart Plaza Central como ingeniera estructural.',
      type: 'PROJECT',
      status: 'PENDING',
      projectId: projects[0].id,
      expiresAt: new Date('2024-06-01'),
      invitedById: professionals[0].id // Carlos invites
    }
  });

  const invitation2 = await prisma.invitation.create({
    data: {
      email: 'javier.santos@consultoria.es',
      role: 'BIM Coordinator',
      message: 'Buscamos especialista en coordinación BIM para múltiples proyectos en nuestra constelación.',
      type: 'CONSTELLATION',
      status: 'ACCEPTED',
      constellationId: foundationData.constellations[0].id,
      acceptedAt: new Date('2024-03-20'),
      expiresAt: new Date('2024-12-31'),
      invitedById: professionals[1].id // Ana invites
    }
  });

  console.log('✅ Part 5 completed: Supporting Entities seeded successfully');
  
  return {
    dependencies: [dependency1, dependency2],
    milestones: [milestone1, milestone2, milestone3, milestone4],
    riskFactors: [risk1, risk2, risk3, risk4],
    attachments: [attachment1, attachment2, attachment3],
    lessonAttachments: [lessonAttachment1, lessonAttachment2],
    innovationAttachments: [innovationAttachment1, innovationAttachment2],
    achievements: [achievement1, achievement2, achievement3, achievement4],
    invitations: [invitation1, invitation2]
  };
}

// FINAL ASSEMBLY FUNCTION
async function runCompleteSeed() {
  console.log('🚀 Starting complete database seed...');
  
  try {
    // Import all parts
    const { seedPart1 } = await import('./seedpart1.js');
    const { seedPart2 } = await import('./seedpart2.js');
    const { seedPart3 } = await import('./seedpart3.js');
    const { seedPart4 } = await import('./seedpart4.js');

    // Execute parts in sequence
    console.log('📦 Executing Part 1: Core Foundation Data...');
    const foundationData = await seedPart1();
    
    console.log('📦 Executing Part 2: Relationships and Projects...');
    const relationshipsData = await seedPart2(foundationData);
    
    console.log('📦 Executing Part 3: Social Features...');
    const socialData = await seedPart3(foundationData, relationshipsData);
    
    console.log('📦 Executing Part 4: Knowledge Management...');
    const knowledgeData = await seedPart4(foundationData, relationshipsData, socialData);
    
    console.log('📦 Executing Part 5: Supporting Entities...');
    const supportingData = await seedPart5(foundationData, relationshipsData, socialData, knowledgeData);

    console.log('🎉 Database seed completed successfully!');
    console.log('📊 Summary:');
    console.log(`   • ${foundationData.constellations.length} Constellations`);
    console.log(`   • ${foundationData.organizations.length} Organizations`);
    console.log(`   • ${foundationData.professionals.length} Professionals`);
    console.log(`   • ${relationshipsData.projects.length} Projects`);
    console.log(`   • ${socialData.posts.length} Posts`);
    console.log(`   • ${socialData.comments.length} Comments`);
    console.log(`   • ${knowledgeData.lessonsLearned.length} Lessons Learned`);
    console.log(`   • ${knowledgeData.innovations.length} Innovations`);
    console.log(`   • ${supportingData.milestones.length} Milestones`);
    console.log(`   • ${supportingData.riskFactors.length} Risk Factors`);
    console.log(`   • ${supportingData.achievements.length} Achievements`);

  } catch (error) {
    console.error('❌ Error during database seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Export both the part function and the complete seed runner
export { seedPart5, runCompleteSeed };

// Run if this file is executed directly
if (require.main === module) {
  runCompleteSeed()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}