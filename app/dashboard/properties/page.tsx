"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Eye, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Property {
  id: number;
  title: string;
  city: string;
  area: string;
  type: string;
  created_at: string;
}

export default function PropertiesManagementPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchProperties = (showLoading = true) => {
    if (showLoading) setLoading(true);
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties(false);
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this property? This action cannot be undone.")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete property');
      }

      toast.success("Property deleted successfully");
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to delete property";
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-foreground">Properties Management</h1>
        <Link href="/dashboard/properties/new">
          <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
            <Plus className="size-4" /> Add Property
          </Button>
        </Link>
      </div>

      <Card className="border-primary/10 shadow-sm">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle>All Projects & Plots</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-primary/10">
                <TableHead className="font-bold text-primary">Project Name</TableHead>
                <TableHead className="font-bold text-primary">Location</TableHead>
                <TableHead className="font-bold text-primary">Type</TableHead>
                <TableHead className="font-bold text-primary">Date Added</TableHead>
                <TableHead className="text-right font-bold text-primary">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.length > 0 ? (
                properties.map((prop: Property) => (
                  <TableRow key={prop.id} className="border-primary/5 hover:bg-primary/5 transition-colors">
                    <TableCell className="font-semibold">{prop.title}</TableCell>
                    <TableCell className="text-muted-foreground">{prop.area}, {prop.city}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-none">{prop.type}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(prop.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" title="View" className="hover:text-primary hover:bg-primary/10">
                          <Eye className="size-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:bg-destructive/10" 
                          title="Delete"
                          onClick={() => handleDelete(prop.id)}
                          disabled={deletingId === prop.id}
                        >
                          {deletingId === prop.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 text-muted-foreground italic">
                    {loading ? 'Loading properties...' : 'No properties found.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
