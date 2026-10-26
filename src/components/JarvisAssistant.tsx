import { useEffect, useState } from 'react'
type SpeechRecognitionResult = {
  transcript: string
}

type SpeechRecognitionEvent = {
  resultIndex: number
  results: ArrayLike<{
    isFinal: boolean
    0: SpeechRecognitionResult
  }>
}

type SpeechRecognitionInstance = {
  lang: string
  interimResults: boolean
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionInstance
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance
}
type Message = {
    role: 'user' | 'assistant'
    text: string
}

function JarvisAssistant(){
    const [question,setQuestion]=useState('')

    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isListening, setIsListening] = useState(false)
    const [speechError, setSpeechError] = useState('')
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
    const [selectedVoice, setSelectedVoice] = useState('')
    const [speechRate, setSpeechRate] = useState(1)
    useEffect(() => {
    function loadVoices() {
        const availableVoices = window.speechSynthesis.getVoices()
        setVoices(availableVoices)

        if (availableVoices.length > 0 && !selectedVoice) {
        const preferredVoice =
            availableVoices.find((voice) => voice.lang === 'en-IN') ??
            availableVoices.find((voice) => voice.lang.startsWith('en')) ??
            availableVoices[0]

        setSelectedVoice(preferredVoice.name)
        }
    }

    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)

    return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
    }
    }, [selectedVoice])
    function handleVoiceInput() {
        const speechWindow = window as SpeechRecognitionWindow
        const SpeechRecognition =
            speechWindow.SpeechRecognition ??
            speechWindow.webkitSpeechRecognition

        if (!SpeechRecognition) {
            setSpeechError(
            'Voice input is not supported in this browser. Please type your question.',
            )
            return
        }

        setSpeechError('')

        const recognition = new SpeechRecognition()
        recognition.lang = 'en-IN'
        recognition.interimResults = false

        recognition.onresult = (event) => {
            const transcript =
            event.results[event.resultIndex]?.[0]?.transcript

            if (transcript) {
            setQuestion((previous) =>
                previous ? `${previous} ${transcript}` : transcript,
            )
            }
        }

        recognition.onerror = () => {
            setSpeechError('Could not recognize speech. Please try again.')
            setIsListening(false)
        }

        recognition.onend = () => {
            setIsListening(false)
        }

        try {
            setIsListening(true)
            recognition.start()
        } catch {
            setIsListening(false)
            setSpeechError('Could not start the microphone. Please try again.')
        }
    }
    function speakAnswer(text: string) {
    if (!('speechSynthesis' in window)) {
        setSpeechError('Speech output is not supported in this browser.')
        return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(
        text.replace(/\*\*(.*?)\*\*/g, '$1'),
    )

    const voice = voices.find((item) => item.name === selectedVoice)

    if (voice) {
        utterance.voice = voice
    }

    utterance.lang = voice?.lang ?? 'en-IN'
    utterance.rate = speechRate
    utterance.pitch = 1

    window.speechSynthesis.speak(utterance)
    }
    async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    ) {
    event.preventDefault()

    const trimmedQuestion = question.trim()
    if (!trimmedQuestion || isLoading) return

    setMessages((previous) => [
        ...previous,
        { role: 'user', text: trimmedQuestion },
    ])

    setQuestion('')
    setIsLoading(true)
    setSpeechError('')

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            question: trimmedQuestion,
            history: messages.map((message) => ({
                role: message.role,
                content: message.text,
            })),
            }),
        })

        if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
        }

        const data: { answer: string } = await response.json()

        setMessages((previous) => [
        ...previous,
        { role: 'assistant', text: data.answer },
        ])
        speakAnswer(data.answer)
    } catch (error) {
        console.error('Jarvis request failed:', error)
        setSpeechError(
        'Could not reach Jarvis. Check that the backend is running.',
        )
    } finally {
        setIsLoading(false)
    }
    }

    return (
        <div className="jarvis-interface">
            <div className="jarvis-message-area" aria-live="polite">
                {messages.length===0?(
                    <p className="jarvis-welcome">
                        Hi! I'm Jarvis. Ask me about Ananya's projects,skills, or experience
                    </p>
                ):(
                messages.map((message, index) => (
                    <div
                        className={
                        message.role === 'user'
                            ? 'jarvis-user-message'
                            : 'jarvis-assistant-message'
                        }
                        key={index}
                    >
                        {message.text.replace(/\*\*(.*?)\*\*/g, '$1')}
                    </div>
                    ))
                )}
            </div>
            <form className="jarvis-input-form" onSubmit={handleSubmit}>
                <input type="text" value={question} onChange={(event)=>setQuestion(event.target.value)} placeholder="Ask Jarvis something..." aria-label="Ask Jarvis a question"/>
                <button
                type="button"
                onClick={handleVoiceInput}
                disabled={isListening}
                aria-label="Speak your question"
                title="Speak your question"
                >
                {isListening ? 'Listening…' : '🎙'}
                </button>
                <button type="submit" disabled={!question.trim() || isLoading}>
                {isLoading ? 'Thinking…' : 'Send ↗'}
                </button>
            </form>
            {speechError && (
            <p role="status" className="jarvis-error">
                {speechError}
            </p>
            )}
            <div className="jarvis-voice-controls">
            <label>
                Voice
                <select
                value={selectedVoice}
                onChange={(event) => setSelectedVoice(event.target.value)}
                >
                {voices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                    </option>
                ))}
                </select>
            </label>

            <label>
                Speed: {speechRate.toFixed(1)}×
                <input
                type="range"
                min="0.7"
                max="1.3"
                step="0.1"
                value={speechRate}
                onChange={(event) => setSpeechRate(Number(event.target.value))}
                />
            </label>

            <button
                type="button"
                onClick={() => {
                window.speechSynthesis.cancel()
                speakAnswer('Hello! I am Jarvis, your portfolio assistant.')
                }}
            >
                Test voice
            </button>
            </div>

            <p className="jarvis-helper-text">
            {isListening
                ? 'LISTENING — SPEAK NOW'
                : isLoading
                ? 'JARVIS IS THINKING…'
                : 'AI POWERED · VOICE INPUT AVAILABLE'}
            </p>
            <button
            type="button"
            className="jarvis-stop-button"
            onClick={() => window.speechSynthesis.cancel()}
            >
            Stop speaking
            </button>
        </div>
    )
}
export default JarvisAssistant