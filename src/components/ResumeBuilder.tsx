
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { HeaderSection } from './resume/HeaderSection';
import { ProfessionalSummary } from './resume/ProfessionalSummary';
import { TechnicalSkills } from './resume/TechnicalSkills';
import { ExperienceSection } from './resume/ExperienceSection';
import { EducationSection } from './resume/EducationSection';
import { PublicationsSection } from './resume/PublicationsSection';
import { ProjectsSection } from './resume/ProjectsSection';
import { AwardsSection } from './resume/AwardsSection';
import { ResumePreview } from './resume/ResumePreview';
import { ResumeData, initialResumeData } from './resume/types';

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [activeTab, setActiveTab] = useState('header');

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Meta AI Research Scientist Resume Builder
          </h1>
          <p className="text-lg text-gray-600">
            Specialized for Retrieval-Augmented Generation (RAG) Positions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-blue-600">🔧</span>
                  Resume Builder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-6">
                    <TabsTrigger value="header" className="text-xs">Header</TabsTrigger>
                    <TabsTrigger value="summary" className="text-xs">Summary</TabsTrigger>
                    <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
                    <TabsTrigger value="experience" className="text-xs">Experience</TabsTrigger>
                    <TabsTrigger value="education" className="text-xs">Education</TabsTrigger>
                    <TabsTrigger value="publications" className="text-xs">Publications</TabsTrigger>
                    <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
                    <TabsTrigger value="awards" className="text-xs">Awards</TabsTrigger>
                  </TabsList>

                  <TabsContent value="header">
                    <HeaderSection 
                      data={resumeData.header}
                      onChange={(data) => updateResumeData('header', data)}
                    />
                  </TabsContent>

                  <TabsContent value="summary">
                    <ProfessionalSummary
                      data={resumeData.summary}
                      onChange={(data) => updateResumeData('summary', data)}
                    />
                  </TabsContent>

                  <TabsContent value="skills">
                    <TechnicalSkills
                      data={resumeData.skills}
                      onChange={(data) => updateResumeData('skills', data)}
                    />
                  </TabsContent>

                  <TabsContent value="experience">
                    <ExperienceSection
                      data={resumeData.experience}
                      onChange={(data) => updateResumeData('experience', data)}
                    />
                  </TabsContent>

                  <TabsContent value="education">
                    <EducationSection
                      data={resumeData.education}
                      onChange={(data) => updateResumeData('education', data)}
                    />
                  </TabsContent>

                  <TabsContent value="publications">
                    <PublicationsSection
                      data={resumeData.publications}
                      onChange={(data) => updateResumeData('publications', data)}
                    />
                  </TabsContent>

                  <TabsContent value="projects">
                    <ProjectsSection
                      data={resumeData.projects}
                      onChange={(data) => updateResumeData('projects', data)}
                    />
                  </TabsContent>

                  <TabsContent value="awards">
                    <AwardsSection
                      data={resumeData.awards}
                      onChange={(data) => updateResumeData('awards', data)}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-4">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
