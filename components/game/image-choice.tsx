'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ImageChoiceProps {
  image: string
  index: number
  selected: boolean
  correct: boolean | null
  disabled: boolean
  onSelect: (index: number) => void
}

export function ImageChoice({
  image,
  index,
  selected,
  correct,
  disabled,
  onSelect,
}: ImageChoiceProps) {
      return (
    <Card
      className={cn(
        'overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105',
        selected && correct === null && 'ring-2 ring-primary',
        selected && correct === true && 'ring-2 ring-green-500',
        selected && correct === false && 'ring-2 ring-red-500',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      onClick={() => !disabled && onSelect(index)}
    >
      <img
        src={`http://localhost:8000${image}`}
        alt={`Choice ${index + 1}`}
        className="w-full h-48 object-cover"
      />
    </Card>
  )
}