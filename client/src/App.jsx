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
    image: '/images/concert-crowd.jpg',
    imageAlt: 'Crowd enjoying bright lights at a live music event',
    tag: 'Almost full',
    description: 'An open-air night of live music, warm lights, and easy company above the city. Come for one set and stay for the whole evening.',
    ticket: 'From ₹299',
  },
  {
    id: 2,
    category: 'ART & CULTURE',
    title: 'The Art of Slow Living',
    place: 'Gallery 404, Bengaluru',
    date: 'NOV 24',
    time: '11:00 AM',
    color: 'lilac',
    image: '/images/pottery-workshop.jpg',
    imageAlt: 'Artist shaping clay on a pottery wheel',
    tag: 'Free entry',
    description: 'Slow down with a thoughtful collection of local art, small creative workshops, and conversations with the artists behind the work.',
    ticket: 'Free',
  },
  {
    id: 3,
    category: 'FOOD & DRINK',
    title: 'Sunday Table: A Brunch Club',
    place: 'Olive Courtyard, Bengaluru',
    date: 'NOV 29',
    time: '10:30 AM',
    color: 'mint',
    image: '/images/food-festival.jpg',
    imageAlt: 'Visitors enjoying an outdoor food market',
    tag: 'New',
    description: 'A long-table Sunday brunch with seasonal plates, good coffee, and new people to meet. Bring a friend or come make one.',
    ticket: 'From ₹499',
  },
  {
    id: 4,
    category: 'COMEDY',
    title: 'Laughing Room Live',
    place: 'The Little Theatre, Bengaluru',
    date: 'DEC 03',
    time: '8:00 PM',
    color: 'coral',
    image: '/images/standup-comedy.jpg',
    imageAlt: 'Stand-up performer on stage in front of a red curtain',
    tag: 'New show',
    description: 'A close-up comedy night with sharp local comics, a small room, and plenty of laughs. Arrive early, grab a seat, and settle in.',
    ticket: 'From ₹249',
  },
  {
    id: 5,
    category: 'MUSIC',
    title: 'City Lights Festival',
    place: 'Freedom Park, Bengaluru',
    date: 'DEC 06',
    time: '5:30 PM',
    color: 'lilac',
    image: '/images/night-festival.jpg',
    imageAlt: 'Colorful outdoor festival with a crowd and city lights',
    tag: 'Just added',
    description: 'An open-air evening of music, lights, and a lively crowd. Bring your friends for a relaxed start that turns into a night out.',
    ticket: 'From ₹699',
  },
  {
    id: 6,
    category: 'ART & CULTURE',
    title: 'Clay & Coffee Studio',
    place: 'Mitti House, Bengaluru',
    date: 'DEC 07',
    time: '10:00 AM',
    color: 'mint',
    image: '/images/pottery-workshop.jpg',
    imageAlt: 'Hands shaping a clay pot at a pottery studio',
    tag: 'Small group',
    description: 'Try the pottery wheel with a friendly studio guide, then enjoy coffee while your pieces dry. No previous experience needed.',
    ticket: 'From ₹399',
  },
  {
    id: 7,
    category: 'FOOD & DRINK',
    title: 'Namma Night Market',
    place: 'Church Street, Bengaluru',
    date: 'DEC 12',
    time: '6:00 PM',
    color: 'coral',
    image: '/images/food-festival.jpg',
    imageAlt: 'People browsing food stands at an outdoor market',
    tag: 'Free entry',
    description: 'Spend the evening wandering local food stalls, discovering small makers, and sharing a few plates with friends.',
    ticket: 'Free',
  },
]

function getPage(pathname) {
  if (pathname === '/login') return 'login'
  if (pathname === '/signup') return 'signup'
  if (pathname === '/account') return 'account'
  if (/^\/events\/\d+$/.test(pathname)) return 'event'
  return 'home'
}

function ProfileAvatar({ look = 'attendee', className = '' }) {
  const palettes = {
    attendee: ['#ead8f4', '#58406d', '#f1b995', '#7750a4'],
    organizer: ['#d8ece8', '#315a57', '#c88668', '#416e69'],
    one: ['#f5dfd2', '#4f3c39', '#d99472', '#bd6f55'],
    two: ['#e4e2f7', '#39334e', '#c9846f', '#6962a1'],
    three: ['#dce9dc', '#34453b', '#b87a58', '#728765'],
    four: ['#f7e6c9', '#594738', '#e1a37e', '#d09b4f'],
  }
  const [background, hair, skin, shirt] = palettes[look] || palettes.attendee

  return (
    <svg className={className} viewBox="0 0 40 40" role="img" aria-label={look === 'organizer' ? 'Organizer profile' : 'Profile portrait'}>
      <circle cx="20" cy="20" r="20" fill={background} />
      <path d="M6 40c1-8 6-12 14-12s13 4 14 12" fill={shirt} />
      <path d="M11 17c0-8 4-12 10-12 7 0 10 5 9 13l-2 7H13z" fill={hair} />
      <ellipse cx="20" cy="19" rx="7.2" ry="9" fill={skin} />
      <path d="M12.8 17c.6-7 3.5-10 8.5-10 4.2 0 7 2.6 7.4 7.2-2.3-.4-4.3-1.8-5.7-4-1.9 3.2-5.7 5.3-10.2 6.8" fill={hair} />
      <path d="M17 21.2c1.8 1.4 4.2 1.4 6 0" fill="none" stroke="#8c514b" strokeWidth=".9" strokeLinecap="round" />
      <circle cx="17.2" cy="18.7" r=".65" fill="#382d36" />
      <circle cx="22.8" cy="18.7" r=".65" fill="#382d36" />
      <circle cx="32.5" cy="8" r="3" fill="#fff" opacity=".85" />
      <path d="M32.5 6.4v3.2M30.9 8h3.2" stroke="#9e77c4" strokeWidth=".8" strokeLinecap="round" />
    </svg>
  )
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
      {page === 'event' && (
        <EventDetailsPage
          event={events.find((item) => `/events/${item.id}` === window.location.pathname)}
          currentUser={currentUser}
          onNavigate={navigate}
        />
      )}
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
      <button className="brand" type="button" onClick={() => onNavigate('/')} aria-label="TIxora home">
        <img className="brand-mark" src="/tixora-mark.png" alt="" /><span className="brand-name">TIxora</span>
      </button>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="/#events" onClick={(event) => { event.preventDefault(); onNavigate('/#events') }}>Discover</a>
        <a href="/#how-it-works" onClick={(event) => { event.preventDefault(); onNavigate('/#how-it-works') }}>How it works</a>
      </nav>
      <div className="header-actions">
        {currentUser ? (
          <>
            <button className="profile-button" type="button" onClick={() => onNavigate('/account')}>
              <ProfileAvatar look={currentUser.role === 'organizer' ? 'organizer' : 'attendee'} className="profile-avatar" />
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
  const [searchText, setSearchText] = useState('')
  const [activeCategory, setActiveCategory] = useState('ALL')
  const categories = [
    { value: 'ALL', label: 'All events' },
    { value: 'MUSIC', label: 'Music' },
    { value: 'COMEDY', label: 'Comedy' },
    { value: 'ART & CULTURE', label: 'Art & culture' },
    { value: 'FOOD & DRINK', label: 'Food & drink' },
  ]
  const normalizedSearch = searchText.trim().toLowerCase()
  const visibleEvents = events.filter((event) => {
    const matchesCategory = activeCategory === 'ALL' || event.category === activeCategory
    const searchableText = `${event.title} ${event.place} ${event.category}`.toLowerCase()
    return matchesCategory && searchableText.includes(normalizedSearch)
  })

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
            <div className="avatar-stack" aria-label="A welcoming local community">
              <ProfileAvatar look="one" className="community-avatar" />
              <ProfileAvatar look="two" className="community-avatar" />
              <ProfileAvatar look="three" className="community-avatar" />
              <ProfileAvatar look="four" className="community-avatar" />
            </div>
            <p><strong>Good things happen together.</strong><br />Join your local community.</p>
          </div>
        </div>
        <div className="hero-art">
          <img className="hero-photo" src="/images/concert-crowd.jpg" alt="A crowd enjoying a colorful live music performance" fetchPriority="high" />
          <div className="hero-photo-overlay" aria-hidden="true" />
          <div className="art-note note-one">✳</div>
          <div className="art-note note-two">♫</div>
          <div className="art-label"><span>THIS WEEKEND</span><strong>Find your<br />kind of fun.</strong><a href="#events">See what's on <span>↗</span></a></div>
          <div className="art-caption"><span className="caption-dot" /> GOOD PLANS, GREAT PEOPLE</div>
        </div>
      </section>

      <section className="event-section" id="events">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> AROUND YOU</p>
            <h2>Plans worth making.</h2>
          </div>
          <a className="browse-link" href="#events">See all events <span>↗</span></a>
        </div>
        <div className="event-controls">
          <label className="event-search">
            <span aria-hidden="true">⌕</span>
            <input
              aria-label="Search events"
              type="search"
              placeholder="Search events or places"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </label>
          <div className="category-filters" role="group" aria-label="Filter events by category">
            {categories.map((category) => (
              <button
                className={`category-filter ${activeCategory === category.value ? 'active' : ''}`}
                type="button"
                aria-pressed={activeCategory === category.value}
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        {visibleEvents.length > 0 ? (
          <div className="event-grid">
            {visibleEvents.map((event) => <EventCard event={event} key={event.id} onSelect={() => onNavigate(`/events/${event.id}`)} />)}
          </div>
        ) : (
          <div className="empty-events">
            <span aria-hidden="true">⌕</span>
            <div><strong>No events found</strong><p>Try another search or choose a different category.</p></div>
            <button type="button" onClick={() => { setSearchText(''); setActiveCategory('ALL') }}>Clear filters</button>
          </div>
        )}
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
      <span className={`event-art event-art-${event.color}`}>
        <img className="event-photo" src={event.image} alt={event.imageAlt} loading="lazy" />
        <span className="event-image-shade" aria-hidden="true" />
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

function EventDetailsPage({ event, currentUser, onNavigate }) {
  if (!event) {
    return (
      <main className="event-not-found">
        <p className="eyebrow"><span className="eyebrow-line" /> EVENT NOT FOUND</p>
        <h1>That event isn’t here.</h1>
        <button className="button button-primary" type="button" onClick={() => onNavigate('/')}>Back to discover <span>↗</span></button>
      </main>
    )
  }

  return (
    <main className="event-detail-page">
      <button className="back-link event-back" type="button" onClick={() => onNavigate('/#events')}><span>←</span> All events</button>
      <section className="event-detail-layout">
        <div className={`event-detail-art event-art-${event.color}`}>
          <img src={event.image} alt={event.imageAlt} />
          <span className="event-detail-shade" aria-hidden="true" />
          <span className="event-date">{event.date}</span>
        </div>
        <div className="event-detail-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> {event.category}</p>
          <h1>{event.title}</h1>
          <p className="event-detail-description">{event.description}</p>
          <div className="event-facts">
            <div><span className="fact-icon">◷</span><p><strong>{event.date} · {event.time}</strong><small>Doors open 30 minutes before</small></p></div>
            <div><span className="fact-icon">⌖</span><p><strong>{event.place}</strong><small>Bengaluru, Karnataka</small></p></div>
          </div>
          <div className="event-booking-card">
            <div><span className="event-category">TICKETS</span><strong>{event.ticket}</strong></div>
            {currentUser
              ? <button className="button button-primary" type="button" disabled>Booking opens soon</button>
              : <button className="button button-primary" type="button" onClick={() => onNavigate('/login')}>Log in to reserve <span>↗</span></button>}
          </div>
          {currentUser && <p className="booking-note">You’re signed in. Online reservations are coming soon.</p>}
        </div>
      </section>
    </main>
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
        ? 'We can’t reach TIxora right now. Please try again in a moment.'
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
            <img className="auth-mark-logo" src="/tixora-mark.png" alt="TIxora" />
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
              {!isSignup && <button className="forgot-link" type="button" onClick={() => setError('Password reset will be available soon. For now, contact your TIxora organizer.')}>Forgot password?</button>}
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
            {isSignup ? 'Already have an account?' : 'New to TIxora?'}{' '}
            <button type="button" onClick={() => onNavigate(isSignup ? '/login' : '/signup')}>
              {isSignup ? 'Log in' : 'Create account'}
            </button>
          </p>
        </div>

        <aside className="auth-art-panel">
          <div className="auth-orbit orbit-one" /><div className="auth-orbit orbit-two" />
          <span className="auth-sparkle sparkle-one">✳</span><span className="auth-sparkle sparkle-two">✦</span>
          <div className="auth-art-copy"><p className="eyebrow">YOUR NEXT STORY STARTS HERE</p><h2>Say yes to<br />going out.</h2><p>From tiny pop-ups to big nights. Find the people and plans that make your city feel like yours.</p></div>
          <div className="auth-ticket"><div className="ticket-stamp">TX<span>✳</span></div><div><small>YOUR NEXT PLAN</small><strong>Make it a good one.</strong></div><span className="ticket-arrow">↗</span></div>
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
        <p className="eyebrow"><span className="eyebrow-line" /> YOUR TIXORA</p>
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
      <button className="brand footer-brand" type="button" onClick={() => onNavigate('/')} aria-label="TIxora home"><img className="brand-mark" src="/tixora-mark.png" alt="" /><span className="brand-name">TIxora</span></button>
      <p>Your next adventure, booked.</p>
      <span>© 2026 TIxora</span>
    </footer>
  )
}

export default App
