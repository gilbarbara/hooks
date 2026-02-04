# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript React hooks library (@gilbarbara/hooks) that provides a collection of reusable React hooks for state management, side effects, and UI interactions.

## Development Commands

### Build & Development
- `npm run build` - Clean and build the library using tsup (outputs to dist/)
- `npm run watch` - Build and watch for changes
- `npm run clean` - Clean the dist directory

### Testing
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `vitest run path/to/test.spec.ts` - Run a specific test file
- `vitest watch path/to/test.spec.ts` - Watch a specific test file

### Code Quality
- `npm run lint` - Lint and fix code with ESLint
- `npm run typecheck` - Type check using TypeScript compiler
- `npm run format` - Format code with Prettier
- `npm run validate` - Run full validation (lint, test, build, size check, type validation)

### Bundle Size
- `npm run size` - Check bundle size limits (6kb for ESM and CommonJS)

## Architecture & Structure

### Hook Organization
Each hook follows this structure:
- Source file: `src/useHookName.ts` (or `.tsx` for hooks with JSX)
- Test file: `test/useHookName.spec.ts` (or `.spec.tsx`)
- Documentation: `docs/useHookName.md`
- Export from: `src/index.ts`

### Hook Categories
- **Deep Comparison Hooks**: Custom versions of React hooks with deep equality checks
- **State Management**: Persistent state, set state merging, toggles
- **Effects & Lifecycles**: Mount/unmount handlers, update effects
- **UI/DOM**: Intersection observer, resize observer, click outside, media queries
- **Performance**: Debounce, throttle, memoization
- **Data Fetching**: Fetch with retries, script loading
- **Utilities**: Local storage, location tracking, debugging

### Testing Patterns
- Uses Vitest with React Testing Library
- SSR-specific tests in separate `*-ssr.spec.tsx` files
- Custom mock fetch implementation for API-related tests
- Coverage thresholds: 90% for all metrics
- Test utilities in `test/__setup__/` directory

### Build Configuration
- Uses tsup for building (outputs ESM and CommonJS)
- Source maps included
- TypeScript declarations generated
- Bundle size limit: 6KB per format

### TypeScript Configuration
- Extends @gilbarbara/tsconfig
- Target: ES2022
- Strict mode enabled
- No emit for type checking

### Deep Comparison Hooks
When working with deep comparison hooks (`useCallbackDeepCompare`, `useEffectDeepCompare`, `useMemoDeepCompare`), these use the `@gilbarbara/deep-equal` package for dependency comparison instead of React's default shallow comparison.

### Export Pattern
All hooks are exported from `src/index.ts` with their types. Follow this pattern:
```typescript
export { useHookName, type UseHookNameOptions, type UseHookNameResult } from './useHookName';
```

### Common Utilities
- `src/utils.ts` - Shared utility functions
- `src/types.ts` - Shared TypeScript types
- `src/defaults.ts` - Default configurations

### Naming Conventions
- Hook: `useHookName`
- Options type: `UseHookNameOptions`
- Result type: `UseHookNameResult`
- Status constants: `USE_HOOK_NAME_STATUS` (if applicable)
- SSR implementation: `useHookNameSSR` (internal, not exported)

### Error Handling Patterns
- Return error state in result object, never throw from hooks
- Use optional callbacks: `onError`, `onSuccess`, `onFinally`
- Enrich error objects with context (e.g., `error.status`, `error.response`)
- Use status enums with helper methods: `isError()`, `isLoading()`, `isSuccess()`
- Silent degradation for constraint violations (e.g., localStorage in private mode)

### SSR Safety
- Use `canUseDOM()` from `utils.ts` to guard browser API access
- For hooks requiring browser APIs, export conditional implementations:
  ```typescript
  export const useHookName = canUseDOM() ? useHookNameImpl : useHookNameSSR;
  ```
- SSR fallback should return initial values with no-op functions
- Use `useIsomorphicLayoutEffect` instead of `useLayoutEffect` in shared code
- Guard DOM access in utility functions before they reach hook bodies
- Use `useIsMounted()` pattern for async operations to prevent state updates after unmount

### Dependencies
- Single external dependency: `@gilbarbara/deep-equal` (for deep comparison hooks only)
- All other hooks must be self-contained using React + DOM APIs
- New external dependencies require explicit approval

### Memoization Guidelines
- Wrap returned objects with `useMemo` including all dependencies
- Wrap returned functions with `useCallback`
- Use `useRef` for internal state that shouldn't trigger re-renders
- Use `useMemoizedValue` to stabilize callback props from consumers
- Use deep comparison hooks only when dependencies are objects/arrays that may change reference without changing value
- Add dev-time validation using `validateDependencies()` for deep comparison hooks