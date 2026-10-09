# Deployment and backend connection plan

## Phase A — static frontend
Publish the root HTML, CSS, JS, assets and manifest on GitHub Pages. The website can display sample content and page layouts. Forms explicitly announce that they do not save or send data.

## Phase B — choose a backend route
Recommended options:
- **Supabase**: managed Postgres, authentication and storage; requires correctly designed RLS policies and safe client configuration.
- **Node/Express + PostgreSQL**: deploy `backend/` to a Node-capable host and PostgreSQL to a managed database.

Do not run the backend from GitHub Pages. Do not place the database password, private key, SMTP password or service-role key in a public JS file.

## Phase C — implement and test
1. Provision dev/staging projects; set secrets only in the provider dashboard.
2. Implement authentication, email verification/reset and secure sessions or token validation.
3. Build role checks on the server: student, publisher and admin.
4. Add and test row-level security for every table; ordinary students must not read answer keys or other students’ private records.
5. Implement content workflow, join-application status, exam schedules/attempts, results and certificates using validated server-side operations.
6. Add contact form submission via a verified email provider, anti-abuse controls and retention rules.
7. Add logging, backups, rate limits, monitoring and safe error handling.
8. Test unauthenticated, student, publisher and admin permissions, including attempts to change role IDs or request another student’s record.
9. Only after successful tests, enable real registrations and publish the final terms/privacy/exam rules.

## Required acceptance tests before live launch
- Unauthenticated visitors cannot access private data or mutations.
- Students can access only their own profile, attempts, results and applications.
- Publisher actions are limited to approved publishing permissions.
- Role grants, result publication and certificate issue/revocation require authorised server checks and create audit records.
- Exam timer/closing time and scoring are enforced server-side.
- Certificate verification shows only the minimum public fields and supports revoked/cancelled/not-found states.
- Contact and join forms really persist/send, validate input and provide privacy messaging.
