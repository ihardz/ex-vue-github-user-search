export class StringHelper {
  static trimTrailingSpaces(str?: string): string | undefined {
    return str?.replace(/^\s+|\s+$/gm, String());
  }
}