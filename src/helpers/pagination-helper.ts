export class PaginationHelper {
  static toPositiveInteger(value: unknown) {
    const numericValue = Number(value)

    if (!Number.isInteger(numericValue) || numericValue < 1) {
      return 1
    }

    return numericValue
  }

  static isIntegerString(value: string) {
    return /^-?\d+$/.test(value)
  }
}
