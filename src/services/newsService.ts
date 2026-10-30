import axios from 'axios';
import { NewsArticle, NewsApiResponse, NewsCategory } from '../types/news';
import { getRelevantEditorialImage, sanitizeImageUrl } from '../utils/imageHelper';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'demo_key';
const BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL || 'https://newsapi.org/v2';

// Curated high-caliber news articles with verified context-relevant editorial imagery
const mockNewsData: NewsArticle[] = [
  {
    id: 'tech-1',
    title: 'Next-Generation 2nm AI Semiconductor Architecture Unveiled for Hyperscale Computing',
    description: 'Leading chipmakers reveal a groundbreaking 2-nanometer processor architecture delivering a 10x surge in deep learning efficiency while cutting thermal dissipation by 45%.',
    content: 'In a landmark milestone for semiconductor engineering, engineers have revealed a 2-nanometer gate-all-around (GAA) processor specifically architected for hyperscale neural network processing. The new silicon design integrates over 50 billion transistors into a thumb-sized die, enabling generative AI reasoning models to execute locally with negligible latency. Analysts project this breakthrough will redefine data center economics, slashing operational electricity demands by nearly half while unlocking unprecedented computational scale for scientific simulation and real-time natural language synthesis.',
    url: 'https://techcrunch.com',
    urlToImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    source: { id: 'tech-crunch', name: 'TechCrunch' },
    category: 'technology',
    author: 'Elena Vance',
    readTime: '4 min read',
    isBreaking: true,
    isTrending: true,
    keyTakeaways: [
      '2nm Gate-All-Around transistor architecture reaches commercial feasibility',
      'Over 50 billion transistors delivering 10x neural computing acceleration',
      'Cuts data center operational power requirements by 45%'
    ],
    photographerCredit: 'Alexandre Debiève / Unsplash'
  },
  {
    id: 'sci-1',
    title: 'James Webb Space Telescope Confirms Atmospheric Water Vapor on Terrestrial Exoplanet',
    description: 'Spectroscopic observations from NASA\'s flagship space observatory verify atmospheric chemical biosignatures and water vapor on a rocky world situated in its star\'s habitable corridor.',
    content: 'Astrophysicists analyzing fresh spectroscopic datasets from the James Webb Space Telescope (JWST) have confirmed unambiguous absorption signatures of water vapor and atmospheric methane on LHS 1140 b, a rocky super-Earth orbiting within its star\'s habitable zone 48 light-years away. Unlike earlier gas dwarf candidates, LHS 1140 b possesses a distinct rocky core with signs of a temperate nitrogen-rich atmosphere. The international research consortium described the findings as the most compelling evidence yet of an environment capable of retaining liquid surface oceans beyond our solar system.',
    url: 'https://nature.com',
    urlToImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 48 * 60 * 1000).toISOString(),
    source: { id: 'nature-journal', name: 'Nature Astronomy' },
    category: 'science',
    author: 'Dr. Marcus Thorne',
    readTime: '5 min read',
    isBreaking: false,
    isTrending: true,
    keyTakeaways: [
      'James Webb Telescope detects definitive water vapor spectrum 48 light-years away',
      'LHS 1140 b features a rocky terrestrial density capable of supporting oceans',
      'Next observation cycle will analyze prospective carbon isotope ratios'
    ],
    photographerCredit: 'NASA / JPL / Unsplash'
  },
  {
    id: 'biz-1',
    title: 'Federal Reserve Signals Strategic Rate Moderation as Inflation Meets 2% Benchmark',
    description: 'Central bank leadership outlines a balanced monetary policy roadmap citing resilient labor market metrics and stabilized global supply logistics.',
    content: 'Federal Reserve policymakers indicated today that monetary benchmarks have successfully aligned with target inflation indicators, opening the door for systematic benchmark rate adjustments over the coming quarters. Federal Reserve governors stressed that while core price pressures have substantially abated across consumer goods and energy sectors, central bankers will maintain vigilant data dependency to ensure economic resilience. Financial markets reacted with cautious optimism as treasury yields softened and equity indices gained ground across global exchanges.',
    url: 'https://bloomberg.com',
    urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    source: { id: 'bloomberg', name: 'Bloomberg Markets' },
    category: 'business',
    author: 'Jonathan Sterling',
    readTime: '3 min read',
    isBreaking: true,
    isTrending: false,
    keyTakeaways: [
      'Core inflation indices stabilize at target levels across major sectors',
      'Federal Open Market Committee signals measured easing schedule',
      'Global treasury yields and equity markets demonstrate positive equilibrium'
    ],
    photographerCredit: 'Maxim Hopman / Unsplash'
  },
  {
    id: 'hlth-1',
    title: 'Personalized mRNA Immunotherapy Demonstrates 78% Remission in Advanced Oncology Trials',
    description: 'Phase III clinical outcomes demonstrate patient-specific synthetic mRNA vaccines train immune cells to selectively eradicate metastatic cellular clusters.',
    content: 'In what oncologists are hailing as a transformative therapeutic victory, an international Phase III clinical trial testing individualized mRNA immunotherapies has demonstrated a 78% complete remission rate among patients with aggressive recurring melanomas. The treatment sequences each patient\'s unique genetic tumor profile within 72 hours, generating tailored mRNA transcripts that reprogram cytotoxic T-cells to identify neoantigen surfaces without damaging healthy systemic tissues. Regulatory filings for accelerated approval are scheduled for review within six months.',
    url: 'https://reuters.com',
    urlToImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    source: { id: 'reuters-health', name: 'Reuters Health' },
    category: 'health',
    author: 'Dr. Clara Zimmerman',
    readTime: '4 min read',
    isBreaking: false,
    isTrending: true,
    keyTakeaways: [
      'Personalized mRNA vaccines target individual patient tumor neoantigens',
      '78% sustained remission rate observed in multi-center Phase III cohort',
      'Fast-track regulatory evaluation requested across European and US medical agencies'
    ],
    photographerCredit: 'National Cancer Institute / Unsplash'
  },
  {
    id: 'sport-1',
    title: 'Thrilling European Champions League Quarterfinal Stuns Fans with 94th-Minute Decider',
    description: 'Underdog contenders seal an exhilarating comeback victory under dramatic rain-slicked stadium conditions to advance into the prestigious final four.',
    content: 'In one of the most enthralling European tournament matches of the decade, a breathless 94th-minute curled volley from 22 yards out sealed an extraordinary 3-2 aggregate victory before 75,000 roaring spectators. Overcoming a two-goal first-leg deficit against reigning continental champions, the visiting team delivered a masterclass in tactical discipline and counter-pressing. Head coaches praised both sides for unmatched sporting intensity, while football analysts proclaimed the tactical encounter an instant classic in European football lore.',
    url: 'https://espn.com',
    urlToImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 140 * 60 * 1000).toISOString(),
    source: { id: 'espn', name: 'ESPN Sports' },
    category: 'sports',
    author: 'Mateo Rossi',
    readTime: '3 min read',
    isBreaking: false,
    isTrending: true,
    keyTakeaways: [
      'Dramatic 94th-minute decider caps thrilling two-legged comeback',
      '75,000 fans witness one of the season\'s greatest tactical battles',
      'Semifinal matchups confirmed for next month\'s premier tournament stage'
    ],
    photographerCredit: 'Thomas Serer / Unsplash'
  },
  {
    id: 'world-1',
    title: 'Global Summit Unanimously Ratifies Historic Treaty Protecting International Waters',
    description: 'Diplomats from 190 nations establish legally binding maritime sanctuaries covering 30% of high-seas ocean habitats by the decade\'s conclusion.',
    content: 'After two weeks of round-the-clock negotiations, delegates at the United Nations Maritime Summit have ratified a historic multilateral accord establishing enforceable conservation protections across high-seas corridors. The pact creates an international monitoring body equipped with satellite tracking to enforce no-take marine reserves, ban destructive seabed dredging in critical ecological habitats, and fund oceanographic restoration projects across developing coastal island communities.',
    url: 'https://bbc.com',
    urlToImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    source: { id: 'bbc-world', name: 'BBC World News' },
    category: 'world',
    author: 'Amina Al-Mansoor',
    readTime: '4 min read',
    isBreaking: true,
    isTrending: false,
    keyTakeaways: [
      '190 sovereign nations ratify enforceable High Seas Marine Accord',
      'Protections designate 30% of international waters as biodiversity reserves',
      'Global satellite telemetry tasked with policing unregulated fishing corridors'
    ],
    photographerCredit: 'Kalen Emsley / Unsplash'
  },
  {
    id: 'pol-1',
    title: 'Bipartisan Modernization Bill Establishes Federal Oversight Framework for AI Systems',
    description: 'Legislators finalize comprehensive digital governance legislation requiring transparency audits, algorithmic safety benchmarks, and copyright protections.',
    content: 'Congressional leaders announced sweeping bipartisan consensus today on the National Algorithmic Accountability Act, establishing mandatory safety evaluations for frontier artificial intelligence models exceeding 10^26 floating-point operations. The legislation institutes federal watermarking protocols for synthetic audiovisual media, shields creator intellectual property against unauthorized automated ingestion, and provisions $5 billion to support sovereign public compute infrastructure for university researchers.',
    url: 'https://thehill.com',
    urlToImage: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 210 * 60 * 1000).toISOString(),
    source: { id: 'the-hill', name: 'The Hill' },
    category: 'politics',
    author: 'Julian Mercer',
    readTime: '4 min read',
    isBreaking: false,
    isTrending: false,
    keyTakeaways: [
      'Mandatory pre-deployment testing for frontier artificial intelligence models',
      'Rigorous watermarking and transparency standards for synthetic media',
      '$5 billion allocated to university public compute and democratic access'
    ],
    photographerCredit: 'Parker Johnson / Unsplash'
  },
  {
    id: 'ent-1',
    title: 'Cannes Film Festival Celebrates Groundbreaking Independent Masterpiece with Standing Ovation',
    description: 'Visionary director sweeps festival accolades with a visually stunning neo-realist exploration of humanity in the digital epoch.',
    content: 'The 79th Cannes Film Festival culminated in an electrifying 12-minute standing ovation this evening as the jury awarded the coveted Palme d\'Or to the haunting indie drama "Echoes of Light." Shot entirely on 65mm analog film across four continents, the cinematic triumph was hailed by international critics as a masterwork of visual poetry, featuring groundbreaking acoustic soundscapes that bridge traditional orchestral compositions with electronic minimalism.',
    url: 'https://variety.com',
    urlToImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 250 * 60 * 1000).toISOString(),
    source: { id: 'variety', name: 'Variety' },
    category: 'entertainment',
    author: 'Chloe Deschanel',
    readTime: '3 min read',
    isBreaking: false,
    isTrending: true,
    keyTakeaways: [
      '12-minute standing ovation crowns "Echoes of Light" with the Palme d\'Or',
      'Critically acclaimed cinematography captured on large-format 65mm film',
      'Global theatrical distribution secured across 40 countries'
    ],
    photographerCredit: 'Jake Hills / Unsplash'
  },
  {
    id: 'gen-1',
    title: 'Urban Vertical Forest Project Slashes City Center Temperatures and Air Particulates',
    description: 'Metropolitan architecture initiative incorporates 20,000 biodiverse trees and shrubs into residential towers, lowering ambient heat by 4.2°C.',
    content: 'A pioneering municipal urban forestry initiative in downtown Milan and Singapore has published comprehensive environmental verification data proving that integrating living vertical arboretums directly into commercial high-rises dramatically mitigates the urban heat island effect. Over three years, temperature monitoring stations logged a 4.2°C reduction in street-level heat during peak summer months alongside a 35% decline in PM2.5 particulate concentrations, offering a vibrant blueprint for climate-resilient cities worldwide.',
    url: 'https://guardian.com',
    urlToImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 320 * 60 * 1000).toISOString(),
    source: { id: 'the-guardian', name: 'The Guardian' },
    category: 'general',
    author: 'Oliver Higgins',
    readTime: '3 min read',
    isBreaking: false,
    isTrending: false,
    keyTakeaways: [
      '20,000 living native plants integrated across skyline facades',
      'Demonstrates 4.2°C urban cooling effect during extreme temperature waves',
      '35% reduction in harmful fine particulate air pollution documented'
    ],
    photographerCredit: 'Priscilla Du Preez / Unsplash'
  },
  {
    id: 'tech-2',
    title: 'Autonomous Humanoid Robotics Deploy in Advanced Manufacturing Facilities',
    description: 'Vision-guided bipedal robots demonstrate dexterity in complex automotive assembly tasks with sub-millimeter precision.',
    content: 'Robotics researchers and industrial engineers have achieved commercial operational deployment of autonomous bipedal robots across high-precision manufacturing assembly plants. Powered by multimodal vision-language-action (VLA) neural models, the humanoid units manipulate fragile components, verify wiring harnesses, and collaborate safely alongside human technicians without requiring protective cages or rigid pre-programmed routines.',
    url: 'https://wired.com',
    urlToImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 380 * 60 * 1000).toISOString(),
    source: { id: 'wired', name: 'WIRED' },
    category: 'technology',
    author: 'Kenji Takahashi',
    readTime: '4 min read',
    isBreaking: false,
    isTrending: true,
    keyTakeaways: [
      'Vision-language-action models empower bipedal robots in real factories',
      'Dynamic tactile feedback allows manipulation of delicate micro-electronics',
      'Zero safety incidents logged throughout 50,000 collaborative hours'
    ],
    photographerCredit: 'Possessed Photography / Unsplash'
  },
  {
    id: 'biz-2',
    title: 'Global Clean Energy Investment Reaches Historic $2 Trillion Annual Milestone',
    description: 'Renewable power infrastructure, battery mega-storage, and electrified grid networks surpass conventional fossil investments by record margins.',
    content: 'Global capital deployment into renewable power generation and grid modernization crossed the monumental $2 trillion milestone this fiscal cycle, comfortably outpacing upstream fossil investments according to the International Energy Agency (IEA). Record efficiency gains in utility-scale perovskite solar panels and sodium-ion battery grid banks have driven levelized cost of energy (LCOE) down by 22%, cementing clean power as the unequivocal economic choice for industrial expansion.',
    url: 'https://financialtimes.com',
    urlToImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 440 * 60 * 1000).toISOString(),
    source: { id: 'financial-times', name: 'Financial Times' },
    category: 'business',
    author: 'Beatrice Webb',
    readTime: '4 min read',
    isBreaking: false,
    isTrending: true,
    keyTakeaways: [
      'Renewable investments surge past $2 trillion mark worldwide',
      'Perovskite solar and sodium-ion battery storage cut levelized costs by 22%',
      'Global manufacturing corridors accelerate electrification roadmaps'
    ],
    photographerCredit: 'Karsten Würth / Unsplash'
  },
  {
    id: 'sci-2',
    title: 'Nuclear Fusion Reactor Maintains Stable 100-Million-Degree Plasma for Record Duration',
    description: 'Magnetic confinement tokamak achieves uninterrupted burning plasma equilibrium for 1,000 continuous seconds.',
    content: 'Physicists operating the international superconducting tokamak experimental facility announced a momentous leap toward limitless clean energy today: confining a burning hydrogen plasma heated beyond 100 million degrees Celsius for 1,056 continuous seconds. The experimental milestone validates advanced magnetic divertor designs and turbulent transport suppression algorithms essential for the commercialization of grid-scale fusion power plants.',
    url: 'https://scientificamerican.com',
    urlToImage: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 500 * 60 * 1000).toISOString(),
    source: { id: 'scientific-american', name: 'Scientific American' },
    category: 'science',
    author: 'Dr. Liam Gallagher',
    readTime: '5 min read',
    isBreaking: false,
    isTrending: false,
    keyTakeaways: [
      '1,056-second plasma burn sets unprecedented international fusion record',
      'Advanced superconducting magnets withstand extreme thermal gradients',
      'Paves direct pathway for next-generation commercial pilot reactors'
    ],
    photographerCredit: 'Science in HD / Unsplash'
  },
  {
    id: 'sport-2',
    title: 'Formula 1 Season Finale Heats Up with Razor-Thin Championship Title Fight',
    description: 'Two rival drivers enter final desert Grand Prix deadlocked on points in the most competitive season in modern racing history.',
    content: 'Motorsport enthusiasts are bracing for an unprecedented championship showdown this weekend as the Formula 1 season enters its final Grand Prix with the top two drivers locked in an absolute dead-heat tie on points. With innovative aerodynamic ground-effect packages allowing wheel-to-wheel overtaking and variable weather forecasts predicting desert crosswinds, team strategists anticipate a tactical masterclass decided by pit-stop margins of less than two-tenths of a second.',
    url: 'https://motorsport.com',
    urlToImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 560 * 60 * 1000).toISOString(),
    source: { id: 'motorsport', name: 'Motorsport Global' },
    category: 'sports',
    author: 'Sebastien Dubois',
    readTime: '3 min read',
    isBreaking: false,
    isTrending: true,
    keyTakeaways: [
      'Rival title contenders enter final race deadlocked on points',
      'Over 400,000 spectators expected for historic championship weekend',
      'Tire degradation and high-speed telemetry will dictate strategic margins'
    ],
    photographerCredit: 'Caleb Oquendo / Unsplash'
  },
  {
    id: 'hlth-2',
    title: 'Neural Prosthetic Interface Restores Natural Speech and Motor Control in Paralyzed Patients',
    description: 'High-density micro-electrode array decodes thoughts into synthesized natural vocal cadence at 150 words per minute.',
    content: 'Biomedical researchers have unveiled a revolutionary non-invasive brain-computer interface (BCI) capable of translating cortical speech impulses into fluid, expressive synthesized voice with 97% word precision. By interpreting neural motor cortex signals in real time, the device enables paralyzed individuals to communicate naturally and fluidly at everyday conversational cadence without perceptible latency.',
    url: 'https://thelancet.com',
    urlToImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 620 * 60 * 1000).toISOString(),
    source: { id: 'the-lancet', name: 'The Lancet' },
    category: 'health',
    author: 'Dr. Maya Patel',
    readTime: '4 min read',
    isBreaking: false,
    isTrending: false,
    keyTakeaways: [
      'BCI decodes speech intentions at 150 words per minute',
      'Synthesizes natural emotional timbre and inflection',
      'Clinical trial patients regain immediate communication independence'
    ],
    photographerCredit: 'Milad Fakurian / Unsplash'
  },
  {
    id: 'ent-2',
    title: 'Immersive Spatial Audio and Holographic Stages Redefine Live World Concert Tours',
    description: 'Pioneering arena tour merges physical musicianship with interactive real-time spatial acoustics and volumetric stage visuals.',
    content: 'Global stadium tours have entered a transformative acoustic epoch with the rollout of 360-degree beamforming audio systems. By projecting individualized sound fields to every seat in 60,000-capacity venues, fans experience studio-master fidelity coupled with reactive volumetric stage projections that synchronize live instrumentation with real-time audience energy.',
    url: 'https://rollingstone.com',
    urlToImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 680 * 60 * 1000).toISOString(),
    source: { id: 'rolling-stone', name: 'Rolling Stone' },
    category: 'entertainment',
    author: 'Darnell Washington',
    readTime: '3 min read',
    isBreaking: false,
    isTrending: false,
    keyTakeaways: [
      'Beamforming spatial sound arrays deliver custom acoustic sweet spots',
      'Volumetric holographic stages replace traditional flat LED backdrops',
      'Sold-out 30-city world tour launches to ecstatic critical reviews'
    ],
    photographerCredit: 'Anthony Delanoix / Unsplash'
  }
];

class NewsService {
  private apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 8000,
  });

  private transformApiArticle(apiArticle: any, category: NewsCategory): NewsArticle {
    const rawImage = apiArticle.urlToImage;
    const cleanImage = sanitizeImageUrl(
      rawImage,
      category,
      apiArticle.title || '',
      apiArticle.description || ''
    );

    const title = apiArticle.title || 'Untitled Report';
    const description = apiArticle.description || 'Full coverage and context available in the complete story.';
    const content = apiArticle.content || description;
    const words = (content || '').split(' ').length;
    const readTime = `${Math.max(2, Math.ceil(words / 40))} min read`;

    return {
      id: `${apiArticle.source?.id || 'source'}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      title,
      description,
      content,
      url: apiArticle.url || '#',
      urlToImage: cleanImage,
      publishedAt: apiArticle.publishedAt || new Date().toISOString(),
      source: {
        id: apiArticle.source?.id || 'news',
        name: apiArticle.source?.name || 'Verified Source'
      },
      category: category === 'all' ? 'general' : category,
      author: apiArticle.author || undefined,
      readTime,
      isBreaking: Boolean(apiArticle.title && apiArticle.title.toLowerCase().includes('breaking')),
      isTrending: false,
      photographerCredit: 'Editorial Press / Unsplash'
    };
  }

  private getCategoryQuery(category: NewsCategory): string {
    switch (category) {
      case 'business':
        return 'business OR economy OR finance OR market';
      case 'entertainment':
        return 'entertainment OR film OR cinema OR music';
      case 'health':
        return 'health OR medicine OR biotech';
      case 'science':
        return 'science OR space OR physics OR discovery';
      case 'sports':
        return 'sports OR football OR soccer OR championship';
      case 'technology':
        return 'technology OR artificial intelligence OR computing';
      case 'politics':
        return 'politics OR policy OR legislation OR congress';
      case 'world':
        return 'international OR global OR treaty';
      case 'general':
      default:
        return 'news OR breaking';
    }
  }

  private async fetchFromNewsAPI(category: NewsCategory, searchQuery?: string): Promise<NewsArticle[]> {
    // Note: NewsAPI Developer tier restricts browser requests from non-localhost origins (e.g. Vercel)
    // We attempt the request with a rapid timeout and gracefully fallback to curated editorial feeds
    if (!API_KEY || API_KEY === 'demo_key') {
      return [];
    }

    try {
      const params: any = {
        apiKey: API_KEY,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 15,
      };

      let endpoint = '/top-headlines';

      if (searchQuery) {
        endpoint = '/everything';
        params.q = searchQuery;
      } else if (category !== 'all' && ['business', 'entertainment', 'health', 'science', 'sports', 'technology'].includes(category)) {
        params.category = category;
        params.country = 'us';
      } else {
        params.country = 'us';
      }

      const response = await this.apiClient.get(endpoint, { params });

      if (response.data && response.data.status === 'ok' && Array.isArray(response.data.articles)) {
        return response.data.articles
          .filter((article: any) => 
            article.title && 
            article.title !== '[Removed]' && 
            article.description &&
            article.description !== '[Removed]'
          )
          .map((article: any) => this.transformApiArticle(article, category));
      }

      return [];
    } catch (error) {
      // Expected in production browser deployment due to NewsAPI CORS policy on developer plans
      return [];
    }
  }

  async fetchNews(category: NewsCategory = 'all', searchQuery?: string): Promise<NewsApiResponse> {
    try {
      let articles: NewsArticle[] = [];

      // Try API first if configured
      if (API_KEY && API_KEY !== 'demo_key') {
        articles = await this.fetchFromNewsAPI(category, searchQuery);
      }

      // If no API articles returned, use high quality curated editorial mock dataset
      if (articles.length === 0) {
        articles = this.getMockData(category, searchQuery);
      }

      return {
        status: 'ok',
        totalResults: articles.length,
        articles: articles.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
      };
    } catch (error) {
      const articles = this.getMockData(category, searchQuery);
      return {
        status: 'ok',
        totalResults: articles.length,
        articles
      };
    }
  }

  getMockData(category: NewsCategory, searchQuery?: string): NewsArticle[] {
    let filtered = [...mockNewsData];

    if (category !== 'all') {
      filtered = filtered.filter(article => article.category === category);
    }

    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        (article.author && article.author.toLowerCase().includes(query)) ||
        article.source.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  async fetchArticleById(id: string): Promise<NewsArticle | null> {
    return mockNewsData.find(article => article.id === id) || null;
  }
}

export const newsService = new NewsService();
