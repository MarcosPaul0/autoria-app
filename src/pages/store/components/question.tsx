import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@autoria/components/accordion'

interface QuestionProps {
  id: string
  question: string
  answer: string
}

export function Question({ answer, question, id }: QuestionProps) {
  return (
    <AccordionItem value={id}>
      <AccordionTrigger>{question}</AccordionTrigger>
      <AccordionContent>{answer}</AccordionContent>
    </AccordionItem>
  )
}
