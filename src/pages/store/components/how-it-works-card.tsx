import { Badge } from '@autoria/components/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@autoria/components/card'
import { cn } from '@autoria/libs/cn'
import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'

const howItWorksCardVariants = cva(
  'bg-card/10 flex flex-col sm:flex-row items-center justify-between pb-10 sm:pb-4 px-4 sm:px-10',
  {
    variants: {
      step: {
        first: 'col-span-1 sm:col-span-5',
        second: 'col-span-1 sm:col-span-3',
        third: 'col-span-1 sm:col-span-3',
        fourth: 'col-span-1 sm:col-span-5',
      },
    },
    defaultVariants: {
      step: 'first',
    },
  },
)

const STEP_TEXT = {
  first: '1° Passo',
  second: '2° Passo',
  third: '3° Passo',
  fourth: '4° Passo',
} as const

interface HowItWorksCardProps {
  title: string
  step: keyof typeof STEP_TEXT
  image?: ReactNode
  className?: string
  children: ReactNode
}

export function HowItWorksCard({
  title,
  step,
  image,
  children,
  className,
}: HowItWorksCardProps) {
  return (
    <Card className={cn(howItWorksCardVariants({ step }), className)}>
      {image}

      <div className="flex flex-col gap-4 sm:gap-6">
        <CardHeader className="flex flex-col gap-3">
          <Badge className="font-bold">{STEP_TEXT[step]}</Badge>

          <CardTitle className="font-bold text-lg sm:text-2xl text-card">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">{children}</CardContent>
      </div>
    </Card>
  )
}
