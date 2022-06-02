export declare type SearchUserOptions = {
  term: string
};

const SPACE = ' ';

export class SearchUserRequestParamsBuilder  {
  static build(options: SearchUserOptions): Record<string, unknown> {
    const term = options?.term;
    const termNormalized = term?.replace(/^\s+|\s+$/gm, String());
    if(this._isTermInvalid(termNormalized)) {
      throw new Error(`[SearchUserRequestParamsBuilder.build] Invalid parameter: term="${term}"`)
    }
    return {
      q: termNormalized
    };
  }

  private static _isTermInvalid(term: string): boolean {
    return !term || term.includes(SPACE);
  }
}
