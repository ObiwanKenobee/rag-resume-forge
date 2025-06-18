
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { EducationItem } from './types';

interface EducationSectionProps {
  data: EducationItem[];
  onChange: (data: EducationItem[]) => void;
}

export function EducationSection({ data, onChange }: EducationSectionProps) {
  const addEducation = () => {
    const newEducation: EducationItem = {
      id: Date.now().toString(),
      degree: '',
      field: '',
      institution: '',
      location: '',
      year: '',
      dissertationTitle: '',
      gpa: ''
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    const updated = data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange(updated);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span>🎓</span>
          Education
        </h3>
        <Button onClick={addEducation} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2">🎯 Education Tips:</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• PhD in AI/ML/CS strongly preferred for research roles</li>
          <li>• Include dissertation title if relevant to LLMs/RAG</li>
          <li>• Mention relevant coursework in deep learning, NLP</li>
          <li>• List publications or thesis work related to generative AI</li>
        </ul>
      </div>

      {data.map((education) => (
        <div key={education.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Education #{data.indexOf(education) + 1}</h4>
            <Button 
              onClick={() => removeEducation(education.id)}
              variant="destructive"
              size="sm"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Degree *</Label>
              <Input
                value={education.degree}
                onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                placeholder="Ph.D."
              />
            </div>
            
            <div>
              <Label>Field of Study *</Label>
              <Input
                value={education.field}
                onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                placeholder="Computer Science"
              />
            </div>
            
            <div>
              <Label>Institution *</Label>
              <Input
                value={education.institution}
                onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                placeholder="Stanford University"
              />
            </div>
            
            <div>
              <Label>Location</Label>
              <Input
                value={education.location}
                onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                placeholder="Stanford, CA"
              />
            </div>
            
            <div>
              <Label>Year</Label>
              <Input
                value={education.year}
                onChange={(e) => updateEducation(education.id, 'year', e.target.value)}
                placeholder="2020"
              />
            </div>
            
            <div>
              <Label>GPA (optional)</Label>
              <Input
                value={education.gpa}
                onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                placeholder="3.9/4.0"
              />
            </div>
          </div>

          <div>
            <Label>Dissertation Title (if relevant to LLMs/RAG)</Label>
            <Input
              value={education.dissertationTitle}
              onChange={(e) => updateEducation(education.id, 'dissertationTitle', e.target.value)}
              placeholder="Neural Architectures for Large-Scale Information Retrieval"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
