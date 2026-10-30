export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  category: 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology' | 'politics' | 'world';
  author?: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export type NewsCategory = 'all' | 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology' | 'politics' | 'world';

export interface CategoryConfig {
  key: NewsCategory;
  label: string;
  icon: string;
  color: string;
  description: string;
}