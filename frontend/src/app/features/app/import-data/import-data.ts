import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import { ImportJob, ImportService } from './import-data.service';

const KIND_LABELS: Record<string, string> = {
  sales: 'Histórico de ventas',
  stock: 'Snapshots de stock',
  catalog: 'Catálogo de productos',
  unknown: 'Sin determinar',
};

@Component({
  selector: 'app-import-data',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './import-data.html',
})
export class ImportData {
  private readonly service = inject(ImportService);

  protected readonly uploading = signal(false);
  protected readonly dragOver = signal(false);
  protected readonly result = signal<ImportJob | null>(null);
  protected readonly errorMsg = signal<string | null>(null);
  protected readonly history = signal<ImportJob[]>([]);

  constructor() {
    this.loadHistory();
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.upload(file);
    input.value = '';
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(false);
    const file = event.dataTransfer?.files?.[0];
    if (file) this.upload(file);
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(true);
  }

  protected onDragLeave(): void {
    this.dragOver.set(false);
  }

  private upload(file: File): void {
    this.uploading.set(true);
    this.errorMsg.set(null);
    this.result.set(null);
    this.service.upload(file).subscribe({
      next: (job) => {
        this.uploading.set(false);
        this.result.set(job);
        if (job.status === 'error') {
          this.errorMsg.set(job.message ?? 'La importación falló.');
        }
        this.loadHistory();
      },
      error: (err: HttpErrorResponse) => {
        this.uploading.set(false);
        this.errorMsg.set(
          err.error?.detail ??
            (err.status === 0 ? 'No se pudo conectar con el servidor.' : 'Error al importar el fichero.'),
        );
      },
    });
  }

  private loadHistory(): void {
    this.service.list().subscribe({ next: (jobs) => this.history.set(jobs) });
  }

  protected kindLabel(kind: string): string {
    return KIND_LABELS[kind] ?? kind;
  }

  /** Descarga una plantilla CSV de ejemplo (histórico de ventas). */
  protected downloadTemplate(): void {
    const rows = [
      'fecha,sku,nombre,categoria,unidades,precio,stock_actual,plazo_entrega',
      '2026-01-02,SKU-1001,Auriculares Aero,Audio,7,24.90,28,10',
      '2026-01-03,SKU-1001,Auriculares Aero,Audio,5,24.90,28,10',
      '2026-01-02,SKU-1002,Altavoz Pulse,Audio,3,31.00,320,14',
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla-star4cast.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  protected detectedEntries(cols: Record<string, string> | null): { role: string; col: string }[] {
    if (!cols) return [];
    return Object.entries(cols).map(([role, col]) => ({ role, col }));
  }
}
