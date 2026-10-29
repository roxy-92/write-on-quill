
import { Component, input, output } from '@angular/core';
import { ExportComponent } from '../export/export';

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [ExportComponent],
  templateUrl: './reader.html',
  styleUrl: './reader.scss',
})
export class ReaderComponent {
  content = input.required<string>();
  writeOwn = output<void>();
}
