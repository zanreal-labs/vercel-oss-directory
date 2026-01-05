# Agent Guidelines for Vercel OSS Directory

This document provides essential information for agentic coding systems working in this repository.

## Project Overview

A Next.js 16+ application showcasing Vercel OSS projects. Built with React 19, TypeScript, Tailwind CSS, and shadcn/ui components. Syncs automatically with v0.app deployments.

## Build, Lint & Test Commands

### Running Commands
```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code (ESLint)
pnpm lint
```

### Key Points
- **Package Manager**: pnpm (configured in pnpm-workspace.yaml)
- **No test suite**: This project doesn't have automated tests
- **No format script**: Use IDE formatting or manually ensure code follows style guidelines
- **Linting**: ESLint is configured but no custom config file present (uses Next.js defaults)

## Code Style Guidelines

### TypeScript & General

- **Target**: ES6 with strict mode enabled
- **Module System**: ES modules (esNext)
- **Type Checking**: Strict TypeScript (`strict: true`)
- **File Extensions**: Use `.ts` for utilities, `.tsx` for React components
- **Type Exports**: Use `type` keyword for type imports: `import type { Project } from "@/lib/projects"`
- **No Implicit Any**: Always provide explicit types
- **Nullability**: Be explicit with `| null` or `| undefined`

### Imports & Paths

- **Path Alias**: Use `@/*` alias for imports (configured in tsconfig.json)
  ```typescript
  // ✓ Correct
  import { Project } from "@/lib/projects"
  import { ProjectCard } from "@/components/project-card"
  
  // ✗ Avoid
  import { Project } from "../../../lib/projects"
  ```
- **Grouped Imports**: Follow this order:
  1. External packages (`react`, `next`, third-party libraries)
  2. Type imports (`import type { ... }`)
  3. Internal imports from `@/`
  4. Relative imports (rarely needed)
  
  ```typescript
  import { useState } from "react"
  import Link from "next/link"
  import { Badge } from "@radix-ui/react-badge"
  import type { Project } from "@/lib/projects"
  import { ProjectCard } from "@/components/project-card"
  ```

### React & Components

- **Use Client Components**: Mark interactive components with `"use client"` at the top of file
- **Functional Components**: Always use function syntax, no class components
- **Props Interface**: Define explicit interface for component props
  ```typescript
  interface ProjectCardProps {
    project: Project
  }
  
  export function ProjectCard({ project }: ProjectCardProps) {
    // ...
  }
  ```
- **Naming**: PascalCase for components and types
- **Component Export**: Export as named export, not default
- **Hooks**: Use React hooks (`useState`, `useEffect`, `useMemo`) appropriately
  - Use `useMemo` for expensive computations and derived state
  - Clean up effects in `useEffect` dependencies array

### Formatting & Style

- **Line Length**: No strict limit, but keep readable (~100 chars is reasonable)
- **Indentation**: 2 spaces (configured via Tailwind/PostCSS tooling)
- **Quotes**: Double quotes for strings
- **Semicolons**: Always include
- **Trailing Commas**: Include in multi-line arrays/objects
- **Classes**: Use Tailwind CSS utility classes with shadcn/ui
  ```typescript
  <Card className="group h-full transition-colors hover:border-foreground/20">
  <CardTitle className="text-xl">{project.name}</CardTitle>
  ```

### Naming Conventions

- **Variables/Functions**: camelCase
- **Constants**: camelCase (not UPPER_CASE unless truly constant)
- **React Components**: PascalCase
- **Types/Interfaces**: PascalCase
- **Files**: kebab-case for components/utils (`project-card.tsx`, `format-utils.ts`)
- **Directories**: kebab-case (`components/ui/`, `lib/`)

### Error Handling

- **Async/Await**: Prefer async/await over `.then()` chains
- **Try-Catch**: Use try-catch in async functions
  ```typescript
  try {
    const data = await fetch(url)
    if (!response.ok) {
      console.warn(`Request failed: ${response.status}`)
      return null
    }
  } catch (error) {
    console.error(`Error fetching data:`, error)
    return null
  }
  ```
- **Error Logging**: Use console.error for errors, console.warn for warnings
- **Graceful Fallbacks**: Return sensible defaults (null, undefined, empty array) rather than throwing
- **Null Checks**: Always validate API responses and user data

### Comments & Documentation

- **Minimal Comments**: Write clear code that needs few comments
- **JSDoc**: Use for public functions/exports:
  ```typescript
  /**
   * Extract owner and repo from a GitHub URL
   */
  function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  ```
- **Block Comments**: Use for complex logic sections
- **Avoid**: Obvious comments explaining what the code does

### Next.js Specifics

- **App Router**: Use Next.js app directory structure (already configured)
- **Server/Client**: Clearly mark components with `"use client"` or leave as Server Components
- **API Routes**: Place in `app/api/` directory
- **Dynamic Imports**: Use `next/dynamic` for code splitting when needed
- **Image Optimization**: Use `next/image` component for images
- **Link Component**: Always use `next/link` for internal navigation

### UI & Tailwind

- **Component Library**: Use shadcn/ui components from `@/components/ui/`
- **Radix UI**: Components are built on Radix UI primitives
- **Styling**: Tailwind CSS v4.1+ with `@tailwindcss/postcss`
- **Dark Mode**: next-themes is configured for theme switching
- **Responsive**: Use Tailwind breakpoints (sm, md, lg, xl, 2xl)

## Directory Structure

```
.
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── project-card.tsx  # Feature components
│   └── *.tsx
├── lib/                   # Utilities and helpers
│   ├── projects.ts       # Project data and types
│   ├── github.ts         # GitHub API integration
│   └── utils.ts
├── styles/               # Global styles
├── public/               # Static assets
├── tsconfig.json         # TypeScript configuration
└── next.config.ts        # Next.js configuration
```

## Key Dependencies

- **Framework**: Next.js 16.1.1, React 19.2.3
- **UI**: Radix UI primitives, shadcn/ui, Lucide React icons
- **Styling**: Tailwind CSS 4.1.9, PostCSS
- **Forms**: React Hook Form, Zod (for validation)
- **Other**: date-fns, sonner (toast), next-themes

## Important Notes

- No testing framework is configured - write code that is easy to verify manually
- No pre-commit hooks or git workflows configured
- Lint command uses default Next.js ESLint config (no custom .eslintrc)
- Project syncs with v0.app deployments - preserve component/structure compatibility
- Use Zod for runtime validation of external data
