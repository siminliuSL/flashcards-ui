'use client'

import { toast } from 'sonner'
import { useEffect } from 'react'

interface FeedbackToastProps {
  isCorrect: boolean
  show: boolean
}

export function FeedbackToast({ isCorrect, show }: FeedbackToastProps) {
  useEffect(() => {
    if (show) {
      toast(isCorrect ? 'Correct!' : 'Try again!', {
        description: isCorrect
          ? 'Well done! Loading next word...'
          : 'Keep trying, you can do it!',
        duration: 2000,
        className: isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
      })
    }
  }, [show, isCorrect])

  return null
}