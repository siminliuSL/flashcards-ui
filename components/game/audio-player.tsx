'use client'

import { Button } from '@/components/ui/button'
import { Volume2 } from 'lucide-react'
import { useState } from 'react'

interface AudioPlayerProps {
  audioUrl: string
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
  
    const playAudio = () => {
      setIsPlaying(true)
      const audio = new Audio(`http://localhost:8000${audioUrl}`)
      audio.play()
      audio.onended = () => setIsPlaying(false)
    }
  
    return (
      <Button
        size="lg"
        onClick={playAudio}
        disabled={isPlaying}
        className="w-full max-w-[200px]"
      >
        <Volume2 className="mr-2 h-5 w-5" />
        {isPlaying ? 'Playing...' : 'Play Word'}
      </Button>
    )
  }