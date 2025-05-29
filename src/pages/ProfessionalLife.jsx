import React from 'react';
import { SOCIAL_LINKS } from '../utils/constants';

function ProfessionalLife() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Professional Life</h1>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-100 shadow-soft">
                <img 
                  src="/assets/images/perfil.jpg" 
                  alt="Álvaro Puertas" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300?text=AP';
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold mb-3">Álvaro Puertas</h2>
              <p className="text-lg text-blue-600 mb-4">Senior Software Architect</p>
              <p className="text-gray-700 mb-4">
                With over 15 years of experience in software architecture and engineering, I specialize in 
                designing scalable, resilient systems that support mission-critical business operations. 
                My technical expertise spans cloud infrastructure, distributed systems, and 
                enterprise application integration.
              </p>
              <div className="flex flex-wrap gap-3">
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
              </div>
            </div>
          </div>
        </div>

        {/* Career Highlights */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Career Highlights</h2>
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="border-l-4 border-blue-600 pl-6 py-6 pr-6 mb-1">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h3 className="text-xl font-bold">Senior Software Architect</h3>
                <p className="text-gray-600">2018 - Present</p>
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
            </div>
            
            <div className="border-l-4 border-green-500 pl-6 py-6 pr-6 mb-1">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h3 className="text-xl font-bold">Lead Software Engineer</h3>
                <p className="text-gray-600">2014 - 2018</p>
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
            </div>
            
            <div className="border-l-4 border-purple-500 pl-6 py-6 pr-6">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h3 className="text-xl font-bold">Senior Software Developer</h3>
                <p className="text-gray-600">2009 - 2014</p>
              </div>
              <p className="text-gray-700 mb-4">
                Developed enterprise-grade applications with focus on performance and security. 
                Collaborated with cross-functional teams to deliver solutions aligned with business objectives.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">.NET</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">SQL Server</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Angular</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">REST APIs</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalLife;