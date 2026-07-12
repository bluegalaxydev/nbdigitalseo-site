import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootEl = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// If the page was prerendered (static HTML already sits in #root), hydrate over
// it so there's no flash and crawlers keep the server-rendered HTML. Otherwise
// mount fresh. When not prerendered, this is identical to the previous
// createRoot behavior — so the normal Vercel build is unaffected.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
