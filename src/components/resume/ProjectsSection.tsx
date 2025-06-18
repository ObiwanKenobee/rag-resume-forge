
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, X } from 'lucide-react';
import { ProjectItem } from './types';

interface ProjectsSectionProps {
  data: ProjectItem[];
  onChange: (data: ProjectItem[]) => void;
}

export function ProjectsSection({ data, onChange }: ProjectsSectionProps) {
  const addProject = () => {
    const newProject: ProjectItem = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      link: '',
      impact: ''
    };
    onChange([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof ProjectItem, value: any) => {
    const updated = data.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    onChange(updated);
  };

  const removeProject = (id: string) => {
    onChange(data.filter(proj => proj.id !== id));
  };

  const addTechnology = (projectId: string) => {
    const updated = data.map(proj => 
      proj.id === projectId 
        ? { ...proj, technologies: [...proj.technologies, ''] }
        : proj
    );
    onChange(updated);
  };

  const updateTechnology = (projectId: string, techIndex: number, value: string) => {
    const updated = data.map(proj => {
      if (proj.id === projectId) {
        const newTechs = [...proj.technologies];
        newTechs[techIndex] = value;
        return { ...proj, technologies: newTechs };
      }
      return proj;
    });
    onChange(updated);
  };

  const removeTechnology = (projectId: string, techIndex: number) => {
    const updated = data.map(proj => {
      if (proj.id === projectId) {
        return { ...proj, technologies: proj.technologies.filter((_, i) => i !== techIndex) };
      }
      return proj;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span>🚀</span>
          Projects & Open Source
        </h3>
        <Button onClick={addProject} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="bg-teal-50 p-4 rounded-lg">
        <h4 className="font-medium text-teal-800 mb-2">💡 Project Ideas:</h4>
        <ul className="text-sm text-teal-700 space-y-1">
          <li>• Contributed to LangChain modules for hybrid search</li>
          <li>• Released pre-trained RAG pipelines on HuggingFace</li>
          <li>• Open-source multimodal retrieval framework</li>
          <li>• Scalable vector database implementation</li>
        </ul>
      </div>

      {data.map((project) => (
        <div key={project.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Project #{data.indexOf(project) + 1}</h4>
            <Button 
              onClick={() => removeProject(project.id)}
              variant="destructive"
              size="sm"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Project Title *</Label>
              <Input
                value={project.title}
                onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                placeholder="Multi-Modal RAG Framework"
              />
            </div>
            
            <div>
              <Label>Link/Repository</Label>
              <Input
                value={project.link}
                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <div>
            <Label>Description *</Label>
            <Textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              placeholder="Developed an open-source RAG framework that combines dense and sparse retrieval..."
              rows={3}
            />
          </div>

          <div>
            <Label>Impact/Metrics</Label>
            <Input
              value={project.impact}
              onChange={(e) => updateProject(project.id, 'impact', e.target.value)}
              placeholder="1000+ GitHub stars, used by 50+ organizations"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Technologies Used</Label>
              <Button 
                onClick={() => addTechnology(project.id)}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.technologies.map((tech, techIndex) => (
                <div key={techIndex} className="flex gap-2">
                  <Input
                    value={tech}
                    onChange={(e) => updateTechnology(project.id, techIndex, e.target.value)}
                    placeholder="PyTorch"
                  />
                  <Button
                    onClick={() => removeTechnology(project.id, techIndex)}
                    variant="outline"
                    size="sm"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
