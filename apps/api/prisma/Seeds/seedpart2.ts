import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Part 2: Relationships and Projects
async function seedPart2(foundationData: any) {
  console.log('🏗️ Seeding Part 2: Relationships and Projects...');

  const { constellations, organizations, professionals } = foundationData;

  // Create Constellation-Organization relationships
  const constOrg1 = await prisma.constellationOrganization.create({
    data: {
      constellationId: constellations[0].id, // Madrid Smart District
      organizationId: organizations[0].id,   // Iberica Construcciones
      role: 'GENERAL_CONTRACTOR',
      status: 'ACTIVE',
      accessLevel: 'ADMIN',
      projectsActive: 2,
      projectsCompleted: 0,
      contributionScore: 8.5,
      networkConnections: 15,
      reputationInNetwork: 8.7,
      permissions: {
        canCreateProjects: true,
        canInviteOrganizations: true,
        canManageBudget: true,
        canAccessReports: true
      }
    }
  });

  const constOrg2 = await prisma.constellationOrganization.create({
    data: {
      constellationId: constellations[0].id, // Madrid Smart District
      organizationId: organizations[1].id,   // Arquitectura Vanguardia
      role: 'ARCHITECT',
      status: 'ACTIVE',
      accessLevel: 'CONTRIBUTOR',
      projectsActive: 1,
      projectsCompleted: 0,
      contributionScore: 9.1,
      networkConnections: 12,
      reputationInNetwork: 9.3,
      permissions: {
        canCreateProjects: false,
        canInviteOrganizations: false,
        canManageBudget: false,
        canAccessReports: true
      }
    }
  });

  const constOrg3 = await prisma.constellationOrganization.create({
    data: {
      constellationId: constellations[1].id, // Barcelona Waterfront
      organizationId: organizations[1].id,   // Arquitectura Vanguardia
      role: 'ARCHITECT',
      status: 'ACTIVE',
      accessLevel: 'ADMIN',
      projectsActive: 1,
      projectsCompleted: 0,
      contributionScore: 8.8,
      networkConnections: 8,
      reputationInNetwork: 9.0,
      permissions: {
        canCreateProjects: true,
        canInviteOrganizations: true,
        canManageBudget: true,
        canAccessReports: true
      }
    }
  });

  const constOrg4 = await prisma.constellationOrganization.create({
    data: {
      constellationId: constellations[0].id, // Madrid Smart District
      organizationId: organizations[2].id,   // TechnoIngeniería
      role: 'ENGINEER',
      status: 'ACTIVE',
      accessLevel: 'CONTRIBUTOR',
      projectsActive: 1,
      projectsCompleted: 0,
      contributionScore: 8.2,
      networkConnections: 6,
      reputationInNetwork: 8.4,
      permissions: {
        canCreateProjects: false,
        canInviteOrganizations: false,
        canManageBudget: false,
        canAccessReports: true
      }
    }
  });

  // Create Constellation-Professional relationships
  const constProf1 = await prisma.constellationProfessional.create({
    data: {
      constellationId: constellations[0].id, // Madrid Smart District
      professionalId: professionals[0].id,   // Carlos Martínez
      status: 'ACTIVE',
      accessLevel: 'ADMIN',
      projectsActive: 2,
      projectsCompleted: 0,
      contributionScore: 9.0,
      networkConnections: 18,
      knowledgeContributions: 12,
      mentorshipCount: 3,
      postsInConstellation: 25,
      commentsInConstellation: 78,
      likesInConstellation: 156,
      permissions: {
        canCreateProjects: true,
        canInviteProfessionals: true,
        canModerateContent: true,
        canAccessAnalytics: true
      }
    }
  });

  const constProf2 = await prisma.constellationProfessional.create({
    data: {
      constellationId: constellations[0].id, // Madrid Smart District
      professionalId: professionals[1].id,   // Ana García
      status: 'ACTIVE',
      accessLevel: 'CONTRIBUTOR',
      projectsActive: 1,
      projectsCompleted: 0,
      contributionScore: 8.7,
      networkConnections: 14,
      knowledgeContributions: 18,
      mentorshipCount: 5,
      postsInConstellation: 32,
      commentsInConstellation: 95,
      likesInConstellation: 243,
      permissions: {
        canCreateProjects: false,
        canInviteProfessionals: false,
        canModerateContent: false,
        canAccessAnalytics: false
      }
    }
  });

  const constProf3 = await prisma.constellationProfessional.create({
    data: {
      constellationId: constellations[1].id, // Barcelona Waterfront
      professionalId: professionals[1].id,   // Ana García
      status: 'ACTIVE',
      accessLevel: 'ADMIN',
      projectsActive: 1,
      projectsCompleted: 0,
      contributionScore: 9.2,
      networkConnections: 10,
      knowledgeContributions: 8,
      mentorshipCount: 2,
      postsInConstellation: 18,
      commentsInConstellation: 45,
      likesInConstellation: 89,
      permissions: {
        canCreateProjects: true,
        canInviteProfessionals: true,
        canModerateContent: true,
        canAccessAnalytics: true
      }
    }
  });

  const constProf4 = await prisma.constellationProfessional.create({
    data: {
      constellationId: constellations[0].id, // Madrid Smart District
      professionalId: professionals[2].id,   // Miguel Rodríguez
      status: 'ACTIVE',
      accessLevel: 'MEMBER',
      projectsActive: 1,
      projectsCompleted: 0,
      contributionScore: 8.3,
      networkConnections: 9,
      knowledgeContributions: 15,
      mentorshipCount: 1,
      postsInConstellation: 22,
      commentsInConstellation: 67,
      likesInConstellation: 134,
      permissions: {
        canCreateProjects: false,
        canInviteProfessionals: false,
        canModerateContent: false,
        canAccessAnalytics: false
      }
    }
  });

  // Create Projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Smart Plaza Central',
      slug: 'smart-plaza-central',
      description: 'Development of a smart public plaza with integrated IoT sensors, sustainable lighting, and interactive digital installations.',
      type: 'NEW_CONSTRUCTION',
      category: 'COMMERCIAL_RETAIL',
      phase: 'DESIGN_DEVELOPMENT',
      status: 'ACTIVE',
      priority: 'HIGH',
      constellationId: constellations[0].id, // Madrid Smart District
      startDate: new Date('2024-02-01'),
      estimatedEnd: new Date('2025-08-15'),
      budget: 12500000,
      currentCost: 2800000,
      budgetStatus: 'ON_TRACK',
      location: {
        lat: 40.4170,
        lng: -3.7030,
        address: 'Plaza de la Independencia, Madrid',
        zone: 'District Center'
      },
      specifications: {
        area: '8500 sqm',
        smartFeatures: ['IoT sensors', 'Smart lighting', 'Digital displays', 'WiFi zones'],
        sustainability: ['Solar panels', 'Rainwater collection', 'Native vegetation'],
        accessibility: 'Full ADA compliance'
      },
      documents: {
        designPlans: '/documents/smart-plaza-central/design-plans.pdf',
        specifications: '/documents/smart-plaza-central/tech-specs.pdf',
        permits: '/documents/smart-plaza-central/permits.pdf'
      },
      isPublic: true,
      allowsCollaboration: true,
      sharingLevel: 'CONSTELLATION',
      progressPercentage: 35.5,
      milestonesTotal: 8,
      milestonesCompleted: 2,
      qualityScore: 8.9,
      safetyScore: 9.1,
      incidentCount: 0,
      metadata: {
        projectCode: 'SPC-2024-001',
        contractNumber: 'MSD-CNT-2024-15',
        environmentalRating: 'A+',
        expectedVisitors: 50000
      },
      settings: {
        requireApprovalForPosts: false,
        allowPublicComments: true,
        enableRealTimeTracking: true
      },
      tags: ['smart-city', 'public-space', 'iot', 'sustainability', 'accessibility'],
      createdBy: professionals[0].id // Carlos Martínez
    }
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Residential Tower Alpha',
      slug: 'residential-tower-alpha',
      description: 'Modern residential tower with 150 units, featuring smart home technology and energy-efficient systems.',
      type: 'NEW_CONSTRUCTION',
      category: 'RESIDENTIAL_MULTI',
      phase: 'CONSTRUCTION',
      status: 'ACTIVE',
      priority: 'MEDIUM',
      constellationId: constellations[0].id, // Madrid Smart District
      startDate: new Date('2024-01-15'),
      estimatedEnd: new Date('2025-12-20'),
      budget: 28000000,
      currentCost: 12400000,
      budgetStatus: 'ON_TRACK',
      location: {
        lat: 40.4165,
        lng: -3.7025,
        address: 'Calle de Alcalá, 200, Madrid',
        zone: 'District Center'
      },
      specifications: {
        floors: 32,
        units: 150,
        parkingSpaces: 180,
        smartFeatures: ['Home automation', 'Energy management', 'Security systems'],
        sustainability: ['BREEAM Excellent', 'Solar panels', 'Heat recovery'],
        amenities: ['Gym', 'Rooftop garden', 'Coworking space']
      },
      documents: {
        constructionPlans: '/documents/tower-alpha/construction-plans.pdf',
        safetyProtocols: '/documents/tower-alpha/safety-protocols.pdf',
        qualityStandards: '/documents/tower-alpha/quality-standards.pdf'
      },
      isPublic: false,
      allowsCollaboration: true,
      sharingLevel: 'PROJECT',
      progressPercentage: 62.3,
      milestonesTotal: 12,
      milestonesCompleted: 7,
      qualityScore: 8.7,
      safetyScore: 9.3,
      incidentCount: 1,
      metadata: {
        projectCode: 'RTA-2024-002',
        contractNumber: 'MSD-CNT-2024-08',
        certificationTarget: 'BREEAM Excellent',
        deliveryPhases: 3
      },
      settings: {
        requireApprovalForPosts: true,
        allowPublicComments: false,
        enableRealTimeTracking: true
      },
      tags: ['residential', 'smart-home', 'high-rise', 'sustainability', 'energy-efficient'],
      createdBy: professionals[0].id // Carlos Martínez
    }
  });

  const project3 = await prisma.project.create({
    data: {
      name: 'Port Heritage Pavilion',
      slug: 'port-heritage-pavilion',
      description: 'Restoration and adaptive reuse of historic pavilion into modern cultural and exhibition space.',
      type: 'RESTORATION',
      category: 'COMMERCIAL_HOSPITALITY',
      phase: 'DESIGN_SCHEMATIC',
      status: 'ACTIVE',
      priority: 'HIGH',
      constellationId: constellations[1].id, // Barcelona Waterfront
      startDate: new Date('2024-03-15'),
      estimatedEnd: new Date('2025-10-30'),
      budget: 8500000,
      currentCost: 1200000,
      budgetStatus: 'UNDER_BUDGET',
      location: {
        lat: 41.3845,
        lng: 2.1740,
        address: 'Moll de la Fusta, Barcelona',
        zone: 'Port Vell'
      },
      specifications: {
        area: '3200 sqm',
        heritageElements: ['Original facade', 'Historic arches', 'Traditional materials'],
        modernFeatures: ['Climate control', 'Accessibility', 'Modern exhibition systems'],
        sustainability: ['Passive cooling', 'Natural lighting', 'Recycled materials']
      },
      documents: {
        heritageReport: '/documents/heritage-pavilion/heritage-report.pdf',
        restorationPlan: '/documents/heritage-pavilion/restoration-plan.pdf',
        culturalImpact: '/documents/heritage-pavilion/cultural-impact.pdf'
      },
      isPublic: false,
      allowsCollaboration: true,
      sharingLevel: 'CONSTELLATION',
      progressPercentage: 18.7,
      milestonesTotal: 6,
      milestonesCompleted: 1,
      qualityScore: 9.2,
      safetyScore: 8.8,
      incidentCount: 0,
      metadata: {
        projectCode: 'PHP-2024-003',
        contractNumber: 'BWR-CNT-2024-21',
        heritageProtection: 'Level I Protection',
        culturalSignificance: 'High'
      },
      settings: {
        requireApprovalForPosts: true,
        allowPublicComments: false,
        enableRealTimeTracking: false
      },
      tags: ['heritage', 'restoration', 'cultural', 'adaptive-reuse', 'barcelona'],
      createdBy: professionals[1].id // Ana García
    }
  });

  // Create Project-Organization relationships
  const projOrg1 = await prisma.projectOrganization.create({
    data: {
      projectId: project1.id,
      organizationId: organizations[0].id, // Iberica Construcciones
      role: 'GENERAL_CONTRACTOR',
      isPrimary: true,
      contractValue: 9500000,
      contractStart: new Date('2024-02-01'),
      contractEnd: new Date('2025-08-15'),
      contractStatus: 'ACTIVE',
      performanceScore: 8.8,
      completionRate: 0.355,
      qualityRating: 8.9,
      timelyDelivery: true,
      responsibility: 'Overall project execution, coordination, and delivery'
    }
  });

  const projOrg2 = await prisma.projectOrganization.create({
    data: {
      projectId: project1.id,
      organizationId: organizations[1].id, // Arquitectura Vanguardia
      role: 'ARCHITECT',
      isPrimary: false,
      contractValue: 1800000,
      contractStart: new Date('2024-01-15'),
      contractEnd: new Date('2024-12-31'),
      contractStatus: 'ACTIVE',
      performanceScore: 9.3,
      completionRate: 0.65,
      qualityRating: 9.5,
      timelyDelivery: true,
      responsibility: 'Architectural design, planning permissions, design supervision'
    }
  });

  const projOrg3 = await prisma.projectOrganization.create({
    data: {
      projectId: project1.id,
      organizationId: organizations[2].id, // TechnoIngeniería
      role: 'CONSULTANT',
      isPrimary: false,
      contractValue: 850000,
      contractStart: new Date('2024-02-15'),
      contractEnd: new Date('2025-06-30'),
      contractStatus: 'ACTIVE',
      performanceScore: 8.6,
      completionRate: 0.42,
      qualityRating: 8.8,
      timelyDelivery: true,
      responsibility: 'MEP engineering, smart systems integration, building automation'
    }
  });

  const projOrg4 = await prisma.projectOrganization.create({
    data: {
      projectId: project2.id,
      organizationId: organizations[0].id, // Iberica Construcciones
      role: 'GENERAL_CONTRACTOR',
      isPrimary: true,
      contractValue: 25200000,
      contractStart: new Date('2024-01-15'),
      contractEnd: new Date('2025-12-20'),
      contractStatus: 'ACTIVE',
      performanceScore: 8.5,
      completionRate: 0.623,
      qualityRating: 8.7,
      timelyDelivery: true,
      responsibility: 'Complete construction execution and project management'
    }
  });

  const projOrg5 = await prisma.projectOrganization.create({
    data: {
      projectId: project3.id,
      organizationId: organizations[1].id, // Arquitectura Vanguardia
      role: 'ARCHITECT',
      isPrimary: true,
      contractValue: 6800000,
      contractStart: new Date('2024-03-15'),
      contractEnd: new Date('2025-10-30'),
      contractStatus: 'ACTIVE',
      performanceScore: 9.1,
      completionRate: 0.187,
      qualityRating: 9.4,
      timelyDelivery: true,
      responsibility: 'Heritage restoration design and architectural supervision'
    }
  });

  // Create Project-Professional relationships (Project Members)
  const projMember1 = await prisma.projectMember.create({
    data: {
      projectId: project1.id,
      professionalId: professionals[0].id, // Carlos Martínez
      role: 'PROJECT_MANAGER',
      title: 'Lead Project Manager',
      responsibilities: 'Overall project coordination, stakeholder management, timeline and budget control',
      accessLevel: 'ADMIN',
      isActive: true,
      contributionScore: 9.1,
      hoursLogged: 580,
      tasksCompleted: 67,
      performanceRating: 4.6
    }
  });

  const projMember2 = await prisma.projectMember.create({
    data: {
      projectId: project1.id,
      professionalId: professionals[1].id, // Ana García
      role: 'ARCHITECT',
      title: 'Lead Design Architect',
      responsibilities: 'Architectural design leadership, design coordination, stakeholder presentations',
      accessLevel: 'CONTRIBUTOR',
      isActive: true,
      contributionScore: 9.4,
      hoursLogged: 420,
      tasksCompleted: 45,
      performanceRating: 4.8
    }
  });

  const projMember3 = await prisma.projectMember.create({
    data: {
      projectId: project1.id,
      professionalId: professionals[2].id, // Miguel Rodríguez
      role: 'ENGINEER',
      title: 'Senior MEP Engineer',
      responsibilities: 'MEP systems design, smart technology integration, technical coordination',
      accessLevel: 'CONTRIBUTOR',
      isActive: true,
      contributionScore: 8.7,
      hoursLogged: 315,
      tasksCompleted: 38,
      performanceRating: 4.4
    }
  });

  const projMember4 = await prisma.projectMember.create({
    data: {
      projectId: project2.id,
      professionalId: professionals[0].id, // Carlos Martínez
      role: 'PROJECT_MANAGER',
      title: 'Senior Project Manager',
      responsibilities: 'Construction management, quality control, safety oversight',
      accessLevel: 'ADMIN',
      isActive: true,
      contributionScore: 8.9,
      hoursLogged: 720,
      tasksCompleted: 89,
      performanceRating: 4.5
    }
  });

  const projMember5 = await prisma.projectMember.create({
    data: {
      projectId: project3.id,
      professionalId: professionals[1].id, // Ana García
      role: 'ARCHITECT',
      title: 'Heritage Restoration Architect',
      responsibilities: 'Heritage analysis, restoration design, preservation compliance',
      accessLevel: 'ADMIN',
      isActive: true,
      contributionScore: 9.2,
      hoursLogged: 180,
      tasksCompleted: 23,
      performanceRating: 4.7
    }
  });

  console.log('✅ Part 2 completed: Relationships and Projects seeded successfully');
  
  return {
    constellationOrganizations: [constOrg1, constOrg2, constOrg3, constOrg4],
    constellationProfessionals: [constProf1, constProf2, constProf3, constProf4],
    projects: [project1, project2, project3],
    projectOrganizations: [projOrg1, projOrg2, projOrg3, projOrg4, projOrg5],
    projectMembers: [projMember1, projMember2, projMember3, projMember4, projMember5]
  };
}

export { seedPart2 };