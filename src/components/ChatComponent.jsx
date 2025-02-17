import { useState } from 'react'
import OpenAI from 'openai'
import './ChatComponent.css'

function ChatComponent() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if(!apiKey){
        setResponse('Error: Please enter your API key')
        setLoading(false)
        return
      }

      const openai = new OpenAI({
        apiKey: apiKey,
        // Note: In production, you should use a backend server
        dangerouslyAllowBrowser: true 
      })

      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: input }],
        model: 'gpt-3.5-turbo',
      })

      setResponse(completion.choices[0].message.content)
    } catch (error) {
      console.error('Error:', error)
      setResponse('Error: Could not fetch response')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <div style={{marginBottom: '20px'}}>
        ⚠️ Warning: It is just a test website. Please protect your API key.
      </div>
      <div className="input-wrapper">
        <input 
          type="password" 
          value={apiKey} 
          onChange={(e) => setApiKey(e.target.value)} 
          placeholder="Enter your API key"
          className="api-input"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          rows="4"
          className="chat-input"
        />
        <button 
          type="submit" 
          disabled={loading || !input.trim()}
          className="chat-button"
        >
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
      {response && (
        <div className="response-container">
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}

export default ChatComponent 