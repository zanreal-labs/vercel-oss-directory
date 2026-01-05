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


# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `pnpm dlx ultracite fix`
- **Check for issues**: `pnpm dlx ultracite check`
- **Diagnose setup**: `pnpm dlx ultracite doctor`

Biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**
- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**
- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**
- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `pnpm dlx ultracite fix` before committing to ensure compliance.
