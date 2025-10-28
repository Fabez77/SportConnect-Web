import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TableStateService<T> {
  // Estado base
  private _data = signal<T[]>([]);
  private _filter = signal<string>(''); // 👈 filtros específicos (columna, etc.)
  private _search = signal<string>(''); // 👈 búsqueda global
  private _pageIndex = signal<number>(0);
  private _pageSize = signal<number>(10);
  private _sort = signal<{ active: string; direction: 'asc' | 'desc' | '' }>({ active: '', direction: '' });
  private _visibleColumns = signal<string[]>([]);

  // 👇 NUEVO: totalItems separado (para paginación de backend)
  private _totalItems = signal<number>(0);

  // Exposición pública (signals)
  data = this._data;
  filter = this._filter;
  pageIndex = this._pageIndex;
  pageSize = this._pageSize;
  sort = this._sort;
  visibleColumns = this._visibleColumns;
  totalItems = this._totalItems; // 👈 ahora es un signal real, no un computed

  // Métodos de actualización
  setData(data: T[]) { this._data.set(data); }
  setFilter(value: string) { this._filter.set(value); }
  setPage(index: number, size: number) {
    this._pageIndex.set(index);
    this._pageSize.set(size);
  }
  setSort(active: string, direction: 'asc' | 'desc' | '') {
    this._sort.set({ active, direction });
  }
  setVisibleColumns(columns: string[]) { this._visibleColumns.set(columns); }

  // 👇 NUEVO: actualizar totalItems desde backend
  setTotalItems(total: number) { this._totalItems.set(total); }

  // 👇 NUEVO: resetear estado a valores iniciales
  reset() {
    this._data.set([]);
    this._filter.set('');
    this._pageIndex.set(0);
    this._pageSize.set(10);
    this._sort.set({ active: '', direction: '' });
    this._visibleColumns.set([]);
    this._totalItems.set(0);
  }
}
