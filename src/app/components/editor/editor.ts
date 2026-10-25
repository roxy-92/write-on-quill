import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editor.html',    // <-- changed from ./editor.component.html
  styleUrl: './editor.scss',      // <-- changed from ./editor.component.scss
})
export class EditorComponent {
  text = model<string>('');
  save = output<void>();
  clear = output<void>();
}