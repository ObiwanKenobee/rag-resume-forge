
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { ResumeData } from './types';

interface ResumePreviewProps {
  data: ResumeData;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const handleDownload = () => {
    // Create a formatted text version for now
    const resumeText = formatResumeText(data);
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.header.fullName.replace(/\s+/g, '_')}_Resume_Meta_AI_Research.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatResumeText = (data: ResumeData) => {
    let text = '';
    
    // Header
    text += `${data.header.fullName}\n`;
    text += `${data.header.email} | ${data.header.phone}\n`;
    text += `${data.header.location}\n`;
    if (data.header.linkedin) text += `LinkedIn: ${data.header.linkedin}\n`;
    if (data.header.github) text += `GitHub: ${data.header.github}\n`;
    if (data.header.website) text += `Website: ${data.header.website}\n`;
    if (data.header.workAuthorization) text += `Work Authorization: ${data.header.workAuthorization}\n`;
    
    // Professional Summary
    if (data.summary.content) {
      text += `\nPROFESSIONAL SUMMARY\n`;
      text += `${data.summary.content}\n`;
    }
    
    // Technical Skills
    text += `\nTECHNICAL SKILLS\n`;
    if (data.skills.programming.length) text += `Programming: ${data.skills.programming.join(', ')}\n`;
    if (data.skills.frameworks.length) text += `Frameworks: ${data.skills.frameworks.join(', ')}\n`;
    if (data.skills.ml.length) text += `ML: ${data.skills.ml.join(', ')}\n`;
    if (data.skills.rag.length) text += `RAG: ${data.skills.rag.join(', ')}\n`;
    if (data.skills.tools.length) text += `Tools: ${data.skills.tools.join(', ')}\n`;
    if (data.skills.cloud.length) text += `Cloud: ${data.skills.cloud.join(', ')}\n`;
    
    // Experience
    if (data.experience.length) {
      text += `\nPROFESSIONAL EXPERIENCE\n`;
      data.experience.forEach(exp => {
        text += `\n${exp.title} | ${exp.company}\n`;
        text += `${exp.location} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n`;
        exp.bullets.forEach(bullet => {
          if (bullet.trim()) text += `• ${bullet}\n`;
        });
      });
    }
    
    // Education
    if (data.education.length) {
      text += `\nEDUCATION\n`;
      data.education.forEach(edu => {
        text += `\n${edu.degree} in ${edu.field}\n`;
        text += `${edu.institution}, ${edu.location} | ${edu.year}\n`;
        if (edu.dissertationTitle) text += `Dissertation: ${edu.dissertationTitle}\n`;
        if (edu.gpa) text += `GPA: ${edu.gpa}\n`;
      });
    }
    
    // Publications
    if (data.publications.length) {
      text += `\nPUBLICATIONS & RESEARCH\n`;
      data.publications.forEach(pub => {
        text += `\n"${pub.title}"\n`;
        text += `${pub.authors}\n`;
        text += `${pub.venue} ${pub.year}`;
        if (pub.citations) text += ` | ${pub.citations} citations`;
        text += `\n`;
        if (pub.link) text += `${pub.link}\n`;
      });
    }
    
    // Projects
    if (data.projects.length) {
      text += `\nPROJECTS & OPEN SOURCE\n`;
      data.projects.forEach(proj => {
        text += `\n${proj.title}\n`;
        text += `${proj.description}\n`;
        if (proj.technologies.length) text += `Technologies: ${proj.technologies.join(', ')}\n`;
        if (proj.impact) text += `Impact: ${proj.impact}\n`;
        if (proj.link) text += `${proj.link}\n`;
      });
    }
    
    // Awards
    if (data.awards.length) {
      text += `\nAWARDS & RECOGNITION\n`;
      data.awards.forEach(award => {
        text += `\n${award.title} | ${award.organization} | ${award.year}\n`;
        if (award.description) text += `${award.description}\n`;
      });
    }
    
    return text;
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Resume Preview
          </CardTitle>
          <Button onClick={handleDownload} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-white p-6 rounded-lg border shadow-sm min-h-[600px] text-sm">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {data.header.fullName || 'Your Name'}
            </h1>
            <div className="text-gray-600 mt-2 space-y-1">
              <div>{data.header.email} {data.header.phone && `| ${data.header.phone}`}</div>
              <div>{data.header.location}</div>
              <div className="flex justify-center gap-4 text-sm">
                {data.header.linkedin && <span>LinkedIn: {data.header.linkedin}</span>}
                {data.header.github && <span>GitHub: {data.header.github}</span>}
              </div>
              {data.header.website && <div>{data.header.website}</div>}
              {data.header.workAuthorization && (
                <div className="text-sm font-medium">Work Authorization: {data.header.workAuthorization}</div>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {data.summary.content && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 mb-2">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.summary.content}</p>
            </div>
          )}

          {/* Technical Skills */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 mb-2">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-1">
              {data.skills.programming.length > 0 && (
                <div><strong>Programming:</strong> {data.skills.programming.join(', ')}</div>
              )}
              {data.skills.frameworks.length > 0 && (
                <div><strong>Frameworks:</strong> {data.skills.frameworks.join(', ')}</div>
              )}
              {data.skills.ml.length > 0 && (
                <div><strong>ML:</strong> {data.skills.ml.join(', ')}</div>
              )}
              {data.skills.rag.length > 0 && (
                <div><strong>RAG:</strong> {data.skills.rag.join(', ')}</div>
              )}
              {data.skills.tools.length > 0 && (
                <div><strong>Tools:</strong> {data.skills.tools.join(', ')}</div>
              )}
              {data.skills.cloud.length > 0 && (
                <div><strong>Cloud:</strong> {data.skills.cloud.join(', ')}</div>
              )}
            </div>
          </div>

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 mb-2">
                PROFESSIONAL EXPERIENCE
              </h2>
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{exp.title}</h3>
                      <div className="text-gray-700">{exp.company}</div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div>{exp.location}</div>
                      <div>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {exp.bullets.map((bullet, bulletIndex) => 
                      bullet.trim() && (
                        <li key={bulletIndex} className="text-gray-700">• {bullet}</li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 mb-2">
                EDUCATION
              </h2>
              {data.education.map((edu, index) => (
                <div key={edu.id} className="mb-3">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                      <div className="text-gray-700">{edu.institution}</div>
                      {edu.dissertationTitle && (
                        <div className="text-sm text-gray-600">
                          Dissertation: {edu.dissertationTitle}
                        </div>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div>{edu.location}</div>
                      <div>{edu.year}</div>
                      {edu.gpa && <div>GPA: {edu.gpa}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Publications */}
          {data.publications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 mb-2">
                PUBLICATIONS & RESEARCH
              </h2>
              {data.publications.map((pub, index) => (
                <div key={pub.id} className="mb-3">
                  <div className="font-medium">"{pub.title}"</div>
                  <div className="text-gray-700">{pub.authors}</div>
                  <div className="text-sm text-gray-600">
                    {pub.venue} {pub.year}
                    {pub.citations && ` | ${pub.citations} citations`}
                    {pub.isFirstAuthor && ' | First Author'}
                  </div>
                  {pub.link && (
                    <div className="text-sm text-blue-600">{pub.link}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 mb-2">
                PROJECTS & OPEN SOURCE
              </h2>
              {data.projects.map((proj, index) => (
                <div key={proj.id} className="mb-3">
                  <h3 className="font-bold">{proj.title}</h3>
                  <div className="text-gray-700">{proj.description}</div>
                  {proj.technologies.length > 0 && (
                    <div className="text-sm text-gray-600">
                      Technologies: {proj.technologies.join(', ')}
                    </div>
                  )}
                  {proj.impact && (
                    <div className="text-sm text-gray-600">Impact: {proj.impact}</div>
                  )}
                  {proj.link && (
                    <div className="text-sm text-blue-600">{proj.link}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Awards */}
          {data.awards.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 mb-2">
                AWARDS & RECOGNITION
              </h2>
              {data.awards.map((award, index) => (
                <div key={award.id} className="mb-3">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">{award.title}</h3>
                      <div className="text-gray-700">{award.organization}</div>
                      {award.description && (
                        <div className="text-sm text-gray-600">{award.description}</div>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{award.year}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
