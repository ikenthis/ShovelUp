import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Part 4: Knowledge Management (Lessons Learned, Innovations, Applications, Expertise)
async function seedPart4(foundationData: any, relationshipsData: any, socialData: any) {
  console.log('💡 Seeding Part 4: Knowledge Management...');

  const { professionals } = foundationData;
  const { projects } = relationshipsData;
  const { posts } = socialData;

  // Create Expertise Areas
  const expertise1 = await prisma.expertiseArea.create({
    data: {
      name: 'Smart City Infrastructure',
      category: 'PROJECT_MANAGEMENT',
      subcategory: 'Urban Development',
      level: 'EXPERT',
      yearsExperience: 15,
      isVerified: true,
      verifiedBy: 'industry-council',
      verifiedAt: new Date('2023-12-01'),
      evidence: {
        projects: ['Madrid Smart District', 'Barcelona Digital Hub', 'Valencia Innovation Quarter'],
        certifications: ['PMP', 'Smart Cities Certified Professional'],
        achievements: ['Led 12 smart city projects', 'Reduced implementation time by 30%']
      },
      demandScore: 8.9,
      supplyScore: 3.2,
      professionalId: professionals[0].id // Carlos Martínez
    }
  });

  const expertise2 = await prisma.expertiseArea.create({
    data: {
      name: 'Sustainable Architecture',
      category: 'ARCHITECTURE',
      subcategory: 'Green Building Design',
      level: 'EXPERT',
      yearsExperience: 12,
      isVerified: true,
      verifiedBy: 'architecture-council',
      verifiedAt: new Date('2023-11-15'),
      evidence: {
        projects: ['Port Heritage Pavilion', 'EcoTower Barcelona', 'Green Campus Madrid'],
        certifications: ['LEED AP BD+C', 'BREEAM Assessor', 'Passive House Designer'],
        awards: ['Sustainable Design Award 2023', 'Green Building Excellence 2022']
      },
      demandScore: 9.2,
      supplyScore: 2.8,
      professionalId: professionals[1].id // Ana García
    }
  });

  const expertise3 = await prisma.expertiseArea.create({
    data: {
      name: 'Heritage Restoration',
      category: 'ARCHITECTURE',
      subcategory: 'Historical Preservation',
      level: 'ADVANCED',
      yearsExperience: 8,
      isVerified: true,
      verifiedBy: 'heritage-committee',
      verifiedAt: new Date('2024-01-05'),
      evidence: {
        projects: ['Port Heritage Pavilion', 'Cathedral Restoration Barcelona', 'Historic District Renewal'],
        certifications: ['Heritage Conservation Specialist', 'UNESCO Advisory Certification'],
        publications: ['Modern Techniques in Heritage Preservation', 'Balancing History and Function']
      },
      demandScore: 7.8,
      supplyScore: 4.1,
      professionalId: professionals[1].id // Ana García
    }
  });

  const expertise4 = await prisma.expertiseArea.create({
    data: {
      name: 'Building Automation Systems',
      category: 'MECHANICAL_ENGINEERING',
      subcategory: 'Smart Building Technology',
      level: 'ADVANCED',
      yearsExperience: 10,
      isVerified: true,
      verifiedBy: 'engineering-board',
      verifiedAt: new Date('2024-01-10'),
      evidence: {
        projects: ['Smart Plaza Central', 'Automated Office Complex', 'Hospital Smart Systems'],
        certifications: ['KNX Certified', 'BACnet Advanced', 'IoT Systems Specialist'],
        innovations: ['Energy Recovery Heat Pump System', 'Predictive Maintenance Protocol']
      },
      demandScore: 8.7,
      supplyScore: 3.9,
      professionalId: professionals[2].id // Miguel Rodríguez
    }
  });

  const expertise5 = await prisma.expertiseArea.create({
    data: {
      name: 'Energy Efficiency Optimization',
      category: 'MECHANICAL_ENGINEERING',
      subcategory: 'Sustainable MEP Systems',
      level: 'EXPERT',
      yearsExperience: 10,
      isVerified: true,
      verifiedBy: 'energy-council',
      verifiedAt: new Date('2024-01-10'),
      evidence: {
        projects: ['Residential Tower Alpha', 'Green Office Complex', 'Hospital Energy Retrofit'],
        certifications: ['LEED Green Associate', 'Energy Manager Certified'],
        metrics: ['Average 35% energy reduction', '18-month ROI on implementations']
      },
      demandScore: 9.1,
      supplyScore: 2.5,
      professionalId: professionals[2].id // Miguel Rodríguez
    }
  });

  // Create Lessons Learned
  const lesson1 = await prisma.lessonLearned.create({
    data: {
      title: 'Coordinación Temprana BIM Crítica para Integración de Sistemas',
      description: 'La coordinación temprana entre disciplinas de arquitectura, estructura y MEP mediante BIM es fundamental para el éxito de proyectos con sistemas inteligentes integrados.',
      category: 'PROCESS_IMPROVEMENT',
      subcategory: 'BIM Coordination',
      difficulty: 'INTERMEDIATE',
      problemDescription: 'En proyectos anteriores, la falta de coordinación temprana entre disciplinas resultó en conflictos de sistemas, cambios tardíos de diseño y retrasos en la ejecución.',
      rootCause: 'Planificación secuencial tradicional donde cada disciplina trabajaba de forma aislada hasta fases avanzadas del proyecto.',
      solution: 'Implementación de sesiones de coordinación BIM semanales desde la fase conceptual, con modelos federados y detección automática de conflictos.',
      prevention: 'Establecer protocolos de coordinación BIM obligatorios en todas las fases del proyecto, con revisiones cruzadas semanales y modelos siempre actualizados.',
      impactLevel: 'HIGH',
      costImpact: -150000, // Savings
      timeImpact: -21, // Days saved
      qualityImpact: 'Reducción del 80% en conflictos de sistemas durante construcción',
      validationStatus: 'VALIDATED',
      validatedBy: professionals[1].id, // Ana García validates
      validatedAt: new Date('2024-02-15'),
      visibility: 'NETWORK',
      isTemplate: true,
      reusedCount: 8,
      ratingAverage: 4.7,
      ratingCount: 12,
      tags: ['bim', 'coordination', 'mep', 'architecture', 'process-improvement'],
      keywords: ['BIM coordination', 'interdisciplinary collaboration', 'conflict detection', 'design optimization'],
      projectId: projects[0].id, // Smart Plaza Central
      contributorId: professionals[1].id, // Ana García
      postId: posts[1].id // Links to the lesson learned post
    }
  });

  const lesson2 = await prisma.lessonLearned.create({
    data: {
      title: 'Integración de Sensores IoT en Espacios Públicos Inteligentes',
      description: 'Metodología para la integración efectiva de sensores IoT en espacios públicos, considerando factores técnicos, de mantenimiento y de privacidad.',
      category: 'TECHNICAL_SOLUTION',
      subcategory: 'IoT Implementation',
      difficulty: 'ADVANCED',
      problemDescription: 'La integración de múltiples tipos de sensores IoT en espacios públicos presenta desafíos de conectividad, mantenimiento, privacidad y vandalismo.',
      rootCause: 'Falta de estándares unificados para implementación IoT en espacios públicos y consideraciones insuficientes sobre ciclo de vida y seguridad.',
      solution: 'Desarrollo de arquitectura IoT modular con protocolos estandarizados, diseño anti-vandalismo y gestión centralizada de datos con cumplimiento GDPR.',
      prevention: 'Establecer guías de diseño IoT específicas para espacios públicos, incluyendo criterios de selección de sensores, protocolos de seguridad y planes de mantenimiento.',
      impactLevel: 'TRANSFORMATIONAL',
      costImpact: -250000, // Long-term savings
      timeImpact: -45, // Days saved in implementation
      qualityImpact: 'Incremento del 60% en calidad de datos y reducción del 70% en fallos de sistema',
      validationStatus: 'VALIDATED',
      validatedBy: professionals[2].id, // Miguel Rodríguez validates
      validatedAt: new Date('2024-03-01'),
      visibility: 'PUBLIC',
      isTemplate: true,
      reusedCount: 5,
      ratingAverage: 4.8,
      ratingCount: 15,
      tags: ['iot', 'smart-city', 'public-spaces', 'sensors', 'data-privacy'],
      keywords: ['IoT sensors', 'smart cities', 'public infrastructure', 'data management', 'GDPR compliance'],
      projectId: projects[0].id, // Smart Plaza Central
      contributorId: professionals[0].id, // Carlos Martínez
      postId: posts[0].id // Links to the progress update post
    }
  });

  const lesson3 = await prisma.lessonLearned.create({
    data: {
      title: 'Preservación de Elementos Patrimoniales en Adaptaciones Modernas',
      description: 'Técnicas y metodologías para preservar elementos arquitectónicos históricos mientras se integran funcionalidades modernas y sistemas tecnológicos.',
      category: 'TECHNICAL_SOLUTION',
      subcategory: 'Heritage Preservation',
      difficulty: 'EXPERT',
      problemDescription: 'La integración de sistemas modernos en edificios patrimoniales requiere equilibrar la preservación histórica con las necesidades funcionales contemporáneas.',
      rootCause: 'Conflicto entre regulaciones de patrimonio histórico y requerimientos de eficiencia energética, accesibilidad y funcionalidad moderna.',
      solution: 'Desarrollo de técnicas de intervención mínima con sistemas reversibles, cableado perimetral y tecnologías inalámbricas que preservan la integridad histórica.',
      prevention: 'Análisis patrimonial exhaustivo en fase de diseño, consulta temprana con autoridades de patrimonio y uso de tecnologías no invasivas.',
      impactLevel: 'HIGH',
      costImpact: 75000, // Additional investment but necessary
      timeImpact: 30, // Additional time for approvals
      qualityImpact: 'Cumplimiento del 100% con regulaciones patrimoniales y certificación de preservación histórica',
      validationStatus: 'UNDER_REVIEW',
      visibility: 'CONSTELLATION',
      isTemplate: false,
      reusedCount: 2,
      ratingAverage: 4.9,
      ratingCount: 8,
      tags: ['heritage', 'preservation', 'modern-integration', 'non-invasive', 'cultural-heritage'],
      keywords: ['heritage preservation', 'adaptive reuse', 'cultural heritage', 'modern integration', 'historical buildings'],
      projectId: projects[2].id, // Port Heritage Pavilion
      contributorId: professionals[1].id, // Ana García
      postId: posts[4].id // Links to heritage post
    }
  });

  // Create Lesson Applications
  const lessonApp1 = await prisma.lessonApplication.create({
    data: {
      lessonId: lesson1.id,
      projectId: projects[1].id, // Applied to Residential Tower Alpha
      appliedById: professionals[0].id, // Carlos applies it
      applicationNote: 'Aplicamos la metodología de coordinación BIM semanal desde el inicio del proyecto residencial. Adaptamos las sesiones para incluir coordinación con sistemas de domótica.',
      adaptations: 'Frecuencia aumentada a 2 sesiones por semana durante fase de sistemas MEP complejos. Inclusión de especialista en domótica en las sesiones.',
      context: 'Proyecto residencial de 150 unidades con sistemas de automatización individual por vivienda.',
      successRating: 5,
      resultDescription: 'Reducción significativa en conflictos de instalaciones. Proceso de construcción más fluido y sin retrasos por coordinación.',
      impactMeasured: {
        conflictsReduced: '85%',
        timesSaved: '18 days',
        costSavings: '€125,000',
        qualityImprovement: 'Zero rework needed'
      },
      wouldRecommend: true,
      completedAt: new Date('2024-03-20')
    }
  });

  const lessonApp2 = await prisma.lessonApplication.create({
    data: {
      lessonId: lesson2.id,
      projectId: projects[1].id, // Applied to Residential Tower Alpha
      appliedById: professionals[2].id, // Miguel applies IoT lesson
      applicationNote: 'Adaptamos la metodología IoT para sistemas residenciales inteligentes. Enfoque en privacidad individual y gestión descentralizada.',
      adaptations: 'Implementación de gateways por planta para mejorar privacidad. Protocolos específicos para viviendas individuales.',
      context: 'Torre residencial con sistemas domóticos individuales y gestión centralizada de servicios comunes.',
      successRating: 4,
      resultDescription: 'Buena implementación aunque con desafíos en la gestión de múltiples sistemas individuales. Residentes satisfechos con nivel de privacidad.',
      impactMeasured: {
        privacyCompliance: '100%',
        systemReliability: '94%',
        userSatisfaction: '87%',
        maintenanceCosts: '€45,000 annual savings'
      },
      wouldRecommend: true,
      completedAt: new Date('2024-04-05')
    }
  });

  // Create Innovations
  const innovation1 = await prisma.innovation.create({
    data: {
      title: 'Sistema de Recuperación de Calor con IA Predictiva',
      description: 'Sistema innovador de recuperación de calor que utiliza inteligencia artificial para predecir patrones de uso y optimizar automáticamente la eficiencia energética.',
      category: 'TECHNOLOGY',
      type: 'INCREMENTAL',
      maturityLevel: 'TESTED',
      problemSolved: 'Los sistemas tradicionales de recuperación de calor operan con configuraciones estáticas que no se adaptan a patrones variables de ocupación y uso.',
      solution: 'Integración de sensores IoT con algoritmos de machine learning que predicen patrones de ocupación y ajustan automáticamente los parámetros del sistema de recuperación.',
      benefits: 'Incremento del 35% en eficiencia energética, reducción de costos operativos, mejora en confort de usuarios y reducción de emisiones de CO2.',
      requirements: 'Sensores de ocupación, temperatura y calidad de aire, plataforma de procesamiento de datos, actuadores automáticos para sistema HVAC.',
      limitations: 'Requiere período de aprendizaje de 3-6 meses, inversión inicial elevada, necesita mantenimiento especializado.',
      adoptionRate: 0.15, // 15% adoption rate
      successRate: 0.92,
      costImpact: -89000, // Annual savings
      timeImpact: 18, // 18% improvement in response time
      qualityImpact: 'Mejora del 25% en confort térmico y calidad de aire interior',
      safetyImpact: 'Reducción de riesgos por sobreaclimatización y mejora en calidad de aire',
      isPatentable: true,
      isOpenSource: false,
      licenseType: 'Proprietary with licensing options',
      ipStatus: 'PATENT_PENDING',
      testingStatus: 'VALIDATED',
      testResults: {
        energySavings: '35.2%',
        paybackPeriod: '18 months',
        userSatisfaction: '91%',
        systemReliability: '96.8%',
        maintenanceReduction: '42%'
      },
      validationData: {
        testDuration: '12 months',
        buildingTypes: ['Residential', 'Office', 'Hospital'],
        sampleSize: '8 buildings',
        independentValidation: 'Technical University of Madrid'
      },
      visibility: 'NETWORK',
      sharingLevel: 'CONSTELLATION',
      tags: ['energy-efficiency', 'ai', 'hvac', 'machine-learning', 'sustainability'],
      keywords: ['predictive maintenance', 'energy optimization', 'smart HVAC', 'artificial intelligence', 'building automation'],
      originProjectId: projects[1].id, // Residential Tower Alpha
      innovatorId: professionals[2].id, // Miguel Rodríguez
      postId: posts[2].id // Links to innovation post
    }
  });

  const innovation2 = await prisma.innovation.create({
    data: {
      title: 'Protocolo de Integración No Invasiva para Edificios Patrimoniales',
      description: 'Metodología estandarizada para integrar tecnologías modernas en edificios históricos sin comprometer su valor patrimonial.',
      category: 'PROCESS',
      type: 'ARCHITECTURAL',
      maturityLevel: 'PILOT',
      problemSolved: 'La falta de protocolos estandarizados para integrar tecnología moderna en edificios patrimoniales resulta en intervenciones inadecuadas o proyectos bloqueados.',
      solution: 'Desarrollo de protocolo sistemático que incluye análisis patrimonial, tecnologías reversibles, cableado perimetral y sistemas inalámbricos certificados.',
      benefits: 'Preservación del 100% del valor patrimonial, reducción del 60% en tiempo de aprobaciones, metodología replicable y certificación patrimonial garantizada.',
      requirements: 'Especialistas en patrimonio, tecnologías inalámbricas certificadas, sistemas reversibles, documentación exhaustiva.',
      limitations: 'Costos iniciales superiores en 20-30%, requiere expertise especializado, limitaciones en algunos tipos de tecnología.',
      adoptionRate: 0.08, // 8% adoption rate - still new
      successRate: 0.96,
      costImpact: 45000, // Additional cost but necessary for compliance
      timeImpact: -40, // 40% reduction in approval time
      qualityImpact: 'Certificación patrimonial garantizada, preservación de elementos históricos al 100%',
      safetyImpact: 'Cumplimiento total con regulaciones de seguridad y patrimonio',
      isPatentable: false,
      isOpenSource: true,
      licenseType: 'Creative Commons Attribution',
      ipStatus: 'OPEN',
      testingStatus: 'IN_PROGRESS',
      testResults: {
        approvalTime: '40% reduction',
        heritageCompliance: '100%',
        costPremium: '25% average',
        stakeholderSatisfaction: '94%'
      },
      validationData: {
        pilotProjects: 3,
        heritageAuthorities: ['UNESCO', 'Spanish Heritage Council', 'Catalonia Heritage Dept'],
        testBuildings: ['15th century monastery', '18th century palace', '19th century industrial building']
      },
      visibility: 'PUBLIC',
      sharingLevel: 'PUBLIC',
      tags: ['heritage', 'preservation', 'non-invasive', 'methodology', 'cultural-heritage'],
      keywords: ['heritage preservation', 'non-invasive technology', 'cultural heritage', 'methodology', 'standardization'],
      originProjectId: projects[2].id, // Port Heritage Pavilion
      innovatorId: professionals[1].id, // Ana García
      postId: posts[5].id // Links to question post about heritage integration
    }
  });

  // Create Innovation Adoptions
  const adoption1 = await prisma.innovationAdoption.create({
    data: {
      innovationId: innovation1.id, // Heat recovery with AI
      projectId: projects[2].id, // Applied to Heritage Pavilion
      adoptedById: professionals[1].id, // Ana adopts Miguel's innovation
      adoptionType: 'ADAPTED',
      adaptations: 'Adaptado para sistemas históricos con limitaciones de integración. Sensores discretos y algoritmos simplificados para respeto patrimonial.',
      implementationNotes: 'Instalación de sensores en ubicaciones no visibles, integración con sistema HVAC existente mejorado.',
      implementationDate: new Date('2024-04-01'),
      effort: 120, // 120 person-hours
      cost: 35000,
      successRating: 4,
      results: {
        energySavings: '22%', // Lower than original due to heritage constraints
        paybackPeriod: '24 months',
        heritageCompliance: '100%',
        visitorComfort: '89%'
      },
      lessonsLearned: 'La adaptación para edificios patrimoniales reduce la eficiencia pero mantiene beneficios significativos. Importante considerar restricciones desde el diseño.',
      wouldRecommend: true,
      timeToImplement: 45, // Days
      adoptionSuccess: true
    }
  });

  // Create Innovation Collaborators
  const collaborator1 = await prisma.innovationCollaborator.create({
    data: {
      innovationId: innovation1.id,
      professionalId: professionals[1].id, // Ana collaborates on Miguel's innovation
      role: 'VALIDATOR',
      contribution: 'Validación de implementación en diferentes tipos de edificios y análisis de integración arquitectónica.',
      contributionType: 'TESTING_VALIDATION',
      timeInvested: 40, // Hours
      expertise: 'Building integration analysis and architectural validation'
    }
  });

  const collaborator2 = await prisma.innovationCollaborator.create({
    data: {
      innovationId: innovation2.id,
      professionalId: professionals[0].id, // Carlos collaborates on Ana's heritage protocol
      role: 'CONTRIBUTOR',
      contribution: 'Desarrollo de metodologías de gestión de proyecto para implementación de protocolo patrimonial.',
      contributionType: 'IMPLEMENTATION',
      timeInvested: 60, // Hours
      expertise: 'Project management methodology and stakeholder coordination'
    }
  });

  const collaborator3 = await prisma.innovationCollaborator.create({
    data: {
      innovationId: innovation2.id,
      professionalId: professionals[2].id, // Miguel contributes to heritage protocol
      role: 'ADVISOR',
      contribution: 'Asesoramiento técnico en selección de tecnologías compatibles con preservación patrimonial.',
      contributionType: 'IDEA_GENERATION',
      timeInvested: 25, // Hours
      expertise: 'Technology selection for heritage buildings'
    }
  });

  console.log('✅ Part 4 completed: Knowledge Management seeded successfully');
  
  return {
    expertiseAreas: [expertise1, expertise2, expertise3, expertise4, expertise5],
    lessonsLearned: [lesson1, lesson2, lesson3],
    lessonApplications: [lessonApp1, lessonApp2],
    innovations: [innovation1, innovation2],
    innovationAdoptions: [adoption1],
    innovationCollaborators: [collaborator1, collaborator2, collaborator3]
  };
}

export { seedPart4 };