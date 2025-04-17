export interface Word {
    id: number
    word: string
    audioUrl: string
    images: string[]
    correctIndex: number
  }
  
  export interface AnswerCheck {
    isCorrect: boolean
    correctIndex: number
  }
  
  export interface GameState {
    score: number
    currentWord: Word | null
    isLoading: boolean
    selectedIndex: number | null
}