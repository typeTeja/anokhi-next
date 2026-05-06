Add this features to the real estate project:

1. Core Features:

- Display property/project cards with:
  - Thumbnail / featured image
  - Project name
  - City + area
  - Project type (Open Plots, Apartment, etc.)
  - Key highlights (short list)

- No separate property detail page for now.

- Keep structure ready for future expansion, but DO NOT link cards to detail page.

---

2. Image Upload:

- Add option to upload thumbnail/featured image while creating property
- Store uploaded images inside:
  /public/uploads/
- Save only image path in MySQL
- Handle basic file upload via Next.js API route

---

3. Dynamic Property Highlights:

- Admin can add multiple highlights:
  Example:
  Location - Tukkuguda
  Total Land Area - 32.6 Acres
  No of Units - 400 Units
  Plot Sizes - 150 – 700 Sqyd
  Project Type - Gated Open Plots
  Possession Time - Dec 2026
  Clubhouse - 5000 SFT
  Price - ₹30,000 / Sqyd

- Allow:
  - Add/remove custom fields dynamically
  - Store as label/value pairs in DB

---

4. Lead Capture (Important):

- Each project card must have:
  👉 "Know More" button

- On click:
  - Open popup modal form
  - Automatically pass project name (hidden field)

- Form fields:
  - Name
  - Email
  - Phone
  - Project Name (auto-filled)

- Save leads in MySQL

---

5. Search & Filters:

Add simple filter options:

- City (Hyderabad, Bangalore)

- Area (Kollur, Gachibowli, Pocharam, etc.)

- Project Type:
  - Open Plots
  - Apartment

- Use query params:
  /properties?city=Hyderabad&area=Kollur&type=plot

- Backend:
  Apply SQL filtering based on inputs

---

6. UI Design (Important):

- Clean, modern card layout

- Responsive design (mobile-first)

- Each card:
  - Image on top
  - Below:
    - Title
    - Location
    - Highlights (2–4 items)
    - CTA button (Know More)

- Use:
  - Rounded corners
  - Soft shadows
  - Proper spacing
  - Good typography

---

7. Database Tables:

properties:

- id
- title
- city
- area
- type
- image
- created_at

property_highlights:

- id
- property_id
- label
- value

leads:

- id
- property_id
- name
- email
- phone
- created_at

---

8. API Routes:

- POST /api/properties → create property (with image upload)
- GET /api/properties → list + filters
- POST /api/highlights → save highlights
- POST /api/leads → save lead form

---

9. Code Requirements:

- Use App Router structure
- Use reusable components
- Keep code simple and readable
- No overengineering

---

10. Output:

- Provide full working code
- Include folder structure
- Include SQL queries
- Include image upload handling
- Include modal popup implementation

---

Goal Summary:

Build a beautiful, simple real estate listing UI with:
✔ Image-based cards
✔ Highlights display
✔ Lead capture popup
✔ Search filters
✔ Dynamic fields
✔ Easy to scale later
