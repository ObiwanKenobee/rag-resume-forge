
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X, Trash2 } from 'lucide-react';
import { ExperienceItem } from './types';

interface ExperienceSectionProps {
  data: ExperienceItem[];
  onChange: (data: ExperienceItem[]) => void;
}

export function ExperienceSection({ data, onChange }: ExperienceSectionProps) {
  const addExperience = () => {
    const newExperience: ExperienceItem = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: ['']
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, value: any) => {
    const updated = data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange(updated);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const addBullet = (id: string) => {
    const updated = data.map(exp => 
      exp.id === id ? { ...exp, bullets: [...exp.bullets, ''] } : exp
    );
    onChange(updated);
  };

  const updateBullet = (id: string, bulletIndex: number, value: string) => {
    const updated = data.map(exp => {
      if (exp.id === id) {
        const newBullets = [...exp.bullets];
        newBullets[bulletIndex] = value;
        return { ...exp, bullets: newBullets };
      }
      return exp;
    });
    onChange(updated);
  };

  const removeBullet = (id: string, bulletIndex: number) => {
    const updated = data.map(exp => {
      if (exp.id === id) {
        return { ...exp, bullets: exp.bullets.filter((_, i) => i !== bulletIndex) };
      }
      return exp;
    });
    onChange(updated);
  };

  const sampleBullets = [
    "🔬 Led research on state-of-the-art Retrieval-Augmented Generation systems with applications in chat-based assistants serving 10M+ daily users.",
    "📦 Built and deployed end-to-end RAG pipelines using FAISS and HuggingFace, scaling to millions of queries/day with 95% uptime.",
    "📈 Optimized large language models using PEFT, LoRA, and distillation techniques, improving performance while reducing latency by 25%.",
    "📄 Published 3 first-author papers in ICLR, ACL, NeurIPS on multimodal RAG and conversational AI systems.",
    "🤝 Collaborated cross-functionally with product teams to integrate AI models into user-facing applications, impacting 100M+ users."
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span>💼</span>
          Professional Experience
        </h3>
        <Button onClick={addExperience} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-800 mb-2">✨ Sample Achievement Bullets:</h4>
        <div className="space-y-1 text-sm text-green-700">
          {sampleBullets.map((bullet, index) => (
            <div key={index}>• {bullet}</div>
          ))}
        </div>
      </div>

      {data.map((experience) => (
        <div key={experience.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Experience #{data.indexOf(experience) + 1}</h4>
            <Button 
              onClick={() => removeExperience(experience.id)}
              variant="destructive"
              size="sm"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Job Title *</Label>
              <Input
                value={experience.title}
                onChange={(e) => updateExperience(experience.id, 'title', e.target.value)}
                placeholder="Senior Research Scientist"
              />
            </div>
            
            <div>
              <Label>Company *</Label>
              <Input
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                placeholder="Meta AI Research"
              />
            </div>
            
            <div>
              <Label>Location</Label>
              <Input
                value={experience.location}
                onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                placeholder="Menlo Park, CA"
              />
            </div>
            
            <div>
              <Label>Start Date</Label>
              <Input
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                placeholder="Jan 2020"
              />
            </div>
            
            <div>
              <Label>End Date</Label>
              <Input
                value={experience.endDate}
                onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                placeholder="Present"
                disabled={experience.current}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${experience.id}`}
                checked={experience.current}
                onCheckedChange={(checked) => 
                  updateExperience(experience.id, 'current', checked)
                }
              />
              <Label htmlFor={`current-${experience.id}`}>Current Position</Label>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Key Achievements (3-6 bullets) *</Label>
              <Button 
                onClick={() => addBullet(experience.id)}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {experience.bullets.map((bullet, bulletIndex) => (
              <div key={bulletIndex} className="flex gap-2 mb-2">
                <Textarea
                  value={bullet}
                  onChange={(e) => updateBullet(experience.id, bulletIndex, e.target.value)}
                  placeholder="Led research on state-of-the-art RAG systems..."
                  rows={2}
                />
                <Button
                  onClick={() => removeBullet(experience.id, bulletIndex)}
                  variant="outline"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
