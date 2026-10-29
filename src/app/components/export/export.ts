
import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

@Component({
  selector: 'app-export',
  standalone: true,
  templateUrl: './export.html',
  styleUrl: './export.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExportComponent {
  content = input.required<string>();

  exportTxt(): void {
    this.downloadFile(this.content(), 'text/plain;charset=utf-8', 'txt');
  }

  exportMarkdown(): void {
    this.downloadFile(this.content(), 'text/markdown;charset=utf-8', 'md');
  }

  async exportPdf(): Promise<void> {
    const [pdfMakeModule, pdfFontsModule] = await Promise.all([
      import('pdfmake/build/pdfmake'),
      import('pdfmake/build/vfs_fonts'),
    ]);

    const pdfMake = pdfMakeModule.default;
    const pdfFonts = pdfFontsModule.default;

    pdfMake.addVirtualFileSystem(pdfFonts);

    const documentDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      pageMargins: [50, 60, 50, 60],

      content: [
        {
          text: this.content(),
          fontSize: 11,
          lineHeight: 1.5,
          preserveLeadingSpaces: true,
        },
      ],

      defaultStyle: {
        font: 'Roboto',
        color: '#333333',
      },
    };

    pdfMake
      .createPdf(documentDefinition)
      .download('write-on-quill.pdf');
  }

  private downloadFile(
    content: string,
    mimeType: string,
    extension: string
  ): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `write-on-quill.${extension}`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }
}
