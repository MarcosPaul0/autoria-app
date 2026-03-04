import { cn } from '@autoria/libs/cn'
import * as React from 'react'

function sanitizeNumericValue(value: string, decimalPlacesMaxNumber?: number) {
  const onlyNumbersAndComma = value.replace(/[^\d,]/g, '')
  const firstCommaIndex = onlyNumbersAndComma.indexOf(',')

  if (firstCommaIndex === -1) {
    return onlyNumbersAndComma
  }

  let integerPart = onlyNumbersAndComma.slice(0, firstCommaIndex + 1)
  const decimalPart = onlyNumbersAndComma
    .slice(firstCommaIndex + 1)
    .replace(/,/g, '')
    .slice(0, decimalPlacesMaxNumber)

  if (decimalPlacesMaxNumber === 0) {
    integerPart = integerPart.replace(/,/g, '')
  }

  return `${integerPart}${decimalPart}`
}

function NumericInput({
  className,
  type,
  onChange,
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <input
      type={type ?? 'text'}
      inputMode="decimal"
      data-slot="numeric-input"
      className={cn(
        `dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 
        dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 
        disabled:bg-input/50 dark:disabled:bg-input/80 h-12 rounded-2xl border bg-transparent px-2.5 py-4 text-base transition-colors 
        file:h-6 file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:ring-3 md:text-sm file:text-foreground 
        placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent 
        disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`,
        className,
      )}
      onChange={(event) => {
        event.target.value = sanitizeNumericValue(event.target.value)
        onChange?.(event)
      }}
      {...props}
    />
  )
}

export { NumericInput as NumericInput, sanitizeNumericValue }
