import { Component, signal, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Adjust paths to match your actual files:
import { EditorComponent } from './components/editor/editor';
import { ReaderComponent } from './components/reader/reader';
import { ShareModalComponent } from './components/share-modal/share-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EditorComponent, ReaderComponent, ShareModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'write_on_quill_draft';

  currentMode = signal<'editor' | 'read'>('editor');
  text = signal<string>('');
  showShareModal = signal<boolean>(false);
  shareUrl = signal<string>('');

  ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    const params = new URLSearchParams(window.location.search);
    const sharedDoc = params.get('doc');

    // Keep the shared link reading capability
    if (sharedDoc) {
      try {
        const decoded = decodeURIComponent(atob(sharedDoc));
        this.text.set(decoded);
        this.currentMode.set('read');
        return;
      } catch {
        console.error('Invalid document parameter');
      }
    }

    // Always start with an empty text area on fresh visits/refreshes
    this.text.set('');
  }
}

  saveDraft(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.setItem(this.storageKey, this.text());

    const encoded = btoa(encodeURIComponent(this.text()));
    const generatedUrl = `${window.location.origin}${window.location.pathname}?doc=${encoded}`;
    this.shareUrl.set(generatedUrl);
    this.showShareModal.set(true);
  }

  closeShareModal(): void {
    this.showShareModal.set(false);
  }

  openReaderView(): void {
    this.showShareModal.set(false);
    this.currentMode.set('read');
  }

  startWritingOwn(): void {
  if (isPlatformBrowser(this.platformId)) {
    // Remove ?doc=... query param from browser address bar
    window.history.replaceState({}, '', window.location.pathname);
  }
  // Ensure the editor starts completely empty for the new writer
  this.text.set('');
  this.currentMode.set('editor');
}

  clearText(): void {
    this.text.set('');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.storageKey);
    }
  }
}