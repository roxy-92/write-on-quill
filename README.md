# WriteOnQuill

A minimalist, distraction-free writing and text-sharing application built with Angular and TypeScript.

**[Live Demo](https://roxy-92.github.io/write-on-quill/)**

---

## About the Project

WriteOnQuill is a lightweight web application designed to make writing, sharing, and reading long-form text simple and distraction-free.

Messaging platforms such as Discord and Slack often impose character limits, forcing users to split longer texts into multiple messages. Existing text-sharing alternatives can also introduce unnecessary clutter, advertisements, or account requirements.

WriteOnQuill solves this by providing a clean writing space where users can compose or paste their text, generate a shareable link, and open it in a dedicated reading view.

The application runs entirely in the browser, without requiring user accounts, a backend server, or a database.

## Features

- **Minimalist Text Editor:** A clean, responsive writing interface focused on the content.
- **Shareable Links:** Generates links containing Base64-encoded text stored in URL fragments (`#doc=...`).
- **One-Click Copy:** Copy generated sharing links directly to the clipboard.
- **Dedicated Reader:** An editorial-style reading view with comfortable typography and a distraction-free layout.
- **Document Export:** Download text directly from the Reader in three formats:
  - **TXT:** Plain-text files.
  - **Markdown:** `.md` files compatible with Markdown editors.
  - **PDF:** Formatted A4 documents generated directly in the browser, with automatic pagination.
- **New Document:** Quickly return to the editor and start writing again.
- **Responsive Design:** Layouts adapted for desktop and mobile devices.
- **Automated Deployment:** Builds and deploys to GitHub Pages through GitHub Actions.

## Technologies Used

| Technology | Purpose |
|---|---|
| **Angular 22** | Frontend framework, standalone components, and reactive Signals |
| **TypeScript** | Application logic and type safety |
| **HTML5 & SCSS** | Semantic markup, custom styling, and responsive design |
| **Angular Material** | UI components |
| **Iconify + Lucide** | Scalable interface icons |
| **pdfmake** | Client-side PDF generation |
| **Browser APIs** | Blob, Clipboard, and URL APIs for exporting and sharing documents |
| **Node.js & npm** | Development environment and dependency management |
| **Git & GitHub** | Version control and repository hosting |
| **GitHub Actions** | CI/CD automation |
| **GitHub Pages** | Static application hosting |

## Technical Approach

WriteOnQuill uses a **frontend-only architecture**, with separate Angular components for editing, sharing, reading, and exporting documents.

Rather than storing documents in a database, the application encodes text into the URL fragment. Recipients can open and read shared documents directly in their browsers.

TXT, Markdown, and PDF files are also generated client-side, eliminating the need for server-side document processing.

**Limitations:** URL length restrictions may affect very large documents. Shared links contain the encoded text, and Base64 is not encryption, so the application is not intended for confidential information.

---

## Author

Developed by **[Roxy](https://github.com/roxy-92)** as a frontend portfolio project demonstrating modern Angular development, TypeScript, responsive UI design, client-side data handling, and automated deployment.