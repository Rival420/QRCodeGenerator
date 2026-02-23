# QR Code Generator

A customizable, web-based QR code generator built with React and TypeScript. Generate QR codes from any URL or text, apply style presets, customize colors and shapes, embed logos, and download in PNG or SVG format.

## Features

- **12 Style Presets** — Classic, Rounded, Ocean, Sunset, Forest, Midnight, Neon, Royal Purple, Coral, Monochrome, Dots, and Classy
- **Full Customization** — Colors, gradients (linear/radial), dot shapes, corner styles, and QR size (200–1200px)
- **Logo Embedding** — Drag-and-drop a logo (PNG, JPEG, SVG, WebP up to 10 MB) into the center of the QR code
- **Error Correction Levels** — L, M, Q, H — adjust scannability when using logos
- **Export** — Download as PNG or SVG
- **Responsive UI** — Works on desktop and mobile

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Framework | React 19, TypeScript 5.7            |
| Build     | Vite 6                              |
| Styling   | Tailwind CSS 4                      |
| QR Engine | [qr-code-styling](https://github.com/niceBoy324/qr-code-styling) |
| Icons     | Lucide React                        |
| Server    | Nginx 1.27 (production)             |
| Container | Docker (Node 22 Alpine + Nginx Alpine) |

## Prerequisites

Choose one of the following:

- **Docker** (recommended) — Docker Engine 20+ and Docker Compose V2+
- **Local development** — Node.js 22+ and npm

## Deployment

### Option 1: Docker Compose (recommended)

This is the simplest way to build and run the app in production mode.

```bash
# Clone the repository
git clone https://github.com/Rival420/QRCodeGenerator.git
cd QRCodeGenerator

# Build and start the container
docker compose up -d
```

The app will be available at **http://localhost:8080**.

To stop the container:

```bash
docker compose down
```

### Option 2: Docker (manual)

```bash
# Build the image
docker build -t qr-code-generator .

# Run the container
docker run -d -p 8080:80 --name qr-generator qr-code-generator
```

The app will be available at **http://localhost:8080**.

### Option 3: Local development

```bash
# Install dependencies
npm install

# Start the dev server (hot-reload enabled)
npm run dev
```

Vite will start a dev server, typically at **http://localhost:5173**.

### Option 4: Local production build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
QRCodeGenerator/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, AppLayout
│   │   ├── qr-input/        # Data input, logo upload
│   │   ├── qr-preview/      # QR preview, preset grid
│   │   ├── qr-customize/    # Color, shape, gradient controls
│   │   ├── qr-download/     # Download button + format selector
│   │   └── ui/              # Reusable primitives (Button, Card, Input, etc.)
│   ├── hooks/               # Custom React hooks
│   ├── services/            # QR generation and image processing
│   ├── config/              # Constants, defaults, style presets
│   ├── types/               # TypeScript interfaces
│   └── lib/                 # Utilities
├── Dockerfile               # Multi-stage build (Node → Nginx)
├── docker-compose.yml       # Container orchestration
├── nginx.conf               # SPA routing, caching, gzip, security headers
├── vite.config.ts           # Vite + Tailwind config
└── package.json
```

## Configuration

### Changing the port

Edit `docker-compose.yml` and change the host port:

```yaml
ports:
  - "3000:80"   # Change 3000 to your preferred port
```

### Nginx

The included `nginx.conf` provides:

- SPA fallback routing (all paths serve `index.html`)
- 1-year cache for static assets (JS, CSS, images, fonts)
- Gzip compression
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`)

## License

This project is open source.
