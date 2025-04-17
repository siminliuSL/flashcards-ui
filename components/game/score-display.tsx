'use client'

import { Progress } from '@/components/ui/progress'

interface ScoreDisplayProps {
  score: number
  total: number
}

export function ScoreDisplay({ score, total }: ScoreDisplayProps) {
  const percentage = (score / total) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Score</span>
        <span>{score}/{total}</span>
      </div>
      <Progress value={percentage} />
    </div>
  )
}