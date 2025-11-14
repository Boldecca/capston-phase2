# Labs Overview

This project is organized into three labs that build on each other.

- Lab 1: UI scaffold and navigation
- Lab 2: Authentication (login/signup) and protected routes
- Lab 3: Rich editor and post creation flow

---

## Lab 1: UI scaffold and navigation

Goal: Ship a clean, navigable app with basic pages and branding.

What to build
- Layout: global Header, Footer, and Container via `app/layout.tsx`.
- Pages: `/`, `/about`, `/posts`, `/account`, `/editor`, `(auth)/login`, `(auth)/signup`.
- Home: Hero section and a simple Gallery of images using `next/image`.
- Branding: Add logo and placeholder images under `public/`.

Acceptance
- All header links work.
- The home page shows a hero and a featured images grid.
- Consistent spacing/typography and max content width.

Files to review
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/components/{Header,Footer,Container,Hero,Gallery}.tsx`
- `public/*`

---

## Lab 2: Authentication and protected routes

Goal: Users can sign up, log in, and access a protected account page.

Choose one approach.

Option A: Auth.js (NextAuth)
- Install: `next-auth`.
- Add: `app/api/auth/[...nextauth]/route.ts` with your chosen provider or credentials.
- Session: Wrap app with `SessionProvider` on client (e.g., `providers.tsx`).
- Protect: Use `middleware.ts` to guard `/account` or server-side verification in the page.
- UI: Implement login and signup forms that call Auth.js flows.

Option B: Custom credentials (minimal deps)
- API routes: `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`.
- Session: Sign/verify JWT, store in httpOnly cookie.
- Protect: `middleware.ts` checks cookie/JWT for `/account`.
- UI: Build forms on `(auth)/login` and `(auth)/signup` that POST to these routes.
- Header: Show user avatar/menu when authenticated; Login/Signup when not.

Acceptance
- Cannot access `/account` without authentication.
- Successful signup/login updates UI state and navigation.

Files to create/update
- `app/(auth)/login/page.tsx`, `app/(auth)/signup/page.tsx` (forms)
- `app/api/auth/...` routes
- `middleware.ts`
- `src/components/Header.tsx` (auth UI state)

---

## Lab 3: Rich editor and post creation flow

Goal: Create posts using a rich text editor and display them on the Posts page.

Editor options
- Jodit: `jodit-react`
  - Dynamic import on client: `dynamic(() => import('jodit-react'), { ssr: false })`.
- Markdown: `@uiw/react-md-editor` or `react-markdown` with a textarea.

Implementation outline
- Enhance `src/components/Editor/rich-editor.tsx` to render the chosen editor.
- `/editor` page: Title input + RichEditor value + Submit button.
- API routes: `POST /api/posts` to create; `GET /api/posts` to list.
- `/posts` page: Fetch and render posts list (title, excerpt, date).

Acceptance
- Users can type rich content and submit a post.
- Posts appear on `/posts` after creation.

Files to create/update
- `src/components/Editor/rich-editor.tsx`
- `src/app/editor/page.tsx` (form wiring)
- `src/app/api/posts/route.ts` (create/list)
- `src/app/posts/page.tsx` (listing)

---

## Notes
- Environment: configure `NEXT_PUBLIC_API_URL` if using an external backend (see `src/lib/api.ts`).
- Accessibility: ensure form labels, focus states, and alt text for images.
- Testing: add simple component and route tests where possible.
