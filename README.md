# ARS — Adarsh Ke Alfaz (Complete starter project)

A polished, mobile-friendly starter website for education, knowledge, exams, literature and the ARS book projects.

## Start here
1. Read `docs/BLUEPRINT.md` for the full agreed website blueprint.
2. Read `SETUP.md` for local preview and GitHub Pages upload steps.
3. Read `DEPLOYMENT.md` before enabling any real accounts, forms, exams or certificates.
4. The two manuscript files are inside `books/` and can be managed separately.
5. The backend and database files are scaffolds only; they are not production-ready.

## Contents
- Root HTML pages: all main website sections plus student/private/admin/publisher previews and policy drafts.
- `css/`: shared responsive theme.
- `js/`: site configuration, navigation, interactive filters/search/demo forms and PWA registration.
- `assets/`: logo, hero banner, education banner, founder placeholder and signature graphic.
- `books/`: separate ARS literary manuscript and SJR–ARS entrance-preparation manuscript.
- `backend/`: Node/Express health-check scaffold (not secure authentication or application logic).
- `database/schema.sql`: PostgreSQL/Supabase-oriented starter schema with RLS enabled; policies need careful implementation and tests.
- `docs/`: master blueprint.

## Honest feature status
**Works in the static preview:** page navigation, responsive/mobile menu, theme toggle, filters, site search, sample question interaction and visible demo messages for forms.  
**Not live yet:** secure login, real database persistence, private role enforcement, real exam registration/timer/scoring, Join ARS review, contact email sending, analytics, audit-log writes, certificate issuance/verification and saved publishing workflow.

Do not collect real student data or issue official certificates until the backend is implemented, permissions are tested and privacy/exam policies are approved.
