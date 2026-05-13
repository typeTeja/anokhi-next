"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Loader2,
  Search,
  Star,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Property {
  id: number
  title: string | null
  city: string | null
  area: string | null
  type: string | null
  isFeatured: number | boolean | null
  created_at: string
}

export default function PropertiesManagementPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const fetchProperties = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true)

    try {
      const response = await fetch("/api/properties?limit=100")

      if (!response.ok) {
        throw new Error("Failed to fetch properties")
      }

      const data = await response.json()
      setProperties(data.properties || [])
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to fetch properties"

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const loadProperties = async () => {
      await fetchProperties(false)
    }

    loadProperties()
  }, [fetchProperties])

  const handleDelete = async (id: number) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this property? This action cannot be undone."
      )
    )
      return

    setDeletingId(id)

    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete property")
      }

      toast.success("Property deleted successfully")

      setProperties((prev) => prev.filter((p) => p.id !== id))
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete property"

      toast.error(message)
    } finally {
      setDeletingId(null)
    }
  }

  // Filtered Properties
  const filteredProperties = properties.filter((prop) => {
    const title = prop.title || ""
    const type = prop.type || ""

    const matchesSearch = title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesType =
      typeFilter === "all" ||
      type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesType
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Properties Management
        </h1>

        <Link href="/dashboard/properties/new">
          <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
            <Plus className="size-4" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Card */}
      <Card className="border-primary/10 shadow-sm">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle>All Projects & Plots</CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

              <input
                type="text"
                placeholder="Search by property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="flats">Flats</option>
              <option value="plots">Plots</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-primary/10">
                  <TableHead className="font-bold text-primary">
                    Project Name
                  </TableHead>

                  <TableHead className="font-bold text-primary">
                    Location
                  </TableHead>

                  <TableHead className="font-bold text-primary">
                    Type
                  </TableHead>

                  <TableHead className="font-bold text-primary">
                    Featured
                  </TableHead>
                  <TableHead className="font-bold text-primary">
                    Date Added
                  </TableHead>

                  <TableHead className="text-right font-bold text-primary">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((prop: Property) => (
                    <TableRow
                      key={prop.id}
                      className="border-primary/5 hover:bg-primary/5 transition-colors"
                    >
                      {/* Title */}
                      <TableCell className="font-semibold">
                        {prop.title || "Untitled Property"}
                      </TableCell>

                      {/* Location */}
                      <TableCell className="text-muted-foreground">
                        {prop.area || "-"}, {prop.city || "-"}
                      </TableCell>

                      {/* Type */}
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary border-none"
                        >
                          {prop.type || "N/A"}
                        </Badge>
                      </TableCell>

                      {/* Featured */}
                      <TableCell>
                        {prop.isFeatured ? (
                          <Star className="size-4 fill-yellow-400 text-yellow-400" />
                        ) : (
                          <Star className="size-4 text-muted-foreground/30" />
                        )}
                      </TableCell>

                      {/* Date */}
                      <TableCell className="text-muted-foreground text-sm">
                        {prop.created_at
                          ? new Date(prop.created_at).toLocaleDateString()
                          : "-"}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {/* View */}
                          <Button
                            variant="ghost"
                            size="icon"
                            title="View"
                            className="hover:text-primary hover:bg-primary/10"
                          >
                            <Eye className="size-4" />
                          </Button>

                          {/* Edit */}
                          <Link
                            href={`/dashboard/properties/${prop.id}/edit`}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Edit"
                              className="hover:text-primary hover:bg-primary/10"
                            >
                              <Edit className="size-4" />
                            </Button>
                          </Link>

                          {/* Delete */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10"
                            title="Delete"
                            onClick={() => handleDelete(prop.id)}
                            disabled={deletingId === prop.id}
                          >
                            {deletingId === prop.id ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <Trash2 className="size-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-20 text-muted-foreground italic"
                    >
                      {loading
                        ? "Loading properties..."
                        : "No matching properties found."}
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