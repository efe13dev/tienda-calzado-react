# AGENTS.md

## Commands

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Run ESLint with auto-fix
- `bun run preview` - Preview production build
- No test framework configured - add testing setup if needed

## Code Style

- Use TypeScript with React functional components and hooks
- Import React explicitly in .tsx files
- ESLint: 100 char width, double quotes, trailing commas, 2-space tabs
- Use Tailwind CSS with primary (blue) and secondary (yellow) color palette
- Component names in PascalCase, files in PascalCase.tsx
- Use Context API with useReducer for state management (CartContext, LanguageContext)
- Import order: type, builtin, external, internal, parent, sibling, index
- Use Lucide React icons for all iconography
- Structure: components/, pages/, contexts/, data/ directories
- Use React Router with Spanish route names (/productos, /carrito, /contacto, /ofertas)
- Light mode only, mobile-first responsive design
- Error handling: try-catch for async operations, console.error for logging
- Types: define interfaces for props, use TypeScript generics
- Custom hooks: use prefix (useCart, useLanguage)
- Line padding: between statements, returns, exports, and variable declarations
