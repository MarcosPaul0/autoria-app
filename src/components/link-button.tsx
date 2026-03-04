import { Link } from '@tanstack/react-router'
import { cn } from '@autoria/libs/cn'
import { buttonVariants } from './button'
import type { LinkProps } from '@tanstack/react-router'
import type { VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'

interface LinkButtonProps
  extends VariantProps<typeof buttonVariants>, LinkProps {
  href?: string
  className?: string
  children: ReactNode
}

export function LinkButton({
  variant,
  size,
  href,
  className,
  children,
  ...props
}: LinkButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Link>
  )
}
