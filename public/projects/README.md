# Projects Assets Structure

This folder contains all project-related images organized by project.

## Folder Structure

```
projects/
├── wizglobal/
│   ├── banner.png                      # Main project banner/background
│   ├── screenshot-01-dashboard.jpg     # Dashboard view
│   ├── screenshot-02-profile.jpg       # Profile/User view
│   └── screenshot-03-features.webp     # Features showcase
├── bitlipa/
│   ├── banner.png                      # Main project banner/background
│   ├── screenshot-01-wallet.jpg        # Wallet interface
│   ├── screenshot-02-transactions.jpg  # Transaction history
│   └── screenshot-03-exchange.webp     # Exchange/Trading view
└── README.md                           # This file
```

## Naming Convention

- **banner.png**: Main project image used as card background and modal banner
- **screenshot-XX-description**: App screenshots with descriptive names
  - Format: `screenshot-{number}-{description}.{ext}`
  - Example: `screenshot-01-dashboard.jpg`

## Usage

- Banner images are used in project cards and modal headers
- Screenshots are displayed in the modal gallery
- All paths are relative to `/public/` in the Next.js app
- Access via `/projects/{project-id}/{filename}`

## Adding New Projects

1. Create new folder: `/public/projects/{project-id}/`
2. Add banner.png for the main project image
3. Add numbered screenshots with descriptive names
4. Update the project data in `components/ProjectShowcase.tsx`
