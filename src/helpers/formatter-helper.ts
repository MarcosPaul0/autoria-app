export class FormatterHelper {
  static toReal(cents: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(cents / 100)
  }

  static toRealWithDiscount(cents: number, discountPercentage: number): string {
    const discountedValue = cents * (1 - discountPercentage / 100)

    return this.toReal(discountedValue)
  }

  static toMinutes(minutes: number): string {
    return `${minutes} minutos`
  }

  static toLongDate(date: string): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date))
  }

  static centsToString(cents?: number): string {
    if (!cents) {
      return ''
    }

    return new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(cents / 100)
  }

  static numberToString(value?: number): string {
    if (!value) {
      return ''
    }

    return String(value)
  }

  static stringToString(value?: string): string {
    if (!value) {
      return ''
    }

    return value
  }
}
