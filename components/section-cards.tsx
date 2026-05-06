"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Building2, Users, TrendingUp, Sparkles } from "lucide-react"

interface SectionCardsProps {
  stats: {
    totalProperties: number;
    totalLeads: number;
  } | null;
}

export function SectionCards({ stats }: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card border-primary/10">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <Building2 className="size-4 text-primary" />
            Total Properties
          </CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {stats?.totalProperties ?? '...'}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-primary/20">
              <TrendingUp className="size-3 mr-1" />
              Active Listings
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Manage your real estate inventory
        </CardFooter>
      </Card>

      <Card className="@container/card border-primary/10">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <Users className="size-4 text-primary" />
            Total Leads
          </CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {stats?.totalLeads ?? '...'}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-primary/20">
              <Sparkles className="size-3 mr-1" />
              Inquiries
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Potential customers interested in projects
        </CardFooter>
      </Card>
    </div>
  )
}
