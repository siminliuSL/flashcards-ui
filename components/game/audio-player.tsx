'use client'

import { Button } from '@/components/ui/button'
import { Volume2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface AudioPlayerProps {
  audioUrl: string
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)
  
    useEffect(() => {
      console.log('AudioPlayer mounted with URL:', audioUrl)
      console.log('Audio URL details:', {
        url: audioUrl,
        protocol: new URL(audioUrl).protocol,
        hostname: new URL(audioUrl).hostname,
        pathname: new URL(audioUrl).pathname
      })
    }, [audioUrl])
  
    const playAudio = () => {
      console.log('Attempting to play audio with URL:', audioUrl)
      setIsPlaying(true)
      const audio = new Audio(audioUrl)
      audioRef.current = audio
      
      audio.onerror = (e) => {
        console.error('Audio error:', e)
        console.error('Audio error details:', {
          error: audio.error,
          networkState: audio.networkState,
          readyState: audio.readyState,
          src: audio.src,
          currentSrc: audio.currentSrc
        })
      }
      
      audio.onloadstart = () => console.log('Audio load started')
      audio.onloadedmetadata = () => console.log('Audio metadata loaded')
      audio.oncanplay = () => console.log('Audio can play')
      audio.onplay = () => console.log('Audio play started')
      
      audio.play().catch(error => {
        console.error('Error playing audio:', error)
        setIsPlaying(false)
      })
      
      audio.onended = () => {
        console.log('Audio playback ended')
        setIsPlaying(false)
      }
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