
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { AwardItem } from './types';

interface AwardsSectionProps {
  data: AwardItem[];
  onChange: (data: AwardItem[]) => void;
}

export function AwardsSection({ data, onChange }: AwardsSectionProps) {
  const addAward = () => {
    const newAward: AwardItem = {
      id: Date.now().toString(),
      title: '',
      organization: '',
      year: '',
      description: ''
    };
    onChange([...data, newAward]);
  };

  const updateAward = (id: string, field: keyof AwardItem, value: string) => {
    const updated = data.map(award => 
      award.id === id ? { ...award, [field]: value } : award
    );
    onChange(updated);
  };

  const removeAward = (id: string) => {
    onChange(data.filter(award => award.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span>🏆</span>
          Awards & Recognition
        </h3>
        <Button onClick={addAward} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Award
        </Button>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">🌟 Award Examples:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Meta Research Fellowship</li>
          <li>• ICML/ACL/NeurIPS Best Paper Award</li>
          <li>• Outstanding Paper Award at top-tier venues</li>
          <li>• Dean's Award for Research Excellence</li>
          <li>• Google PhD Fellowship</li>
        </ul>
      </div>

      {data.map((award) => (
        <div key={award.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Award #{data.indexOf(award) + 1}</h4>
            <Button 
              onClick={() => removeAward(award.id)}
              variant="destructive"
              size="sm"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Award Title *</Label>
              <Input
                value={award.title}
                onChange={(e) => updateAward(award.id, 'title', e.target.value)}
                placeholder="Best Paper Award"
              />
            </div>
            
            <div>
              <Label>Organization/Venue *</Label>
              <Input
                value={award.organization}
                onChange={(e) => updateAward(award.id, 'organization', e.target.value)}
                placeholder="NeurIPS 2023"
              />
            </div>
            
            <div>
              <Label>Year *</Label>
              <Input
                value={award.year}
                onChange={(e) => updateAward(award.id, 'year', e.target.value)}
                placeholder="2023"
              />
            </div>
          </div>

          <div>
            <Label>Description (optional)</Label>
            <Textarea
              value={award.description}
              onChange={(e) => updateAward(award.id, 'description', e.target.value)}
              placeholder="Recognition for outstanding contribution to retrieval-augmented generation research"
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
