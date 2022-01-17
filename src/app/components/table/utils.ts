export class TableHeader {
  constructor(
    public index: number,
    public identifier: string,
    public label: string
  ) {}
}

export class TableRow {
  constructor(
    public index: number,
    public identifier: string,
    public columns: TableColumn[]
  ) {}
}

export class TableColumn {
  constructor(
    public index: number,
    public headerIdentifier: string,
    public type: 'text' | 'number' | 'modal',
    public data: any
  ) {}
}
