
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HeaderData } from './types';

interface HeaderSectionProps {
  data: HeaderData;
  onChange: (data: HeaderData) => void;
}

export function HeaderSection({ data, onChange }: HeaderSectionProps) {
  const handleChange = (field: keyof HeaderData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <span>👤</span>
        Contact Information
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Dr. John Smith"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john.smith@university.edu"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
        
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johnsmith"
          />
        </div>
        
        <div>
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={data.github}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="github.com/johnsmith"
          />
        </div>
        
        <div>
          <Label htmlFor="website">Personal Website</Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="www.johnsmith.ai"
          />
        </div>
        
        <div>
          <Label htmlFor="workAuthorization">Work Authorization</Label>
          <Input
            id="workAuthorization"
            value={data.workAuthorization}
            onChange={(e) => handleChange('workAuthorization', e.target.value)}
            placeholder="U.S. Citizen / H1B / OPT"
          />
        </div>
      </div>
    </div>
  );
}
