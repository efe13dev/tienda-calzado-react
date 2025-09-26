# AGENTS.md

## Commands
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint
- `bun run preview` - Preview production build

## Code Style
- Use React functional components with hooks
- Import React explicitly in .jsx files
- Use ES6 modules and modern JavaScript
- Follow ESLint configuration (no-unused-vars with uppercase exception)
- Use Tailwind CSS with custom primary/secondary color palette (primary: blue, secondary: yellow)
- Component names in PascalCase, files in PascalCase.jsx
- Use Context API for state management (LanguageContext, ThemeContext)
- Implement responsive design with mobile-first approach using Tailwind breakpoints
- Use Lucide React icons for all iconography
- Structure: components/, pages/, contexts/, data/ directories
- Use React Router for navigation with Spanish route names (/productos, /carrito, /contacto, /ofertas)
- Light mode only (no dark mode support)