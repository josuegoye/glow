# Glow Fullstack Application

## Planning
- [/] Read and analyze all source files (ESTADO_ACTUAL_GLOW.txt, panel_admin.html, panel_negocio.html, panel_cliente.html)
- [/] Create implementation plan
- [ ] Get user approval on plan

## Backend (FastAPI + PostgreSQL)
- [ ] Initialize FastAPI project in `back/`
- [ ] Define SQLAlchemy models (businesses, users, offers, raffles, contacts, game_config, modules, plans, etc.)
- [ ] Create Alembic migration setup
- [ ] Create API routes:
  - [ ] Auth endpoints (admin, business, public)
  - [ ] Business CRUD
  - [ ] Offers CRUD
  - [ ] Raffles CRUD + participation + draw winner
  - [ ] Contacts CRUD
  - [ ] Game config (Girar Glow) CRUD + spin logic
  - [ ] Modules management (per-business toggle)
  - [ ] QR generation
  - [ ] Chat endpoint
  - [ ] Public assistant endpoint (per business)
  - [ ] Reports/metrics endpoints
- [ ] Add seed data
- [ ] Test backend

## Frontend (Next.js)
- [ ] Initialize Next.js project in `front/`
- [ ] Set up design system (CSS variables, global styles matching Glow palette)
- [ ] Create layout components (sidebar, topbar)
- [ ] Panel Admin (CEO) pages
- [ ] Panel Negocio (Business) pages
- [ ] Panel Cliente (Public assistant) pages
- [ ] API integration with the FastAPI backend
- [ ] Test frontend

## Documentation
- [ ] Create agent-friendly README with instructions
- [ ] Create `.agent/` workflows for common tasks
- [ ] Final walkthrough
