# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 project showcasing a timeline of personal projects with development logs. The application is built with TypeScript, uses Tailwind CSS for styling, and shadcn/ui components for the interface.

## Development Commands

- **Development server**: `npm run dev` or `pnpm dev`
- **Build**: `npm run build` or `pnpm build` 
- **Production server**: `npm run start` or `pnpm start`
- **Linting**: `npm run lint` or `pnpm lint`

## Architecture & Key Concepts

### Content Structure
The project uses a file-based content system stored in `content/projects/`:
```
content/projects/
├── project-slug/
│   ├── index.md          # Project metadata and description
│   └── logs/
│       ├── log1.md       # Development log entries
│       └── log2.md
```

### Core Libraries
- **Content Processing**: Uses `lib/projects.ts` and `lib/logs.ts` to read markdown files with `gray-matter` for frontmatter parsing
- **Markdown Rendering**: `lib/markdown.ts` processes markdown with `unified`, `remark-gfm`, and `rehype-highlight` for syntax highlighting
- **UI Components**: Built with shadcn/ui components and Tailwind CSS
- **Theme Support**: Uses `next-themes` for dark/light mode switching

### Key Components
- `Timeline` (`components/timeline.tsx`): Main timeline display showing projects chronologically
- `ProjectHeader` (`components/project-header.tsx`): Individual project detail header
- `LogsList` (`components/logs-list.tsx`): Displays development logs for a project

### Data Flow
1. Projects are read from filesystem using `getAllProjects()` and `getProjectBySlug()`
2. Logs are fetched per project using `getProjectLogs()`
3. Markdown content is processed with enhanced features (syntax highlighting, autolink headings, GFM support)
4. Static pages are generated for all projects using `generateStaticParams()`

### Content Frontmatter Schema
Projects (`index.md`):
```yaml
title: "Project Title"
description: "Project description"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
```

Logs (`logs/*.md`):
```yaml
title: "Log Title"  
date: "YYYY-MM-DD"
```

### Styling Approach
- Uses Tailwind CSS with custom CSS variables for theming
- Glass morphism effects with `glass-effect` class
- Gradient backgrounds and hover animations
- Responsive design patterns

## Important Notes

- Project slugs are derived from directory names in `content/projects/`
- All markdown processing includes fallback error handling
- The app automatically creates missing directories when needed
- Static generation is used for optimal performance
- Syntax highlighting supports: JavaScript, TypeScript, Python, Bash, JSON, CSS, HTML, SQL, YAML, Markdown