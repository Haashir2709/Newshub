import axios from 'axios';
import { NewsArticle, NewsApiResponse, NewsCategory } from '../types/news';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'demo_key';
const BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL || 'https://newsapi.org/v2';

// Enhanced mock data with all categories
const mockNewsData: NewsArticle[] = [
  {
    id: '1',
    title: 'Federal Reserve Announces New Economic Policy Changes',
    description: 'The Federal Reserve has announced significant changes to monetary policy affecting interest rates and inflation targets for the upcoming fiscal year.',
    content: 'In a comprehensive review of current economic conditions, the Federal Reserve has outlined new strategies to combat inflation while maintaining economic growth. The policy changes include adjustments to interest rates and new measures to support employment. Federal Reserve Chairman emphasized the importance of maintaining price stability while supporting maximum employment. The new policies are expected to take effect in the coming quarter and will be closely monitored for their impact on the broader economy.',
    url: 'https://example.com/federal-reserve-policy',
    urlToImage: 'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { id: 'federal-news', name: 'Federal News Network' },
    category: 'business',
    author: 'Sarah Johnson'
  },
  {
    id: '2',
    title: 'Hollywood Stars Announce New Environmental Initiative',
    description: 'Leading entertainment industry figures have joined forces to launch a groundbreaking environmental awareness campaign.',
    content: 'A coalition of Hollywood\'s biggest names has announced the launch of "Green Screen," an ambitious environmental initiative aimed at reducing the entertainment industry\'s carbon footprint. The program includes sustainable filming practices, renewable energy adoption, and educational content creation. Major studios have already committed to implementing these practices across their productions. The initiative also includes a scholarship program for students pursuing environmental studies in film and media.',
    url: 'https://example.com/hollywood-environment',
    urlToImage: 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { id: 'entertainment-weekly', name: 'Entertainment Weekly' },
    category: 'entertainment',
    author: 'Michael Chen'
  },
  {
    id: '3',
    title: 'Breakthrough in Cancer Research Shows Promising Results',
    description: 'Scientists at leading medical institutions have achieved a significant breakthrough in cancer treatment research.',
    content: 'Researchers have developed a new immunotherapy approach that shows remarkable success in treating advanced-stage cancers. The treatment, which harnesses the body\'s immune system to target cancer cells more effectively, has shown a 70% success rate in clinical trials. The breakthrough represents years of collaborative research between multiple institutions and could revolutionize cancer treatment protocols. Phase III trials are expected to begin next year, with potential FDA approval within the next three years.',
    url: 'https://example.com/cancer-breakthrough',
    urlToImage: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: { id: 'medical-journal', name: 'Medical Research Today' },
    category: 'health',
    author: 'Dr. Elena Rodriguez'
  },
  {
    id: '4',
    title: 'NASA Discovers Potentially Habitable Exoplanet',
    description: 'The space agency has identified a new exoplanet that could potentially support life as we know it.',
    content: 'NASA\'s Kepler Space Telescope has discovered Kepler-442c, an Earth-sized planet located in the habitable zone of its star system. The planet, located 1,200 light-years away, receives similar amounts of energy from its star as Earth does from the Sun. Initial analysis suggests the planet could have liquid water on its surface and a stable atmosphere. This discovery brings the total number of potentially habitable exoplanets to over 50, marking a significant milestone in the search for extraterrestrial life.',
    url: 'https://example.com/nasa-exoplanet',
    urlToImage: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    source: { id: 'nasa-news', name: 'NASA Science' },
    category: 'science',
    author: 'David Park'
  },
  {
    id: '5',
    title: 'World Cup Qualifiers: Stunning Upsets Rock Tournament',
    description: 'Several underdog teams have secured surprising victories in the latest round of World Cup qualifying matches.',
    content: 'The World Cup qualifying rounds have delivered some of the most shocking results in recent memory, with three major upsets reshaping the tournament landscape. Underdog teams have defeated former champions, creating new storylines and shifting betting odds dramatically. The matches featured exceptional individual performances and tactical masterclasses that will be studied for years to come. These results have opened up the tournament, making it one of the most unpredictable World Cups in decades.',
    url: 'https://example.com/world-cup-upsets',
    urlToImage: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { id: 'sports-network', name: 'Global Sports Network' },
    category: 'sports',
    author: 'Amanda Foster'
  },
  {
    id: '6',
    title: 'Revolutionary AI Chip Promises 10x Performance Boost',
    description: 'Tech giant unveils next-generation processor that could transform artificial intelligence computing.',
    content: 'A major technology company has announced the development of a revolutionary AI chip that delivers unprecedented performance improvements. The new processor, built on advanced 3-nanometer technology, offers 10 times the performance of current generation chips while consuming 50% less power. The breakthrough could accelerate AI development across industries, from autonomous vehicles to medical diagnostics. The chip incorporates novel neural network architectures and quantum-inspired computing elements.',
    url: 'https://example.com/ai-chip-breakthrough',
    urlToImage: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: { id: 'tech-today', name: 'Technology Today' },
    category: 'technology',
    author: 'Marco Bernini'
  },
  {
    id: '7',
    title: 'International Climate Summit Reaches Historic Agreement',
    description: 'World leaders at the Global Climate Summit have reached a groundbreaking agreement on carbon emissions reduction.',
    content: 'The historic agreement involves 195 countries committing to ambitious carbon reduction targets and substantial investments in renewable energy infrastructure. The pact includes binding commitments for developed nations to support climate adaptation in developing countries. Key provisions include a global carbon tax, technology transfer agreements, and a $500 billion climate fund. The agreement represents the most comprehensive international climate action plan to date.',
    url: 'https://example.com/climate-summit',
    urlToImage: 'https://images.pexels.com/photos/9816661/pexels-photo-9816661.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    source: { id: 'global-news', name: 'Global News Network' },
    category: 'world',
    author: 'Crisis Response Team'
  },
  {
    id: '8',
    title: 'Congressional Elections Show Shifting Political Landscape',
    description: 'Recent election results indicate significant changes in voter preferences and political alignment.',
    content: 'The latest congressional elections have revealed a dramatically shifting political landscape, with several key districts changing hands and new political coalitions emerging. Voter turnout reached record levels, particularly among younger demographics, signaling increased political engagement. The results suggest evolving priorities around economic policy, healthcare, and environmental issues. Political analysts are calling it a realignment election that could reshape policy discussions for years to come.',
    url: 'https://example.com/election-results',
    urlToImage: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    source: { id: 'political-news', name: 'Political Analysis Weekly' },
    category: 'politics',
    author: 'Political Desk'
  },
  {
    id: '9',
    title: 'Local Community Garden Project Transforms Neighborhood',
    description: 'Residents have successfully transformed an abandoned lot into a thriving community garden and gathering space.',
    content: 'What started as a grassroots initiative has blossomed into a model community project that has transformed both the physical landscape and social fabric of the neighborhood. The community garden now produces fresh vegetables for local families while serving as an educational space for children and a gathering place for residents. The project has inspired similar initiatives in neighboring areas and has been recognized by the city council as a model for urban development.',
    url: 'https://example.com/community-garden',
    urlToImage: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: { id: 'local-news', name: 'Community Chronicle' },
    category: 'general',
    author: 'Local Reporter'
  },
  {
    id: '10',
    title: 'Streaming Wars Heat Up with New Platform Launch',
    description: 'Another major tech company enters the competitive streaming market with exclusive content and innovative features.',
    content: 'The streaming landscape has become even more competitive with the launch of a new platform that promises to revolutionize how we consume entertainment. The service features exclusive content from top creators, interactive viewing experiences, and AI-powered personalization. With subscription prices starting at $9.99 per month, the platform aims to capture market share from established players. Industry experts predict this could trigger another round of price wars and content acquisition battles.',
    url: 'https://example.com/streaming-platform',
    urlToImage: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: { id: 'entertainment-tech', name: 'Entertainment Technology' },
    category: 'entertainment',
    author: 'Tech Entertainment Reporter'
  }
];

class NewsService {
  private apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
  });

  private transformApiArticle(apiArticle: any, category: NewsCategory): NewsArticle {
    return {
      id: `${apiArticle.source?.id || 'unknown'}-${Date.now()}-${Math.random()}`,
      title: apiArticle.title || 'No title available',
      description: apiArticle.description || 'No description available',
      content: apiArticle.content || apiArticle.description || 'No content available',
      url: apiArticle.url || '#',
      urlToImage: apiArticle.urlToImage || 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: apiArticle.publishedAt || new Date().toISOString(),
      source: {
        id: apiArticle.source?.id || 'unknown',
        name: apiArticle.source?.name || 'Unknown Source'
      },
      category,
      author: apiArticle.author || undefined
    };
  }

  private getCategoryQuery(category: NewsCategory): string {
    switch (category) {
      case 'business':
        return 'business OR economy OR finance OR market OR stock';
      case 'entertainment':
        return 'entertainment OR celebrity OR movie OR music OR television';
      case 'health':
        return 'health OR medical OR medicine OR healthcare OR wellness';
      case 'science':
        return 'science OR research OR discovery OR technology OR innovation';
      case 'sports':
        return 'sports OR football OR basketball OR soccer OR olympics';
      case 'technology':
        return 'technology OR tech OR AI OR software OR computer';
      case 'politics':
        return 'politics OR government OR election OR policy OR congress';
      case 'world':
        return 'international OR global OR world OR foreign OR country';
      case 'general':
        return 'news OR breaking OR latest OR update';
      default:
        return '';
    }
  }

  private async fetchFromNewsAPI(category: NewsCategory, searchQuery?: string): Promise<NewsArticle[]> {
    try {
      let query = searchQuery || this.getCategoryQuery(category);
      
      const params: any = {
        apiKey: API_KEY,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 20,
      };

      let endpoint = '/everything';
      
      // Use category-specific endpoints for better results
      if (!searchQuery && category !== 'all') {
        if (['business', 'entertainment', 'health', 'science', 'sports', 'technology'].includes(category)) {
          endpoint = '/top-headlines';
          params.category = category;
          params.country = 'us';
        } else {
          params.q = query;
        }
      } else if (searchQuery) {
        params.q = searchQuery;
      } else {
        endpoint = '/top-headlines';
        params.country = 'us';
      }

      const response = await this.apiClient.get(endpoint, { params });

      if (response.data.status === 'ok' && response.data.articles) {
        return response.data.articles
          .filter((article: any) => 
            article.title && 
            article.title !== '[Removed]' && 
            article.description &&
            article.description !== '[Removed]'
          )
          .map((article: any) => this.transformApiArticle(article, category))
          .slice(0, 15);
      }

      return [];
    } catch (error) {
      console.warn('NewsAPI request failed, using fallback data:', error);
      return [];
    }
  }

  async fetchNews(category: NewsCategory = 'all', searchQuery?: string): Promise<NewsApiResponse> {
    try {
      let articles = await this.fetchFromNewsAPI(category, searchQuery);

      if (articles.length === 0) {
        console.log('Using fallback mock data');
        articles = this.getMockData(category, searchQuery);
      }

      articles = articles.map(article => ({
        ...article,
        publishedAt: this.adjustTimestamp(article.publishedAt)
      }));

      return {
        status: 'ok',
        totalResults: articles.length,
        articles: articles.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
      };
    } catch (error) {
      console.error('Error in fetchNews:', error);
      
      const articles = this.getMockData(category, searchQuery);
      return {
        status: 'ok',
        totalResults: articles.length,
        articles
      };
    }
  }

  private getMockData(category: NewsCategory, searchQuery?: string): NewsArticle[] {
    let filteredArticles = [...mockNewsData];

    if (category !== 'all') {
      filteredArticles = filteredArticles.filter(article => article.category === category);
    }

    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.author?.toLowerCase().includes(query)
      );
    }

    return filteredArticles;
  }

  private adjustTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours > 24) {
      const randomHours = Math.floor(Math.random() * 12) + 1;
      const newDate = new Date(now.getTime() - randomHours * 60 * 60 * 1000);
      return newDate.toISOString();
    }

    return timestamp;
  }

  async fetchArticleById(id: string): Promise<NewsArticle | null> {
    return mockNewsData.find(article => article.id === id) || null;
  }

  async getLatestNews(): Promise<NewsArticle[]> {
    try {
      const response = await this.fetchFromNewsAPI('all');
      return response.slice(0, 5);
    } catch (error) {
      return mockNewsData.slice(0, 3);
    }
  }
}

export const newsService = new NewsService();