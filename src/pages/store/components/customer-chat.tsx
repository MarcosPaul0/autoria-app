import { UserCircleIcon } from '@phosphor-icons/react'

interface CustomerChatProps {
  text: string
}

export function CustomerChat({ text }: CustomerChatProps) {
  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col gap1 items-center -mb-8">
        <UserCircleIcon className="size-6 sm:size-8 text-primary-foreground" />
        <span className="text-[10px] text-primary-foreground">Bruna</span>
      </div>

      <p
        className={`
          text-sm sm:text-md max-w-[300px] sm:max-w-[400px] bg-secondary text-secondary-foreground p-2 rounded-t-xl rounded-br-xl relative
          before:content-[''] after:absolute after:bottom-0 after:-left-[13px] after:w-0 after:h-0
          after:border-r-[13px] after:border-t-[9px] after:border-r-secondary after:border-t-transparent
        `}
      >
        {text}
      </p>
    </div>
  )
}
