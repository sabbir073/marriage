# বিবাহ নিবন্ধন ব্যবস্থা - Bangladesh Marriage & Divorce Registration System

## Project Overview

A modern, government-grade web portal to digitize Bangladesh's entire marriage and divorce registration process. Replaces the paper-based system where Kazis maintain physical registers.

**Current state:** marriage.gov.bd is just a registrar directory — no actual registration, verification, or search.

**This system provides:** Online registration, NID/Birth Certificate verification, digital certificates with QR codes, tiered search, complete audit trail, and role-based access from citizen to ministry level.

---

## Key Principles

1. **Kazi is the primary actor** — Kazi registers, verifies, approves, and edits all marriage/divorce records
2. **Citizen application is optional** — Citizens CAN apply online, but it's not mandatory. Kazi can register on behalf of any citizen without the citizen having an account
3. **Only Kazi can edit data** — Every edit requires signatures from both husband and wife
4. **District Registrar is audit-only** — They can view/search their district's data but cannot modify anything
5. **Ministry is audit-only** — National-level view and reporting, no data modification
6. **Public search by NID only** — Shows only name + marital status (privacy-first)
7. **All religions supported** — Muslim, Hindu, Special, Christian, Buddhist, Other

---

## Legal Framework

### Muslim Marriage — Muslim Marriages & Divorces (Registration) Act, 1974

- **Registration:** MANDATORY (penalty: up to 3 months imprisonment or Tk.500 fine)
- **Form:** Nikah Nama (কাবিননামা) — Bangladesh Form No. 1601
- **Registrar:** Licensed Nikah Registrar (কাজী) for designated areas
- **Reporting:** Bridegroom must report marriage to Nikah Registrar within 30 days if solemnized by someone else
- **Age:** Groom ≥ 21, Bride ≥ 18
- **Witnesses:** Minimum 2 adult Muslim witnesses
- **Dower (মোহরানা):** Amount, prompt/deferred split, payment at marriage
- **Talaq-i-Tafweez:** Option to delegate divorce power to wife
- **Registry:** Sequential entries per year, fresh series each January

**Nikah Nama Columns (Form 1601):**
1. Marriage location (Ward, Union/Town, Tahsil, Thana, District)
2. Bridegroom: name, father's name, address
3. Bridegroom: date of birth / age
4. Bride: name, father's name, address
5. Bride's marital status (Maiden/Widow/Divorced)
6. Bride: date of birth / age
7. Bride's Wakil (representative): name, father's name, address
8. Witnesses to bride's Wakil appointment
9. Bridegroom's Wakil: name, father's name, address
10. Witnesses to bridegroom's Wakil appointment
11. Marriage witnesses (min 2): names, fathers' names, addresses
12. Date of marriage solemnization
13. Total dower (মোহরানা) amount
14. Dower split: prompt (নগদ) vs deferred (বাকি)
15. Dower paid at marriage
16. Talaq-i-Tafweez: divorce power delegated to wife? (Yes/No + conditions)
17. Special conditions agreed between parties
18. Bridegroom's existing wives + Arbitration Council permission (if any)
19. Bride's prior marriages
20. Marriage solemnizer: name, father's name, address
21. Registration fee paid
22. Date of registration
23. Signatures: bride, groom, wakils, witnesses, solemnizer, Kazi seal

### Hindu Marriage — Hindu Marriage Registration Act, 2012

- **Registration:** OPTIONAL (marriage valid without registration)
- **Registrar:** Hindu Marriage Registrar (1 per Upazila, up to 3 per City Corporation)
- **Age:** Groom ≥ 21, Bride ≥ 18
- **Both parties must be Hindu**
- **Registration after religious ceremony** on application of either party
- **Witnesses:** Minimum 3
- **Priest (পুরোহিত) details** and rituals performed
- **Fees:** Registration BDT 1,000; Certificate copy BDT 100
- **Age verification:** NID, Birth Certificate, JSC/SSC, or parent affidavit

### Special Marriage — Special Marriage Act, 1872

- **For:** Inter-faith, atheist, foreign national, or civil marriages
- **14-day notice period** (published in Marriage Notice Book, open to public)
- **Objection window:** Anyone can object during 14 days on legal grounds
- **Age:** Groom ≥ 18 (21 without parental consent), Bride ≥ 14 (18 recommended)
- **Witnesses:** Minimum 3
- **Declaration before Registrar:** "I [A], take thee [B], to be my lawful wife/husband"
- **No religious ceremony required**
- **Documents:** NID/passport, photos, affidavit of marital status, divorce cert if applicable

### Christian Marriage — Christian Marriage Act, 1872

- **Registration:** COMPULSORY through Christian Marriage Registrar
- **Church permission required**
- **Age:** Groom ≥ 21, Bride ≥ 18
- **Witnesses:** 3 adult Christians
- **Documents:** NID/passport, church permission letter, photos

### Buddhist & Other Religions

- **No specific act** — registered under Special Marriage Act, 1872
- **Same process as Special Marriage** (14-day notice, 3 witnesses, declaration)

### Muslim Divorce — Muslim Family Laws Ordinance, 1961

**Types:**
- **Talaq (husband-initiated):** Written notice to Chairman + copy to wife → Arbitration Council within 30 days → 90-day iddat period → effective if not reconciled
- **Talaq-i-Tafweez (wife-delegated):** Same process, wife exercises delegated right
- **Khula (wife-initiated with consent):** Wife typically returns dower
- **Mubarat (mutual consent):** Joint agreement
- **Judicial (Faskh):** Wife files in Family Court (grounds: absence 4+ years, no maintenance 2+ years, cruelty, etc.)

**Key rules:**
- Written notice to Chairman is MANDATORY
- 90 days from notice delivery (or end of pregnancy, whichever later)
- Arbitration Council must attempt reconciliation
- Talaq revocable during iddat period

### Non-Muslim Divorce
- **Hindu:** Separation under Hindu Married Women's Act, 1946
- **Christian:** Divorce Act, 1869 (judicial)
- **Special Marriage:** Mutual consent, cruelty, desertion

---

## User Roles & Permissions

### 1. PUBLIC (No Login)
| Action | Allowed |
|--------|---------|
| Search by NID | Yes — shows only name + marital status |
| Verify certificate (QR/number) | Yes — shows valid/invalid + basic info |
| Browse registrar directory | Yes |
| View any detailed records | No |

### 2. CITIZEN (Login via NID + OTP)
| Action | Allowed |
|--------|---------|
| Apply for marriage registration | Yes (optional, can go to Kazi directly instead) |
| Upload documents (NID, photos, etc.) | Yes |
| Save application as draft | Yes |
| Track application status | Yes (own applications only) |
| View own certificates | Yes |
| Download own certificates | Yes |
| Book Kazi appointment | Yes |
| Edit any registration data | **No** (only Kazi can edit) |

### 3. KAZI / REGISTRAR (Login with credentials + 2FA)

**Kazi types match marriage types:**
- Muslim Nikah Registrar (কাজী) — handles Muslim marriages
- Hindu Marriage Registrar — handles Hindu marriages
- Special Marriage Registrar — handles Special, Buddhist, Other marriages
- Christian Marriage Registrar — handles Christian marriages

| Action | Allowed |
|--------|---------|
| Register marriage directly (on behalf of citizen, no citizen account needed) | Yes |
| Review citizen online applications | Yes (own jurisdiction) |
| Verify NID & Birth Certificate of parties | Yes (via Porichoy API) |
| Request additional documents (NOC, signatures, affidavits) | Yes |
| Approve/reject marriage registration | Yes |
| Generate marriage certificate | Yes |
| Register divorce | Yes |
| Edit registered data | Yes — **requires signatures from both husband and wife** |
| Manage appointment schedule | Yes |
| View digital registry book | Yes (own entries) |
| View other Kazis' data | **No** |
| View other jurisdictions | **No** |

### 4. DISTRICT REGISTRAR (Login with credentials + 2FA)
| Action | Allowed |
|--------|---------|
| View all registrations in their district | Yes (audit/read-only) |
| Search district data (full details) | Yes |
| View all Kazis in district + activity | Yes |
| Export district reports (PDF, CSV) | Yes |
| View district audit logs | Yes |
| Edit or modify any data | **No** |
| Approve or reject registrations | **No** |

### 5. MINISTRY / GOVT ADMIN (Login with credentials + 2FA)
| Action | Allowed |
|--------|---------|
| View national dashboard + statistics | Yes |
| Search all records nationally (full details) | Yes |
| View all districts, all registrars | Yes |
| Manage registrar accounts (onboard, assign jurisdiction, suspend) | Yes |
| Manage jurisdiction hierarchy (division > district > upazila > union > ward) | Yes |
| Export national reports | Yes |
| View national audit logs | Yes |
| Edit marriage/divorce data | **No** |

### 6. SUPER ADMIN (Technical)
- Everything Ministry can do + system configuration, user management, database admin

---

## Core Workflows

### Marriage Registration — Path A: Citizen Applies Online

```
Citizen fills form online → saves DRAFT → submits → SUBMITTED
  ↓
Auto-assigned to jurisdiction's Kazi → UNDER_REVIEW
  ↓
Kazi reviews:
  → Verifies NID & Birth Certificate via system
  → Requests additional docs (NOC, signatures) → DOCUMENTS_REQUESTED
  → Citizen uploads requested docs → back to UNDER_REVIEW
  → Kazi rejects (with reason) → REJECTED
  → Kazi approves + sets appointment → APPOINTMENT_SET
  ↓
Appointment day:
  → Kazi collects physical signatures
  → Kazi finalizes registration → REGISTERED
  → Certificate auto-generated → COMPLETED
```

### Marriage Registration — Path B: Kazi Registers Directly

```
Citizen walks in to Kazi office (no account needed)
  ↓
Kazi selects "Register New Marriage" + chooses type
  ↓
Kazi fills form with citizen's information
  ↓
Kazi verifies NID & Birth Certificate via system
  ↓
Kazi uploads photos, documents, signatures
  ↓
Kazi submits → REGISTERED → Certificate generated → COMPLETED
```

### Special Marriage (14-Day Notice)

```
Notice submitted → NOTICE_PUBLISHED (14-day wait starts)
  ↓
During 14 days:
  → If objection filed → OBJECTION_FILED → Registrar investigates
    → Objection valid → REGISTRATION_BLOCKED
    → Objection invalid → continues
  ↓
After 14 days, no valid objection → READY_FOR_REGISTRATION
  ↓
Declaration + signatures → REGISTERED → Certificate → COMPLETED
```

### Muslim Divorce (Talaq)

```
Talaq notice filed → NOTICE_FILED
  ↓
Notice delivered to Chairman + spouse → NOTICE_DELIVERED
  ↓
Arbitration Council formed (within 30 days) → ARBITRATION_PENDING
  ↓
Reconciliation attempts → ARBITRATION_IN_PROGRESS
  → If reconciled → WITHDRAWN (divorce cancelled)
  → If failed → IDDAT_PERIOD (90-day countdown starts)
    → If wife pregnant: extends until delivery
  ↓
90 days elapsed → DIVORCE_EFFECTIVE
  ↓
Kazi registers divorce → REGISTERED → Divorce certificate → COMPLETED
```

### Data Edit by Kazi

```
Kazi initiates edit on a registered record
  ↓
System requires: reason for edit + upload of signed consent from BOTH husband and wife
  ↓
Kazi uploads signed consent document
  ↓
Edit saved → audit log records: who edited, what changed, when, why, consent document
  ↓
Previous version preserved in history
```

---

## Search System (Tiered Access)

| Level | Search By | Results Show |
|-------|-----------|--------------|
| **Public** (no login) | NID number only | Name + marital status only |
| **Citizen** (logged in) | Own records | Own full details + certificates |
| **Kazi** | Name, NID, cert#, date (own jurisdiction) | ALL details |
| **District Registrar** | Name, NID, cert#, date, Kazi, upazila (own district) | ALL details + export |
| **Ministry** | All filters nationwide | ALL details + export |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 15 (App Router) + TypeScript | SSR for public pages, React for interactive forms |
| UI Library | shadcn/ui + Tailwind CSS 4 | Clean government aesthetic, accessible, responsive |
| Backend API | tRPC | End-to-end type safety |
| Database | PostgreSQL 16 + Prisma ORM | ACID compliance for legal records, JSONB for flexible forms |
| Auth | NextAuth.js v5 | Role-based sessions, OTP, 2FA |
| Cache | Redis | Sessions, OTP codes, rate limiting |
| File Storage | MinIO (self-hosted S3) | Documents, photos, certificates |
| PDF Generation | React-PDF + QR code | Bilingual certificates with verification QR |
| Background Jobs | BullMQ | SMS, PDF generation, scheduled tasks |
| SMS Gateway | BulkSMSBD / SSL Wireless | Bangla SMS notifications |
| i18n | next-intl | Bangla (primary) + English |
| State Machine | XState v5 | Marriage & divorce workflow management |
| Charts | Recharts | Dashboard analytics |
| Monorepo | Turborepo + pnpm | Shared types, single source of truth |

---

## Database Schema

### Core Tables

```
users
├── id (UUID, PK)
├── nid_number (encrypted)
├── full_name_bn, full_name_en
├── email, mobile
├── role (CITIZEN | KAZI | DISTRICT_REGISTRAR | MINISTRY_ADMIN | SUPER_ADMIN)
├── password_hash
├── is_active, mfa_secret, language_pref
├── created_at, updated_at

kazi_profiles
├── id (UUID, PK)
├── user_id (FK → users)
├── registration_number (unique)
├── kazi_type (MUSLIM | HINDU | SPECIAL | CHRISTIAN)
├── jurisdiction_id (FK → jurisdictions)
├── status (ACTIVE | SUSPENDED | RETIRED)
├── appointed_date

jurisdictions (hierarchical)
├── id (UUID, PK)
├── name_bn, name_en
├── type (DIVISION | DISTRICT | UPAZILA | UNION | WARD | CITY_CORP)
├── parent_id (FK → self)
├── code (BBS geocode)
```

### Marriage Tables

```
marriage_registrations
├── id (UUID, PK)
├── registration_number (sequential per Kazi per year)
├── marriage_type (MUSLIM | HINDU | SPECIAL | CHRISTIAN | BUDDHIST | OTHER)
├── status (workflow state)
├── entry_mode (CITIZEN_APPLICATION | KAZI_DIRECT)
├── kazi_id (FK → kazi_profiles)
├── jurisdiction_id (FK → jurisdictions)
├── marriage_date, marriage_place (JSONB)
├── registration_date
├── form_data (JSONB — type-specific: dower, rituals, notice, etc.)
├── applicant_user_id (FK → users, nullable for Kazi direct)
├── appointment_date
├── created_at, updated_at

marriage_parties
├── id (UUID, PK)
├── registration_id (FK → marriage_registrations)
├── party_role (BRIDE | GROOM | PARTY1 | PARTY2)
├── full_name_bn, full_name_en
├── father_name_bn, mother_name_bn
├── nid_number, date_of_birth
├── religion, nationality
├── address (JSONB)
├── marital_status (UNMARRIED | DIVORCED | WIDOWED)
├── photo_url
├── nid_verified, birth_cert_verified (BOOLEAN)

marriage_witnesses
├── id (UUID, PK)
├── registration_id (FK)
├── witness_type (MARRIAGE | BRIDE_WAKIL | GROOM_WAKIL)
├── full_name_bn, father_name_bn
├── address, nid_number

marriage_notices (Special Marriage 14-day notice)
├── id, registration_id (FK)
├── notice_date, objection_deadline
├── status (PUBLISHED | OBJECTION_FILED | CLEARED)

marriage_objections
├── id, notice_id (FK)
├── objector_name, grounds
├── resolution, resolved_date
```

### Divorce Tables

```
divorce_registrations
├── id (UUID, PK)
├── case_number
├── original_marriage_id (FK → marriage_registrations)
├── divorce_type (TALAQ | TALAQ_TAFWEEZ | KHULA | MUBARAT | JUDICIAL | OTHER)
├── status (workflow state)
├── kazi_id (FK), jurisdiction_id (FK)
├── notice_date, chairman_name, union_council
├── arbitration_council_date, arbitration_outcome
├── iddat_start_date, iddat_end_date
├── is_wife_pregnant
├── effective_date, registration_date
├── court_name, court_order_number (for judicial)
├── form_data (JSONB)
```

### Supporting Tables

```
certificates
├── id, certificate_number (unique)
├── certificate_type (MARRIAGE | DIVORCE)
├── registration_id (FK)
├── pdf_url, pdf_hash, qr_payload, qr_signature
├── issued_by_kazi_id (FK), issued_at
├── revoked, revoked_reason

documents
├── id, uploaded_by (FK)
├── registration_id (FK)
├── document_type (NID | PHOTO | PASSPORT | NOC | SIGNATURE | CONSENT | etc.)
├── file_url, file_hash, mime_type
├── uploaded_at

edit_history (tracks every edit by Kazi)
├── id, registration_id (FK)
├── edited_by_kazi_id (FK)
├── edit_reason
├── consent_document_id (FK → documents, signed by husband + wife)
├── changes (JSONB — before/after diff)
├── edited_at

appointments
├── id, kazi_id (FK), citizen_user_id (FK), registration_id (FK)
├── slot_start, slot_end
├── status (AVAILABLE | BOOKED | COMPLETED | CANCELLED)

notifications
├── id, user_id (FK)
├── channel (SMS | EMAIL | IN_APP)
├── template_key, variables (JSONB)
├── status (QUEUED | SENT | FAILED), sent_at

audit_logs (append-only, no UPDATE/DELETE)
├── id, timestamp
├── actor_id (FK), actor_role, actor_ip
├── action, entity_type, entity_id
├── previous_state, new_state
├── metadata (JSONB)
```

---

## Project Structure

```
marriage/
├── PROJECT_PLAN.md                       ← This file
├── apps/
│   └── web/                              # Next.js 15 Application
│       ├── public/
│       │   ├── fonts/                    # Bangla fonts (Kalpurush, SolaimanLipi)
│       │   └── images/                   # Gov't seal, logo, icons
│       └── src/
│           ├── app/
│           │   ├── [locale]/             # /bn and /en routes
│           │   │   ├── (public)/         # No auth required
│           │   │   │   ├── page.tsx                  # Landing page
│           │   │   │   ├── search/page.tsx            # Public search (NID → name + status)
│           │   │   │   ├── verify/page.tsx            # Certificate verification
│           │   │   │   ├── verify/[certNo]/page.tsx   # Verification result
│           │   │   │   ├── registrars/page.tsx        # Registrar directory
│           │   │   │   ├── login/page.tsx
│           │   │   │   └── register/page.tsx          # Citizen signup
│           │   │   │
│           │   │   ├── (citizen)/        # Citizen portal
│           │   │   │   ├── dashboard/page.tsx
│           │   │   │   ├── apply/
│           │   │   │   │   ├── page.tsx               # Choose marriage type
│           │   │   │   │   ├── muslim/page.tsx
│           │   │   │   │   ├── hindu/page.tsx
│           │   │   │   │   ├── special/page.tsx
│           │   │   │   │   ├── christian/page.tsx
│           │   │   │   │   ├── buddhist/page.tsx
│           │   │   │   │   └── other/page.tsx
│           │   │   │   ├── applications/page.tsx
│           │   │   │   ├── applications/[id]/page.tsx
│           │   │   │   ├── divorce/file/page.tsx
│           │   │   │   ├── certificates/page.tsx
│           │   │   │   ├── appointments/page.tsx
│           │   │   │   └── profile/page.tsx
│           │   │   │
│           │   │   ├── (kazi)/           # Kazi portal
│           │   │   │   ├── dashboard/page.tsx
│           │   │   │   ├── register/                  # Direct registration
│           │   │   │   │   ├── page.tsx
│           │   │   │   │   ├── muslim/page.tsx
│           │   │   │   │   ├── hindu/page.tsx
│           │   │   │   │   ├── special/page.tsx
│           │   │   │   │   ├── christian/page.tsx
│           │   │   │   │   ├── buddhist/page.tsx
│           │   │   │   │   └── other/page.tsx
│           │   │   │   ├── applications/page.tsx      # Review citizen applications
│           │   │   │   ├── applications/[id]/page.tsx # Review + approve/reject
│           │   │   │   ├── verify-nid/page.tsx        # NID & Birth Cert verification tool
│           │   │   │   ├── registry-book/page.tsx     # Digital registry book
│           │   │   │   ├── edit/[id]/page.tsx         # Edit record (requires consent upload)
│           │   │   │   ├── divorce/
│           │   │   │   │   ├── register/page.tsx
│           │   │   │   │   ├── cases/page.tsx
│           │   │   │   │   └── [id]/page.tsx
│           │   │   │   ├── appointments/page.tsx
│           │   │   │   └── profile/page.tsx
│           │   │   │
│           │   │   ├── (district)/       # District Registrar (audit only)
│           │   │   │   ├── dashboard/page.tsx
│           │   │   │   ├── registrations/page.tsx     # Search/view district data
│           │   │   │   ├── registrations/[id]/page.tsx
│           │   │   │   ├── kazis/page.tsx
│           │   │   │   ├── reports/page.tsx
│           │   │   │   └── audit-log/page.tsx
│           │   │   │
│           │   │   └── (admin)/          # Ministry / Govt Admin (audit + manage)
│           │   │       ├── dashboard/page.tsx
│           │   │       ├── registrations/page.tsx
│           │   │       ├── districts/page.tsx
│           │   │       ├── registrars/page.tsx
│           │   │       ├── registrars/new/page.tsx
│           │   │       ├── jurisdictions/page.tsx
│           │   │       ├── reports/page.tsx
│           │   │       ├── audit-log/page.tsx
│           │   │       └── settings/page.tsx
│           │   │
│           │   └── api/
│           │       ├── trpc/[trpc]/route.ts
│           │       └── v1/verify/[certNo]/route.ts    # Public REST API
│           │
│           ├── components/
│           │   ├── ui/                   # shadcn/ui components
│           │   ├── forms/                # Marriage & divorce forms
│           │   ├── layout/               # Header, sidebar, footer
│           │   ├── search/               # Public search components
│           │   ├── certificates/         # QR scanner, verification
│           │   ├── dashboard/            # Stats cards, charts, timeline
│           │   └── shared/               # Data table, file upload, status badge
│           │
│           ├── hooks/                    # Custom React hooks
│           ├── lib/                      # Utilities, tRPC client, auth
│           └── styles/                   # Global CSS, Bangla fonts
│
├── packages/
│   ├── db/                               # Prisma schema + migrations
│   ├── api/                              # tRPC routers + middleware
│   │   └── src/
│   │       ├── routers/                  # marriage, divorce, certificate, search, etc.
│   │       ├── middleware/               # auth, jurisdiction scope, audit logging
│   │       └── validators/               # Zod schemas for all form types
│   ├── shared/                           # Types, constants, state machines
│   └── integrations/                     # NID verification, SMS, file storage
│
├── docker/                               # Docker Compose for dev (PostgreSQL, Redis, MinIO)
├── scripts/                              # Seed jurisdictions, generate signing keys
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Modern UX Features

1. **Multi-step forms with progress stepper** — Nikah Nama split into: Location → Groom → Bride → Wakils → Witnesses → Dower → Conditions → Review
2. **NID & Birth Certificate verification** — Kazi enters NID → system verifies via Porichoy API → auto-fills name, DOB, address, photo
3. **Dual entry modes for Kazi** — "Register New" (direct, citizen walks in) vs "Review Applications" (online submissions)
4. **Visual application timeline** — Shows every status change with timestamp, actor, and notes
5. **Public NID search** — Enter NID → see name + marital status only
6. **QR code certificates** — Scan to verify authenticity instantly
7. **Digital Registry Book** — Kazi sees sequential entries like the physical book, but filterable and searchable
8. **Edit with consent tracking** — Every Kazi edit requires consent document upload + reason
9. **Mobile-first responsive** — Works on phones (most BD users are mobile)
10. **Bangla-first** with English toggle
11. **Role-specific dashboards** — Each role gets a tailored home screen
12. **90-day divorce countdown** — Visual timer for Talaq iddat period
13. **Document request flow** — Kazi can request NOC, signatures, or any document from citizen
14. **Exportable reports** — PDF & CSV for District and Ministry levels
15. **Complete audit trail** — Every action logged, viewable by District and Ministry

---

## Security

- **Auth:** NID + OTP for citizens; credentials + TOTP 2FA for officials; Argon2id password hashing
- **Sessions:** httpOnly secure cookies, short-lived tokens, Redis-backed
- **Jurisdiction scoping:** tRPC middleware ensures Kazi sees only their area, District sees only their district
- **Edit control:** Only Kazi can edit; every edit logged with before/after diff + consent document
- **Audit trail:** Append-only table, every action recorded, no delete/update allowed
- **Data protection:** TLS 1.3, AES-256 for documents, encrypted NID storage
- **Validation:** Zod schemas on all forms, server-side validation
- **Rate limiting:** Per-IP limits on public APIs

---

## Implementation Phases

### Phase 1: Foundation + Muslim Marriage (Weeks 1-4)
- Project scaffolding (Turborepo, Next.js, Prisma, PostgreSQL, Redis, Docker)
- Database schema + seed jurisdictions (8 divisions, 64 districts, 495 upazilas)
- Auth system (NID+OTP for citizens, credentials+2FA for officials)
- Muslim Marriage Nikah Nama form (full 23 columns, multi-step)
- Kazi direct registration mode
- Basic certificate generation with QR

### Phase 2: All Marriage Types + Search (Weeks 5-8)
- Hindu, Special, Christian, Buddhist, Other marriage forms
- 14-day notice workflow for Special Marriage
- Public search (NID → name + status)
- Certificate verification portal (QR + manual)
- Citizen application flow (apply → Kazi reviews → appointment → register)
- NID & Birth Certificate verification tool for Kazi

### Phase 3: Divorce + Dashboards (Weeks 9-12)
- Muslim divorce (Talaq, Khula, Mubarat, Judicial with 90-day tracking)
- Non-Muslim divorce registration
- Per-role dashboards (Citizen, Kazi, District, Ministry)
- Digital Registry Book for Kazis
- Notification system (SMS + in-app)
- Edit with consent workflow

### Phase 4: Polish + Launch (Weeks 13-16)
- Bangla/English i18n complete
- District Registrar audit portal
- Ministry admin portal + national reports
- Full audit log viewer
- Reports & export (PDF, CSV)
- Security hardening + testing
- Production deployment
