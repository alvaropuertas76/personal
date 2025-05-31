import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS } from '../utils/constants';
import { useLanguage } from '../translations/LanguageContext.jsx';

function ProfessionalLife() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [projectsData, setProjectsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, language } = useLanguage(); // Obtener las traducciones y el idioma actual
  
  // Cargar datos desde el archivo JSON
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/personal/data/professional-projects.json');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setProjectsData(data.projectsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects data:', err);
        setError(t?.professionalLife?.error || 'Failed to load projects data. Please try again later.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, [t]);
    // Función para abrir el modal con la experiencia seleccionada
  const openExperienceDetails = (experience) => {
    setSelectedExperience(experience);
    document.body.style.overflow = 'hidden'; // Previene scroll en el fondo
  };
  
  // Función para cerrar el modal
  const closeExperienceDetails = () => {
    setSelectedExperience(null);
    document.body.style.overflow = 'auto'; // Restaura scroll
  };
  // Mostrar indicador de carga mientras se obtienen los datos
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-lg text-gray-600">{t?.professionalLife?.loading || "Loading data..."}</p>
      </div>
    );
  }

  // Mostrar mensaje de error si ocurre algún problema
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">{t?.professionalLife?.title || "Professional Life"}</h1>

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
              <p className="text-lg text-blue-600 mb-4">{t?.professionalLife?.jobTitle || "Senior Solution and Enterprise Architect"}</p>
              <p className="text-gray-700 mb-4">
                {t?.professionalLife?.introduction || "With over 25 years of experience as IT software engineer, and 15 years as IT Architect, I specialize in designing scalable, resilient systems that support mission-critical business operations. My technical expertise spans cloud infrastructure, distributed systems, and enterprise application integration."}
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
                  {t?.professionalLife?.downloadCV || "Download CV"}
                </a>
              </div>
            </div>
          </div>
        </div>        {/* Career Highlights */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">{t?.professionalLife?.careerHighlights || "Career Highlights"}</h2>
          <div className="bg-white rounded-lg shadow-soft overflow-hidden"><div className="border-l-4 border-blue-600 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-blue-50 transition-colors" onClick={() => openExperienceDetails('knowmad')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img 
                      src="./assets/images/logos/knowmad_mood_logo.jpeg" 
                      alt="KnowmadMood logo" 
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold">KnowmadMood - Solution Architect</h3>
                </div>
                <p className="text-gray-600">2023 - Present</p>
              </div>
              <p className="text-gray-700 mb-4">
                Since October 2023, as a Solution Architect at Knowmad Mood, I lead and contribute to digital transformation and enterprise architecture projects across various IT consultancies. My current role at TIREA
                 focuses on modernizing legacy systems within the insurance sector, actively leveraging Generative AI, specifically GitHub Copilot, to optimize development efficiency and code quality.<br /><br />
                 
                 Previously, at MAPFRE MALTA, I served as an on-site technical lead and solution architect, designing AS-IS and TO-BE architectures and applying my insurance expertise to shape corporate architecture.<br /><br />
                 
                 At SANTA LUCIA SEGUROS, I was responsible for Enterprise Architecture Governance (TOGAF), defining service architectures, development models, patterns, and standards, including configuration management 
                 and Wiki-based standards. My technical expertise spans a robust stack including Azure, Java 17 with Spring Boot and Microservices, Kafka, monitoring solutions (ELK, Prometheus, Grafana), CI/CD 
                 (Git, GitHub, ArgoCD), and design principles like SOLID and API First, all within Agile methodologies such as Scrum and Kanban.<br /><br />
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Solution Architecture</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Project Management</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Enterprise Architecture</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Insurance Expertise</span>
              </div>
            </div>              <div className="border-l-4 border-green-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-green-50 transition-colors" onClick={() => openExperienceDetails('smallworld')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img 
                      src="./assets/images/logos/small_world_financial_services_logo.jpeg" 
                      alt="Small World Financial Services logo" 
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold">SmallWorld Financial Services - Solution Architect</h3>
                </div>
                <p className="text-gray-600">2021 - 2023</p>
              </div>
              <p className="text-gray-700 mb-4">
                At SmallWorld Financial Services, I played a key role as a Solution Architect, primarily focused on Enterprise Architecture Governance (TOGAF). My core responsibilities included analyzing, defining, and designing 
                solution architectures for critical services, establishing models, patterns, and standards for software development and code control. <br /><br />
                
                I managed the Continuous Integration (CI/CD) system, defined application deployment and versioning methodologies, and oversaw environment configuration management, maintaining internal Wiki Architecture Standards.
                I provided both technical and functional expert support. <br /><br />
                
                During this time, I worked with an advanced technology stack including AWS, Kubernetes (K8s), and Docker for microservices built with Java 17 and Spring Boot 2, 
                implementing REST and GraphQL. I also leveraged Kafka for data processing, Redis and Memcached for caching, and databases such as Postgres, MongoDB, and DynamoDB. CI/CD practices (Sonar, Git, GitHub, Argo CD) and 
                monitoring (ELK, Prometheus, Grafana, Instana) were fundamental, applying principles like SOLID and Design Patterns.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Java</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Spring Boot</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Jenkins</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Docker</span>
              </div>
            </div>              
            <div className="border-l-4 border-purple-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-purple-50 transition-colors" onClick={() => openExperienceDetails('bancamarch')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img 
                      src="./assets/images/logos/banca_march_logo.jpeg" 
                      alt="Banca March logo" 
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Banca March - Functional Analyst</h3>
                </div>
                <p className="text-gray-600">2020 - 2021</p>
              </div>
              <p className="text-gray-700 mb-4">
                In the "Wealth Project," my primary role involved functional documentation, as well as the analysis, definition, and design of new functionalities within a bank's existing technological infrastructure. This position 
                required a deep understanding of and adaptation to legacy systems, working directly with core technologies such as COBOL, CICS, and DB2 to integrate and develop solutions that advanced project objectives.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">.NET</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">SQL Server</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Angular</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">REST APIs</span>
              </div>
            </div>              
            <div className="border-l-4 border-red-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-red-50 transition-colors" onClick={() => openExperienceDetails('ntt')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img 
                      src="./assets/images/logos/avoris.jpeg" 
                      alt="Avoris logo" 
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Avoris Travel - Head of Architecture</h3>
                </div>
                <p className="text-gray-600">2017 - 2020</p>
              </div>
              <p className="text-gray-700 mb-4">
                In the tourism sector, I led the modernization of booking platforms and Enterprise Architecture Governance (TOGAF) in a high-volume environment. I managed Continuous Integration Systems (Jira, Bitbucket, SonarQube, Bamboo) 
                for over 200 repositories and 3 million lines of code, including the migration of MDBManager to AWS with RedHat OpenShift 4. I defined integration engine interfaces and product models, administered deployments (on-premises and Cloud),
                 and designed transversal microservices (Authentication, Configuration, Log, Traces). <br /><br />
                 
                 My role involved analyzing, designing, and maintaining functional and technological architectures for the front, service, and data layers, 
                 as well as defining software development standards. Technically, my experience includes Java 8 with Spring Boot 2, Microservices, REST/GraphQL, automated testing (Cucumber, Junit5), Kafka, Redis, databases (Postgres, MongoDB), 
                 security (OAuth2), and a robust monitoring stack (ELK, Prometheus, Grafana, Instana) and CI/CD (Jenkins, Sonar, Git).
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Java</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Spring</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Oracle</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">GitLab CI</span>
              </div>
            </div>              
            <div className="border-l-4 border-amber-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-amber-50 transition-colors" onClick={() => openExperienceDetails('bbva')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img 
                      src="./assets/images/logos/hotelbeds_group_logo.jpeg" 
                      alt="BBVA logo" 
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Hotelbeds - Solution Architect</h3>
                </div>
                <p className="text-gray-600">2016 - 2017</p>
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
            </div>              
            <div className="border-l-4 border-emerald-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-emerald-50 transition-colors" onClick={() => openExperienceDetails('ericsson')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img 
                      src="./assets/images/logos/avoris.jpeg" 
                      alt="Avoris logo" 
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Avoris Travel - Head of Architecture</h3>
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
            </div>              
            <div className="border-l-4 border-cyan-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-cyan-50 transition-colors" onClick={() => openExperienceDetails('santander')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img 
                      src="./assets/images/logos/cgi_logo.jpeg" 
                      alt="CGI logo" 
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Brujula Tecnologías de la Información  - Solution Architect</h3>
                </div>
                <p className="text-gray-600">2012 - 2014</p>
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
            </div>              
            <div className="border-l-4 border-indigo-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-indigo-50 transition-colors" onClick={() => openExperienceDetails('accenture')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img 
                      src="./assets/images/logos/grupoavalon_logo.jpeg" 
                      alt="Grupo Avalon logo" 
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Avalon Tecnologías de la Información - Development Manager</h3>
                </div>
                <p className="text-gray-600">2011 - 2012</p>
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
            </div>              
            <div className="border-l-4 border-fuchsia-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-fuchsia-50 transition-colors" onClick={() => openExperienceDetails('telefonica')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img 
                      src="./assets/images/logos/cic_consulting_informatico_logo.jpeg" 
                      alt="CIC Consulting Informático Logo" 
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold">CIC Consulting Informático - Project Manager</h3>
                </div>
                <p className="text-gray-600">2008 - 2011</p>
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
            </div>              
            <div className="border-l-4 border-rose-500 pl-6 py-6 pr-6 mb-1 cursor-pointer hover:bg-rose-50 transition-colors" onClick={() => openExperienceDetails('ibm')}>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img 
                      src="./assets/images/logos/atos_logo.jpeg" 
                      alt="Atos logo" 
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Atos Origin - Project Manager</h3>
                </div>
                <p className="text-gray-600">2005 - 2008</p>
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
                  <div className="w-10 h-10 flex-shrink-0">
                    <img 
                      src="./assets/images/logos/globalia_logo.jpeg" 
                      alt="Globalia Corp logo" 
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Globalia Corp - Senior Engineer to Project Manager</h3>
                </div>
                <p className="text-gray-600">2001 - 2005</p>
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
                  <div className="w-10 h-10 flex-shrink-0">
                    <img 
                      src="./assets/images/logos/viewnext_logo.jpeg" 
                      alt="Viewnext logo" 
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold">INSA (IBM) Global Services - Senior Developer</h3>
                </div>
                <p className="text-gray-600">2000 - 2001</p>
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
        </div>        {/* Skills & Expertise */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">{t?.professionalLife?.skillsExpertise || "Skills & Expertise"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="text-3xl text-blue-600 mb-4">
                <i className="fas fa-cloud"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{t?.professionalLife?.cloudInfrastructure || "Cloud & Infrastructure"}</h3>
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
              <h3 className="text-xl font-bold mb-3">{t?.professionalLife?.devArchitecture || "Development & Architecture"}</h3>
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
              <h3 className="text-xl font-bold mb-3">{t?.professionalLife?.devOpsTooling || "DevOps & Tooling"}</h3>
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
              <h3 className="text-xl font-bold mb-3">{t?.professionalLife?.systemsIntegration || "Systems Integration"}</h3>
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
              <h3 className="text-xl font-bold mb-3">{t?.professionalLife?.securityCompliance || "Security & Compliance"}</h3>
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
              <h3 className="text-xl font-bold mb-3">{t?.professionalLife?.leadershipMethodology || "Leadership & Methodology"}</h3>
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
        </div>        {/* GitHub Projects */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">{t?.professionalLife?.githubProjects || "GitHub Projects"}</h2>
          <div className="bg-white rounded-lg shadow-soft p-6">
            <p className="mb-6 text-gray-700">
              {t?.professionalLife?.githubDescription || "Explore some of my public projects and contributions on GitHub. From architectural templates and utility libraries to open source contributions, you can find examples of my code and technical approaches."}
            </p>
            
            <div className="flex justify-center">
              <a 
                href={SOCIAL_LINKS.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center"
              >
                <i className="fab fa-github mr-2 text-xl"></i>
                {t?.professionalLife?.viewGitHubProfile || "View GitHub Profile"}
              </a>
            </div>
          </div>
        </div>

        {/* How Endurance Sports Influences My Work */}
        <div>
          <h2 className="text-2xl font-bold mb-6">{t?.professionalLife?.sportsInfluence || "How Endurance Sports Influences My Work"}</h2>
          <div className="bg-white rounded-lg shadow-soft p-6">
            <p className="text-gray-700 mb-4">
              {t?.professionalLife?.sportsDescription || "My passion for ultramarathons and endurance sports has significantly shaped my approach to software architecture and leadership:"}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold mb-2">{t?.professionalLife?.strategicPacing || "Strategic Pacing"}</h3>
                <p className="text-gray-600">
                  {t?.professionalLife?.pacingDescription || "Just as in an ultramarathon, I've learned that sustainable progress in software development requires strategic pacing, planning for obstacles, and maintaining consistent progress rather than unsustainable sprints."}
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold mb-2">{t?.professionalLife?.resilience || "Resilience & Problem Solving"}</h3>
                <p className="text-gray-600">
                  {t?.professionalLife?.resilienceDescription || "Endurance racing teaches constant adaptation to changing conditions. This translates to creating resilient systems that can handle unexpected challenges and quickly adapt to changing requirements."}
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold mb-2">{t?.professionalLife?.preparation || "Preparation & Detail Orientation"}</h3>
                <p className="text-gray-600">
                  {t?.professionalLife?.preparationDescription || "The meticulous preparation required for ultra-distance races mirrors the detailed planning and foresight needed in system architecture, where small oversights can cascade into significant problems."}
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold mb-2">{t?.professionalLife?.continuousImprovement || "Continuous Improvement"}</h3>
                <p className="text-gray-600">
                  {t?.professionalLife?.improvementDescription || "Each race provides lessons to improve performance. Similarly, I bring a mindset of continuous refinement and evolution to software development, embracing retrospectives and iterative enhancement."}
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
                  {`${t?.professionalLife?.projects || "Projects at"} `}
                  {selectedExperience === 'knowmad' && "KnowmadMood"}
                  {selectedExperience === 'smallworld' && "SmallWorld Financial Services"}
                  {selectedExperience === 'bancamarch' && "Banca March"}
                  {selectedExperience === 'ntt' && "Everis / NTT Data"}
                  {selectedExperience === 'bbva' && "BBVA"}
                  {selectedExperience === 'ericsson' && "Ericsson"}
                  {selectedExperience === 'santander' && "Santander Bank"}
                  {selectedExperience === 'accenture' && "Accenture"}
                  {selectedExperience === 'telefonica' && "Telefonica"}
                  {selectedExperience === 'ibm' && "IBM"}
                  {selectedExperience === 'microsoft' && "Microsoft"}
                  {selectedExperience === 'university' && "Universidad de Madrid"}
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
                  {t?.professionalLife?.close || "Close"}
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