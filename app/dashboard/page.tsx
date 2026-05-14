import { SectionCards } from "@/components/section-cards"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { db } from '@/lib/db';
import { properties, leads, contactLeads } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';

async function getDashboardStats() {
  try {
    // Direct database access for static generation
    const [propertyCount, leadCount, contactLeadCount, recentLeadsData] = await Promise.all([
      db.select({ count: properties.id }).from(properties),
      db.select({ count: leads.id }).from(leads),
      db.select({ count: contactLeads.id }).from(contactLeads),
      db.select({
        id: leads.id,
        propertyTitle: properties.title,
        name: leads.name,
        email: leads.email,
        phone: leads.phone,
        created_at: leads.createdAt
      })
      .from(leads)
      .leftJoin(properties, eq(leads.propertyId, properties.id))
      .orderBy(desc(leads.createdAt))
      .limit(5)
    ]);

    const recentLeads = recentLeadsData.map((lead: any) => ({
      id: lead.id,
      propertyTitle: lead.propertyTitle || 'Project Inquiry',
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      created_at: lead.created_at ? lead.created_at.toISOString() : new Date().toISOString()
    }));

    return {
      totalProperties: propertyCount[0]?.count || 0,
      totalLeads: (leadCount[0]?.count || 0) + (contactLeadCount[0]?.count || 0),
      recentLeads
    };
  } catch (error: unknown) {
    console.error('Failed to fetch dashboard stats:', error);
    return null;
  }
}

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex flex-col gap-4">
      <SectionCards stats={stats} />
      
      <div className="mt-4">
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="text-xl font-heading">Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats && stats.recentLeads && stats.recentLeads.length > 0 ? (
                  stats.recentLeads.map((lead: { id: number; propertyTitle: string; name: string; email: string; phone: string; created_at: string }) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.propertyTitle}</TableCell>
                      <TableCell>{lead.name}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{lead.email}</div>
                          <div className="text-muted-foreground">{lead.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                      No inquiries yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  )
}
