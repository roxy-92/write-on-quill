import { Component, signal, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
      // Check the hash fragment for shared text: #doc=...
      const hash = window.location.hash;
      const prefix = '#doc=';

      if (hash.startsWith(prefix)) {
        try {
          const encodedData = hash.substring(prefix.length);
          const decoded = decodeURIComponent(atob(encodedData));
          this.text.set(decoded);
          this.currentMode.set('read');
          return;
        } catch (e) {
          console.error('Could not decode shared document from hash', e);
        }
      }

      // Fresh visit/refresh: start empty
      this.text.set('');
    }
  }

  saveDraft(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // 1. Save locally in case user stays in this browser
    localStorage.setItem(this.storageKey, this.text());

    // 2. Encode to Base64 and attach as a hash fragment (#doc=...)
    const encoded = btoa(encodeURIComponent(this.text()));
    const generatedUrl = `${window.location.origin}${window.location.pathname}#doc=${encoded}`;
    this.shareUrl.set(generatedUrl);
    this.showShareModal.set(true);
  }

  closeShareModal(): void {
    this.showShareModal.set(false);
  }

  openReaderView(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Keep the hash in the browser address bar
      window.location.hash = `doc=${btoa(encodeURIComponent(this.text()))}`;
    }
    this.showShareModal.set(false);
    this.currentMode.set('read');
  }

  startWritingOwn(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Strip hash from URL bar
      window.history.replaceState(null, '', window.location.pathname);
    }
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