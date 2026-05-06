"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, ExternalLink } from "lucide-react"

export default function LeadsViewPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/leads')
      .then(res => res.json())
      .then(data => {
        setLeads(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-heading font-bold text-foreground">Captured Leads</h1>
        <p className="text-muted-foreground">Manage and respond to property inquiries from potential buyers.</p>
      </div>

      <Card className="border-primary/10 shadow-sm">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle>Inquiry History</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-primary/10">
                <TableHead className="font-bold text-primary">Customer Name</TableHead>
                <TableHead className="font-bold text-primary">Interested In</TableHead>
                <TableHead className="font-bold text-primary">Contact Info</TableHead>
                <TableHead className="font-bold text-primary">Submission Date</TableHead>
                <TableHead className="text-right font-bold text-primary">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length > 0 ? (
                leads.map((lead: any) => (
                  <TableRow key={lead.id} className="border-primary/5 hover:bg-primary/5 transition-colors">
                    <TableCell className="font-semibold">{lead.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {lead.propertyTitle}
                        <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary border-primary/20">New</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="size-3 text-primary/70" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="size-3 text-primary/70" />
                          {lead.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(lead.created_at).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary transition-all">
                        Contacted <ExternalLink className="size-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 text-muted-foreground italic">
                    {loading ? 'Loading leads...' : 'No inquiries found.'}
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
