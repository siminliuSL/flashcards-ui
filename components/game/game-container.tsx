'use client'

import { useState, useEffect } from 'react'
import { WordCard } from './word-card'
import { AudioPlayer } from './audio-player'
import { FeedbackToast } from './feedback-sonner'

interface Word {
  id: number
  word: string
  translation: string
  audioUrl: string
  imageUrl: string
}

export function GameContainer() {
  const [currentWord, setCurrentWord] = useState<Word | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    fetchRandomWord()
  }, [])

  const fetchRandomWord = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('http://localhost:8000/api/v1/words/random')
      if (!response.ok) {
        throw new Error('Failed to fetch word')
      }
      const data = await response.json()
      setCurrentWord(data)
      setIsCorrect(null)
      setShowFeedback(false)
    } catch (error) {
      console.error('Error fetching word:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswer = async (choiceIndex: number) => {
    if (!currentWord) return

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/words/check/${currentWord.id}/${choiceIndex}`,
        {
          method: 'POST',
        }
      )

      if (!response.ok) {
        throw new Error('Failed to check answer')
      }

      const data = await response.json()
      setIsCorrect(data.correct)
      setShowFeedback(true)

      // Wait for feedback to show before loading next word
      setTimeout(() => {
        fetchRandomWord()
      }, 1500)
    } catch (error) {
      console.error('Error checking answer:', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!currentWord) {
    return <div>No word available</div>
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <AudioPlayer audioUrl={currentWord.audioUrl} />
      <WordCard
        word={currentWord.word}
        translation={currentWord.translation}
        onAnswer={handleAnswer}
      />
      {showFeedback && currentWord && (
        <FeedbackToast
          isCorrect={isCorrect || false}
          word={currentWord.word}
          translation={currentWord.translation}
        />
      )}
    </div>
  )
}