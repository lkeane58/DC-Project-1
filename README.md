# JHU Study Group & Room Booking App (Fall 2026)

A modern, full-stack web application designed for students at **Johns Hopkins University** to discover, match, create, and join study groups and reserve campus study rooms for the **Fall 2026 semester**.

---

## Key Features

### 1. Fall 2026 JHU Course Catalog & Selector
* Curated with authentic course offerings from the [JHU Public Course Search for Fall 2026](https://courses.jhu.edu/?terms=Fall+2026).
* Includes Whiting School of Engineering (WSE), Krieger School of Arts and Sciences (KSAS), and First-Year Seminars (FYS).
* Search and filter by course code (`EN.500.113`, `EN.601.226`, `AS.110.109`, `AS.171.101`, `AS.001.128`), course title, department, and instructor.
* Multi-course selection interface allowing students to define their Fall 2026 schedule with dynamic matching.

### 2. Intelligent Study Group Matching & Analysis Engine
* Evaluates registered study groups against the student's profile across multiple weighted dimensions:
  * **Course Match (40%)**: Direct enrollment in the course or departmental elective synergy.
  * **Section & Instructor Alignment (20%)**: Matches the exact professor and section number (ensuring identical problem sets, exam dates, and syllabi).
  * **Weekly Schedule Overlap (20%)**: Intersects student available days (e.g., Tuesdays & Thursdays) and preferred time slots (e.g., Evening 5PM - 9PM).
  * **Study Goal & Style Alignment (10%)**: Exam preparation vs weekly problem set collaboration vs project building.
  * **Group Capacity (10%)**: Factors in active group spots vs full rosters.
* Generates clear match badges (e.g., `96% Match`) with transparent reason tags (`Exact Course Match`, `Aligned with Prof. Presler-Marshall`, `Available on Tuesday & Thursday`).

### 3. Study Group Creation
* Tie groups directly to Fall 2026 courses with auto-populated section and instructor data.
* **Public vs Private Settings**:
  * **Public**: Open 1-click join for any Hopkins student.
  * **Private**: Automatically generates a unique, cryptographically random 8-character passcode (e.g., `JHU-7M9X`) to share with friends and classmates.
* **Timings**: Frequency (`Twice a week`, `Once a week`), meeting days, and meeting time windows.
* **Meeting Locations**: Pre-configured with Homewood campus landmarks (Brody Learning Commons, MSE Library, Malone Hall, Hackerman Hall, etc.) or Online.
* **Capacity & Goals**: Configurable seat caps (3–12 students) and study objectives.

### 4. Privacy-Gated Communication Link (Core Security Requirement)
* **Before Joining**: Students can inspect course details, instructor, section, schedule, location, member count, and description. The communication link is strictly masked:
  > *🔒 Member-Only Communication Channel — Join this study group to reveal the Discord / GroupMe / WhatsApp invite link.*
* **After Joining**: Immediate access to the direct invite link with 1-click launch and copy capabilities. For private groups, students must submit the valid passcode to join and unlock the link.

### 5. Campus Study Room Booking Integration
* Live reservations for group study rooms at **Brody Learning Commons (BLC)**, **Milton S. Eisenhower Library (MSE)**, **Malone Hall**, and **Hackerman Hall**.
* Filter by building, floor, capacity, and amenities (Whiteboard, 4K Display, Outlets).
* **Double-Booking Prevention**: Automated conflict detection algorithm ensuring no overlapping reservations for the same room and time slot.
* Direct integration to link a room reservation with any of the student's active study groups.

---

## Tech Stack (Option A)

* **Framework**: Next.js 14+ (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS with official Johns Hopkins Heritage Blue (`#002D72`) & Spirit Blue (`#68ACE5`) design tokens
* **Icons**: Lucide React
* **Data & Storage**: Local persistence layer with reactive browser storage and pre-seeded Fall 2026 course and group entries.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```