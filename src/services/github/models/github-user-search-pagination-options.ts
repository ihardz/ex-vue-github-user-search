export abstract class GithubUserSearchPaginationOptionsAbstract {
  abstract readonly retrieverVariant: string;
  protected constructor(
    protected pageSize: number,
  ) { }
  
  toGraphQlSearchExpression(): string {
    return `${this.retrieverVariant}: ${this.pageSize}`;
  }
}

export class GithubUserSearchPaginationOptions extends GithubUserSearchPaginationOptionsAbstract {
  readonly retrieverVariant = 'first';
  constructor(pageSize: number) { 
    super(pageSize)
  }
}

export abstract class GithubUserSearchPaginationCursorOptionsAbstract extends GithubUserSearchPaginationOptionsAbstract {
  abstract readonly cursorName: string;
  constructor(
    pageSize: number,
    protected cursor: string,
  ) { 
    super(pageSize)
  }
  
  override toGraphQlSearchExpression(): string {
    const parentExpression = super.toGraphQlSearchExpression();
    const extra = `${this.cursorName}: "${this.cursor}"`;
    return [parentExpression, extra].filter(Boolean).join(', ');
  }
}

export class GithubUserSearchNextPageOptions extends GithubUserSearchPaginationCursorOptionsAbstract {
  override readonly retrieverVariant = 'first';
  override readonly cursorName = 'after';
  constructor(
    pageSize: number,
    after: string
  ) {
    super(pageSize, after);
  }
}

export class GithubUserSearchPreviousPageOptions extends GithubUserSearchPaginationCursorOptionsAbstract {
  override readonly retrieverVariant = 'last';
  override readonly cursorName = 'before';
  constructor(
    pageSize: number,
    before: string
  ) {
    super(pageSize, before);
  }

  override toGraphQlSearchExpression(): string {
    return `last: ${this.pageSize}, before: "${this.cursor}"`;
  }
}
