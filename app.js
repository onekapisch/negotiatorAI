// NegotiatorAI Application
class NegotiatorApp {
  constructor() {
    this.currentUser = null;
    this.currentRoute = '/';
    this.currentNegotiation = null;
    this.scenarios = [
      {
        id: "watchmaker",
        title: "Watchmaker's Workshop",
        avatarUrl: "🕰️",
        difficulty: "easy",
        hints: ["Ask about bulk discount", "Mention competitor price"],
        variations: [
          { id: "w1", initialPrice: 300, minPrice: 200, personality: "friendly" },
          { id: "w2", initialPrice: 500, minPrice: 350, personality: "stubborn" },
          { id: "w3", initialPrice: 280, minPrice: 210, personality: "bulk-seller" }
        ]
      },
      {
        id: "office-supplies",
        title: "Office Supplies Supplier",
        avatarUrl: "📋",
        difficulty: "easy",
        hints: ["Negotiate on volume", "Offer long-term contract"],
        variations: [
          { id: "o1", initialPrice: 1000, minPrice: 750, personality: "helpful" },
          { id: "o2", initialPrice: 1300, minPrice: 950, personality: "quality-focused" },
          { id: "o3", initialPrice: 900, minPrice: 700, personality: "urgent" }
        ]
      },
      {
        id: "tech-gadget",
        title: "Tech Gadget Vendor",
        avatarUrl: "💻",
        difficulty: "intermediate",
        hints: ["Bundle accessories", "Ask for extended warranty"],
        variations: [
          { id: "t1", initialPrice: 1200, minPrice: 950, personality: "competitive" },
          { id: "t2", initialPrice: 1400, minPrice: 1050, personality: "warranty-guard" },
          { id: "t3", initialPrice: 1250, minPrice: 1000, personality: "customizer" }
        ]
      },
      {
        id: "service-freelancer",
        title: "Service Contract Freelancer",
        avatarUrl: "👨‍💼",
        difficulty: "easy",
        hints: ["Propose milestone payments"],
        variations: [
          { id: "s1", initialRate: 80, minRate: 60, personality: "collaborative" },
          { id: "s2", initialRate: 100, minRate: 70, personality: "scope-stickler" },
          { id: "s3", initialRate: 90, minRate: 65, personality: "flexible" }
        ]
      },
      {
        id: "car-dealer",
        title: "Car Dealership",
        avatarUrl: "🚗",
        difficulty: "intermediate",
        hints: ["Talk about trade-in", "Ask for financing incentives"],
        variations: [
          { id: "c1", initialPrice: 25000, minPrice: 21000, personality: "sales-pro" },
          { id: "c2", initialPrice: 30000, minPrice: 25500, personality: "add-on pusher" },
          { id: "c3", initialPrice: 27000, minPrice: 23000, personality: "financing guru" }
        ]
      },
      {
        id: "real-estate",
        title: "Real Estate Agent",
        avatarUrl: "🏢",
        difficulty: "intermediate",
        hints: ["Discuss lease length", "Negotiate on amenities"],
        variations: [
          { id: "r1", initialRent: 4000, minRent: 3300, personality: "location-booster" },
          { id: "r2", initialRent: 4500, minRent: 3700, personality: "amenity-seller" },
          { id: "r3", initialRent: 4200, minRent: 3400, personality: "long-lease lover" }
        ]
      },
      {
        id: "logistics",
        title: "Logistics Freight Shipping",
        avatarUrl: "🚚",
        difficulty: "intermediate",
        hints: ["Negotiate on volume discounts", "Discuss fuel surcharges and timelines"],
        variations: [
          { id: "l1", initialPrice: 5000, minPrice: 4000, personality: "efficient" },
          { id: "l2", initialPrice: 6000, minPrice: 4500, personality: "reliable" },
          { id: "l3", initialPrice: 5500, minPrice: 4200, personality: "flexible" }
        ]
      },
      {
        id: "electronics",
        title: "Electronics Component Supplier",
        avatarUrl: "🔌",
        difficulty: "intermediate",
        hints: ["Ask for bulk pricing", "Negotiate on delivery terms"],
        variations: [
          { id: "e1", initialPrice: 2000, minPrice: 1500, personality: "innovative" },
          { id: "e2", initialPrice: 2500, minPrice: 1800, personality: "quality-focused" },
          { id: "e3", initialPrice: 2200, minPrice: 1600, personality: "competitive" }
        ]
      },
      {
        id: "energy",
        title: "Energy Supply Contract",
        avatarUrl: "⚡",
        difficulty: "intermediate",
        hints: ["Discuss long-term rates", "Negotiate on renewable options"],
        variations: [
          { id: "en1", initialPrice: 10000, minPrice: 8000, personality: "sustainable" },
          { id: "en2", initialPrice: 12000, minPrice: 9000, personality: "reliable" },
          { id: "en3", initialPrice: 11000, minPrice: 8500, personality: "cost-effective" }
        ]
      },
      {
        id: "chemicals",
        title: "Industrial Chemicals Provider",
        avatarUrl: "🧪",
        difficulty: "intermediate",
        hints: ["Inquire about safety standards", "Negotiate on quantity breaks"],
        variations: [
          { id: "ch1", initialPrice: 8000, minPrice: 6000, personality: "safety-first" },
          { id: "ch2", initialPrice: 9000, minPrice: 7000, personality: "volume-seller" },
          { id: "ch3", initialPrice: 8500, minPrice: 6500, personality: "custom-blend" }
        ]
      }
    ];

    this.badges = [
      { id: 'first-deal', name: 'First Deal', description: 'Complete your first negotiation', icon: '🎯' },
      { id: 'deal-closer', name: 'Deal Closer', description: 'Close 5 deals', icon: '🤝' },
      { id: 'haggle-master', name: 'Haggle Master', description: 'Get 20%+ discount', icon: '💎' },
      { id: 'persistent', name: 'Persistent Negotiator', description: 'Complete 20+ message negotiation', icon: '🔥' },
      { id: 'level-up', name: 'Level Up', description: 'Reach Level 2', icon: '⭐' }
    ];

    this.init();
  }

  init() {
    this.loadUserData();
    this.setupEventListeners();
    this.loadTheme();
    this.navigateToRoute(window.location.hash.slice(1) || '/');
  }

  loadUserData() {
    const userData = localStorage.getItem('negotiatorUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  saveUserData() {
    if (this.currentUser) {
      localStorage.setItem('negotiatorUser', JSON.stringify(this.currentUser));
    }
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-color-scheme', savedTheme);
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-color-scheme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  setupEventListeners() {
    window.addEventListener('hashchange', () => {
      this.navigateToRoute(window.location.hash.slice(1));
    });

    document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

    // Setup home button click handler
    document.getElementById('btn-home').addEventListener('click', () => {
      if (this.currentUser) {
        this.navigateToRoute('/dashboard');
      } else {
        this.navigateToRoute('/');
      }
    });

    // Setup logo click handler for navigation
    document.querySelector('nav h1').addEventListener('click', () => {
      if (this.currentUser) {
        this.navigateToRoute('/dashboard');
      } else {
        this.navigateToRoute('/');
      }
    });
  }

  updateNavLinks() {
    const navLinks = document.getElementById('nav-links');
    if (!navLinks) return;

    if (this.currentUser) {
      navLinks.innerHTML = `
        <a href="#/dashboard">Dashboard</a>
        <a href="#/scenarios">Scenarios</a>
        <a href="#/education">Negotiation 101</a>
        <button class="btn btn--secondary" onclick="app.logout()">Logout</button>
      `;
    } else {
      navLinks.innerHTML = `
        <a href="#/login">Login</a>
        <a href="#/signup">Sign Up</a>
        <a href="#/education">Negotiation 101</a>
      `;
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('negotiatorUser');
    this.navigateToRoute('/');
  }

  navigateToRoute(route) {
    this.currentRoute = route;
    const app = document.getElementById('app');
    const homeBtn = document.getElementById('btn-home');

    // Update URL hash
    if (window.location.hash.slice(1) !== route) {
      window.location.hash = route;
    }

    // Show/hide home button based on route
    if (route === '/' || route === '/login' || route === '/signup') {
      homeBtn.classList.add('hidden');
    } else {
      homeBtn.classList.remove('hidden');
    }

    this.updateNavLinks();

    switch (route) {
      case '/':
        this.renderLandingPage();
        break;
      case '/login':
        this.renderLoginPage();
        break;
      case '/signup':
        this.renderSignupPage();
        break;
      case '/dashboard':
        if (!this.currentUser) {
          this.navigateToRoute('/login');
          return;
        }
        this.renderDashboard();
        break;
      case '/scenarios':
        if (!this.currentUser) {
          this.navigateToRoute('/login');
          return;
        }
        this.renderScenarios();
        break;
      case '/guest':
        this.renderGuestScenarios();
        break;
      case '/education':
        this.renderEducationPage();
        break;
      default:
        if (route.startsWith('/chat/')) {
          const scenarioId = route.split('/')[2];
          this.renderChat(scenarioId);
        } else {
          this.renderLandingPage();
        }
    }
  }

  renderLandingPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="container">
        <div class="text-center py-16">
          <h1 class="mb-8">Welcome to NegotiatorAI</h1>
          <p class="text-xl mb-16 color-text-secondary">Master the art of negotiation through AI-powered training</p>
          
          <div class="flex gap-16 justify-center flex-wrap">
            <button onclick="app.navigateToRoute('/guest')" class="btn btn--primary btn--lg">
              Try as Guest
            </button>
            <button onclick="app.navigateToRoute('/login')" class="btn btn--secondary btn--lg">
              Login
            </button>
            <button onclick="app.navigateToRoute('/signup')" class="btn btn--outline btn--lg">
              Sign Up
            </button>
          </div>
        </div>

        <div class="dashboard-grid mt-32">
          <div class="card">
            <div class="card__body text-center">
              <h3 class="mb-8">🎯 Interactive Training</h3>
              <p>Practice negotiations with AI-driven characters in realistic scenarios</p>
            </div>
          </div>
          <div class="card">
            <div class="card__body text-center">
              <h3 class="mb-8">📊 Track Progress</h3>
              <p>Monitor your improvement with detailed analytics and performance metrics</p>
            </div>
          </div>
          <div class="card">
            <div class="card__body text-center">
              <h3 class="mb-8">🏆 Earn Badges</h3>
              <p>Unlock achievements and level up your negotiation skills</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderLoginPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="form-container">
        <div class="card">
          <div class="card__body">
            <h2 class="text-center mb-24">Login to NegotiatorAI</h2>
            <form id="login-form">
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" id="email" required>
              </div>
              <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" id="password" required>
              </div>
              <button type="submit" class="btn btn--primary btn--full-width mb-16">Login</button>
            </form>
            <div class="text-center">
              <p>Don't have an account? <a href="#/signup">Sign up</a></p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Simple demo login - in real app would validate against backend
      if (email && password) {
        this.currentUser = {
          id: 'demo-user',
          email: email,
          username: email.split('@')[0],
          level: 1,
          xp: 150,
          points: 750,
          badges: ['first-deal'],
          negotiations: []
        };
        this.saveUserData();
        this.navigateToRoute('/dashboard');
      }
    });
  }

  renderSignupPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="form-container">
        <div class="card">
          <div class="card__body">
            <h2 class="text-center mb-24">Join NegotiatorAI</h2>
            <form id="signup-form">
              <div class="form-group">
                <label class="form-label">Username</label>
                <input type="text" class="form-control" id="username" required>
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" id="email" required>
              </div>
              <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" id="password" required minlength="8">
              </div>
              <button type="submit" class="btn btn--primary btn--full-width mb-16">Sign Up</button>
            </form>
            <div class="text-center">
              <p>Already have an account? <a href="#/login">Login</a></p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('signup-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      if (username && email && password.length >= 8) {
        this.currentUser = {
          id: 'demo-user-' + Date.now(),
          email: email,
          username: username,
          level: 1,
          xp: 0,
          points: 0,
          badges: [],
          negotiations: []
        };
        this.saveUserData();
        this.navigateToRoute('/dashboard');
      }
    });
  }

  renderDashboard() {
    const user = this.currentUser;
    const nextLevelXP = user.level * 200;
    const xpProgress = (user.xp % 200) / 200 * 100;

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="container fade-in">
        <div class="flex justify-between items-center mb-32">
          <h1>Welcome back, ${user.username}!</h1>
          <div class="level-display">Level ${user.level}</div>
        </div>

        <div class="dashboard-grid">
          <div class="card">
            <div class="card__body text-center">
              <h3 class="mb-8">Experience Points</h3>
              <div class="score-display">${user.xp}</div>
              <div class="progress-bar mt-8">
                <div class="progress-fill" style="width: ${xpProgress}%"></div>
              </div>
              <p class="mt-8 text-sm color-text-secondary">${200 - (user.xp % 200)} XP to Level ${user.level + 1}</p>
            </div>
          </div>

          <div class="card">
            <div class="card__body text-center">
              <h3 class="mb-8">Total Points</h3>
              <div class="score-display">${user.points}</div>
            </div>
          </div>

          <div class="card">
            <div class="card__body text-center">
              <h3 class="mb-8">Badges Earned</h3>
              <div class="score-display">${user.badges.length}</div>
              <div class="flex gap-8 justify-center mt-8 flex-wrap">
                ${user.badges.map(badgeId => {
                  const badge = this.badges.find(b => b.id === badgeId);
                  return badge ? `<span class="badge badge--earned" title="${badge.name}">${badge.icon}</span>` : '';
                }).join('')}
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__body text-center">
              <h3 class="mb-8">Negotiations</h3>
              <div class="score-display">${user.negotiations.length}</div>
              <p class="mt-8 text-sm color-text-secondary">Completed sessions</p>
            </div>
          </div>
        </div>

        <div class="text-center mt-32">
          <button onclick="app.navigateToRoute('/scenarios')" class="btn btn--primary btn--lg">
            Start Negotiating
          </button>
        </div>

        ${user.negotiations.length > 0 ? `
        <div class="mt-32">
          <h2 class="mb-16">Your Progress</h2>
          <div class="chart-container">
            <canvas id="progressChart"></canvas>
          </div>
        </div>
        ` : ''}
      </div>
    `;

    // Render chart if user has negotiation history
    if (user.negotiations.length > 0) {
      setTimeout(() => this.renderProgressChart(), 100);
    }
  }

  renderProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    const negotiations = this.currentUser.negotiations;
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: negotiations.map((_, i) => `Session ${i + 1}`),
        datasets: [{
          label: 'Score',
          data: negotiations.map(n => n.score),
          borderColor: 'var(--color-primary)',
          backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: 'var(--color-text)' }
          }
        },
        scales: {
          x: { 
            ticks: { color: 'var(--color-text-secondary)' },
            grid: { color: 'rgba(var(--color-text-rgb), 0.1)' }
          },
          y: { 
            ticks: { color: 'var(--color-text-secondary)' },
            grid: { color: 'rgba(var(--color-text-rgb), 0.1)' }
          }
        }
      }
    });
  }

  renderScenarios() {
    this.renderScenariosView(false);
  }

  renderGuestScenarios() {
    this.renderScenariosView(true);
  }

  renderScenariosView(isGuest = false) {
    const user = this.currentUser;
    const availableScenarios = isGuest ? 
      this.scenarios.filter(s => s.difficulty === 'easy').slice(0, 2) : 
      this.scenarios;

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="container fade-in">
        <h1 class="mb-24">${isGuest ? 'Try These Scenarios' : 'Choose Your Challenge'}</h1>
        ${isGuest ? '<p class="mb-24 color-text-secondary">Experience NegotiatorAI with these sample scenarios</p>' : ''}
        
        <div class="scenario-grid">
          ${availableScenarios.map(scenario => {
            const isLocked = !isGuest && user && user.level === 1 && scenario.difficulty === 'intermediate';
            return `
              <div class="scenario-card ${isLocked ? 'opacity-50' : ''}" ${!isLocked ? `onclick="app.startScenario('${scenario.id}')"` : ''}>
                <div class="flex items-center gap-16 mb-16">
                  <div style="font-size: 2rem;">${scenario.avatarUrl}</div>
                  <div class="flex-1">
                    <h3 class="mb-4">${scenario.title}</h3>
                    <span class="badge badge-${scenario.difficulty}">${scenario.difficulty}</span>
                  </div>
                  ${isLocked ? '<div class="text-2xl">🔒</div>' : ''}
                </div>
                <div class="text-sm color-text-secondary">
                  ${scenario.hints.slice(0, 2).join(' • ')}
                </div>
                ${isLocked ? '<p class="mt-8 text-sm color-warning">Reach Level 2 to unlock</p>' : ''}
              </div>
            `;
          }).join('')}
        </div>
        
        ${isGuest ? `
        <div class="text-center mt-32">
          <p class="mb-16 color-text-secondary">Ready to unlock all scenarios and track your progress?</p>
          <button onclick="app.navigateToRoute('/signup')" class="btn btn--primary">Sign Up Now</button>
        </div>
        ` : ''}
      </div>
    `;
  }

  renderEducationPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="container fade-in">
        <h1 class="mb-24">Negotiation 101</h1>
        <p class="mb-32 color-text-secondary">Essential knowledge, tips, and tricks to become a master negotiator.</p>
        
        <div class="scenario-grid">
          <div class="card">
            <div class="card__body">
              <h3 class="mb-8">Prepare Thoroughly</h3>
              <p>Research the other party, know your goals, and understand market values. Tip: Always have a BATNA (Best Alternative to a Negotiated Agreement).</p>
            </div>
          </div>
          <div class="card">
            <div class="card__body">
              <h3 class="mb-8">Build Rapport</h3>
              <p>Establish trust and a positive relationship early. Trick: Use active listening and mirror their language to create connection.</p>
            </div>
          </div>
          <div class="card">
            <div class="card__body">
              <h3 class="mb-8">Listen Actively</h3>
              <p>Pay attention to what’s said and unsaid. Tip: Ask open-ended questions to uncover needs and motivations.</p>
            </div>
          </div>
          <div class="card">
            <div class="card__body">
              <h3 class="mb-8">Use Silence Strategically</h3>
              <p>Don’t rush to fill gaps; let the other party speak. Trick: After making an offer, stay silent to pressure them into responding.</p>
            </div>
          </div>
          <div class="card">
            <div class="card__body">
              <h3 class="mb-8">Make Concessions Wisely</h3>
              <p>Give away less valuable items in exchange for more important ones. Tip: Anchor high and concede slowly.</p>
            </div>
          </div>
          <div class="card">
            <div class="card__body">
              <h3 class="mb-8">Close the Deal</h3>
              <p>Summarize agreements and confirm next steps. Trick: Use assumptive closes like "When would you like to start?"</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  startScenario(scenarioId) {
    const scenario = this.scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    // Select random variation
    const variation = scenario.variations[Math.floor(Math.random() * scenario.variations.length)];
    
    this.currentNegotiation = {
      scenarioId: scenarioId,
      variationId: variation.id,
      messages: [],
      currentOffer: variation.initialPrice || variation.initialRate || variation.initialRent,
      maxOffer: variation.initialPrice || variation.initialRate || variation.initialRent,
      minOffer: variation.minPrice || variation.minRate || variation.minRent,
      messageCount: 0,
      startTime: Date.now(),
      personality: variation.personality
    };

    this.navigateToRoute(`/chat/${scenarioId}`);
  }

  renderChat(scenarioId) {
    const scenario = this.scenarios.find(s => s.id === scenarioId);
    if (!scenario || !this.currentNegotiation) {
      this.navigateToRoute('/scenarios');
      return;
    }

    const negotiation = this.currentNegotiation;
    const priceLabel = scenario.id.includes('freelancer') ? 'Rate' : 
                      scenario.id.includes('real-estate') ? 'Rent' : 'Price';

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="chat-container">
        <div class="chat-header">
          <div class="flex items-center gap-16">
            <div style="font-size: 3rem;">${scenario.avatarUrl}</div>
            <div class="flex-1">
              <h2>${scenario.title}</h2>
              <p class="color-text-secondary">Current ${priceLabel}: $${negotiation.currentOffer}</p>
              <div class="progress-bar mt-8">
                <div class="progress-fill" style="width: ${Math.max(0, Math.min(100, ((negotiation.maxOffer - negotiation.currentOffer) / (negotiation.maxOffer - negotiation.minOffer)) * 100))}%"></div>
              </div>
            </div>
            <div class="text-right">
              <div class="badge badge-${scenario.difficulty} mb-8">${scenario.difficulty}</div>
              <p class="text-sm color-text-secondary">Messages: ${negotiation.messageCount}/15</p>
            </div>
          </div>
        </div>

        <div class="chat-messages" id="chat-messages">
          ${negotiation.messages.map(msg => `
            <div class="chat-bubble chat-bubble--${msg.from}">
              ${msg.text}
            </div>
          `).join('')}
          <div id="typing-indicator" class="hidden">
            <div class="chat-bubble chat-bubble--ai typing-dots">
              <span>●</span><span>●</span><span>●</span>
            </div>
          </div>
        </div>

        <div class="chat-input-container">
          <div class="flex gap-8 items-center">
            <input 
              type="text" 
              class="chat-input" 
              id="message-input" 
              placeholder="Type your negotiation message..."
              ${negotiation.messageCount >= 15 ? 'disabled' : ''}
            >
            <button 
              onclick="app.sendMessage()" 
              class="btn btn--primary"
              ${negotiation.messageCount >= 15 ? 'disabled' : ''}
            >
              Send
            </button>
            <button onclick="app.showHint()" class="btn btn--secondary hint-btn">
              💡 Hint
            </button>
            <button onclick="app.endNegotiation()" class="btn btn--outline">
              End
            </button>
          </div>
        </div>
      </div>
    `;

    // Add initial AI message if this is a new negotiation
    if (negotiation.messages.length === 0) {
      setTimeout(() => {
        this.addAIMessage(this.getInitialMessage(scenario, negotiation));
      }, 1000);
    }

    // Setup enter key listener
    document.getElementById('message-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && negotiation.messageCount < 15) {
        this.sendMessage();
      }
    });
  }

  getInitialMessage(scenario, negotiation) {
    const personalities = {
      'friendly': `Hello! Welcome to my ${scenario.title.toLowerCase()}. I'm offering this excellent item for $${negotiation.currentOffer}. I'm sure we can work something out!`,
      'stubborn': `This is a premium item worth every penny of $${negotiation.currentOffer}. The price reflects the quality you're getting.`,
      'helpful': `Hi there! I've got exactly what you need for $${negotiation.currentOffer}. Let me know how I can help make this work for you.`,
      'competitive': `You're looking at the best deal in town at $${negotiation.currentOffer}. My competitors can't match this quality at this price.`,
      'collaborative': `I'm excited to work with you! My rate is $${negotiation.currentOffer}, but I'm open to discussing the details of our collaboration.`,
      'efficient': `Let's get down to business. The freight rate is $${negotiation.currentOffer}. What's your volume?`,
      'innovative': `We offer cutting-edge components at $${negotiation.currentOffer}. How can we innovate together?`,
      'sustainable': `Our energy supply is eco-friendly at $${negotiation.currentOffer}. Interested in green options?`,
      'safety-first': `Safety is our priority with chemicals at $${negotiation.currentOffer}. What are your requirements?`
    };

    return personalities[negotiation.personality] || `Welcome! I'm offering this for $${negotiation.currentOffer}. What do you think?`;
  }

  sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (!message || this.currentNegotiation.messageCount >= 15) return;

    // Add user message
    this.currentNegotiation.messages.push({
      from: 'user',
      text: message,
      timestamp: Date.now()
    });
    this.currentNegotiation.messageCount++;

    // Clear input and update display
    input.value = '';
    this.updateChatMessages();

    // Show typing indicator
    setTimeout(() => {
      this.showTypingIndicator();
      
      // Generate AI response after delay
      setTimeout(() => {
        const aiResponse = this.generateAIResponse(message);
        this.hideTypingIndicator();
        this.addAIMessage(aiResponse);
      }, 1500 + Math.random() * 1000);
    }, 200);
  }

  showTypingIndicator() {
    document.getElementById('typing-indicator').classList.remove('hidden');
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    document.getElementById('typing-indicator').classList.add('hidden');
  }

  addAIMessage(message) {
    this.currentNegotiation.messages.push({
      from: 'ai',
      text: message,
      timestamp: Date.now()
    });
    this.updateChatMessages();
  }

  updateChatMessages() {
    const messagesContainer = document.getElementById('chat-messages');
    const negotiation = this.currentNegotiation;
    
    messagesContainer.innerHTML = `
      ${negotiation.messages.map(msg => `
        <div class="chat-bubble chat-bubble--${msg.from}">
          ${msg.text}
        </div>
      `).join('')}
      <div id="typing-indicator" class="hidden">
        <div class="chat-bubble chat-bubble--ai typing-dots">
          <span>●</span><span>●</span><span>●</span>
        </div>
      </div>
    `;
    
    this.scrollToBottom();
    this.updateChatHeader();
  }

  updateChatHeader() {
    const scenario = this.scenarios.find(s => s.id === this.currentNegotiation.scenarioId);
    const priceLabel = scenario.id.includes('freelancer') ? 'Rate' : 
                      scenario.id.includes('real-estate') ? 'Rent' : 'Price';
    
    // Update current offer display
    const headerOfferText = document.querySelector('.chat-header p');
    if (headerOfferText) {
      headerOfferText.textContent = `Current ${priceLabel}: $${this.currentNegotiation.currentOffer}`;
    }

    // Update progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
      const progress = Math.max(0, Math.min(100, 
        ((this.currentNegotiation.maxOffer - this.currentNegotiation.currentOffer) / 
         (this.currentNegotiation.maxOffer - this.currentNegotiation.minOffer)) * 100
      ));
      progressFill.style.width = `${progress}%`;
    }

    // Update message count
    const messageCount = document.querySelector('.chat-header .text-sm');
    if (messageCount) {
      messageCount.textContent = `Messages: ${this.currentNegotiation.messageCount}/15`;
    }
  }

  generateAIResponse(userMessage) {
    const negotiation = this.currentNegotiation;
    const scenario = this.scenarios.find(s => s.id === negotiation.scenarioId);
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for deal acceptance keywords
    if (lowerMessage.includes('deal') || lowerMessage.includes('accept') || lowerMessage.includes('agree')) {
      setTimeout(() => this.endNegotiation(true), 1000);
      return `Great! We have a deal at $${negotiation.currentOffer}. Thank you for the negotiation!`;
    }

    // Check for price negotiation
    const priceMatch = userMessage.match(/\$?(\d+)/);
    if (priceMatch) {
      const proposedPrice = parseInt(priceMatch[1]);
      return this.handlePriceProposal(proposedPrice);
    }

    // Generate contextual responses based on message content and personality
    const responses = this.getPersonalityResponses(negotiation.personality, lowerMessage);
    const response = responses[Math.floor(Math.random() * responses.length)];

    // Occasionally make a counteroffer
    if (Math.random() < 0.3 && negotiation.currentOffer > negotiation.minOffer) {
      const reduction = Math.floor((negotiation.currentOffer - negotiation.minOffer) * (0.05 + Math.random() * 0.1));
      negotiation.currentOffer = Math.max(negotiation.minOffer, negotiation.currentOffer - reduction);
      return `${response} How about we meet at $${negotiation.currentOffer}?`;
    }

    return response;
  }

  handlePriceProposal(proposedPrice) {
    const negotiation = this.currentNegotiation;
    
    if (proposedPrice >= negotiation.currentOffer) {
      setTimeout(() => this.endNegotiation(true), 1000);
      return `Excellent! $${proposedPrice} works perfectly. We have a deal!`;
    } else if (proposedPrice >= negotiation.minOffer) {
      negotiation.currentOffer = proposedPrice;
      setTimeout(() => this.endNegotiation(true), 1000);
      return `You drive a hard bargain, but I can accept $${proposedPrice}. Deal!`;
    } else {
      const counterOffer = Math.max(negotiation.minOffer, Math.floor((proposedPrice + negotiation.currentOffer) / 2));
      negotiation.currentOffer = counterOffer;
      return `I appreciate your offer of $${proposedPrice}, but that's too low for me. How about $${counterOffer}?`;
    }
  }

  getPersonalityResponses(personality, message) {
    const responseMap = {
      'friendly': [
        "I appreciate your perspective! Let's see what we can work out.",
        "That's an interesting point. I'm always willing to listen.",
        "I like your approach. What else can you tell me?"
      ],
      'stubborn': [
        "I understand your position, but my price reflects the true value.",
        "I've been in this business long enough to know what things are worth.",
        "Quality comes at a price, and this is quality."
      ],
      'helpful': [
        "I want to make sure you get exactly what you need.",
        "Let me see how I can help make this work for both of us.",
        "Your satisfaction is important to me."
      ],
      'competitive': [
        "You won't find a better deal anywhere else, I guarantee it.",
        "I pride myself on offering the best value in the market.",
        "My competitors wish they could match what I'm offering."
      ],
      'collaborative': [
        "I believe we can find a solution that works for everyone.",
        "Let's explore how we can make this partnership successful.",
        "I'm committed to finding the right arrangement for us both."
      ],
      'efficient': [
        "Time is money. Let's optimize this deal.",
        "Efficiency is key. What specifics do you have?",
        "Streamlining costs is possible with the right terms."
      ],
      'innovative': [
        "Let's think outside the box for this negotiation.",
        "Innovation drives value. What's your vision?",
        "We can customize to meet your needs better."
      ],
      'sustainable': [
        "Sustainability matters. Let's align on eco-friendly terms.",
        "Long-term viability is crucial in energy deals.",
        "Green options can save costs over time."
      ],
      'safety-first': [
        "Safety compliance is non-negotiable.",
        "We prioritize quality and safety in all supplies.",
        "Let's ensure all standards are met."
      ]
    };

    return responseMap[personality] || responseMap['friendly'];
  }

  showHint() {
    const scenario = this.scenarios.find(s => s.id === this.currentNegotiation.scenarioId);
    const hints = scenario.hints;
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    
    this.showModal('Negotiation Tip', `💡 ${randomHint}`, [
      { text: 'Got it!', action: () => this.hideModal() }
    ]);
  }

  endNegotiation(success = false) {
    const negotiation = this.currentNegotiation;
    const scenario = this.scenarios.find(s => s.id === negotiation.scenarioId);
    
    // Calculate score
    const discountPercentage = Math.max(0, 
      ((negotiation.maxOffer - negotiation.currentOffer) / negotiation.maxOffer) * 100
    );
    const efficiencyBonus = Math.max(0, (15 - negotiation.messageCount) * 5);
    const dealBonus = success ? 100 : 0;
    const totalScore = Math.floor(discountPercentage * 10 + efficiencyBonus + dealBonus);

    // Award XP and points
    if (this.currentUser) {
      const user = this.currentUser;
      user.xp += totalScore;
      user.points += totalScore;
      
      // Record negotiation
      user.negotiations.push({
        scenarioId: negotiation.scenarioId,
        success: success,
        score: totalScore,
        discount: discountPercentage,
        messages: negotiation.messageCount,
        timestamp: Date.now()
      });

      // Check for badge unlocks
      this.checkBadgeUnlocks(user);
      
      // Check for level up
      const newLevel = Math.floor(user.xp / 200) + 1;
      const leveledUp = newLevel > user.level;
      user.level = newLevel;
      
      this.saveUserData();

      // Show results
      this.showNegotiationResults(success, totalScore, discountPercentage, leveledUp);
    } else {
      // Guest mode
      this.showNegotiationResults(success, totalScore, discountPercentage, false);
    }
  }

  checkBadgeUnlocks(user) {
    const newBadges = [];
    
    // First deal
    if (!user.badges.includes('first-deal') && user.negotiations.length === 1) {
      user.badges.push('first-deal');
      newBadges.push('first-deal');
    }
    
    // Deal closer
    if (!user.badges.includes('deal-closer') && user.negotiations.filter(n => n.success).length >= 5) {
      user.badges.push('deal-closer');
      newBadges.push('deal-closer');
    }
    
    // Haggle master
    if (!user.badges.includes('haggle-master') && user.negotiations.some(n => n.discount >= 20)) {
      user.badges.push('haggle-master');
      newBadges.push('haggle-master');
    }
    
    // Persistent
    if (!user.badges.includes('persistent') && user.negotiations.some(n => n.messages >= 20)) {
      user.badges.push('persistent');
      newBadges.push('persistent');
    }
    
    // Level up
    if (!user.badges.includes('level-up') && user.level >= 2) {
      user.badges.push('level-up');
      newBadges.push('level-up');
    }

    return newBadges;
  }

  showNegotiationResults(success, score, discount, leveledUp) {
    const resultTitle = success ? '🎉 Deal Closed!' : '💼 Negotiation Complete';
    const resultMessage = `
      <div class="text-center">
        <h3 class="mb-16 ${success ? 'color-success' : 'color-info'}">${success ? 'Congratulations!' : 'Good effort!'}</h3>
        <div class="mb-16">
          <div class="score-display mb-8">${score} Points</div>
          <p>Discount achieved: ${discount.toFixed(1)}%</p>
        </div>
        ${leveledUp ? '<div class="mb-16">🎊 LEVEL UP! 🎊</div>' : ''}
        ${this.currentUser ? '' : '<p class="mt-16 color-text-secondary">Sign up to save your progress and unlock more scenarios!</p>'}
      </div>
    `;

    const buttons = this.currentUser ? [
      { text: 'Try Again', action: () => { this.hideModal(); this.startScenario(this.currentNegotiation.scenarioId); }},
      { text: 'Dashboard', action: () => { this.hideModal(); this.navigateToRoute('/dashboard'); }}
    ] : [
      { text: 'Try Again', action: () => { this.hideModal(); this.startScenario(this.currentNegotiation.scenarioId); }},
      { text: 'Sign Up', action: () => { this.hideModal(); this.navigateToRoute('/signup'); }}
    ];

    this.showModal(resultTitle, resultMessage, buttons);
  }

  showModal(title, content, buttons = []) {
    const modalHTML = `
      <div class="modal" id="app-modal">
        <div class="modal-content">
          <h2 class="mb-16">${title}</h2>
          <div class="mb-24">${content}</div>
          <div class="flex gap-8 justify-center flex-wrap">
            ${buttons.map((btn, index) => 
              `<button class="btn ${index === 0 ? 'btn--primary' : 'btn--secondary'}" onclick="app.modalActions[${index}]()">${btn.text}</button>`
            ).join('')}
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modalActions = buttons.map(btn => btn.action);
  }

  hideModal() {
    const modal = document.getElementById('app-modal');
    if (modal) {
      modal.remove();
    }
    this.modalActions = [];
  }

  scrollToBottom() {
    const messagesContainer = document.getElementById('chat-messages');
    if (messagesContainer) {
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 100);
    }
  }
}

// Initialize the app
window.app = new NegotiatorApp();
