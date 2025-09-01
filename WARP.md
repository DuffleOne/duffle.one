# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a personal website project for Laura Miller (duffle.one) consisting of two static HTML sites:

- **Home page** (`/home`): Personal landing page with social media links, built with Tailwind CSS
- **Display page** (`/display`): Guest information page for Laura's flat, using Bootstrap

The project deploys to AWS S3 with automated CI/CD through Drone CI.

## Development Commands

### Building the Project

```bash
# Build the entire project locally
./compile.sh
```

```bash
# Build just the home page (Tailwind CSS compilation)
cd home && npm run build
```

```bash
# Watch for changes during development (home page only)
cd home && npm run watch
```

### Installing Dependencies

```bash
# Install Node.js dependencies for the home page
cd home && npm install
```

### Local Development

```bash
# Start Tailwind CSS in watch mode for live development
cd home && npm run watch
```

After running this command, you can open `build/index.html` in your browser and see changes reflected as you modify the CSS classes or HTML.

### Deployment

```bash
# Deploy to production (requires AWS CLI configured)
./publish.sh
```

## Architecture

### Project Structure

```
duffle.one/
├── home/              # Main personal website
│   ├── src/
│   │   ├── index.html # Home page HTML
│   │   ├── input.css  # Tailwind CSS input file
│   │   └── *.svg      # Social media icons
│   └── package.json   # Node.js dependencies (Tailwind CSS)
├── display/           # Guest information page
│   ├── index.html     # Static HTML with Bootstrap
│   └── *.svg          # UniFi app icons
├── build/             # Generated output directory
├── compile.sh         # Local build script
├── publish.sh         # Production deployment script
└── .drone.yml         # CI/CD configuration
```

### Build Process

1. **Home page**: Tailwind CSS compiles `home/src/input.css` → `build/output.css`
2. **Static files**: HTML and SVG files are copied to `build/` directory
3. **Display page**: Files copied to `build/display/` subdirectory

### Deployment Pipeline

- **Development**: Pushes to any branch deploy to `s3://duffle.one/dev`
- **Production**: Pushes to `master` branch deploy to `s3://duffle.one` with `--delete` flag

### Technology Stack

- **Styling**: Tailwind CSS v4 (home page), Bootstrap 5 (display page)
- **Build tool**: Tailwind CLI
- **CI/CD**: Drone CI with Docker containers
- **Hosting**: AWS S3 static website hosting
- **Version control**: Git

## Key Files

- `home/src/index.html`: Main personal landing page
- `home/src/input.css`: Tailwind CSS configuration and imports
- `display/index.html`: Guest information page
- `.drone.yml`: CI/CD pipeline configuration
- `compile.sh`: Local build script that mirrors CI build process
- `publish.sh`: Production deployment script

## Development Notes

- The home page uses Tailwind CSS v4 with the new CLI approach
- No custom Tailwind config file - uses defaults with source scanning from `../src`
- Display page is completely separate and uses CDN-hosted Bootstrap
- Both pages are designed to be static with no JavaScript dependencies
- SVG icons are stored locally and copied during build process
