import { useEffect, useState } from 'react'

function App() {
  const [apiStatus, setApiStatus] = useState('Checking the backend…')

  useEffect(() => {
    let isActive = true

    fetch('/api/health')
      .then((response) => {
        if (!response.ok) {
          throw new Error('The API returned an error.')
        }

        return response.json()
      })
      .then((data) => {
        if (isActive) {
          setApiStatus(data.message)
        }
      })
      .catch(() => {
        if (isActive) {
          setApiStatus('Backend is not responding. Start the server to connect.')
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="TicketHub home">
          Ticket<span>Hub</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#events">Explore events</a>
          <a href="#account">Sign in</a>
        </nav>
      </header>

      <section className="hero" id="events">
        <p className="eyebrow">ALTA BUILDER 30 · DAY 2</p>
        <h1>Good events bring<br />people together.</h1>
        <p className="intro">
          TicketHub is your place to discover local events and reserve a spot.
        </p>
        <a className="primary-button" href="#event-preview">Explore events</a>
      </section>

      <section className="event-preview" id="event-preview" aria-labelledby="events-title">
        <div>
          <p className="eyebrow">COMING SOON</p>
          <h2 id="events-title">Events worth showing up for</h2>
        </div>
        <p className="placeholder-card">
          Event listings will appear here as we build TicketHub.
        </p>
      </section>

      <section className="connection-card" aria-live="polite" id="account">
        <span className={`status-dot ${apiStatus === 'API connected' ? 'is-connected' : ''}`} />
        <div>
          <strong>Backend connection</strong>
          <p>{apiStatus}</p>
        </div>
      </section>

      <footer>TicketHub · Discover events. Save your spot.</footer>
    </main>
  )
}

export default App
