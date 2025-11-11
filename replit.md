# Interview Evaluation System - Project Documentation

## Overview

The Interview Evaluation System is a professional web application for HR and recruitment teams to process and evaluate candidate interview data. It enables uploading CSV files, parsing data, and generating comprehensive PDF reports. The system offers both client-side and API-based processing, integrating a modern tech stack to streamline candidate evaluation workflows.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite.
**UI Framework**: Material Design principles via shadcn/ui components (Radix UI + Tailwind CSS).
**State Management**: TanStack Query for server state, React hooks for local state.
**Routing**: Wouter for client-side routing.
**Key Design Decisions**: Component-based architecture, responsive design with a mobile-first approach, Inter font.

### Backend Architecture

**Runtime**: Node.js with Express.js.
**File Processing**: Multer for uploads, PapaParse for CSV parsing, jsPDF with autoTable for PDF generation.
**Storage Strategy**: In-memory storage (`MemStorage`) for speed, with an abstracted interface (`IStorage`) for future persistence.
**Authentication**: Passport.js with `express-session` for session-based authentication (username: "bsadmin", password: "bspass2025?"). All API endpoints are protected.
**Key Design Decisions**: In-memory storage for simplicity, session-based architecture, dual processing modes (client-side and API-based), authentication for all dashboard access and API operations.

### Data Flow

**CSV Upload Flow**: Users upload CSV files, validated for type and size. Options include client-side parsing for preview/individual PDFs or API-based processing for a consolidated PDF report.
**JSON API Flow**: Direct JSON data submission to `/api/generate-pdf-json` for PDF generation, suitable for integration with external systems.
**Data Validation**: CSV headers normalized, row data validated with Zod against a `CandidateEvaluation` schema.
**PDF Generation**: Both client-side and server-side methods produce identical, detailed PDF layouts including candidate info, qualifications, and experience.

### API Design

**Base URL**: `/api`
**Authentication Endpoints**: `/api/auth/login`, `/api/auth/logout`, `/api/auth/session`.
**Protected Endpoints**: `/api/upload-csv`, `/api/generate-pdf-json`, `/api/candidates/:sessionId`, `/api/candidates/:sessionId`.
**Public Endpoints**: `/api/health`.
**Response Format**: PDF files for generation endpoints, JSON for others with consistent error handling.

### Data Schema

**Current Implementation**: In-memory storage with no database.
**Schema Definition**: Zod for runtime validation, defining candidate evaluation structure including result (PASS/FAIL/HANGUP), contact info, interview metadata, qualifications, employment history, performance scores, client preferences, and red flags. Defined in `shared/schema.ts`.

## External Dependencies

### Core Framework Dependencies
- **React**: UI framework.
- **Express.js**: Backend web server.
- **TypeScript**: Type safety.
- **Vite**: Build tool and development server.

### UI Component Libraries
- **Radix UI**: Headless accessible component primitives.
- **shadcn/ui**: Pre-styled components built on Radix UI.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React**: Icon library.

### Data Processing
- **PapaParse**: CSV parsing.
- **jsPDF**: PDF generation.
- **jspdf-autotable**: Table generation for PDFs.
- **Zod**: Schema validation.

### Authentication & Session Management
- **Passport.js**: Authentication middleware.
- **passport-local**: Local username/password strategy.
- **express-session**: Session management.
- **memorystore**: In-memory session storage.

### State Management & Data Fetching
- **TanStack Query**: Server state management.
- **React Hook Form**: Form validation.
- **Wouter**: Client-side routing.

## Key Features

### Analytics Dashboard with PDF Export
The system includes a comprehensive analytics dashboard that visualizes candidate recruitment data across multiple dimensions:

**Analytics Categories**:
1. **Recruitment Funnel**: Tracks candidates from application through qualification stages
2. **Qualification Status**: Shows who qualifies for next interview based on required criteria
3. **Qualification Profile**: Detailed breakdown of candidate qualifications
4. **Quality Scores**: Average scores and distribution across experience, compassion, safety, and professionalism
5. **Geographic Distribution**: Candidate locations by state
6. **Operational Efficiency**: Interview metrics over time with pass rates
7. **Risk & Compliance**: Identifies missing credentials and failed background checks
8. **Interview Results**: Pass/Fail/Hangup distribution
9. **Travel Ability**: Candidate travel capability analysis
10. **Compliance Credentials**: Background checks, TB tests, CPR certificates, driver's licenses
11. **Statistical Analysis**: Mean, standard deviation, quartiles for all scoring metrics

**PDF Export Functionality** (Added November 10, 2025):
- One-click export of all analytics data to a comprehensive PDF report
- Includes all 11 analytics sections with professional formatting
- Automated pagination with page numbers and headers
- Color-coded tables for easy reading
- Summary page with key metrics
- Generated file named with timestamp for easy tracking

### Authentication System
- Hardcoded credentials for admin access (username: "bsadmin", password: "bspass2025?")
- Session-based authentication with Passport.js
- All dashboard content and API endpoints protected
- Professional login/logout UI with smooth UX

## Recent Changes

**Analytics PDF Export** (November 10, 2025):
- Implemented comprehensive PDF export feature for analytics dashboard
- Created `exportAnalyticsPdf.ts` utility with all analytics sections
- Added Export to PDF button in analytics page header
- Includes recruitment funnel, qualifications, scores, geography, compliance, and statistical data
- Professional formatting with tables, pagination, and summary page
- Architect-reviewed and approved for production use