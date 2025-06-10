# Svelte + Vite Arcade Builder Project Folder Structure

A scalable, maintainable folder structure for the modernized Arcade Builder app.

```
arcade-builder/
├── public/                 # Static assets (favicon, global images, etc.)
│   └── ...
├── src/
│   ├── assets/             # App-specific images, SVGs, fonts
│   ├── components/         # Reusable Svelte components
│   │   ├── layout/         # Layout-related components (e.g., Grid, Panel)
│   │   ├── ui/             # UI elements (Button, Dropdown, Checkbox, etc.)
│   │   └── builder/        # Arcade builder-specific components
│   ├── routes/             # Page-level Svelte components (if using SvelteKit)
│   ├── stores/             # Svelte stores for state management
│   ├── styles/             # Global and modular CSS/SCSS files
│   ├── utils/              # Utility functions/helpers
│   ├── config/             # App configuration (constants, feature flags)
│   ├── App.svelte          # Root Svelte component
│   └── main.js             # App entry point
├── static/                 # (Optional) Extra static files for deployment
├── tests/                  # Unit and integration tests
├── .env                    # Environment variables
├── package.json
├── vite.config.js
├── README.md
└── ...                     # Other project files (gitignore, etc.)
```

## Folder Purpose

- **public/**: Static files served as-is (e.g., favicon, robots.txt).
- **src/assets/**: App-specific images, SVGs, and fonts.
- **src/components/**: All Svelte components, organized by type and feature.
- **src/routes/**: Top-level pages (for SvelteKit; omit for SPA).
- **src/stores/**: Centralized state management using Svelte stores.
- **src/styles/**: Global and component-level styles.
- **src/utils/**: Helper functions and utilities.
- **src/config/**: Configuration files and constants.
- **tests/**: All test files, mirroring the src structure.

## Notes

- This structure supports both SvelteKit (recommended for routing) and Svelte SPA.
- For Shopify embedding, keep dependencies minimal and bundle only what's needed.
- Organize components by feature for easier scaling as the app grows.

---

**Next Step:**  
Proceed to scaffold this structure in your project directory, then begin building the first interactive layout component.