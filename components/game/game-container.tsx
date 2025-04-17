'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { AudioPlayer } from './audio-player'
import { ImageChoice } from './image-choice'
import { ScoreDisplay } from './score-display'
import { FeedbackToast } from './feedback-sonner'
import { getRandomWord, checkAnswer } from '@/lib/api'
import { GameState } from '@/types'

export function GameContainer() {
    const [gameState, setGameState] = useState<GameState>({
      score: 0,
      currentWord: null,
      isLoading: true,
      selectedIndex: null,
    })
    const [showFeedback, setShowFeedback] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
  
    const loadNewWord = async () => {
      setGameState(prev => ({ ...prev, isLoading: true, selectedIndex: null }))
      try {
        const word = await getRandomWord()
        setGameState(prev => ({
          ...prev,
          currentWord: word,
          isLoading: false,
        }))
      } catch (error) {
        console.error('Error loading word:', error)
      }
    }

    const handleImageSelect = async (index: number) => {
        if (!gameState.currentWord || gameState.selectedIndex !== null) return
    
        setGameState(prev => ({ ...prev, selectedIndex: index }))
    
        try {
          const result = await checkAnswer(gameState.currentWord.id, index)
          setIsCorrect(result.isCorrect)
          setShowFeedback(true)
    
          if (result.isCorrect) {
            setGameState(prev => ({ ...prev, score: prev.score + 1 }))
            setTimeout(() => {
              setShowFeedback(false)
              loadNewWord()
            }, 2000)
          }
        } catch (error) {
          console.error('Error checking answer:', error)
        }
      }
    
      useEffect(() => {
        loadNewWord()
      }, [])

      if (gameState.isLoading) {
        return <div>Loading...</div>
      }
    
      return (
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="p-6 space-y-6">
            <ScoreDisplay score={gameState.score} total={10} />
            
            {gameState.currentWord && (
              <>
                <div className="flex justify-center">
                  <AudioPlayer audioUrl={gameState.currentWord.audioUrl} />
                </div>
    
                <div className="grid grid-cols-3 gap-4">
                  {gameState.currentWord.images.map((image, index) => (
                    <ImageChoice
                      key={index}
                      image={image}
                      index={index}
                      selected={gameState.selectedIndex === index}
                      correct={
                        gameState.selectedIndex === index
                        ? index === gameState.currentWord?.correctIndex
                        : null
                    }
                    disabled={gameState.selectedIndex !== null}
                    onSelect={handleImageSelect}
                  />
                ))}
              </div>
            </>
          )}
  
          <FeedbackToast isCorrect={isCorrect} show={showFeedback} />
        </CardContent>
      </Card>
    )
  }