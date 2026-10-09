# ARS — Adarsh Ke Alfaz | Master Blueprint

## 1. Brand
- Platform: **ARS — Adarsh Ke Alfaz** (preserve exact spelling).
- Founder name: **Adarsh Raj Shayar** (not interchangeable with the platform name).
- Visual direction: professional, light, responsive blue–green–white interface.
- Social: Instagram `https://www.instagram.com/adarshkealfaaz_/`; YouTube `https://www.youtube.com/@Adarshshyari`.

## 2. Public site map
Home; Education; Knowledge Power; Exams; Entrance Prep; Shayari; Stories; Poetry; Biography; Founder; ARS Book; SJR–ARS Entrance Preparation Book; Updates; Join ARS; Certificate; About; Contact; Sponsor; Search; Privacy; Terms; Exam Rules; Certificate Verification.

No Admin or Publisher links appear in the main public navigation. A small Private link in the footer leads to a clearly labelled preview until server authentication is connected.

## 3. Main pages and purpose
- Home: overview, section cards and clear routes for learners and readers.
- Education: classes 5–8 learning foundations, notes, practice and revision.
- Knowledge Power: Science, Bihar, India, World, Technology, Environment, History, Geography and Interesting Facts.
- Exams: draft information for the ARS Education Talent Research Examination; no live registration yet.
- Entrance Prep: Sainik School, JNV/Navodaya and RMS preparation foundations, separate checklists, revision notes and weekly plan.
- Shayari, Stories, Poetry: original starter copy that must be reviewed and expanded.
- Biography / Founder: separate pages; personal facts should be verified before publication.
- ARS Book: independent literary manuscript.
- SJR–ARS book: separate entrance-preparation manuscript.
- Join ARS: planned application, review, status and joining certificate flow.
- Certificates: joining, participation, achievement and merit; public verification must reveal minimal information.
- Sponsor: sponsor-proposal structure; no invented sponsor names, reach or impact figures.
- Contact: preview form only until email/backend integration.

## 4. Entrance preparation decision
The site includes a shared preparation track for learners in classes 5–8. Content areas: mathematics and arithmetic, mental ability/reasoning, language and comprehension, English/Hindi where relevant, science/environment, India/Bihar/general awareness and timed practice/revision. It does not claim the same syllabus or eligibility for all three entrance systems. The current official notice for the target year, class and institution takes priority.

## 5. Two different book files
1. `books/ARS_BOOK_MANUSCRIPT.md` — literature: shayari, stories, poetry, reflections, author note and reader message.
2. `books/SJR_ARS_ENTRANCE_PREP_MANUSCRIPT.md` — separate Sainik School, JNV/Navodaya and RMS preparation book.

Each book has its own web page and manuscript so it can be edited, reviewed and published independently. They are both included in the ZIP, but are not yet finished commercial books.

## 6. Roles and planned access model
- Student: profile, study resources, exam registration/attempt history, results, certificates and application status.
- Publisher: draft/revise/preview/publish approved content, education notes, knowledge cards, literature, updates, question bank and book chapters.
- Admin: role grants, publisher oversight, join approvals, exam configuration, result publication, certificate issue/revoke, sponsor records and audit-log review.
- Private: public-facing gateway, but real access checks must happen on the server. Never trust a client-side role flag or a password hardcoded in JavaScript.

## 7. Planned backend data records
Profiles; user roles; content items; exams; questions; attempts; attempt answers; results; Join ARS applications; certificates; contact messages; sponsors; audit logs. The starter PostgreSQL/Supabase-oriented schema is `database/schema.sql`. RLS is enabled; policies intentionally remain to be designed/tested before live use.

## 8. Current implementation status
- Included now: static responsive frontend, pages and navigation, theme toggle, mobile menu, filters, search, sample quiz interaction, demo forms with explicit non-saving messages, PWA starter, book manuscript files, Node/Express health-check scaffold and database schema scaffold.
- Not live: real sign-up/login, secure role checks, database write/read policies, exam registration/timer/submission/scoring, student dashboard data, contact email sending, membership review, certificates/QR validation, analytics, audit writing, sponsor records and admin/publisher mutations.
- The date 13 December 2026 was previously mentioned as a proposal for the ARS examination. The final time window was inconsistent, and eligibility, rules and registrations are unconfirmed. Treat this as a planning note only until officially approved.

## 9. Security / safety prerequisites
- Authentication via a trusted provider or correctly implemented server sessions.
- Server-side role authorisation on every private route and record.
- Database row-level security (RLS) policies; test with student, publisher, admin and unauthenticated accounts.
- Never expose database service-role keys or SMTP secrets in frontend code.
- Rate limiting, server-side schema validation, safe error messages, backup/recovery and audit trail.
- Appropriate consent and privacy protections if the site serves children.
- Review and test before real records are entered.

## 10. Deployment architecture
GitHub Pages serves the static root pages. It cannot execute the Node backend or host a private database. Deploy `backend/` to a separate Node-capable host (or choose Supabase/serverless architecture), configure environment secrets there, then connect the frontend to the service and configure CORS/auth policies. See `SETUP.md` and `DEPLOYMENT.md`.
