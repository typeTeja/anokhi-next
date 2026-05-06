Build a simple real estate listing website using Next.js (App Router) and MySQL. Do not use Prisma or any heavy dependencies. Use mysql2 for database connection.

Main Requirement:
Implement a dynamic "Property Highlights" system where admin can add unlimited custom fields like:

- Location
- Total Land Area
- No of Units
- Plot Sizes
- Project Type
- Possession Time
- Clubhouse
- Price
  …and also allow adding new custom fields dynamically without changing database schema.

1. Database Design:

Create tables:

properties:

- id (primary key)
- title
- city
- created_at

property_highlights:

- id (primary key)
- property_id (foreign key)
- label (e.g. "Total Land Area")
- value (e.g. "32.6 Acres")

2. Backend (Next.js API Routes):

- POST /api/properties → create property
- POST /api/highlights → save multiple highlights (array of label/value)
- GET /api/properties/[id] → return property with highlights (JOIN or separate query)

Use mysql2 with async/await and create a reusable DB connection utility.

3. Frontend Requirements:

Post Property Page:

- Build dynamic form:
  - Default pre-filled highlight fields:
    Location, Total Land Area, No of Units, Plot Sizes, Project Type, Possession Time, Clubhouse, Price
  - Allow user to:
    - Add new field (+ Add Field button)
    - Edit label and value
    - Remove field

- Store highlights as array and send to API

Property Detail Page:

- Display highlights as clean UI:
  Label on left, value on right
  Example:
  Location → Tukkuguda
  Total Land Area → 32.6 Acres

4. Code Expectations:

- Use App Router folder structure
- Write full working code:
  - API routes
  - MySQL queries
  - React components

- Keep code minimal and clean
- No overengineering

5. UI:

- Use Tailwind CSS (optional)
- Create clean “Property Highlights” section
- Responsive layout

6. Output Format:

- Provide full folder structure
- Provide SQL table creation queries
- Provide all code files with filenames

Goal:
Build a flexible system where admin can manage structured and custom property data without modifying code or database schema.
