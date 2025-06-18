
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { PublicationItem } from './types';

interface PublicationsSectionProps {
  data: PublicationItem[];
  onChange: (data: PublicationItem[]) => void;
}

export function PublicationsSection({ data, onChange }: PublicationsSectionProps) {
  const addPublication = () => {
    const newPublication: PublicationItem = {
      id: Date.now().toString(),
      title: '',
      authors: '',
      venue: '',
      year: '',
      citations: '',
      link: '',
      isFirstAuthor: false
    };
    onChange([...data, newPublication]);
  };

  const updatePublication = (id: string, field: keyof PublicationItem, value: any) => {
    const updated = data.map(pub => 
      pub.id === id ? { ...pub, [field]: value } : pub
    );
    onChange(updated);
  };

  const removePublication = (id: string) => {
    onChange(data.filter(pub => pub.id !== id));
  };

  const topVenues = [
    'NeurIPS', 'ICML', 'ICLR', 'AAAI', 'ACL', 'EMNLP', 'NAACL', 'COLING',
    'ICCV', 'CVPR', 'ECCV', 'KDD', 'SIGIR', 'WWW', 'WSDM', 'CIKM'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span>📄</span>
          Publications & Research
        </h3>
        <Button onClick={addPublication} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Publication
        </Button>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg">
        <h4 className="font-medium text-orange-800 mb-2">🏆 Publication Tips:</h4>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• Focus on top 4-6 first-author publications</li>
          <li>• Prioritize generative AI, LLMs, RAG, information retrieval</li>
          <li>• Include citation counts if impressive (100+)</li>
          <li>• Top venues: {topVenues.slice(0, 8).join(', ')}</li>
        </ul>
      </div>

      {data.map((publication) => (
        <div key={publication.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Publication #{data.indexOf(publication) + 1}</h4>
            <Button 
              onClick={() => removePublication(publication.id)}
              variant="destructive"
              size="sm"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label>Paper Title *</Label>
            <Textarea
              value={publication.title}
              onChange={(e) => updatePublication(publication.id, 'title', e.target.value)}
              placeholder="Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Authors *</Label>
              <Input
                value={publication.authors}
                onChange={(e) => updatePublication(publication.id, 'authors', e.target.value)}
                placeholder="J. Smith, A. Johnson, et al."
              />
            </div>
            
            <div>
              <Label>Venue *</Label>
              <Input
                value={publication.venue}
                onChange={(e) => updatePublication(publication.id, 'venue', e.target.value)}
                placeholder="NeurIPS"
                list={`venues-${publication.id}`}
              />
              <datalist id={`venues-${publication.id}`}>
                {topVenues.map(venue => (
                  <option key={venue} value={venue} />
                ))}
              </datalist>
            </div>
            
            <div>
              <Label>Year *</Label>
              <Input
                value={publication.year}
                onChange={(e) => updatePublication(publication.id, 'year', e.target.value)}
                placeholder="2023"
              />
            </div>
            
            <div>
              <Label>Citations (if impressive)</Label>
              <Input
                value={publication.citations}
                onChange={(e) => updatePublication(publication.id, 'citations', e.target.value)}
                placeholder="150+"
              />
            </div>
            
            <div>
              <Label>Link/DOI</Label>
              <Input
                value={publication.link}
                onChange={(e) => updatePublication(publication.id, 'link', e.target.value)}
                placeholder="https://arxiv.org/abs/..."
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`first-author-${publication.id}`}
                checked={publication.isFirstAuthor}
                onCheckedChange={(checked) => 
                  updatePublication(publication.id, 'isFirstAuthor', checked)
                }
              />
              <Label htmlFor={`first-author-${publication.id}`}>First Author</Label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
