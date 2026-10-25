# WriteOnQuill

A minimalist, distraction-free writing and reading space built with Angular and TypeScript.

Live Demo: https://roxy-92.github.io/write-on-quill/

---

## The Problem It Solves

Chat and collaboration platforms (like Discord or Slack) often impose strict character limitations on messages. When trying to share longer notes, essays, or code walkthroughs with peers, you either have to break text into messy multi-part messages or paste it into generic pastebins.

While third-party text dump sites exist, most feel cluttered, bloated with ads, or unreadable. 

**WriteOnQuill** was created out of a desire for a clean, elegant writing surface:
1. A quiet, focused text area to write down thoughts without visual noise.
2. A single click to package the text into a shareable link.
3. An editorial, distraction-free reading experience for the person opening the link.

---

## Key Features

- **Minimalist Writing Interface:** Clean layout with intentional typography, spacious padding, and zero interface clutter.
- **Client-Side Link Sharing:** Shares long text without needing an account, database, or server. The text is Base64-encoded into the URL fragment (`#doc=...`), allowing recipients on any device to open and read it.
- **Editorial Reader View:** Shared notes open in a formatted reading mode with serif typography and clean metadata, complete with a call-to-action inviting the reader to write their own piece.
- **Fast Resets:** Starting a new note cleanly clears the editor and resets the address bar URL.
- **Automated CI/CD Pipeline:** Deployed continuously to GitHub Pages using GitHub Actions on every push to `main`.

---

## Technical Stack & Architecture

- **Framework:** Angular 19+ (Standalone Components, Signals, Modern Control Flow `@if`)
- **Language:** TypeScript
- **Styling:** Custom SCSS for layout, typography, and responsive design, paired with Angular Material components where appropriate
- **Hosting & CI/CD:** GitHub Pages automated via GitHub Actions workflow (Node.js 22+)

### Component Architecture

The application is structured into decoupled, single-responsibility components:

- `App` (`src/app/`): Top-level orchestrator. Reads URL hash parameters on load, manages view switching (`'editor'` vs `'read'`), and handles storage/encoding logic.
- `EditorComponent` (`src/app/components/editor/`): Writing surface with two-way text binding, character detection, and action buttons.
- `ReaderComponent` (`src/app/components/reader/`): Read-only editorial view styled specifically for long-form reading.
- `ShareModalComponent` (`src/app/components/share-modal/`): Success dialog with copyable link and quick actions.

---

## Technical Decisions & Problem Solving

### Why URL Hash Fragments (`#doc=...`)?
Initially, sharing was attempted via standard query parameters (`?doc=...`). For long essays, this caused browsers to send excessively large request headers, triggering an **HTTP 414: URI Too Long** error from GitHub's static web servers.

By switching from query strings (`?`) to hash fragments (`#`), the data stays strictly client-side. The browser never transmits hash fragments to the hosting server, bypassing URL length limits and enabling multi-paragraph sharing across devices on purely static hosting.

---

## Current Scope & Prototype Limitations

WriteOnQuill is currently a client-side frontend prototype:
- **No Remote Database:** Shared text lives inside the generated link. If the link is lost, the shared document cannot be recovered by the recipient unless saved by the sender.
- **Client-Only Persistence:** Local drafts are kept in the current browser session.

---

## Planned Roadmap

Future iterations planned for WriteOnQuill:
- [ ] **User Authentication:** Allow writers to create accounts and log in securely.
- [ ] **Document Management:** Save, edit, organize, and delete written drafts in personal libraries.
- [ ] **Recipient Library Saving:** Allow readers who open a link to save that piece into their own personal reading collection.
- [ ] **Export Options:** Download drafts as clean Markdown (.md) or formatted PDF.