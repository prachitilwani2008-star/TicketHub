import { useEffect, useState } from 'react'

const events = [
  {
    id: 1,
    category: 'MUSIC',
    title: 'Afterglow Rooftop Sessions',
    place: 'The Terrace, Bengaluru',
    date: 'NOV 22',
    time: '7:00 PM',
    color: 'coral',
    art: '♫',
    tag: 'Almost full',
  },
  {
    id: 2,
    category: 'ART & CULTURE',
    title: 'The Art of Slow Living',
    place: 'Gallery 404, Bengaluru',
    date: 'NOV 24',
    time: '11:00 AM',
    color: 'lilac',
    art: '✳',
    tag: 'Free entry',
  },
  {
    id: 3,
    category: 'FOOD & DRINK',
    title: 'Sunday Table: A Brunch Club',
    place: 'Olive Courtyard, Bengaluru',
    date: 'NOV 29',
    time: '10:30 AM',
    color: 'mint',
    art: '✿',
    tag: 'New',
  },
]

function getPage(pathname) {
  if (pathname === '/login') return 'login'
  if (pathname === '/signup') return 'signup'
  if (pathname === '/account') return 'account'
  return 'home'
}

function App() {
  const [page, setPage] = useState(() => getPage(window.location.pathname))
  const [currentUser, setCurrentUser] = useState(null)
  const [sessionReady, setSessionReady] = useState(false)

  function navigate(path) {
    window.history.pushState({}, '', path)
    setPage(getPage(new URL(path, window.location.origin).pathname))
    const hash = path.includes('#') ? path.slice(path.indexOf('#') + 1) : ''
    if (hash) {
      window.requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }))
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handlePopState = () => setPage(getPage(window.location.pathname))
    window.addEventListener('popstate', handlePopState)

    const storedSession = window.sessionStorage.getItem('tickethub-session')
    if (!storedSession) {
      setSessionReady(true)
      return () => window.removeEventListener('popstate', handlePopState)
    }

    let session
    try {
      session = JSON.parse(storedSession)
    } catch {
      window.sessionStorage.removeItem('tickethub-session')
      setSessionReady(true)
      return () => window.removeEventListener('popstate', handlePopState)
    }

    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${session.token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Session expired')
        return response.json()
      })
      .then(({ user }) => setCurrentUser(user))
      .catch(() => window.sessionStorage.removeItem('tickethub-session'))
      .finally(() => setSessionReady(true))

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (sessionReady && page === 'account' && !currentUser) {
      window.history.replaceState({}, '', '/login')
      setPage('login')
    }
  }, [currentUser, page, sessionReady])

  function finishSignIn(session) {
    window.sessionStorage.setItem('tickethub-session', JSON.stringify(session))
    setCurrentUser(session.user)
    navigate('/account')
  }

  function signOut() {
    window.sessionStorage.removeItem('tickethub-session')
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <div className="app-shell">
      <Header
        currentUser={currentUser}
        onNavigate={navigate}
        onSignOut={signOut}
      />

      {page === 'home' && <HomePage onNavigate={navigate} />}
      {(page === 'login' || page === 'signup') && (
        <AuthPage
          mode={page}
          onNavigate={navigate}
          onSuccess={finishSignIn}
        />
      )}
      {page === 'account' && currentUser && (
        <AccountPage user={currentUser} onNavigate={navigate} />
      )}

      <Footer onNavigate={navigate} />
    </div>
  )
}

function Header({ currentUser, onNavigate, onSignOut }) {
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => onNavigate('/')} aria-label="TicketHub home">
        ticket<span>hub</span><i>.</i>
      </button>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="/#events" onClick={(event) => { event.preventDefault(); onNavigate('/#events') }}>Discover</a>
        <a href="/#how-it-works" onClick={(event) => { event.preventDefault(); onNavigate('/#how-it-works') }}>How it works</a>
      </nav>
      <div className="header-actions">
        {currentUser ? (
          <>
            <button className="profile-button" type="button" onClick={() => onNavigate('/account')}>
              <span className="avatar">{currentUser.name?.[0]?.toUpperCase() ?? 'T'}</span>
              <span className="profile-name">{currentUser.name}</span>
            </button>
            <button className="text-button signout-button" type="button" onClick={onSignOut}>Sign out</button>
          </>
        ) : (
          <>
            <button className="text-button" type="button" onClick={() => onNavigate('/login')}>Log in</button>
            <button className="button button-dark header-cta" type="button" onClick={() => onNavigate('/signup')}>
              Get started <span aria-hidden="true">↗</span>
            </button>
          </>
        )}
      </div>
    </header>
  )
}

function HomePage({ onNavigate }) {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> YOUR CITY, YOUR PEOPLE</div>
          <h1>Make room for<br /><span>something</span> memorable.</h1>
          <p className="hero-description">
            Find the little moments and big nights happening around you. Your next favourite thing is closer than you think.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#events">Explore events <span aria-hidden="true">↗</span></a>
            <button className="button button-quiet" type="button" onClick={() => onNavigate('/signup?role=organizer')}>Host an event</button>
          </div>
          <div className="social-proof">
            <div className="avatar-stack" aria-hidden="true"><span>R</span><span>A</span><span>M</span><span>+</span></div>
            <p><strong>Good things happen together.</strong><br />Join your local community.</p>
          </div>
        </div>
        <div className="hero-art" aria-label="Illustration of friends gathering at an event">
          <div className="art-sun" />
          <div className="art-note note-one">✳</div>
          <div className="art-note note-two">♫</div>
          <div className="art-label"><span>THIS WEEKEND</span><strong>Find your<br />kind of fun.</strong><a href="#events">See what's on <span>↗</span></a></div>
          <div className="art-person person-one"><i /><b /><span /></div>
          <div className="art-person person-two"><i /><b /><span /></div>
          <div className="art-person person-three"><i /><b /><span /></div>
          <div className="art-ground" />
          <div className="art-caption"><span className="caption-dot" /> GOOD PLANS, GREAT PEOPLE</div>
        </div>
      </section>

      <section className="event-section" id="events">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> AROUND YOU</p>
            <h2>Plans worth making.</h2>
          </div>
          <button className="browse-link" type="button" onClick={() => onNavigate('/signup')}>See all events <span>↗</span></button>
        </div>
        <div className="event-grid">
          {events.map((event) => <EventCard event={event} key={event.id} onSelect={() => onNavigate('/signup')} />)}
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="how-intro">
          <p className="eyebrow"><span className="eyebrow-line" /> EASY AS IT SHOULD BE</p>
          <h2>Less scrolling.<br />More <em>showing up.</em></h2>
        </div>
        <div className="how-steps">
          <div className="how-step"><span className="step-number">01</span><div><h3>Find your thing</h3><p>Browse experiences made for your city, your mood, your people.</p></div></div>
          <div className="how-step"><span className="step-number">02</span><div><h3>Save your spot</h3><p>Reserve a ticket in a few taps. No long forms, no fuss.</p></div></div>
          <div className="how-step"><span className="step-number">03</span><div><h3>Make it a memory</h3><p>Show up, meet good people, and have a story to tell.</p></div></div>
        </div>
      </section>

      <section className="host-banner">
        <div><p className="eyebrow">HAVE SOMETHING IN MIND?</p><h2>Bring your people together.</h2></div>
        <button className="button button-light" type="button" onClick={() => onNavigate('/signup?role=organizer')}>Create an event <span>↗</span></button>
        <span className="banner-sparkle" aria-hidden="true">✳</span>
      </section>
    </main>
  )
}

function EventCard({ event, onSelect }) {
  return (
    <button className="event-card" type="button" onClick={onSelect}>
      <span className={`event-art event-art-${event.color}`} aria-hidden="true">
        <span className="event-art-shape shape-one" /><span className="event-art-shape shape-two" />
        <span className="event-art-symbol">{event.art}</span>
        <span className="event-date">{event.date}</span>
        <span className="event-tag">{event.tag}</span>
      </span>
      <span className="event-info">
        <span className="event-category">{event.category}</span>
        <strong className="event-title">{event.title}</strong>
        <span className="event-meta">{event.place}</span>
        <span className="event-time">{event.time} <i>·</i> Bengaluru</span>
      </span>
    </button>
  )
}

function AuthPage({ mode, onNavigate, onSuccess }) {
  const isSignup = mode === 'signup'
  const [role, setRole] = useState(() => new URLSearchParams(window.location.search).get('role') === 'organizer' ? 'organizer' : 'attendee')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const form = new FormData(event.currentTarget)
    const payload = {
      email: form.get('email'),
      password: form.get('password'),
    }
    if (isSignup) {
      payload.name = form.get('name')
      payload.role = role
    }

    try {
      const response = await fetch(`/api/auth/${isSignup ? 'register' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.error || 'We couldn’t complete that request. Please try again.')
      }

      onSuccess({ token: result.token, user: result.user })
    } catch (requestError) {
      setError(requestError instanceof TypeError
        ? 'We can’t reach TicketHub right now. Please try again in a moment.'
        : requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-form-panel">
          <button className="back-link" type="button" onClick={() => onNavigate('/')}><span>←</span> Back to discover</button>
          <div className="auth-heading">
            <div className="auth-mark">t<span>.</span></div>
            <p className="eyebrow">A GOOD PLAN STARTS HERE</p>
            <h1>{isSignup ? 'Come on in.' : 'Good to see you.'}</h1>
            <p>{isSignup ? 'Create your account and find something worth showing up for.' : 'Sign in to pick up where the good times left off.'}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <label className="field-label" htmlFor="name">Your name</label>
                <input className="text-input" id="name" name="name" type="text" autoComplete="name" placeholder="e.g. Priya Sharma" minLength="2" maxLength="80" required />
                <fieldset className="role-fieldset">
                  <legend className="field-label">I’m here to…</legend>
                  <div className="role-options">
                    <label className={`role-option ${role === 'attendee' ? 'selected' : ''}`}>
                      <input type="radio" name="role" value="attendee" checked={role === 'attendee'} onChange={() => setRole('attendee')} />
                      <span className="role-icon">✦</span><span><strong>Find events</strong><small>I'm here to attend</small></span>
                    </label>
                    <label className={`role-option ${role === 'organizer' ? 'selected' : ''}`}>
                      <input type="radio" name="role" value="organizer" checked={role === 'organizer'} onChange={() => setRole('organizer')} />
                      <span className="role-icon">↗</span><span><strong>Host events</strong><small>I'm an organizer</small></span>
                    </label>
                  </div>
                </fieldset>
              </>
            )}

            <label className="field-label" htmlFor="email">Email address</label>
            <input className="text-input" id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength="254" required />

            <div className="password-label-row">
              <label className="field-label" htmlFor="password">Password</label>
              {!isSignup && <button className="forgot-link" type="button" onClick={() => setError('Password reset will be available soon. For now, contact your TicketHub organizer.')}>Forgot password?</button>}
            </div>
            <div className="password-wrap">
              <input className="text-input" id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete={isSignup ? 'new-password' : 'current-password'} minLength="8" maxLength="72" placeholder={isSignup ? 'At least 8 characters' : 'Enter your password'} required />
              <button className="show-password" type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-primary auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'One moment…' : isSignup ? 'Create your account' : 'Log in'}
              {!isSubmitting && <span aria-hidden="true">↗</span>}
            </button>
            <p className="terms-note">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
          </form>

          <p className="auth-switch">
            {isSignup ? 'Already have an account?' : 'New to Tickethub?'}{' '}
            <button type="button" onClick={() => onNavigate(isSignup ? '/login' : '/signup')}>
              {isSignup ? 'Log in' : 'Create account'}
            </button>
          </p>
        </div>

        <aside className="auth-art-panel">
          <div className="auth-orbit orbit-one" /><div className="auth-orbit orbit-two" />
          <span className="auth-sparkle sparkle-one">✳</span><span className="auth-sparkle sparkle-two">✦</span>
          <div className="auth-art-copy"><p className="eyebrow">YOUR NEXT STORY STARTS HERE</p><h2>Say yes to<br />going out.</h2><p>From tiny pop-ups to big nights. Find the people and plans that make your city feel like yours.</p></div>
          <div className="auth-ticket"><div className="ticket-stamp">TH<span>✳</span></div><div><small>YOUR NEXT PLAN</small><strong>Make it a good one.</strong></div><span className="ticket-arrow">↗</span></div>
          <div className="auth-art-footer"><span>01 — 03</span><div><i /><i /><i /></div><span>DISCOVER · BOOK · GO</span></div>
        </aside>
      </section>
    </main>
  )
}

function AccountPage({ user, onNavigate }) {
  const isOrganizer = user.role === 'organizer'
  return (
    <main className="account-page">
      <div className="account-welcome">
        <p className="eyebrow"><span className="eyebrow-line" /> YOUR TICKETHUB</p>
        <h1>Welcome in, {user.name.split(' ')[0]}.</h1>
        <p>Your {isOrganizer ? 'organizer' : 'attendee'} space is ready. Let’s make a good plan.</p>
        <div className="account-actions">
          <button className="button button-primary" type="button" onClick={() => onNavigate('/')}>{isOrganizer ? 'Explore events' : 'Find an event'} <span>↗</span></button>
          {isOrganizer && <button className="button button-quiet" type="button" disabled>Create an event · coming soon</button>}
        </div>
      </div>
      <div className="account-panel"><div className="account-panel-icon">{isOrganizer ? '↗' : '✦'}</div><div><span className="event-category">YOUR ACCOUNT</span><h2>{isOrganizer ? 'Ready to bring people together?' : 'Your next favourite memory is out there.'}</h2><p>{isOrganizer ? 'Event creation is the next thing we’re building.' : 'Browse what’s happening around you and save your spot.'}</p></div></div>
    </main>
  )
}

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <button className="brand footer-brand" type="button" onClick={() => onNavigate('/')}>ticket<span>hub</span><i>.</i></button>
      <p>Make plans. Make memories.</p>
      <span>© 2026 TicketHub</span>
    </footer>
  )
}

export default App
