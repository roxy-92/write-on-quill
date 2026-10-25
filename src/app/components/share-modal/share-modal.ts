import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-share-modal',
  standalone: true,
  templateUrl: './share-modal.html',    // <-- changed from ./share-modal.component.html
  styleUrl: './share-modal.scss',      // <-- changed from ./share-modal.component.scss
})
export class ShareModalComponent {
  shareUrl = input.required<string>();
  viewPage = output<void>();
  close = output<void>();

  copyButtonText = signal<string>('Copy');

  copyLink(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.shareUrl()).then(() => {
        this.copyButtonText.set('Copied!');
        setTimeout(() => this.copyButtonText.set('Copy'), 2500);
      });
    }
  }
}