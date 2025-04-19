'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface WordCardProps {
  word: string
  translation: string
  onAnswer: (choiceIndex: number) => void
}

export function WordCard({ word, translation, onAnswer }: WordCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">{word}</h2>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-20 text-lg"
            onClick={() => onAnswer(0)}
          >
            {translation}
          </Button>
          <Button
            variant="outline"
            className="h-20 text-lg"
            onClick={() => onAnswer(1)}
          >
            Wrong Answer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 