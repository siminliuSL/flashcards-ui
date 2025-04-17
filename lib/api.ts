import { Word, AnswerCheck } from '@/types'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1'

export async function getRandomWord(): Promise<Word> {
  try {
    const response = await fetch(`${API_BASE}/words/random`)
    if (!response.ok) {
      throw new Error(`Failed to fetch word: ${response.statusText}`)
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching word:', error)
    throw new Error('Unable to connect to the server. Please try again later.')
  }
}

export async function checkAnswer(
  wordId: number,
  choiceIndex: number
): Promise<AnswerCheck> {
  try {
    const response = await fetch(
      `${API_BASE}/words/check/${wordId}/${choiceIndex}`,
      { method: 'POST' }
    )
    if (!response.ok) {
      throw new Error(`Failed to check answer: ${response.statusText}`)
    }
    return response.json()
  } catch (error) {
    console.error('Error checking answer:', error)
    throw new Error('Unable to check your answer. Please try again.')
  }
}