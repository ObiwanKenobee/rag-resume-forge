
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { SkillsData } from './types';

interface TechnicalSkillsProps {
  data: SkillsData;
  onChange: (data: SkillsData) => void;
}

export function TechnicalSkills({ data, onChange }: TechnicalSkillsProps) {
  const skillCategories = [
    { key: 'programming', label: 'Programming Languages', icon: '💻' },
    { key: 'frameworks', label: 'AI/ML Frameworks', icon: '🧠' },
    { key: 'ml', label: 'Machine Learning', icon: '🤖' },
    { key: 'rag', label: 'RAG & Retrieval', icon: '🔍' },
    { key: 'tools', label: 'Tools & Platforms', icon: '🔧' },
    { key: 'cloud', label: 'Cloud & Infrastructure', icon: '☁️' }
  ] as const;

  const addSkill = (category: keyof SkillsData) => {
    onChange({
      ...data,
      [category]: [...data[category], '']
    });
  };

  const updateSkill = (category: keyof SkillsData, index: number, value: string) => {
    const updated = [...data[category]];
    updated[index] = value;
    onChange({
      ...data,
      [category]: updated
    });
  };

  const removeSkill = (category: keyof SkillsData, index: number) => {
    const updated = data[category].filter((_, i) => i !== index);
    onChange({
      ...data,
      [category]: updated
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <span>⚡</span>
        Technical Skills
      </h3>

      {skillCategories.map(({ key, label, icon }) => (
        <div key={key} className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <span>{icon}</span>
              {label}
            </Label>
            <Button onClick={() => addSkill(key)} variant="outline" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data[key].map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={skill}
                  onChange={(e) => updateSkill(key, index, e.target.value)}
                  placeholder={`Add ${label.toLowerCase()}`}
                />
                <Button
                  onClick={() => removeSkill(key, index)}
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

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">💡 Meta-Specific Tips:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Emphasize PyTorch over TensorFlow (Meta's preference)</li>
          <li>• Include FAISS and vector databases for RAG roles</li>
          <li>• Mention Meta's in-house tools if you have experience</li>
          <li>• Focus on production-scale deployment technologies</li>
        </ul>
      </div>
    </div>
  );
}
