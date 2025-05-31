import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../utils/constants';

function ProfessionalLife() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  
  // Datos de proyectos para cada experiencia laboral
  const projectsData = {
    knowmad: [
      {
        title: "Transformación Digital Banca",
        description: "Lideré la arquitectura de soluciones cloud-native para modernizar aplicaciones bancarias críticas, mejorando el tiempo de respuesta en un 40% y la escalabilidad en momentos de alta demanda.",
        technologies: ["AWS Lambda", "DynamoDB", "React", "Node.js"]
      },
      {
        title: "Plataforma IoT Industrial",
        description: "Diseñé una arquitectura de microservicios para procesamiento de datos IoT en tiempo real, permitiendo monitorizar más de 10,000 sensores industriales con latencia inferior a 100ms.",
        technologies: ["Kubernetes", "Kafka", "TimescaleDB", "Python"]
      },
      {
        title: "Sistema de Seguimiento Logístico",
        description: "Arquitectura para sistema de gestión logística en tiempo real con capacidad para procesar millones de eventos diarios de ubicación y estado de envíos internacionales.",
        technologies: ["Event Sourcing", "CQRS", "Redis", "Spring Boot"]
      }
    ],
    smallworld: [
      {
        title: "Plataforma de Servicios Financieros",
        description: "Dirigí el desarrollo de una plataforma centralizada para gestión de transferencias internacionales, procesando más de €500M diarios con total trazabilidad y cumplimiento regulatorio.",
        technologies: ["Java", "Spring Boot", "PostgreSQL", "RabbitMQ"]
      },
      {
        title: "Optimización Pipeline CI/CD",
        description: "Rediseñé la pipeline de integración continua, reduciendo el tiempo de despliegue de 3 horas a 20 minutos y automatizando pruebas de seguridad y rendimiento.",
        technologies: ["Jenkins", "Docker", "Ansible", "SonarQube"]
      }
    ],
    bancamarch: [
      {
        title: "Sistema de Gestión de Patrimonio",
        description: "Análisis funcional para plataforma de gestión patrimonial que integró datos de múltiples fuentes para proporcionar una visión unificada del cliente.",
        technologies: [".NET Core", "SQL Server", "Angular", "SSIS"]
      },
      {
        title: "Automatización de Reporting Regulatorio",
        description: "Diseño de sistema automatizado para generación de informes regulatorios, eliminando procesos manuales y reduciendo errores en un 95%.",
        technologies: ["Power BI", "Azure Functions", "C#"]
      }
    ],
    ntt: [
      {
        title: "Arquitectura Cloud Banca Digital",
        description: "Lideré la transición a microservicios para la plataforma de banca digital, mejorando la escalabilidad y permitiendo despliegues independientes para cada capacidad de negocio.",
        technologies: ["Java", "Spring Cloud", "Docker", "GitLab CI"]
      },
      {
        title: "Sistema Anti-Fraude",
        description: "Diseño de arquitectura para detección de fraude en tiempo real utilizando machine learning y procesamiento de eventos complejos.",
        technologies: ["Spark", "Kafka", "Oracle", "Python"]
      }
    ],
    bbva: [
      {
        title: "Renovación Frontend Banca Personal",
        description: "Lideré la renovación completa de la interfaz de banca personal con arquitectura basada en componentes y diseño responsive.",
        technologies: ["React", "Redux", "Node.js", "GraphQL"]
      },
      {
        title: "API Gateway",
        description: "Implementación de capa de abstracción para unificar acceso a APIs y microservicios, con gestión centralizada de seguridad y monitorización.",
        technologies: ["Express", "MongoDB", "Kong", "Prometheus"]
      }
    ],
    ericsson: [
      {
        title: "Sistema de Monitorización de Red",
        description: "Desarrollo de componentes para análisis en tiempo real de datos de red, procesando más de 1TB de datos diarios para detectar anomalías y problemas de rendimiento.",
        technologies: ["C++", "Python", "Kafka", "Spark"]
      },
      {
        title: "Optimización Algoritmos de Enrutamiento",
        description: "Mejora de algoritmos de enrutamiento de tráfico en redes móviles, logrando reducción del 15% en latencia y mejora del 25% en throughput.",
        technologies: ["C++", "Python", "OpenMP"]
      }
    ],
    santander: [
      {
        title: "Migración SOA a Microservicios",
        description: "Dirigí la transformación de arquitectura monolítica a microservicios para sistemas core bancarios, permitiendo evolución independiente de componentes.",
        technologies: ["ESB", "Java", "Spring", "Docker"]
      },
      {
        title: "Bus de Eventos Corporativo",
        description: "Diseño e implementación de plataforma de mensajería empresarial para integración de aplicaciones críticas con procesamiento de más de 10 millones de mensajes diarios.",
        technologies: ["IBM MQ", "WebSphere", "Java EE"]
      }
    ],
    accenture: [
      {
        title: "Integración Post-Fusión Bancaria",
        description: "Lideré proyecto de integración de sistemas tras fusión bancaria, consolidando datos de clientes y productos de múltiples fuentes.",
        technologies: ["Java EE", "Oracle", "ETL", "Hibernate"]
      },
      {
        title: "Migración Core Banking",
        description: "Consultoría para migración de sistema core bancario, definiendo estrategia y arquitectura de transición para minimizar impacto operativo.",
        technologies: ["Java", "Oracle", "WebLogic"]
      }
    ],
    telefonica: [
      {
        title: "Sistema de Provisión de Servicios",
        description: "Desarrollo de plataforma para automatizar provisión de servicios de telecomunicaciones, reduciendo tiempo de activación de días a minutos.",
        technologies: [".NET", "C#", "SQL Server", "WCF"]
      },
      {
        title: "CRM Departamento Técnico",
        description: "Implementación de sistema de gestión para soporte técnico, integrando información de cliente, servicios contratados e histórico de incidencias.",
        technologies: ["C#", "ASP.NET", "SQL Server"]
      }
    ],
    ibm: [
      {
        title: "Modernización Aplicaciones Mainframe",
        description: "Participé en la transformación de aplicaciones legacy a plataformas modernas, manteniendo la lógica de negocio crítica.",
        technologies: ["COBOL", "Java", "DB2", "JSP"]
      },
      {
        title: "Interfaces Web para Sistemas Legacy",
        description: "Desarrollo de interfaces web modernas para acceso a sistemas mainframe, mejorando usabilidad manteniendo integridad de datos.",
        technologies: ["Java", "JSP", "JavaScript", "JDBC"]
      }
    ],
    microsoft: [
      {
        title: "Demos Tecnológicas .NET",
        description: "Creación de aplicaciones demo para mostrar capacidades de la plataforma .NET y tecnologías emergentes Microsoft.",
        technologies: ["C#", "ASP.NET", "WPF", "Silverlight"]
      },
      {
        title: "Soporte Técnico Eventos",
        description: "Asistencia técnica en eventos y conferencias para desarrolladores, mostrando mejores prácticas e integración de tecnologías Microsoft.",
        technologies: ["Visual Studio", ".NET Framework"]
      }
    ],
    university: [
      {
        title: "Mantenimiento Laboratorios Informáticos",
        description: "Gestión y mantenimiento de equipos y software para prácticas de estudiantes de ingeniería informática.",
        technologies: ["Linux", "Java", "PHP", "MySQL"]
      },
      {
        title: "Desarrollo Material Docente",
        description: "Colaboración en la creación de ejercicios prácticos y tutoriales para asignaturas de programación y bases de datos.",
        technologies: ["Java", "PHP", "MySQL"]
      }
    ]
  };
  
  // Función para abrir el modal con la experiencia seleccionada
  const openExperienceDetails = (experience) => {
    setSelectedExperience(experience);
    document.body.style.overflow = 'hidden'; // Previene scroll en el fondo
  };
  
  // Función para cerrar el modal
  const closeExperienceDetails = () => {
    setSelectedExperience(null);
    document.body.style.overflow = 'auto'; // Restaura scroll
  };  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Professional Life</h1>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center"><div className="w-full md:w-1/3 flex justify-center">              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-100 shadow-soft">
                <img 
                  src="./assets/images/perfil.jpg" 
                  alt="Álvaro Puertas Puñal" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300?text=AP';
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold mb-3">Álvaro Puertas Puñal</h2>
              <p className="text-lg text-blue-600 mb-4">Senior Solution and Enterprise Architect</p>
              <p className="text-gray-700 mb-4">
                With over 25 years of experience as IT software engineer, and 15 years as IT Architect, I specialize in 
                designing scalable, resilient systems that support mission-critical business operations. 
                My technical expertise spans cloud infrastructure, distributed systems, and 
                enterprise application integration.
              </p>              <div className="flex flex-wrap gap-3">
                <a 
                  href={SOCIAL_LINKS.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center px-4 py-2 bg-[#0077b5] text-white rounded-lg hover:bg-opacity-90 transition"
                >
                  <i className="fab fa-linkedin mr-2"></i>
                  LinkedIn
                </a>
                <a 
                  href={SOCIAL_LINKS.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center px-4 py-2 bg-[#333] text-white rounded-lg hover:bg-opacity-90 transition"
                >
                  <i className="fab fa-github mr-2"></i>
                  GitHub
                </a>
                <a 
                  href="./assets/docs/Alvaro Puertas Resume.pdf" 
                  download
                  className="inline-flex items-center px-4 py-2 bg-[#d14836] text-white rounded-lg hover:bg-opacity-90 transition"
                >
                  <i className="fas fa-file-pdf mr-2"></i>
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Career Highlights */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Career Highlights</h2>
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">              <div className="border-l-4 border-blue-600 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-blue-50 transition-colors" onClick={() => openExperienceDetails('knowmad')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img 
                      src="./assets/images/knowmad_mood_logo.jpeg" 
                      alt="KnowmadMood logo" 
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold">KnowmadMood - Solution Architect</h3>
                </div>
                <p className="text-gray-600">2023 - Present</p>
              </div>
              <p className="text-gray-700 mb-4">
                Leading architecture initiatives for global enterprise applications, focusing on scalability, 
                reliability, and security. Responsible for designing cloud-native solutions and 
                modernizing legacy systems.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">AWS</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Kubernetes</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Microservices</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Event-Driven Architecture</span>
              </div>
            </div>              <div className="border-l-4 border-green-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-green-50 transition-colors" onClick={() => openExperienceDetails('smallworld')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-green-100 rounded flex items-center justify-center">
                    <span className="text-green-700 font-bold text-sm">SW</span>
                  </div>
                  <h3 className="text-xl font-bold">SmallWorld Financial Services - Solution Architect</h3>
                </div>
                <p className="text-gray-600">2021 - 2023</p>
              </div>
              <p className="text-gray-700 mb-4">
                Directed engineering teams in delivering high-performance, scalable applications. 
                Implemented CI/CD pipelines and DevOps practices to improve release cycle efficiency.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Java</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Spring Boot</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Jenkins</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Docker</span>
              </div>
            </div>              <div className="border-l-4 border-purple-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-purple-50 transition-colors" onClick={() => openExperienceDetails('bancamarch')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-purple-100 rounded flex items-center justify-center">
                    <span className="text-purple-700 font-bold text-sm">BM</span>
                  </div>
                  <h3 className="text-xl font-bold">Banca March - Functional Analyst</h3>
                </div>
                <p className="text-gray-600">2020 - 2021</p>
              </div>
              <p className="text-gray-700 mb-4">
                Esto si que fue una puta mierda de experiencia profesional. Muy poco recomendable entrar en esta empresa, eso del
                Great place to work se lo tendrían que mirar por la cantidad de hijos de puta que hay en ese edificio.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">.NET</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">SQL Server</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Angular</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">REST APIs</span>
              </div>
            </div>              <div className="border-l-4 border-red-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-red-50 transition-colors" onClick={() => openExperienceDetails('ntt')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-red-700 font-bold text-sm">NTT</span>
                  </div>
                  <h3 className="text-xl font-bold">Everis / NTT Data - Software Architect</h3>
                </div>
                <p className="text-gray-600">2018 - 2020</p>
              </div>
              <p className="text-gray-700 mb-4">
                Led the design and implementation of enterprise-scale banking applications with a focus on 
                security and regulatory compliance. Mentored junior developers and introduced DevOps practices.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Java</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Spring</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Oracle</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">GitLab CI</span>
              </div>
            </div>              <div className="border-l-4 border-amber-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-amber-50 transition-colors" onClick={() => openExperienceDetails('bbva')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-amber-100 rounded-lg flex items-center justify-center">
                    <span className="text-amber-700 font-bold text-sm">BBVA</span>
                  </div>
                  <h3 className="text-xl font-bold">BBVA - Technical Lead</h3>
                </div>
                <p className="text-gray-600">2017 - 2018</p>
              </div>
              <p className="text-gray-700 mb-4">
                Managed a team of developers working on digital transformation initiatives for retail banking.
                Implemented modern front-end architectures and optimized API performance.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">Node.js</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">MongoDB</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">Express</span>
              </div>
            </div>              <div className="border-l-4 border-emerald-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-emerald-50 transition-colors" onClick={() => openExperienceDetails('ericsson')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-emerald-100 rounded flex items-center justify-center">
                    <span className="text-emerald-700 font-bold text-xs">ERICSSON</span>
                  </div>
                  <h3 className="text-xl font-bold">Ericsson - Senior Developer</h3>
                </div>
                <p className="text-gray-600">2015 - 2017</p>
              </div>
              <p className="text-gray-700 mb-4">
                Developed telecommunications software for mobile network operators. Specialized in high-throughput 
                data processing and real-time analytics for network monitoring systems.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">C++</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Kafka</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Spark</span>
              </div>
            </div>              <div className="border-l-4 border-cyan-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-cyan-50 transition-colors" onClick={() => openExperienceDetails('santander')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <span className="text-cyan-700 font-bold text-sm">SAN</span>
                  </div>
                  <h3 className="text-xl font-bold">Santander Bank - Integration Specialist</h3>
                </div>
                <p className="text-gray-600">2013 - 2015</p>
              </div>
              <p className="text-gray-700 mb-4">
                Designed and implemented integration solutions for core banking systems. Migrated legacy applications 
                to microservices architecture and implemented event-driven systems.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">ESB</span>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">SOA</span>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">IBM MQ</span>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">WebSphere</span>
              </div>
            </div>              <div className="border-l-4 border-indigo-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-indigo-50 transition-colors" onClick={() => openExperienceDetails('accenture')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-indigo-100 rounded flex items-center justify-center">
                    <span className="text-indigo-700 font-bold text-sm">ACC</span>
                  </div>
                  <h3 className="text-xl font-bold">Accenture - Consultant</h3>
                </div>
                <p className="text-gray-600">2011 - 2013</p>
              </div>
              <p className="text-gray-700 mb-4">
                Provided technical consulting for clients in the financial sector. Specialized in system integration 
                and data migration projects for mergers and acquisitions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Java EE</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Oracle</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">ETL</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Hibernate</span>
              </div>
            </div>              <div className="border-l-4 border-fuchsia-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-fuchsia-50 transition-colors" onClick={() => openExperienceDetails('telefonica')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-fuchsia-100 rounded flex items-center justify-center overflow-hidden">
                    <span className="text-fuchsia-700 font-bold text-sm">TEF</span>
                  </div>
                  <h3 className="text-xl font-bold">Telefonica - Application Developer</h3>
                </div>
                <p className="text-gray-600">2009 - 2011</p>
              </div>
              <p className="text-gray-700 mb-4">
                Developed internal applications for business process automation. Created solutions for customer 
                data management and service provisioning systems.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm">.NET</span>
                <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm">C#</span>
                <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm">SQL Server</span>
                <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm">WCF</span>
              </div>
            </div>              <div className="border-l-4 border-rose-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-rose-50 transition-colors" onClick={() => openExperienceDetails('ibm')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-rose-100 rounded flex items-center justify-center">
                    <span className="text-rose-700 font-bold text-sm">IBM</span>
                  </div>
                  <h3 className="text-xl font-bold">IBM - Junior Programmer</h3>
                </div>
                <p className="text-gray-600">2007 - 2009</p>
              </div>
              <p className="text-gray-700 mb-4">
                Started professional career as part of the global delivery team. Worked on mainframe modernization 
                projects and development of web interfaces for legacy systems.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">COBOL</span>
                <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">Java</span>
                <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">DB2</span>
                <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">JSP</span>
              </div>
            </div>
              <div className="border-l-4 border-lime-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-lime-50 transition-colors" onClick={() => openExperienceDetails('microsoft')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-lime-100 rounded flex items-center justify-center">
                    <span className="text-lime-700 font-bold text-sm">MS</span>
                  </div>
                  <h3 className="text-xl font-bold">Microsoft - Intern</h3>
                </div>
                <p className="text-gray-600">2006 - 2007</p>
              </div>
              <p className="text-gray-700 mb-4">
                Internship at Microsoft Spain during university studies. Assisted in the development of demo 
                applications and supported technical evangelism efforts for .NET technologies.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded-full text-sm">C#</span>
                <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded-full text-sm">ASP.NET</span>
                <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded-full text-sm">WPF</span>
                <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded-full text-sm">Silverlight</span>
              </div>
            </div>
              <div className="border-l-4 border-orange-500 pl-6 py-6 pr-6 cursor-pointer hover:bg-orange-50 transition-colors" onClick={() => openExperienceDetails('university')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-orange-100 rounded flex items-center justify-center">
                    <span className="text-orange-700 font-bold text-sm">UCM</span>
                  </div>
                  <h3 className="text-xl font-bold">University of Madrid - Lab Assistant</h3>
                </div>
                <p className="text-gray-600">2004 - 2006</p>
              </div>
              <p className="text-gray-700 mb-4">
                Provided technical support for computer labs while completing undergraduate studies. 
                Assisted professors with course materials and helped students with programming assignments.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Java</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">PHP</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">MySQL</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Linux</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="text-3xl text-blue-600 mb-4">
                <i className="fas fa-cloud"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Cloud & Infrastructure</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  AWS Architecture (EC2, S3, RDS, Lambda)
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Azure Cloud Solutions
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Kubernetes Orchestration
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Infrastructure as Code (Terraform)
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="text-3xl text-blue-600 mb-4">
                <i className="fas fa-code"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Development & Architecture</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Microservices Architecture
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Event-Driven Systems
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  RESTful and GraphQL APIs
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Domain-Driven Design
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="text-3xl text-blue-600 mb-4">
                <i className="fas fa-wrench"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">DevOps & Tooling</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  CI/CD Pipeline Optimization
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Docker Containerization
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Monitoring & Observability (Prometheus, ELK)
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Version Control & Git Workflows
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="text-3xl text-blue-600 mb-4">
                <i className="fas fa-sitemap"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Systems Integration</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Enterprise Application Integration
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Message Queuing Systems (Kafka, RabbitMQ)
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  API Gateway Implementation
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Service Mesh Architecture
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="text-3xl text-blue-600 mb-4">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Security & Compliance</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Identity & Access Management
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Secure API Design
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Data Encryption Strategies
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  GDPR & Regulatory Compliance
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="text-3xl text-blue-600 mb-4">
                <i className="fas fa-users-cog"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Leadership & Methodology</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Agile & Scrum Methodologies
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Technical Team Leadership
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Project Management
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Mentoring & Knowledge Sharing
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* GitHub Projects */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">GitHub Projects</h2>
          <div className="bg-white rounded-lg shadow-soft p-6">
            <p className="mb-6 text-gray-700">
              Explore some of my public projects and contributions on GitHub.
              From architectural templates and utility libraries to open source contributions,
              you can find examples of my code and technical approaches.
            </p>
            
            <div className="flex justify-center">
              <a 
                href={SOCIAL_LINKS.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center"
              >
                <i className="fab fa-github mr-2 text-xl"></i>
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>

        {/* How Endurance Sports Influences My Work */}
        <div>
          <h2 className="text-2xl font-bold mb-6">How Endurance Sports Influences My Work</h2>
          <div className="bg-white rounded-lg shadow-soft p-6">
            <p className="text-gray-700 mb-4">
              My passion for ultramarathons and endurance sports has significantly shaped my approach to software architecture and leadership:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold mb-2">Strategic Pacing</h3>
                <p className="text-gray-600">
                  Just as in an ultramarathon, I've learned that sustainable progress in software development requires strategic pacing, planning for obstacles, and maintaining consistent progress rather than unsustainable sprints.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold mb-2">Resilience & Problem Solving</h3>
                <p className="text-gray-600">
                  Endurance racing teaches constant adaptation to changing conditions. This translates to creating resilient systems that can handle unexpected challenges and quickly adapt to changing requirements.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold mb-2">Preparation & Detail Orientation</h3>
                <p className="text-gray-600">
                  The meticulous preparation required for ultra-distance races mirrors the detailed planning and foresight needed in system architecture, where small oversights can cascade into significant problems.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold mb-2">Continuous Improvement</h3>
                <p className="text-gray-600">
                  Each race provides lessons to improve performance. Similarly, I bring a mindset of continuous refinement and evolution to software development, embracing retrospectives and iterative enhancement.
                </p>
              </div>            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de Proyectos */}
      {selectedExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedExperience === 'knowmad' && "Proyectos en KnowmadMood"}
                  {selectedExperience === 'smallworld' && "Proyectos en SmallWorld Financial Services"}
                  {selectedExperience === 'bancamarch' && "Proyectos en Banca March"}
                  {selectedExperience === 'ntt' && "Proyectos en Everis / NTT Data"}
                  {selectedExperience === 'bbva' && "Proyectos en BBVA"}
                  {selectedExperience === 'ericsson' && "Proyectos en Ericsson"}
                  {selectedExperience === 'santander' && "Proyectos en Santander Bank"}
                  {selectedExperience === 'accenture' && "Proyectos en Accenture"}
                  {selectedExperience === 'telefonica' && "Proyectos en Telefonica"}
                  {selectedExperience === 'ibm' && "Proyectos en IBM"}
                  {selectedExperience === 'microsoft' && "Proyectos en Microsoft"}
                  {selectedExperience === 'university' && "Proyectos en Universidad de Madrid"}
                </h2>
                <button 
                  onClick={closeExperienceDetails}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectsData[selectedExperience] && projectsData[selectedExperience].map((project, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-5 shadow-soft">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <button
                  onClick={closeExperienceDetails}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfessionalLife;