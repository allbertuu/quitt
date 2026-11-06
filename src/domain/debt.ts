export class Debt {
  constructor(
    public readonly id: number,
    public name: string,
    public category: string | null,
    public interest: number | null,
    public total_value: number,
  ) {}
}

