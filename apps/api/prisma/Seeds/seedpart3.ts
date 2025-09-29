import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Part 3: Social Features (Posts, Comments, Likes, Follows, Shares)
async function seedPart3(foundationData: any, relationshipsData: any) {
  console.log('📱 Seeding Part 3: Social Features...');

  const { professionals, organizations } = foundationData;
  const { projects } = relationshipsData;

  // Create Follow relationships
  const follow1 = await prisma.follow.create({
    data: {
      followerId: professionals[1].id, // Ana García follows
      followingId: professionals[0].id, // Carlos Martínez
      source: 'PROJECT_COLLABORATION'
    }
  });

  const follow2 = await prisma.follow.create({
    data: {
      followerId: professionals[2].id, // Miguel Rodríguez follows
      followingId: professionals[0].id, // Carlos Martínez
      source: 'PROJECT_COLLABORATION'
    }
  });

  const follow3 = await prisma.follow.create({
    data: {
      followerId: professionals[0].id, // Carlos Martínez follows
      followingId: professionals[1].id, // Ana García
      source: 'MUTUAL_CONNECTION'
    }
  });

  const follow4 = await prisma.follow.create({
    data: {
      followerId: professionals[2].id, // Miguel Rodríguez follows
      followingId: professionals[1].id, // Ana García
      source: 'SUGGESTION'
    }
  });

  // Create Posts
  const post1 = await prisma.post.create({
    data: {
      content: 'Acabamos de completar la fase de diseño conceptual para Smart Plaza Central. Los sistemas IoT integrados permitirán monitoreo en tiempo real del uso del espacio y optimización energética. ¡Emocionado por ver este proyecto cobrar vida! 🏗️ #SmartCity #IoT #SustainableDesign',
      type: 'PROGRESS_UPDATE',
      category: 'TECHNICAL',
      priority: 'MEDIUM',
      visibility: 'CONSTELLATION',
      sharingLevel: 'CONSTELLATION',
      tags: ['smart-city', 'iot', 'progress', 'design'],
      mentions: [professionals[1].id, professionals[2].id], // Ana and Miguel
      relatedProjects: [projects[0].id],
      relatedTopics: ['IoT Integration', 'Energy Optimization', 'Smart Cities'],
      knowledgeCategory: 'TECHNICAL_SOLUTION',
      viewCount: 156,
      shareCount: 12,
      commentCount: 8,
      likeCount: 23,
      status: 'PUBLISHED',
      authorId: professionals[0].id, // Carlos Martínez
      projectId: projects[0].id,
      organizationId: organizations[0].id
    }
  });

  const post2 = await prisma.post.create({
    data: {
      content: 'Lección aprendida importante: la coordinación temprana entre arquitectura y MEP es crucial para la integración de sistemas inteligentes. En nuestro proyecto anterior, los cambios tardíos costaron 3 semanas adicionales. Planificación BIM desde el día uno es clave. 📐',
      type: 'LESSON_LEARNED',
      category: 'TECHNICAL',
      priority: 'HIGH',
      visibility: 'NETWORK',
      sharingLevel: 'NETWORK',
      tags: ['bim', 'coordination', 'lessons-learned', 'mep'],
      mentions: [professionals[2].id], // Miguel
      relatedProjects: [projects[0].id, projects[1].id],
      relatedTopics: ['BIM Coordination', 'MEP Integration', 'Project Planning'],
      knowledgeCategory: 'LESSONS_LEARNED',
      viewCount: 289,
      shareCount: 31,
      commentCount: 15,
      likeCount: 67,
      status: 'PUBLISHED',
      authorId: professionals[1].id, // Ana García
      projectId: projects[0].id,
      organizationId: organizations[1].id
    }
  });

  const post3 = await prisma.post.create({
    data: {
      content: 'Innovación en eficiencia energética: implementamos un sistema de recuperación de calor que reduce el consumo en un 35%. La inversión inicial se recupera en 18 meses. ¿Alguien más ha trabajado con tecnologías similares? 🔧⚡',
      type: 'INNOVATION',
      category: 'TECHNICAL',
      priority: 'HIGH',
      visibility: 'PUBLIC',
      sharingLevel: 'PUBLIC',
      tags: ['energy-efficiency', 'innovation', 'heat-recovery', 'sustainability'],
      mentions: [],
      relatedProjects: [projects[1].id],
      relatedTopics: ['Energy Efficiency', 'HVAC Innovation', 'Sustainability'],
      knowledgeCategory: 'INNOVATION',
      viewCount: 445,
      shareCount: 52,
      commentCount: 22,
      likeCount: 89,
      status: 'PUBLISHED',
      authorId: professionals[2].id, // Miguel Rodríguez
      projectId: projects[1].id,
      organizationId: organizations[2].id
    }
  });

  const post4 = await prisma.post.create({
    data: {
      content: 'Hito importante alcanzado en Residential Tower Alpha: estructura completada hasta el piso 20. El equipo ha mantenido un excelente record de seguridad - 180 días sin incidentes. Felicitaciones a todo el equipo! 🏗️✨',
      type: 'MILESTONE',
      category: 'GENERAL',
      priority: 'MEDIUM',
      visibility: 'PROJECT',
      sharingLevel: 'PROJECT',
      tags: ['milestone', 'safety', 'construction', 'teamwork'],
      mentions: [professionals[1].id],
      relatedProjects: [projects[1].id],
      relatedTopics: ['Construction Progress', 'Safety Achievement', 'Team Performance'],
      knowledgeCategory: 'BEST_PRACTICE',
      viewCount: 98,
      shareCount: 7,
      commentCount: 12,
      likeCount: 34,
      status: 'PUBLISHED',
      authorId: professionals[0].id, // Carlos Martínez
      projectId: projects[1].id,
      organizationId: organizations[0].id
    }
  });

  const post5 = await prisma.post.create({
    data: {
      content: 'Trabajando en la restauración del Pabellón Patrimonial del Puerto. Cada elemento histórico cuenta una historia. La clave está en equilibrar la preservación con la funcionalidad moderna. Un reto apasionante! 🏛️',
      type: 'GENERAL',
      category: 'DESIGN',
      priority: 'MEDIUM',
      visibility: 'CONSTELLATION',
      sharingLevel: 'CONSTELLATION',
      tags: ['heritage', 'restoration', 'architecture', 'preservation'],
      mentions: [],
      relatedProjects: [projects[2].id],
      relatedTopics: ['Heritage Preservation', 'Adaptive Reuse', 'Cultural Architecture'],
      knowledgeCategory: 'TECHNICAL_SOLUTION',
      viewCount: 167,
      shareCount: 18,
      commentCount: 9,
      likeCount: 41,
      status: 'PUBLISHED',
      authorId: professionals[1].id, // Ana García
      projectId: projects[2].id,
      organizationId: organizations[1].id
    }
  });

  const post6 = await prisma.post.create({
    data: {
      content: 'Pregunta para la comunidad: ¿Cuáles son las mejores prácticas para la integración de sistemas de automatización en edificios patrimoniales? Necesitamos preservar la estética histórica pero añadir funcionalidad moderna. 🤔',
      type: 'QUESTION',
      category: 'TECHNICAL',
      priority: 'MEDIUM',
      visibility: 'NETWORK',
      sharingLevel: 'NETWORK',
      tags: ['question', 'heritage', 'automation', 'best-practices'],
      mentions: [professionals[2].id],
      relatedProjects: [projects[2].id],
      relatedTopics: ['Building Automation', 'Heritage Integration', 'Modern Systems'],
      knowledgeCategory: 'TROUBLESHOOTING',
      viewCount: 234,
      shareCount: 15,
      commentCount: 18,
      likeCount: 28,
      status: 'PUBLISHED',
      authorId: professionals[1].id, // Ana García
      projectId: projects[2].id,
      organizationId: organizations[1].id
    }
  });

  // Create Comments
  const comment1 = await prisma.comment.create({
    data: {
      content: 'Excelente progreso Carlos! Los sensores IoT van a generar datos muy valiosos para futuras optimizaciones. ¿Ya tienen definida la plataforma de análisis de datos?',
      postId: post1.id,
      authorId: professionals[1].id, // Ana García
      status: 'PUBLISHED',
      depth: 0,
      likeCount: 5,
      replyCount: 2
    }
  });

  const comment2 = await prisma.comment.create({
    data: {
      content: 'Gracias Ana! Estamos evaluando entre Azure IoT y AWS IoT Core. La decisión dependerá de la integración con los sistemas existentes del ayuntamiento.',
      postId: post1.id,
      authorId: professionals[0].id, // Carlos Martínez
      parentId: comment1.id,
      status: 'PUBLISHED',
      depth: 1,
      likeCount: 3,
      replyCount: 0
    }
  });

  const comment3 = await prisma.comment.create({
    data: {
      content: 'Azure tiene mejor integración con sistemas municipales en mi experiencia. También consideren la soberanía de datos, especialmente para proyectos públicos.',
      postId: post1.id,
      authorId: professionals[2].id, // Miguel Rodríguez
      parentId: comment1.id,
      status: 'PUBLISHED',
      depth: 1,
      likeCount: 7,
      replyCount: 0
    }
  });

  const comment4 = await prisma.comment.create({
    data: {
      content: 'Totalmente de acuerdo Ana. Hemos implementado sesiones de coordinación BIM semanales desde el inicio. La diferencia es notable comparado con proyectos anteriores.',
      postId: post2.id,
      authorId: professionals[2].id, // Miguel Rodríguez
      status: 'PUBLISHED',
      depth: 0,
      likeCount: 12,
      replyCount: 1
    }
  });

  const comment5 = await prisma.comment.create({
    data: {
      content: 'Miguel, ¿podrías compartir más detalles sobre esa tecnología? Estamos buscando soluciones similares para nuestro próximo proyecto.',
      postId: post3.id,
      authorId: professionals[0].id, // Carlos Martínez
      status: 'PUBLISHED',
      depth: 0,
      likeCount: 8,
      replyCount: 0
    }
  });

  const comment6 = await prisma.comment.create({
    data: {
      content: 'Para sistemas en edificios patrimoniales, recomiendo cableado perimetral con sensores inalámbricos. Minimiza intervenciones en estructuras históricas.',
      postId: post6.id,
      authorId: professionals[2].id, // Miguel Rodríguez
      status: 'PUBLISHED',
      depth: 0,
      likeCount: 15,
      replyCount: 2
    }
  });

  const comment7 = await prisma.comment.create({
    data: {
      content: 'También considera protocolos como EnOcean que no requieren baterías. Son ideales para preservación patrimonial.',
      postId: post6.id,
      authorId: professionals[0].id, // Carlos Martínez
      parentId: comment6.id,
      status: 'PUBLISHED',
      depth: 1,
      likeCount: 9,
      replyCount: 0
    }
  });

  // Create Likes for Posts
  const postLike1 = await prisma.like.create({
    data: {
      postId: post1.id,
      professionalId: professionals[1].id // Ana likes Carlos's post
    }
  });

  const postLike2 = await prisma.like.create({
    data: {
      postId: post1.id,
      professionalId: professionals[2].id // Miguel likes Carlos's post
    }
  });

  const postLike3 = await prisma.like.create({
    data: {
      postId: post2.id,
      professionalId: professionals[0].id // Carlos likes Ana's post
    }
  });

  const postLike4 = await prisma.like.create({
    data: {
      postId: post2.id,
      professionalId: professionals[2].id // Miguel likes Ana's post
    }
  });

  const postLike5 = await prisma.like.create({
    data: {
      postId: post3.id,
      professionalId: professionals[0].id // Carlos likes Miguel's post
    }
  });

  const postLike6 = await prisma.like.create({
    data: {
      postId: post3.id,
      professionalId: professionals[1].id // Ana likes Miguel's post
    }
  });

  const postLike7 = await prisma.like.create({
    data: {
      postId: post4.id,
      professionalId: professionals[1].id // Ana likes Carlos's milestone post
    }
  });

  const postLike8 = await prisma.like.create({
    data: {
      postId: post5.id,
      professionalId: professionals[0].id // Carlos likes Ana's heritage post
    }
  });

  const postLike9 = await prisma.like.create({
    data: {
      postId: post6.id,
      professionalId: professionals[2].id // Miguel likes Ana's question
    }
  });

  // Create Comment Likes
  const commentLike1 = await prisma.commentLike.create({
    data: {
      commentId: comment1.id,
      professionalId: professionals[0].id // Carlos likes Ana's comment
    }
  });

  const commentLike2 = await prisma.commentLike.create({
    data: {
      commentId: comment3.id,
      professionalId: professionals[0].id // Carlos likes Miguel's comment
    }
  });

  const commentLike3 = await prisma.commentLike.create({
    data: {
      commentId: comment3.id,
      professionalId: professionals[1].id // Ana likes Miguel's comment
    }
  });

  const commentLike4 = await prisma.commentLike.create({
    data: {
      commentId: comment4.id,
      professionalId: professionals[1].id // Ana likes Miguel's agreement
    }
  });

  const commentLike5 = await prisma.commentLike.create({
    data: {
      commentId: comment6.id,
      professionalId: professionals[1].id // Ana likes Miguel's heritage advice
    }
  });

  // Create Shares
  const share1 = await prisma.share.create({
    data: {
      postId: post2.id, // Ana's lesson learned post
      sharedById: professionals[0].id, // Carlos shares it
      shareNote: 'Muy importante para todos los PMs - coordinación temprana es clave!',
      shareType: 'INTERNAL',
      visibility: 'CONSTELLATION'
    }
  });

  const share2 = await prisma.share.create({
    data: {
      postId: post3.id, // Miguel's innovation post
      sharedById: professionals[1].id, // Ana shares it
      shareNote: 'Innovación que deberíamos considerar para futuros proyectos residenciales.',
      shareType: 'CROSS_PROJECT',
      visibility: 'ORGANIZATION'
    }
  });

  const share3 = await prisma.share.create({
    data: {
      postId: post1.id, // Carlos's progress update
      sharedById: professionals[2].id, // Miguel shares it
      shareNote: 'Gran ejemplo de integración IoT en espacios públicos.',
      shareType: 'EXTERNAL',
      visibility: 'NETWORK'
    }
  });

  // Create Organization Collaborations
  const orgCollab1 = await prisma.organizationCollaboration.create({
    data: {
      orgAId: organizations[0].id, // Iberica Construcciones
      orgBId: organizations[1].id, // Arquitectura Vanguardia
      projectContext: 'Smart Plaza Central collaboration',
      collaborationType: 'PROJECT_BASED',
      projectsShared: 2,
      successRate: 0.95,
      collaborationScore: 8.9,
      averageRating: 4.5,
      status: 'ACTIVE'
    }
  });

  const orgCollab2 = await prisma.organizationCollaboration.create({
    data: {
      orgAId: organizations[0].id, // Iberica Construcciones
      orgBId: organizations[2].id, // TechnoIngeniería
      projectContext: 'MEP services partnership',
      collaborationType: 'ONGOING',
      projectsShared: 1,
      successRate: 0.92,
      collaborationScore: 8.6,
      averageRating: 4.3,
      status: 'ACTIVE'
    }
  });

  const orgCollab3 = await prisma.organizationCollaboration.create({
    data: {
      orgAId: organizations[1].id, // Arquitectura Vanguardia
      orgBId: organizations[2].id, // TechnoIngeniería
      projectContext: 'Design-engineering coordination',
      collaborationType: 'CONSULTING',
      projectsShared: 1,
      successRate: 0.88,
      collaborationScore: 8.4,
      averageRating: 4.2,
      status: 'ACTIVE'
    }
  });

  // Create Mentorships
  const mentorship1 = await prisma.mentorship.create({
    data: {
      mentorId: professionals[0].id, // Carlos mentors
      menteeId: professionals[2].id, // Miguel
      status: 'ACTIVE',
      goals: 'Desarrollo de habilidades de gestión de proyectos y liderazgo de equipos multidisciplinarios',
      focus: 'Project Management, Leadership, Stakeholder Communication',
      frequency: 'Bi-weekly sessions',
      sessionsCompleted: 8,
      progress: 'Excelente progreso en habilidades de comunicación con stakeholders. Trabajando en técnicas avanzadas de planificación.',
      feedback: 'Miguel muestra gran dedicación y aplica rápidamente los conceptos discutidos.',
      satisfaction: 4.7,
      effectiveness: 4.5
    }
  });

  const mentorship2 = await prisma.mentorship.create({
    data: {
      mentorId: professionals[1].id, // Ana mentors
      menteeId: professionals[2].id, // Miguel (can have multiple mentors)
      status: 'ACTIVE',
      goals: 'Integración de principios de diseño sostenible en ingeniería MEP',
      focus: 'Sustainable Design, Energy Efficiency, Green Building Certification',
      frequency: 'Monthly sessions',
      sessionsCompleted: 4,
      progress: 'Buena comprensión de certificaciones LEED y BREEAM. Aplicando conceptos en proyectos actuales.',
      feedback: 'Miguel tiene gran potencial para liderar iniciativas de sostenibilidad.',
      satisfaction: 4.6,
      effectiveness: 4.4
    }
  });

  console.log('✅ Part 3 completed: Social Features seeded successfully');
  
  return {
    follows: [follow1, follow2, follow3, follow4],
    posts: [post1, post2, post3, post4, post5, post6],
    comments: [comment1, comment2, comment3, comment4, comment5, comment6, comment7],
    postLikes: [postLike1, postLike2, postLike3, postLike4, postLike5, postLike6, postLike7, postLike8, postLike9],
    commentLikes: [commentLike1, commentLike2, commentLike3, commentLike4, commentLike5],
    shares: [share1, share2, share3],
    organizationCollaborations: [orgCollab1, orgCollab2, orgCollab3],
    mentorships: [mentorship1, mentorship2]
  };
}

export { seedPart3 };