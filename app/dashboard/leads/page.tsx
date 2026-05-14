import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, ExternalLink } from "lucide-react"
import { db } from '@/lib/db';
import { leads, properties, contactLeads } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';

interface ProjectLead {
  type: 'project';
  id: number;
  name: string;
  email: string;
  phone: string;
  propertyTitle: string;
  created_at: string;
}

interface ContactLead {
  type: 'contact';
  id: number;
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  created_at: string;
}

type Lead = ProjectLead | ContactLead;

async function getProjectLeads(): Promise<ProjectLead[]> {
  try {
    const leadsData = await db.select({
      id: leads.id,
      name: leads.name,
      email: leads.email,
      phone: leads.phone,
      created_at: leads.createdAt,
      propertyTitle: properties.title
    })
    .from(leads)
    .leftJoin(properties, eq(leads.propertyId, properties.id))
    .orderBy(desc(leads.createdAt));

    return leadsData.map(lead => ({
      type: 'project',
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      propertyTitle: lead.propertyTitle || 'General Inquiry',
      created_at: lead.created_at ? lead.created_at.toISOString() : new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching project leads:', error);
    return [];
  }
}

async function getContactLeads(): Promise<ContactLead[]> {
  try {
    const leadsData = await db.select()
    .from(contactLeads)
    .orderBy(desc(contactLeads.createdAt));

    return leadsData.map(lead => ({
      type: 'contact',
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      inquiryType: lead.inquiryType || 'General',
      message: lead.message || '',
      created_at: lead.createdAt ? lead.createdAt.toISOString() : new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching contact leads:', error);
    return [];
  }
}

import { LeadsFilter } from "@/components/leads-filter"
import { Suspense } from "react"

export const dynamic = 'force-dynamic';

export default async function LeadsViewPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type = 'project' } = await searchParams;
  const leads = type === 'contact' ? await getContactLeads() : await getProjectLeads();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-heading font-bold text-foreground">Captured Leads</h1>
          <p className="text-muted-foreground">Manage and respond to inquiries from potential buyers.</p>
        </div>
        <Suspense>
          <LeadsFilter />
        </Suspense>
      </div>

      <Card className="border-primary/10 shadow-sm">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle>{type === 'contact' ? 'Contact Inquiries' : 'Project Inquiries'}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-primary/10">
                <TableHead className="font-bold text-primary">Customer Name</TableHead>
                <TableHead className="font-bold text-primary">
                  {type === 'contact' ? 'Inquiry Type' : 'Interested In'}
                </TableHead>
                <TableHead className="font-bold text-primary">Contact Info</TableHead>
                {type === 'contact' && <TableHead className="font-bold text-primary">Message</TableHead>}
                <TableHead className="font-bold text-primary">Submission Date</TableHead>
                <TableHead className="text-right font-bold text-primary">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length > 0 ? (
                leads.map((lead: Lead) => (
                  <TableRow key={lead.id} className="border-primary/5 hover:bg-primary/5 transition-colors">
                    <TableCell className="font-semibold">{lead.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {lead.type === 'project' ? lead.propertyTitle : lead.inquiryType}
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
                    {lead.type === 'contact' && (
                      <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                        {lead.message}
                      </TableCell>
                    )}
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
                  <TableCell colSpan={type === 'contact' ? 6 : 5} className="text-center py-20 text-muted-foreground italic">
                    No inquiries found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      </Card>
    </div>
  )
}
