import autoriaChatImg from '@autoria/assets/images/autoria-chat.png'
import type { ReactNode } from 'react'

interface AutoriaChatProps {
  text: ReactNode
}

export function AutoriaChat({ text }: AutoriaChatProps) {
  return (
    <div className="flex items-end gap-4 ml-12">
      <p
        className={`
          text-sm sm:text-md max-w-[300px] sm:max-w-[400px] bg-card text-card-foreground p-2 rounded-t-xl rounded-bl-xl relative ml-auto
          before:content-[''] before:absolute before:bottom-0 before:-right-[13px] before:w-0 before:h-0
          before:border-l-[13px] before:border-t-[9px] before:border-l-card before:border-t-transparent
        `}
      >
        {text}
      </p>

      <div className="flex flex-col gap1 items-center -mb-8">
        <img
          src={autoriaChatImg}
          className="size-6 sm:size-8 text-primary-foreground "
        />

        <span className="text-[10px] text-primary-foreground">Autoria</span>
      </div>
    </div>
  )
}
