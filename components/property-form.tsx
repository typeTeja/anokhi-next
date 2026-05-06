'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Save, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT_HIGHLIGHTS = [
  { label: 'Location', value: '' },
  { label: 'Total Land Area', value: '' },
  { label: 'No of Units', value: '' },
  { label: 'Plot Sizes', value: '' },
  { label: 'Project Type', value: '' },
  { label: 'Possession Time', value: '' },
  { label: 'Clubhouse', value: '' },
  { label: 'Price', value: '' },
];

export default function PropertyForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [type, setType] = useState('Open Plots');
  const [highlights, setHighlights] = useState(DEFAULT_HIGHLIGHTS);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const addHighlight = () => {
    setHighlights([...highlights, { label: '', value: '' }]);
  };

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const updateHighlight = (index: number, field: 'label' | 'value', value: string) => {
    const newHighlights = [...highlights];
    newHighlights[index][field] = value;
    setHighlights(newHighlights);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !city || !area) {
      toast.error('Title, City, and Area are required');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('city', city);
      formData.append('area', area);
      formData.append('type', type);
      formData.append('highlights', JSON.stringify(highlights.filter((h) => h.label.trim() !== '' && h.value.trim() !== '')));
      if (image) {
        formData.append('image', image);
      }

      const response = await fetch('/api/properties', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create property');
      }

      toast.success('Property created successfully!');
      router.push('/');
      router.refresh();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-primary/10">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-heading">Post New Property</CardTitle>
        <CardDescription>
          Fill in the details below. Images and specific locations help attract more leads.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Featured Image</Label>
            <div 
              onClick={() => !imagePreview && fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-4 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer ${imagePreview ? 'border-primary/20 bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5'}`}
            >
              {imagePreview ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden group">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button type="button" variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); removeImage(); }}>
                      <X className="w-4 h-4 mr-2" /> Remove Image
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-primary/5 rounded-full text-primary">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Click to upload thumbnail</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (Max 5MB)</p>
                  </div>
                </>
              )}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="title">Project Name</Label>
              <Input
                id="title"
                placeholder="e.g. My Home Vipina"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-muted/30 border-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="bg-muted/30 border-primary/20">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Area</Label>
              <Input
                id="area"
                placeholder="e.g. Kollur"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
                className="bg-muted/30 border-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Project Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-muted/30 border-primary/20">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Flats">Flats</SelectItem>
                  <SelectItem value="Plots">Plots</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium font-heading">Key Highlights</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addHighlight}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Highlight
              </Button>
            </div>

            <div className="space-y-3">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1 space-y-1">
                    <Label className="text-xs text-muted-foreground">Label</Label>
                    <Input
                      placeholder="e.g. Location"
                      value={highlight.label}
                      onChange={(e) => updateHighlight(index, 'label', e.target.value)}
                      className="bg-muted/10 border-primary/10 h-9"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label className="text-xs text-muted-foreground">Value</Label>
                    <Input
                      placeholder="e.g. Tukkuguda"
                      value={highlight.value}
                      onChange={(e) => updateHighlight(index, 'value', e.target.value)}
                      className="bg-muted/10 border-primary/10 h-9"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeHighlight(index)}
                    className="h-9 w-9"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 pt-6 border-t bg-muted/5">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[140px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Publishing...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" /> Post Project
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
