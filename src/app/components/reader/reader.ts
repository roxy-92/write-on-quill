import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-reader',
  standalone: true,
  templateUrl: './reader.html',    // <-- changed from ./reader.component.html
  styleUrl: './reader.scss',      // <-- changed from ./reader.component.scss
})
export class ReaderComponent {
  content = input.required<string>();
  writeOwn = output<void>();
}