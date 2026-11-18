import { useEffect, useState } from 'react'

const events = [
  {
    id: 1,
    category: 'MUSIC',
    title: 'Bengaluru Rooftop Indie Music Night',
    place: 'The Terrace, Bengaluru',
    city: 'Bengaluru',
    coordinates: { lat: 12.9755, lng: 77.6068 },
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
    title: 'Pottery, Prints & Local Art Open Studio',
    place: 'Gallery 404, Bengaluru',
    city: 'Bengaluru',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    date: 'NOV 24',
    time: '11:00 AM',
    color: 'lilac',
    image: '/images/pottery-vase.jpg',
    imageAlt: 'Colorful painting and brush displayed in an open art studio',
    tag: 'Free entry',
    description: 'Slow down with a thoughtful collection of local art, small creative workshops, and conversations with the artists behind the work.',
    ticket: 'Free',
  },
  {
    id: 3,
    category: 'FOOD & DRINK',
    title: 'Sunday Brunch & Coffee Social',
    place: 'Olive Courtyard, Bengaluru',
    city: 'Bengaluru',
    coordinates: { lat: 12.9675, lng: 77.6001 },
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
    title: 'Stand-up Comedy Night: Bengaluru',
    place: 'The Little Theatre, Bengaluru',
    city: 'Bengaluru',
    coordinates: { lat: 12.9711, lng: 77.6012 },
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
    title: 'Open-Air Music Festival at Freedom Park',
    place: 'Freedom Park, Bengaluru',
    city: 'Bengaluru',
    coordinates: { lat: 12.9797, lng: 77.5764 },
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
    title: 'Beginner Pottery Wheel Workshop',
    place: 'Mitti House, Bengaluru',
    city: 'Bengaluru',
    coordinates: { lat: 12.9587, lng: 77.6448 },
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
    title: 'Church Street Street-Food Night Market',
    place: 'Church Street, Bengaluru',
    city: 'Bengaluru',
    coordinates: { lat: 12.9756, lng: 77.6043 },
    date: 'DEC 12',
    time: '6:00 PM',
    color: 'coral',
    image: '/images/night-market-food.jpg',
    imageAlt: 'Colorful evening food stalls at a night market',
    tag: 'Free entry',
    description: 'Spend the evening wandering local food stalls, discovering small makers, and sharing a few plates with friends.',
    ticket: 'Free',
  },
  {
    id: 8,
    category: 'NIGHTLIFE',
    title: 'Courtyard DJ & Dance Night',
    place: 'The Courtyard, Bengaluru',
    city: 'Bengaluru',
    coordinates: { lat: 12.9656, lng: 77.5956 },
    date: 'DEC 13',
    time: '8:30 PM',
    color: 'lilac',
    image: '/images/dj-controller.jpg',
    imageAlt: 'DJ mixing music beneath warm courtyard lights',
    tag: 'New',
    description: 'An easy-going night out with a live DJ, outdoor lights, and room to dance or catch up with friends.',
    ticket: 'From ₹399',
  },
  {
    id: 9,
    category: 'WORKSHOPS',
    title: 'Make Your First Pot: Pottery Class',
    place: 'Mitti House, Bengaluru',
    city: 'Bengaluru',
    coordinates: { lat: 12.9587, lng: 77.6448 },
    date: 'DEC 14',
    time: '2:00 PM',
    color: 'mint',
    image: '/images/pottery-wheel.jpg',
    imageAlt: 'Hands shaping a clay vase on a pottery wheel',
    tag: 'Beginner friendly',
    description: 'Learn the basics of shaping clay with a studio guide. Make your first small piece and enjoy a relaxed creative afternoon.',
    ticket: 'From ₹499',
  },
  {
    id: 10,
    category: 'COMEDY',
    title: 'New Voices Stand-up Night in Delhi',
    place: 'The Laugh Loft, New Delhi',
    city: 'Delhi',
    coordinates: { lat: 28.6139, lng: 77.209 },
    date: 'DEC 05',
    time: '7:30 PM',
    color: 'coral',
    image: '/images/delhi-comedy.jpg',
    imageAlt: 'Comic performing under a warm spotlight on a stage',
    tag: 'New show',
    description: 'A live stand-up show featuring emerging comics, short sets, and a relaxed late-evening crowd.',
    ticket: 'From ₹299',
  },
  {
    id: 11,
    category: 'MUSIC',
    title: 'Mumbai Indie Bands by the Bay',
    place: 'Harbour Stage, Mumbai',
    city: 'Mumbai',
    coordinates: { lat: 19.076, lng: 72.8777 },
    date: 'DEC 08',
    time: '6:30 PM',
    color: 'lilac',
    image: '/images/mumbai-indie.jpg',
    imageAlt: 'Sunset over a Mumbai waterfront with a live music stage',
    tag: 'Outdoor show',
    description: 'An outdoor gig with independent Mumbai bands, food stalls, and a sunset view over the waterfront.',
    ticket: 'From ₹599',
  },
  {
    id: 12,
    category: 'NIGHTLIFE',
    title: 'Chennai Rooftop DJ & Dance Session',
    place: 'Skyroom, Chennai',
    city: 'Chennai',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    date: 'DEC 11',
    time: '8:00 PM',
    color: 'lilac',
    image: '/images/nightlife-dj.jpg',
    imageAlt: 'Rooftop DJ booth, city skyline, and decorative evening lights',
    tag: 'Limited entry',
    description: 'A rooftop evening with a local DJ, colorful lights, and a relaxed dance floor above the city.',
    ticket: 'From ₹449',
  },
  {
    id: 13,
    category: 'WORKSHOPS',
    title: 'Hyderabad Beginner Pottery Class',
    place: 'Clay House Studio, Hyderabad',
    city: 'Hyderabad',
    coordinates: { lat: 17.385, lng: 78.4867 },
    date: 'DEC 15',
    time: '11:00 AM',
    color: 'mint',
    image: '/images/pottery-class.jpg',
    imageAlt: 'A handmade clay pot shaped by a pottery class',
    tag: 'Beginner friendly',
    description: 'Learn basic wheel techniques from a studio artist, shape a small clay piece, and take home your finished work later.',
    ticket: 'From ₹499',
  },
  {
    id: 14,
    category: 'MUSIC',
    title: 'Kolkata Riverside Indie Sessions',
    place: 'Millennium Park, Kolkata',
    city: 'Kolkata',
    coordinates: { lat: 22.5726, lng: 88.3639 },
    date: 'DEC 18',
    time: '6:30 PM',
    color: 'lilac',
    image: '/images/kolkata-festival.jpg',
    imageAlt: 'A large crowd gathered for an outdoor festival performance',
    tag: 'Outdoor show',
    description: 'A sample listing for an open-air evening of independent music and local performers by the river.',
    ticket: 'From ₹399',
  },
  {
    id: 15,
    category: 'FOOD & DRINK',
    title: 'Pune After-Dark Food Lane',
    place: 'Koregaon Park, Pune',
    city: 'Pune',
    coordinates: { lat: 18.5204, lng: 73.8567 },
    date: 'DEC 19',
    time: '6:00 PM',
    color: 'coral',
    image: '/images/pune-night.jpg',
    imageAlt: 'A lively city street in Pune after dark',
    tag: 'Free entry',
    description: 'A sample listing for a casual evening discovering late-night eateries and neighborhood food spots.',
    ticket: 'Free',
  },
  {
    id: 16,
    category: 'ART & CULTURE',
    title: 'Ahmedabad Independent Film Evening',
    place: 'Riverfront Arts Pavilion, Ahmedabad',
    city: 'Ahmedabad',
    coordinates: { lat: 23.0225, lng: 72.5714 },
    date: 'DEC 20',
    time: '7:00 PM',
    color: 'mint',
    image: '/images/cinema.jpg',
    imageAlt: 'An intimate cinema hall prepared for a film screening',
    tag: 'New',
    description: 'A sample listing for a small independent film screening followed by a relaxed audience discussion.',
    ticket: 'From ₹199',
  },
  {
    id: 17,
    category: 'ART & CULTURE',
    title: 'Jaipur Old City Lights & Bazaar Walk',
    place: 'Badi Chaupar, Jaipur',
    city: 'Jaipur',
    coordinates: { lat: 26.9124, lng: 75.7873 },
    date: 'DEC 21',
    time: '5:30 PM',
    color: 'coral',
    image: '/images/jaipur-market.jpg',
    imageAlt: 'A busy Jaipur street market near the Hawa Mahal',
    tag: 'Small group',
    description: 'A sample guided walk through Jaipur’s historic market lanes, architecture, and evening street life.',
    ticket: 'From ₹249',
  },
  {
    id: 18,
    category: 'FOOD & DRINK',
    title: 'Lucknow Chaat & Awadhi Street-Food Trail',
    place: 'Hazratganj, Lucknow',
    city: 'Lucknow',
    coordinates: { lat: 26.8467, lng: 80.9462 },
    date: 'DEC 22',
    time: '5:00 PM',
    color: 'mint',
    image: '/images/indian-food.jpg',
    imageAlt: 'A street-food vendor preparing Indian chaat at a busy stall',
    tag: 'Local favourites',
    description: 'A sample listing for an evening food walk highlighting chaat, snacks, and classic Awadhi flavors.',
    ticket: 'From ₹299',
  },
  {
    id: 19,
    category: 'NIGHTLIFE',
    title: 'Kochi Fort Sunset Beats & Social',
    place: 'Fort Kochi Beach, Kochi',
    city: 'Kochi',
    coordinates: { lat: 9.9312, lng: 76.2673 },
    date: 'DEC 23',
    time: '5:30 PM',
    color: 'lilac',
    image: '/images/night-market-crowd.jpg',
    imageAlt: 'People enjoying a lively open-air evening gathering',
    tag: 'Sunset plans',
    description: 'A sample listing for a relaxed sunset gathering with music and an open-air social atmosphere.',
    ticket: 'From ₹349',
  },
]

const cityCenters = {
  Bengaluru: { lat: 12.9716, lng: 77.5946 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Delhi: { lat: 28.6139, lng: 77.209 },
  Hyderabad: { lat: 17.385, lng: 78.4867 },
  Ahmedabad: { lat: 23.0225, lng: 72.5714 },
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Kochi: { lat: 9.9312, lng: 76.2673 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
  Lucknow: { lat: 26.8467, lng: 80.9462 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Pune: { lat: 18.5204, lng: 73.8567 },
}

function distanceInKm(first, second) {
  const radians = (degrees) => degrees * (Math.PI / 180)
  const latitudeDifference = radians(second.lat - first.lat)
  const longitudeDifference = radians(second.lng - first.lng)
  const value = Math.sin(latitudeDifference / 2) ** 2
    + Math.cos(radians(first.lat)) * Math.cos(radians(second.lat)) * Math.sin(longitudeDifference / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value))
}

function getPage(pathname) {
  if (pathname === '/login') return 'login'
  if (pathname === '/signup') return 'signup'
  if (pathname === '/account') return 'account'
  if (pathname === '/organizer') return 'organizer'
  if (/^\/events\/\d+$/.test(pathname)) return 'event'
  return 'home'
}

function ProfileAvatar({ look = 'attendee', className = '' }) {
  const palettes = {
    attendee: ['#f3dfe6', '#58434f', '#e3ae96', '#ad5d79'],
    organizer: ['#e9dce8', '#473b49', '#cd937b', '#80627e'],
    one: ['#f4e2d9', '#4f3c39', '#d99472', '#bd7482'],
    two: ['#eee0eb', '#39334e', '#c9846f', '#8a6a91'],
    three: ['#e3ebe2', '#34453b', '#b87a58', '#809681'],
    four: ['#f7eadb', '#594738', '#e1a37e', '#c0926b'],
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

  useEffect(() => {
    if (!sessionReady || page !== 'organizer') return
    if (!currentUser) {
      window.history.replaceState({}, '', '/login')
      setPage('login')
    } else if (currentUser.role !== 'organizer') {
      window.history.replaceState({}, '', '/account')
      setPage('account')
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
      {page === 'organizer' && currentUser?.role === 'organizer' && (
        <OrganizerDashboard user={currentUser} onNavigate={navigate} />
      )}

      <Footer onNavigate={navigate} />
    </div>
  )
}

function Header({ currentUser, onNavigate, onSignOut }) {
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => onNavigate('/')} aria-label="Tixora home">
        <img className="brand-mark" src="/tixora-mark.svg" alt="" /><span className="brand-name">Tixora</span>
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
  const [priceFilter, setPriceFilter] = useState('ALL')
  const [selectedLocation, setSelectedLocation] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem('tixora-location') || 'null')
    } catch {
      return null
    }
  })
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState('Bengaluru')
  const [isCommunityDialogOpen, setIsCommunityDialogOpen] = useState(false)
  const [joinedCommunity, setJoinedCommunity] = useState(() => window.localStorage.getItem('tixora-community-membership') || '')
  const [communityCity, setCommunityCity] = useState(() => {
    const savedCommunity = window.localStorage.getItem('tixora-community-membership')
    return savedCommunity && cityCenters[savedCommunity]
      ? savedCommunity
      : selectedLocation?.label && cityCenters[selectedLocation.label]
        ? selectedLocation.label
        : 'Bengaluru'
  })
  const [isLocating, setIsLocating] = useState(false)
  const [locationMessage, setLocationMessage] = useState('')

  useEffect(() => {
    if (!isLocationDialogOpen) return undefined
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsLocationDialogOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isLocationDialogOpen])

  useEffect(() => {
    if (!isCommunityDialogOpen) return undefined
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsCommunityDialogOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isCommunityDialogOpen])
  const categories = [
    { value: 'ALL', label: 'All events' },
    { value: 'MUSIC', label: 'Music' },
    { value: 'COMEDY', label: 'Comedy' },
    { value: 'ART & CULTURE', label: 'Art & culture' },
    { value: 'FOOD & DRINK', label: 'Food & drink' },
    { value: 'NIGHTLIFE', label: 'Nightlife' },
    { value: 'WORKSHOPS', label: 'Workshops' },
  ]
  const normalizedSearch = searchText.trim().toLowerCase()
  const locationEvents = selectedLocation
    ? events
      .map((event) => ({ ...event, distanceKm: distanceInKm(selectedLocation, event.coordinates) }))
      .filter((event) => event.distanceKm <= 50)
      .sort((first, second) => first.distanceKm - second.distanceKm)
    : events.map((event) => ({ ...event, distanceKm: null }))
  const visibleEvents = locationEvents.filter((event) => {
    const matchesCategory = activeCategory === 'ALL' || event.category === activeCategory
    const searchableText = `${event.title} ${event.place} ${event.city} ${event.category} ${event.description}`.toLowerCase()
    const isFree = event.ticket.toLowerCase() === 'free'
    const matchesPrice = priceFilter === 'ALL' || (priceFilter === 'FREE' ? isFree : !isFree)
    return matchesCategory && matchesPrice && searchableText.includes(normalizedSearch)
  })

  function saveLocation(location) {
    window.localStorage.setItem('tixora-location', JSON.stringify(location))
    setSelectedLocation(location)
    setLocationMessage('')
    setIsLocationDialogOpen(false)
  }

  function joinCommunity() {
    window.localStorage.setItem('tixora-community-membership', communityCity)
    setJoinedCommunity(communityCity)
    saveLocation({ label: communityCity, ...cityCenters[communityCity] })
    setIsCommunityDialogOpen(false)
  }

  function leaveCommunity() {
    window.localStorage.removeItem('tixora-community-membership')
    setJoinedCommunity('')
  }

  function chooseCity() {
    const coordinates = cityCenters[selectedCity]
    saveLocation({ label: selectedCity, ...coordinates })
  }

  function clearLocation() {
    window.localStorage.removeItem('tixora-location')
    setSelectedLocation(null)
    setIsLocationDialogOpen(false)
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationMessage('Your browser does not support location sharing. Choose a city instead.')
      return
    }

    setIsLocating(true)
    setLocationMessage('')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        saveLocation({ label: 'Near me', lat: coords.latitude, lng: coords.longitude })
        setIsLocating(false)
      },
      (error) => {
        setLocationMessage(error.code === error.PERMISSION_DENIED
          ? 'Location permission was denied. You can choose a city instead.'
          : 'We could not get your location. Choose a city or try again.')
        setIsLocating(false)
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    )
  }

  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> YOUR CITY, YOUR PEOPLE</div>
          <h1>Make room for<br /><span>something</span> memorable.</h1>
          <p className="hero-description">
            Find the little moments and big nights happening around you. Your next favourite thing is closer than you think.
          </p>
          <form className="hero-search" role="search" onSubmit={(event) => { event.preventDefault(); document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }) }}>
            <span className="hero-search-icon" aria-hidden="true">⌕</span>
            <input
              aria-label="Search shows and events"
              type="search"
              placeholder="Search shows, genres, venues, or cities"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <button type="submit">Search <span aria-hidden="true">↗</span></button>
          </form>
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
            <p><strong>Good things happen together.</strong><br /><button className="community-join-link" type="button" onClick={() => { setCommunityCity(joinedCommunity || (cityCenters[selectedLocation?.label] ? selectedLocation.label : 'Bengaluru')); setIsCommunityDialogOpen(true) }}>{joinedCommunity ? `Joined ${joinedCommunity} community` : 'Join your local community'} <span aria-hidden="true">↗</span></button></p>
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
        <div className="location-panel">
          <span className="location-pin" aria-hidden="true">⌖</span>
          <div className="location-copy">
            <span className="event-category">EVENTS NEAR</span>
            <strong>{selectedLocation?.label || 'Choose your location'}</strong>
            <p>{selectedLocation ? 'Showing sample events within 50 km, nearest first.' : 'Set a city or share your location to find nearby events.'} All listings are demo examples.</p>
          </div>
          <button type="button" onClick={() => { setLocationMessage(''); setIsLocationDialogOpen(true) }}>
            {selectedLocation ? 'Change location' : 'Set location'} <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="event-controls">
          <label className="price-filter-label">
            <span>Price</span>
            <select aria-label="Filter events by ticket price" value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}>
              <option value="ALL">Any price</option>
              <option value="FREE">Free events</option>
              <option value="PAID">Paid events</option>
            </select>
          </label>
          <div className="category-filters" role="group" aria-label="Filter events by category">
            <span className="filter-label">Genre</span>
            {categories.map((category) => (
              <button
                className={`category-filter ${activeCategory === category.value ? 'active' : ''}`}
                type="button"
                aria-pressed={activeCategory === category.value}
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
              >
                {category.label}<span className="filter-count">{category.value === 'ALL' ? events.length : events.filter((item) => item.category === category.value).length}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="results-summary" aria-live="polite">
          <span><strong>{visibleEvents.length}</strong> {visibleEvents.length === 1 ? 'event' : 'events'} to explore</span>
          {(activeCategory !== 'ALL' || priceFilter !== 'ALL' || searchText) && (
            <button type="button" onClick={() => { setSearchText(''); setActiveCategory('ALL'); setPriceFilter('ALL') }}>Clear filters</button>
          )}
        </div>
        {visibleEvents.length > 0 ? (
          <div className="event-grid">
            {visibleEvents.map((event) => <EventCard event={event} key={event.id} onSelect={() => onNavigate(`/events/${event.id}`)} />)}
          </div>
        ) : (
          <div className="empty-events">
            <span aria-hidden="true">⌕</span>
            <div><strong>{selectedLocation ? `No events near ${selectedLocation.label}` : 'No events found'}</strong><p>{selectedLocation ? 'Try changing your location or search filters.' : 'Try another search or choose a different category.'}</p></div>
            <button type="button" onClick={() => { setSearchText(''); setActiveCategory('ALL'); setPriceFilter('ALL') }}>Reset search</button>
          </div>
        )}
        {isLocationDialogOpen && (
          <div className="legal-backdrop" onClick={() => setIsLocationDialogOpen(false)}>
            <section className="location-dialog" role="dialog" aria-modal="true" aria-labelledby="location-dialog-title" onClick={(event) => event.stopPropagation()}>
              <div className="legal-dialog-heading">
                <div><p className="eyebrow">PERSONALISE YOUR DISCOVERY</p><h2 id="location-dialog-title">Where should we look?</h2></div>
                <button className="legal-close" type="button" aria-label="Close location picker" onClick={() => setIsLocationDialogOpen(false)}>×</button>
              </div>
              <p className="location-dialog-intro">Choose a city, or share your device location to sort events by distance. Your choice stays in this browser.</p>
              <label className="field-label" htmlFor="city-choice">Choose a city</label>
              <select className="text-input city-select" id="city-choice" value={selectedCity} onChange={(event) => setSelectedCity(event.target.value)}>
                {Object.keys(cityCenters).map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
              <button className="button button-primary location-choose-button" type="button" onClick={chooseCity}>Show events near {selectedCity}</button>
              <div className="location-divider"><span>or</span></div>
              <button className="button location-device-button" type="button" onClick={useCurrentLocation} disabled={isLocating}>
                {isLocating ? 'Finding your location…' : 'Use my current location'}
              </button>
              {locationMessage && <p className="location-error" role="alert">{locationMessage}</p>}
              {selectedLocation && <button className="location-clear-button" type="button" onClick={clearLocation}>Clear saved location</button>}
              <p className="location-privacy-note">Location is used only to filter this sample event list and is saved in this browser. Change or clear it here anytime.</p>
            </section>
          </div>
        )}
        {isCommunityDialogOpen && (
          <div className="legal-backdrop" onClick={() => setIsCommunityDialogOpen(false)}>
            <section className="location-dialog community-dialog" role="dialog" aria-modal="true" aria-labelledby="community-dialog-title" onClick={(event) => event.stopPropagation()}>
              <div className="legal-dialog-heading">
                <div><p className="eyebrow">YOUR NEIGHBORHOOD, YOUR PEOPLE</p><h2 id="community-dialog-title">Join a local community</h2></div>
                <button className="legal-close" type="button" aria-label="Close community window" onClick={() => setIsCommunityDialogOpen(false)}>×</button>
              </div>
              <p className="location-dialog-intro">Choose your city to join its Tixora community and find local plans together.</p>
              <label className="field-label" htmlFor="community-city-choice">Choose a city</label>
              <select className="text-input city-select" id="community-city-choice" value={communityCity} onChange={(event) => setCommunityCity(event.target.value)}>
                {Object.keys(cityCenters).map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
              <p className="community-event-count">{events.filter((event) => event.city === communityCity).length} sample event listings for {communityCity}</p>
              {joinedCommunity === communityCity ? (
                <div className="community-joined-state" role="status"><span aria-hidden="true">✓</span><p><strong>You’re in the {communityCity} community.</strong><br />Your event browsing is set to this city.</p></div>
              ) : (
                <button className="button button-primary location-choose-button" type="button" onClick={joinCommunity}>Join {communityCity} community <span aria-hidden="true">↗</span></button>
              )}
              {joinedCommunity && <button className="community-leave-button" type="button" onClick={leaveCommunity}>Leave {joinedCommunity} community</button>}
              <p className="location-privacy-note">Community membership is a prototype feature saved in this browser. Member chat and live community features are not connected yet.</p>
            </section>
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
        <span className="event-time">{event.time} <i>·</i> {event.city}</span>
        {event.distanceKm !== null && <span className="event-distance">{event.distanceKm.toFixed(1)} km away</span>}
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
            <div><span className="fact-icon">⌖</span><p><strong>{event.place}</strong><small>{event.city}, India</small></p></div>
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
  const featuredEvents = [events[0], events[3], events[4], events[8]]
  const [featuredEventIndex, setFeaturedEventIndex] = useState(0)
  const featuredEvent = featuredEvents[featuredEventIndex]
  const [role, setRole] = useState(() => new URLSearchParams(window.location.search).get('role') === 'organizer' ? 'organizer' : 'attendee')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [legalDocument, setLegalDocument] = useState(null)

  useEffect(() => {
    if (!legalDocument) return undefined

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setLegalDocument(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [legalDocument])

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
        ? 'We can’t reach Tixora right now. Please try again in a moment.'
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
            <img className="auth-mark-logo" src="/tixora-mark.svg" alt="Tixora" />
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
              {!isSignup && <button className="forgot-link" type="button" onClick={() => setError('Password reset will be available soon. For now, contact your Tixora organizer.')}>Forgot password?</button>}
            </div>
            <div className="password-wrap">
              <input className="text-input" id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete={isSignup ? 'new-password' : 'current-password'} minLength="8" maxLength="72" placeholder={isSignup ? 'At least 8 characters' : 'Enter your password'} required />
              <button className="show-password" type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>

            {isSignup ? (
              <div className="consent-row">
                <input id="policy-consent" name="policyConsent" type="checkbox" value="accepted" required />
                <div>
                  <label htmlFor="policy-consent">I agree to Tixora’s</label>{' '}
                  <button type="button" onClick={() => setLegalDocument('terms')}>Terms</button>
                  {' and '}
                  <button type="button" onClick={() => setLegalDocument('privacy')}>Privacy Notice</button>.
                </div>
              </div>
            ) : null}
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-primary auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'One moment…' : isSignup ? 'Create your account' : 'Log in'}
              {!isSubmitting && <span aria-hidden="true">↗</span>}
            </button>
            {!isSignup && <p className="terms-note">Read the <button type="button" onClick={() => setLegalDocument('terms')}>Terms</button> and <button type="button" onClick={() => setLegalDocument('privacy')}>Privacy Notice</button>.</p>}
          </form>

          <p className="auth-switch">
            {isSignup ? 'Already have an account?' : 'New to Tixora?'}{' '}
            <button type="button" onClick={() => onNavigate(isSignup ? '/login' : '/signup')}>
              {isSignup ? 'Log in' : 'Create account'}
            </button>
          </p>
        </div>

        <aside className="auth-art-panel">
          <div className="auth-preview-heading">
            <p className="eyebrow">A LITTLE LOOK AROUND</p>
            <h2>Good plans<br />live nearby.</h2>
            <p>Find a new favourite event, save your spot, and make a night of it.</p>
          </div>
          <div className="auth-preview-card" aria-live="polite">
            <div className="auth-preview-image-wrap">
              <img className="auth-preview-image" src={featuredEvent.image} alt={featuredEvent.imageAlt} />
              <span className="auth-preview-date">{featuredEvent.date}</span>
            </div>
            <div className="auth-preview-details">
              <span className="event-category">{featuredEvent.category}</span>
              <strong>{featuredEvent.title}</strong>
              <span>{featuredEvent.place}</span>
              <div className="auth-preview-bottom"><small>{featuredEvent.ticket}</small><button type="button" onClick={() => setFeaturedEventIndex((featuredEventIndex + 1) % featuredEvents.length)}>Next event <span aria-hidden="true">→</span></button></div>
            </div>
          </div>
          <div className="auth-preview-footer">
            <div className="auth-preview-dots" aria-label="Choose a featured event">
              {featuredEvents.map((event, index) => (
                <button
                  key={event.id}
                  className={featuredEventIndex === index ? 'active' : ''}
                  type="button"
                  aria-label={`Show featured event ${index + 1}: ${event.title}`}
                  aria-pressed={featuredEventIndex === index}
                  onClick={() => setFeaturedEventIndex(index)}
                />
              ))}
            </div>
            <button className="auth-browse-link" type="button" onClick={() => onNavigate('/')}>Explore all events <span aria-hidden="true">↗</span></button>
          </div>
        </aside>
      </section>
      {legalDocument && <LegalDialog documentType={legalDocument} onClose={() => setLegalDocument(null)} />}
    </main>
  )
}

function LegalDialog({ documentType, onClose }) {
  const isTerms = documentType === 'terms'

  return (
    <div className="legal-backdrop" onClick={onClose}>
      <section
        className="legal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="legal-dialog-heading">
          <div>
            <p className="eyebrow">TIXORA · {isTerms ? 'TERMS' : 'PRIVACY'}</p>
            <h2 id="legal-dialog-title">{isTerms ? 'Terms of use' : 'Privacy notice'}</h2>
          </div>
          <button className="legal-close" type="button" aria-label="Close" onClick={onClose} autoFocus>×</button>
        </div>
        <div className="legal-dialog-content">
          {isTerms ? (
            <>
              <p>Tixora is a student project prototype for discovering events and managing ticketing workflows.</p>
              <h3>Event information</h3>
              <p>Some listings and event details may be sample content. Online reservations and payments are not currently available, so viewing an event does not confirm a ticket or booking.</p>
              <h3>Your account</h3>
              <p>Provide accurate account details, keep your password private, and use the site lawfully. Do not attempt to access another person’s account or interfere with the service.</p>
              <h3>Prototype availability</h3>
              <p>Features may change while the project is being developed. Do not rely on sample listing details as confirmation of a real event.</p>
            </>
          ) : (
            <>
              <p>This notice explains what information the current Tixora prototype uses.</p>
              <h3>Information used</h3>
              <p>When you register, Tixora stores your name, email address, account role, and a hashed password. The app does not store your password in readable form.</p>
              <h3>How it is used</h3>
              <p>Account details are used to sign you in and provide attendee or organiser features. Your sign-in token is kept in this browser session. If you choose a city or share your device location, that choice is stored in this browser and used only to filter nearby sample events.</p>
              <h3>Storage and payments</h3>
              <p>Account data is stored in the project’s PostgreSQL database hosted through Supabase. The current prototype does not collect payment details.</p>
            </>
          )}
        </div>
        <p className="legal-dialog-note">This is starter policy text for the project prototype. It should be reviewed if Tixora’s features or data practices change.</p>
      </section>
    </div>
  )
}

function OrganizerDashboard({ user, onNavigate }) {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyOrganizerEventForm)

  async function requestOrganizerApi(path, options = {}) {
    let token = ''
    try {
      token = JSON.parse(window.sessionStorage.getItem('tickethub-session') || '{}').token || ''
    } catch {
      token = ''
    }

    const response = await fetch(`/api/organizer/events${path}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.error || 'We couldn’t complete that request. Please try again.')
    return result
  }

  async function loadEvents() {
    setIsLoading(true)
    setError('')
    try {
      const result = await requestOrganizerApi('')
      setEvents(result.events || [])
    } catch (loadError) {
      setError(loadError instanceof TypeError
        ? 'We can’t reach Tixora right now. Check that the API and database are running, then retry.'
        : loadError.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { loadEvents() }, [])

  function startNewEvent() {
    setForm(emptyOrganizerEventForm())
    setEditingId(null)
    setError('')
    setNotice('')
    setIsFormOpen(true)
    window.requestAnimationFrame(() => document.getElementById('organizer-event-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  function startEditing(event) {
    const localDate = new Date(event.startsAt)
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset())
    setForm({
      title: event.title,
      description: event.description,
      venue: event.venue,
      city: event.city,
      startsAt: localDate.toISOString().slice(0, 16),
      imageUrl: event.imageUrl || '',
      ticketCapacity: String(event.ticketCapacity),
      ticketPrice: String(event.ticketPrice),
      status: event.status === 'published' ? 'published' : 'draft',
    })
    setEditingId(event.id)
    setError('')
    setNotice('')
    setIsFormOpen(true)
    window.requestAnimationFrame(() => document.getElementById('organizer-event-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  async function saveEvent(submitEvent) {
    submitEvent.preventDefault()
    setIsSaving(true)
    setError('')
    setNotice('')
    const payload = {
      ...form,
      startsAt: new Date(form.startsAt).toISOString(),
      ticketCapacity: Number(form.ticketCapacity),
      ticketPrice: Number(form.ticketPrice || 0),
      imageUrl: form.imageUrl.trim() || null,
    }

    try {
      await requestOrganizerApi(editingId ? `/${editingId}` : '', {
        method: editingId ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      })
      await loadEvents()
      setIsFormOpen(false)
      setEditingId(null)
      setNotice(editingId ? 'Your event details have been updated.' : 'Your event has been created.')
      setForm(emptyOrganizerEventForm())
    } catch (saveError) {
      setError(saveError instanceof TypeError
        ? 'We can’t reach Tixora right now. Check that the API and database are running, then try again.'
        : saveError.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function cancelEvent(event) {
    if (!window.confirm(`Cancel “${event.title}”? This will mark the event as cancelled.`)) return
    setError('')
    setNotice('')
    try {
      await requestOrganizerApi(`/${event.id}`, { method: 'DELETE' })
      await loadEvents()
      setNotice('The event is now marked as cancelled.')
    } catch (cancelError) {
      setError(cancelError instanceof TypeError
        ? 'We can’t reach Tixora right now. Please try again.'
        : cancelError.message)
    }
  }

  const publishedCount = events.filter((event) => event.status === 'published').length
  const totalTicketsSold = events.reduce((total, event) => total + event.ticketsSold, 0)

  return (
    <main className="organizer-page">
      <div className="organizer-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> ORGANIZER SPACE</p>
          <h1>Let’s bring people together, {user.name.split(' ')[0]}.</h1>
          <p>Manage your events and keep an eye on ticket availability.</p>
        </div>
        <button className="button button-primary" type="button" onClick={startNewEvent}>Create an event <span aria-hidden="true">↗</span></button>
      </div>

      <section className="organizer-stats" aria-label="Event summary">
        <article><span>YOUR EVENTS</span><strong>{events.length}</strong><small>Including drafts and cancelled</small></article>
        <article><span>PUBLISHED</span><strong>{publishedCount}</strong><small>Listings marked as published</small></article>
        <article><span>TICKETS RESERVED</span><strong>{totalTicketsSold}</strong><small>Across your events</small></article>
      </section>

      {notice && <p className="organizer-notice" role="status">{notice}</p>}
      {error && <div className="organizer-error" role="alert"><p>{error}</p><button type="button" onClick={() => { setError(''); loadEvents() }}>Try again</button></div>}

      {isFormOpen && (
        <section className="organizer-form-panel" id="organizer-event-form">
          <div className="organizer-section-heading">
            <div><p className="eyebrow">EVENT DETAILS</p><h2>{editingId ? 'Update your event' : 'Create a new event'}</h2></div>
            <button className="organizer-close-form" type="button" onClick={() => { setIsFormOpen(false); setError('') }}>Close</button>
          </div>
          <form className="organizer-event-form" onSubmit={saveEvent}>
            <label>Event title<input required minLength="3" maxLength="150" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Indie music night by the lake" /></label>
            <label>About the event<textarea required maxLength="5000" rows="4" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="What can guests look forward to?" /></label>
            <div className="organizer-form-row">
              <label>Venue<input required maxLength="200" value={form.venue} onChange={(event) => setForm({ ...form, venue: event.target.value })} placeholder="Venue name" /></label>
              <label>City<input required maxLength="100" value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} placeholder="City" /></label>
            </div>
            <div className="organizer-form-row">
              <label>Date and time<input required type="datetime-local" value={form.startsAt} onChange={(event) => setForm({ ...form, startsAt: event.target.value })} /></label>
              <label>Ticket capacity<input required type="number" min="1" max="1000000" step="1" value={form.ticketCapacity} onChange={(event) => setForm({ ...form, ticketCapacity: event.target.value })} /></label>
            </div>
            <div className="organizer-form-row">
              <label>Ticket price (₹)<input required type="number" min="0" step="0.01" value={form.ticketPrice} onChange={(event) => setForm({ ...form, ticketPrice: event.target.value })} /></label>
              <label>Listing status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option value="draft">Save as draft</option><option value="published">Publish event</option></select></label>
            </div>
            <label>Cover image URL <span className="organizer-optional">(optional)</span><input type="url" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} placeholder="https://example.com/your-event-photo.jpg" /></label>
            <div className="organizer-form-actions">
              <button className="button button-primary" type="submit" disabled={isSaving}>{isSaving ? 'Saving…' : editingId ? 'Save changes' : 'Create event'}</button>
              <button className="button button-quiet" type="button" onClick={() => { setIsFormOpen(false); setError('') }}>Cancel</button>
            </div>
          </form>
          <p className="organizer-form-note">This prototype stores event details and ticket limits. Online payment and public publishing are not connected yet.</p>
        </section>
      )}

      <section className="organizer-events-section">
        <div className="organizer-section-heading"><div><p className="eyebrow">YOUR EVENTS</p><h2>Event management</h2></div><button className="organizer-refresh" type="button" onClick={loadEvents} disabled={isLoading}>Refresh list</button></div>
        {isLoading ? <div className="organizer-empty"><strong>Loading your events…</strong></div> : events.length === 0 ? (
          <div className="organizer-empty"><strong>No events here yet.</strong><p>Create your first event to start tracking its details and ticket capacity.</p><button className="button button-primary" type="button" onClick={startNewEvent}>Create your first event</button></div>
        ) : (
          <div className="organizer-event-list">
            {events.map((event) => (
              <article className="organizer-event-row" key={event.id}>
                {event.imageUrl ? <img src={event.imageUrl} alt="" /> : <div className="organizer-event-placeholder" aria-hidden="true">✦</div>}
                <div className="organizer-event-main"><span className={`organizer-status organizer-status-${event.status}`}>{event.status}</span><h3>{event.title}</h3><p>{event.venue} · {event.city}</p><small>{new Date(event.startsAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</small></div>
                <div className="organizer-ticket-count"><strong>{event.ticketsSold}<span> / {event.ticketCapacity}</span></strong><small>tickets reserved</small><small>{event.ticketsAvailable} available · ₹{event.ticketPrice.toFixed(2)}</small></div>
                <div className="organizer-row-actions">
                  {event.status !== 'cancelled' && <button type="button" onClick={() => startEditing(event)}>Edit</button>}
                  {event.status !== 'cancelled' && <button className="organizer-cancel-action" type="button" onClick={() => cancelEvent(event)}>Cancel event</button>}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

function emptyOrganizerEventForm() {
  const suggestedDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  suggestedDate.setMinutes(suggestedDate.getMinutes() - suggestedDate.getTimezoneOffset())
  return {
    title: '', description: '', venue: '', city: '',
    startsAt: suggestedDate.toISOString().slice(0, 16),
    imageUrl: '', ticketCapacity: '50', ticketPrice: '0', status: 'draft',
  }
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
          {isOrganizer && <button className="button button-dark" type="button" onClick={() => onNavigate('/organizer')}>Open organizer dashboard <span>↗</span></button>}
        </div>
      </div>
      <div className="account-panel"><div className="account-panel-icon">{isOrganizer ? '↗' : '✦'}</div><div><span className="event-category">YOUR ACCOUNT</span><h2>{isOrganizer ? 'Ready to bring people together?' : 'Your next favourite memory is out there.'}</h2><p>{isOrganizer ? 'Create and manage listings, edit event details, and track reserved ticket counts.' : 'Browse what’s happening around you and save your spot.'}</p></div></div>
    </main>
  )
}

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <button className="brand footer-brand" type="button" onClick={() => onNavigate('/')} aria-label="Tixora home"><img className="brand-mark" src="/tixora-mark.svg" alt="" /><span className="brand-name">Tixora</span></button>
      <p>Your next adventure, booked.</p>
      <span>© 2026 Tixora</span>
    </footer>
  )
}

export default App
