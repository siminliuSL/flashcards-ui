'use client'

import { toast } from 'sonner'
import { useEffect } from 'react'

interface FeedbackToastProps {
  isCorrect: boolean
  word: string
  translation: string
}

export function FeedbackToast({ isCorrect, word, translation }: FeedbackToastProps) {
  useEffect(() => {
    if (isCorrect) {
      toast.success(`Correct! ${word} means ${translation}`)
    } else {
      toast.error(`Incorrect. ${word} means ${translation}`)
    }
  }, [isCorrect, word, translation])

  return null
}