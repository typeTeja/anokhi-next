import { mysqlTable, serial, varchar, timestamp, int } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const properties = mysqlTable('properties', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  area: varchar('area', { length: 100 }),
  type: varchar('type', { length: 50 }),
  image: varchar('image', { length: 255 }),
  isFeatured: int('is_featured').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const propertyHighlights = mysqlTable('property_highlights', {
  id: serial('id').primaryKey(),
  propertyId: int('property_id').references(() => properties.id),
  label: varchar('label', { length: 255 }).notNull(),
  value: varchar('value', { length: 255 }).notNull(),
});

export const leads = mysqlTable('leads', {
  id: serial('id').primaryKey(),
  propertyId: int('property_id').references(() => properties.id),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const propertiesRelations = relations(properties, ({ many }) => ({
  highlights: many(propertyHighlights),
  leads: many(leads),
}));

export const propertyHighlightsRelations = relations(propertyHighlights, ({ one }) => ({
  property: one(properties, {
    fields: [propertyHighlights.propertyId],
    references: [properties.id],
  }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  property: one(properties, {
    fields: [leads.propertyId],
    references: [properties.id],
  }),
}));

export const contactLeads = mysqlTable('contact_leads', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  inquiryType: varchar('inquiry_type', { length: 100 }),
  message: varchar('message', { length: 1000 }),
  createdAt: timestamp('created_at').defaultNow(),
});
