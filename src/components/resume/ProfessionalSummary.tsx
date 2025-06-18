
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { SummaryData } from './types';

interface ProfessionalSummaryProps {
  data: SummaryData;
  onChange: (data: SummaryData) => void;
}

export function ProfessionalSummary({ data, onChange }: ProfessionalSummaryProps) {
  const handleContentChange = (value: string) => {
    onChange({ ...data, content: value });
  };

  const handleYearsChange = (value: string) => {
    onChange({ ...data, yearsExperience: value });
  };

  const addFocusArea = () => {
    onChange({ ...data, focusAreas: [...data.focusAreas, ''] });
  };

  const updateFocusArea = (index: number, value: string) => {
    const updated = [...data.focusAreas];
    updated[index] = value;
    onChange({ ...data, focusAreas: updated });
  };

  const removeFocusArea = (index: number) => {
    const updated = data.focusAreas.filter((_, i) => i !== index);
    onChange({ ...data, focusAreas: updated });
  };

  const addAchievement = () => {
    onChange({ ...data, achievements: [...data.achievements, ''] });
  };

  const updateAchievement = (index: number, value: string) => {
    const updated = [...data.achievements];
    updated[index] = value;
    onChange({ ...data, achievements: updated });
  };

  const removeAchievement = (index: number) => {
    const updated = data.achievements.filter((_, i) => i !== index);
    onChange({ ...data, achievements: updated });
  };

  const generateSample = () => {
    const sample = `AI Research Scientist with ${data.yearsExperience || '6+'}+ years of experience advancing large-scale Retrieval-Augmented Generation systems and foundation models. PhD in Machine Learning with a focus on multimodal RAG. First-author at ACL, ICLR, and NeurIPS. Built and deployed real-time conversational agents powering 100M+ user interactions monthly. Skilled in designing scalable LLM pipelines, optimizing transformer models, and bridging research-to-product impact.`;
    handleContentChange(sample);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span>📝</span>
          Professional Summary
        </h3>
        <Button onClick={generateSample} variant="outline" size="sm">
          Generate Sample
        </Button>
      </div>
      
      <div>
        <Label htmlFor="yearsExperience">Years of Experience</Label>
        <Input
          id="yearsExperience"
          value={data.yearsExperience}
          onChange={(e) => handleYearsChange(e.target.value)}
          placeholder="6+"
          className="mb-2"
        />
      </div>

      <div>
        <Label htmlFor="summary">Professional Summary (3-5 lines) *</Label>
        <Textarea
          id="summary"
          value={data.content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="AI Research Scientist with X+ years of experience advancing large-scale Retrieval-Augmented Generation systems..."
          rows={4}
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          Focus on RAG, LLMs, production-scale deployment, top-tier research, and real-world impact.
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Key Focus Areas</Label>
          <Button onClick={addFocusArea} variant="outline" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {data.focusAreas.map((area, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              value={area}
              onChange={(e) => updateFocusArea(index, e.target.value)}
              placeholder="e.g., Retrieval-Augmented Generation"
            />
            <Button
              onClick={() => removeFocusArea(index)}
              variant="outline"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Key Achievements</Label>
          <Button onClick={addAchievement} variant="outline" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {data.achievements.map((achievement, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              value={achievement}
              onChange={(e) => updateAchievement(index, e.target.value)}
              placeholder="e.g., First-author at ACL, ICLR, and NeurIPS"
            />
            <Button
              onClick={() => removeAchievement(index)}
              variant="outline"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
