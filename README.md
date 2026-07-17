# Premium Data Analyst Portfolio - Sanketh

A modern, production-ready single-page portfolio website designed with a high-end corporate data analytics dashboard aesthetic.

## Features

- **Theme**: Dark professional dashboard-inspired palette (`#0F172A` background, `#1E293B` card backgrounds).
- **Glassmorphism**: Elegant card borders, soft box-shadows, and backdrop filter blurs.
- **Interactions**: Smooth scrolling, sticky navigation scroll shrinking, active navigation item highlighting (Scroll Spy), and subtle scroll animations (Fade-in).
- **Visuals**: Beautiful premium illustration cards for projects and profile avatar.
- **Components**:
  - Hero Profile with a dashboard performance metric overlay badge.
  - Quick-facts performance counters.
  - Grouped technical skill list with capability level badges.
  - Multi-column project details with custom tags and dual action buttons (GitHub & Live Demo).
  - Clean vertical timeline displaying BCA Education history.
  - High-impact responsive Certification cards.
  - Fully responsive contact details combined with a clean dashboard contact form (includes email validation and simulated submission status).
  - Floating back-to-top button.
- **Codebase**: Fully semantic HTML5, clean vanilla CSS variables, and modern Javascript. Standard fonts (Inter & Poppins) and high-quality vector icons. Fully responsive (mobile/tablet/desktop ready).

---

## Folder Structure

```
portfolio11/
├── index.html           # Main HTML document
├── css/
│   ├── style.css        # Central stylesheet, variable system, components
│   └── responsive.css   # Responsive layout rules & mobile breakpoints
├── js/
│   └── script.js        # Scrolling, Mobile Menu, validation logic
├── images/
│   ├── profile.png           # Profile photo headshot
│   ├── sales_dashboard.png   # Sales Dashboard thumbnail
│   ├── customer_churn.png    # Customer Churn thumbnail
│   ├── hr_analytics.png      # HR Analytics thumbnail
│   └── sql_cleaning.png      # SQL Data Cleaning thumbnail
├── files/
│   └── Resume.pdf       # Professional Resume PDF
└── README.md            # Project guide
```

---

## Customization Guide

### 1. Personal Details & Copy
Open [index.html](file:///c:/Users/mr/OneDrive/Desktop/portfolio11/index.html) and search for the text placeholders to customize details:
- Replace `Sanketh` with your name.
- Customize email, phone number, location, and social links in the **Contact Section** (line 330-380).
- Update links for GitHub repositories and Live Demos inside the `project-card` blocks.

### 2. Replacing Images
Simply overwrite the corresponding files in the `images/` directory:
- Update your headshot by replacing [profile.png](file:///c:/Users/mr/OneDrive/Desktop/portfolio11/images/profile.png) (recommended dimensions: `500x500` or square ratio).
- Update your case studies by replacing [sales_dashboard.png](file:///c:/Users/mr/OneDrive/Desktop/portfolio11/images/sales_dashboard.png), [customer_churn.png](file:///c:/Users/mr/OneDrive/Desktop/portfolio11/images/customer_churn.png), etc. (recommended dimensions: `16:9` ratio, e.g. `800x450`).

### 3. Updating the Resume
Overwrite [Resume.pdf](file:///c:/Users/mr/OneDrive/Desktop/portfolio11/files/Resume.pdf) inside the `files/` folder with your actual PDF resume file. Ensure the file name matches exactly, or update the download link inside the Hero Section of [index.html](file:///c:/Users/mr/OneDrive/Desktop/portfolio11/index.html).

### 4. Customizing Styles & Colors
To change the color system or styling variables, edit [style.css](file:///c:/Users/mr/OneDrive/Desktop/portfolio11/css/style.css). Modify the CSS custom properties inside the `:root` pseudo-class (lines 10-25) to align with your personal brand palette:
```css
:root {
  --primary: #2563EB;     /* Change main button and emphasis color */
  --accent: #38BDF8;      /* Change hover border and badge colors */
  --bg-color: #0F172A;    /* Main site backdrop */
}
```
