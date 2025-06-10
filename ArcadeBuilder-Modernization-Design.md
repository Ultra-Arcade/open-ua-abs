# Arcade Builder Modernization Design Document

**Project Objective:**  
Redesign the legacy Arcade Builder Software with a modern, clean, and intuitive interface, suitable for embedding in a Shopify store and standalone hosting. The new version should be lightweight, responsive, and user-friendly, encouraging engagement without overwhelming users.

---

## Framework Recommendation

**Recommended Framework:**  
**Svelte + Vite**

- **Why Svelte?**
  - Extremely lightweight and fast (minimal runtime, small bundle size)
  - Excellent for embedding (generates pure JS/CSS, no heavy dependencies)
  - Simple, component-based architecture for maintainability
  - First-class support for responsive design and accessibility
  - Easy to integrate with Shopify (via custom app blocks or iframes) and standalone hosting

**Alternatives:**  
- Preact (very lightweight React alternative)
- Vue 3 + Vite (slightly heavier, but still efficient)

---

## Key Features Checklist

- [ ] **Customizable Control Panel Preview**
  - [ ] Dynamic button layout and mapping
  - [ ] Upload and preview custom artwork
  - [ ] Real-time color and label updates

- [ ] **Color & Attribute Selectors**
  - [ ] Dropdowns for button/joystick colors
  - [ ] Attribute selectors (model, layout, legend, type, etc.)
  - [ ] File upload for artwork

- [ ] **Responsive Design**
  - [ ] Mobile, tablet, and desktop support
  - [ ] Touch-friendly controls

- [ ] **Export & Save Options**
  - [ ] Download template as image/PDF
  - [ ] Save/share configuration (link or file)

- [ ] **Accessibility**
  - [ ] Keyboard navigation
  - [ ] Screen reader support

- [ ] **Embeddability**
  - [ ] Easy integration for Shopify (iframe or app block)
  - [ ] Standalone deployment (company website, other platforms)

---

## UI/UX Improvements Checklist

- [ ] **Modern Visual Design**
  - [ ] Clean, minimal color palette
  - [ ] Consistent iconography and typography
  - [ ] Subtle animations and transitions

- [ ] **Intuitive Layout**
  - [ ] Logical grouping of controls (colors, attributes, preview)
  - [ ] Clear call-to-action buttons (save, export, reset)

- [ ] **User Guidance**
  - [ ] Tooltips and inline help
  - [ ] Error handling and validation feedback

- [ ] **Progressive Disclosure**
  - [ ] Hide advanced options by default
  - [ ] Expand/collapse sections for power users

- [ ] **Feedback & Engagement**
  - [ ] Visual confirmation on actions (e.g., save, export)
  - [ ] Optional onboarding/tutorial modal

---

## Development Milestones Checklist

- [ ] **Project Setup**
  - [ ] Initialize Svelte + Vite project
  - [ ] Set up version control (GitHub)

- [ ] **Core UI Components**
  - [ ] Control panel preview
  - [ ] Color/attribute selectors
  - [ ] File upload

- [ ] **State Management**
  - [ ] Centralized store for configuration

- [ ] **Responsive & Accessible Design**
  - [ ] Implement responsive layout
  - [ ] Add accessibility features

- [ ] **Export/Save Functionality**
  - [ ] Image/PDF export
  - [ ] Save/share config

- [ ] **Embedding & Integration**
  - [ ] Shopify embed guide
  - [ ] Standalone deployment guide

- [ ] **Testing & QA**
  - [ ] Cross-browser/device testing
  - [ ] User feedback & iteration

- [ ] **Launch**
  - [ ] Deploy to Shopify and company website
  - [ ] Announce and document

---

## Embedding & Responsiveness Notes

- **Shopify Integration:**  
  - Use as a custom app block or embed via iframe
  - Ensure no external dependencies that conflict with Shopify
  - Provide clear integration instructions

- **Standalone Hosting:**  
  - Deploy as a static site (Netlify, Vercel, or own server)
  - Ensure SEO and performance optimizations

- **Responsiveness:**  
  - Use CSS Grid/Flexbox for layout
  - Test on all major devices and browsers

---

## Progress Tracking

> Use the checkboxes above to track your progress.  
> This document can be used in GitHub, Notion, or any Markdown-compatible tool for interactive tracking.

---

**Reference:**  
- Legacy UI screenshot (see attached image)
- Minimum resolution: 1360x793
- Real dimensions: 36cm x 21cm

---

**Version:** 1.0  
**Last Updated:** 2025-06-10