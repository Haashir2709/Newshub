import { NewsCategory } from '../types/news';

// Verified high-definition editorial images specifically matched to categories & topics
export const TOPIC_EDITORIAL_IMAGES = {
  // Technology
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
  chip: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  datacenter: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  robotics: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
  cybersecurity: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  techDefault: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',

  // Business & Finance
  wallStreet: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
  federalReserve: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
  markets: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
  logistics: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  cleanEnergy: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
  businessDefault: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',

  // Science & Space
  nasaSpace: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  cosmos: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80',
  telescope: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
  laboratory: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
  scienceDefault: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1200&q=80',

  // Health & Medicine
  immunotherapy: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
  genetics: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  neuroscience: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80',
  clinicalCare: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
  healthDefault: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',

  // Sports
  worldCupSoccer: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
  f1Motorsport: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
  basketball: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
  tennis: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=80',
  sportsDefault: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',

  // World & Geopolitics
  diplomacy: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
  climateSummit: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
  globalCity: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80',
  worldDefault: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',

  // Politics
  capitol: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
  voting: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
  justice: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
  politicsDefault: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80',

  // Entertainment
  cinemaPremiere: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
  concert: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
  filmmaking: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1200&q=80',
  streaming: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1200&q=80',
  entertainmentDefault: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',

  // General & Breaking
  newsroom: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
  community: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  generalDefault: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80',
};

/**
 * Returns a high-definition, highly relevant editorial image based on category and article content
 */
export const getRelevantEditorialImage = (
  category?: NewsCategory | string,
  title: string = '',
  description: string = ''
): string => {
  const combined = `${title} ${description}`.toLowerCase();

  // Tech matches
  if (combined.includes('ai ') || combined.includes('artificial intelligence') || combined.includes('gpt') || combined.includes('neural')) {
    return TOPIC_EDITORIAL_IMAGES.ai;
  }
  if (combined.includes('chip') || combined.includes('processor') || combined.includes('semiconductor') || combined.includes('nanometer') || combined.includes('nvidia') || combined.includes('silicon')) {
    return TOPIC_EDITORIAL_IMAGES.chip;
  }
  if (combined.includes('datacenter') || combined.includes('cloud') || combined.includes('server')) {
    return TOPIC_EDITORIAL_IMAGES.datacenter;
  }
  if (combined.includes('robot') || combined.includes('automation') || combined.includes('autonomous')) {
    return TOPIC_EDITORIAL_IMAGES.robotics;
  }
  if (combined.includes('cyber') || combined.includes('hack') || combined.includes('security') || combined.includes('malware')) {
    return TOPIC_EDITORIAL_IMAGES.cybersecurity;
  }

  // Finance & Business matches
  if (combined.includes('federal reserve') || combined.includes('central bank') || combined.includes('interest rate') || combined.includes('powell') || combined.includes('inflation')) {
    return TOPIC_EDITORIAL_IMAGES.federalReserve;
  }
  if (combined.includes('stock') || combined.includes('wall street') || combined.includes('nasdaq') || combined.includes('dow') || combined.includes('market') || combined.includes('trader')) {
    return TOPIC_EDITORIAL_IMAGES.wallStreet;
  }
  if (combined.includes('shipping') || combined.includes('trade') || combined.includes('cargo') || combined.includes('supply chain')) {
    return TOPIC_EDITORIAL_IMAGES.logistics;
  }
  if (combined.includes('clean energy') || combined.includes('wind') || combined.includes('solar') || combined.includes('renewable')) {
    return TOPIC_EDITORIAL_IMAGES.cleanEnergy;
  }

  // Science & Space matches
  if (combined.includes('nasa') || combined.includes('space') || combined.includes('planet') || combined.includes('exoplanet') || combined.includes('telescope') || combined.includes('mars') || combined.includes('kepler')) {
    return TOPIC_EDITORIAL_IMAGES.nasaSpace;
  }
  if (combined.includes('galaxy') || combined.includes('astronomy') || combined.includes('cosmos') || combined.includes('universe')) {
    return TOPIC_EDITORIAL_IMAGES.cosmos;
  }
  if (combined.includes('physics') || combined.includes('quantum') || combined.includes('fusion') || combined.includes('particle')) {
    return TOPIC_EDITORIAL_IMAGES.laboratory;
  }

  // Health matches
  if (combined.includes('cancer') || combined.includes('immunotherapy') || combined.includes('tumor') || combined.includes('oncology')) {
    return TOPIC_EDITORIAL_IMAGES.immunotherapy;
  }
  if (combined.includes('gene') || combined.includes('dna') || combined.includes('biotech') || combined.includes('crispr')) {
    return TOPIC_EDITORIAL_IMAGES.genetics;
  }
  if (combined.includes('brain') || combined.includes('neuro') || combined.includes('alzheimer') || combined.includes('mental')) {
    return TOPIC_EDITORIAL_IMAGES.neuroscience;
  }
  if (combined.includes('hospital') || combined.includes('vaccine') || combined.includes('doctor') || combined.includes('medical') || combined.includes('clinic')) {
    return TOPIC_EDITORIAL_IMAGES.clinicalCare;
  }

  // Sports matches
  if (combined.includes('world cup') || combined.includes('soccer') || combined.includes('football') || combined.includes('champions league') || combined.includes('fifa')) {
    return TOPIC_EDITORIAL_IMAGES.worldCupSoccer;
  }
  if (combined.includes('f1') || combined.includes('formula 1') || combined.includes('grand prix') || combined.includes('racing') || combined.includes('nascar')) {
    return TOPIC_EDITORIAL_IMAGES.f1Motorsport;
  }
  if (combined.includes('nba') || combined.includes('basketball') || combined.includes('dunk')) {
    return TOPIC_EDITORIAL_IMAGES.basketball;
  }
  if (combined.includes('tennis') || combined.includes('wimbledon') || combined.includes('open') || combined.includes('federer') || combined.includes('djokovic')) {
    return TOPIC_EDITORIAL_IMAGES.tennis;
  }

  // World & Geopolitics matches
  if (combined.includes('climate summit') || combined.includes('cop') || combined.includes('carbon emission') || combined.includes('pact') || combined.includes('environment')) {
    return TOPIC_EDITORIAL_IMAGES.climateSummit;
  }
  if (combined.includes('united nations') || combined.includes('diplomat') || combined.includes('summit') || combined.includes('treaty') || combined.includes('ambassador')) {
    return TOPIC_EDITORIAL_IMAGES.diplomacy;
  }
  if (combined.includes('global') || combined.includes('international') || combined.includes('metropolis')) {
    return TOPIC_EDITORIAL_IMAGES.globalCity;
  }

  // Politics matches
  if (combined.includes('election') || combined.includes('vote') || combined.includes('ballot') || combined.includes('poll')) {
    return TOPIC_EDITORIAL_IMAGES.voting;
  }
  if (combined.includes('congress') || combined.includes('senate') || combined.includes('capitol') || combined.includes('white house') || combined.includes('parliament')) {
    return TOPIC_EDITORIAL_IMAGES.capitol;
  }
  if (combined.includes('court') || combined.includes('judge') || combined.includes('justice') || combined.includes('supreme court') || combined.includes('ruling')) {
    return TOPIC_EDITORIAL_IMAGES.justice;
  }

  // Entertainment matches
  if (combined.includes('hollywood') || combined.includes('film') || combined.includes('movie') || combined.includes('cinema') || combined.includes('actor') || combined.includes('festival')) {
    return TOPIC_EDITORIAL_IMAGES.cinemaPremiere;
  }
  if (combined.includes('streaming') || combined.includes('netflix') || combined.includes('series') || combined.includes('television')) {
    return TOPIC_EDITORIAL_IMAGES.streaming;
  }
  if (combined.includes('music') || combined.includes('concert') || combined.includes('tour') || combined.includes('album') || combined.includes('grammy')) {
    return TOPIC_EDITORIAL_IMAGES.concert;
  }

  // Category fallback
  switch (category) {
    case 'technology':
      return TOPIC_EDITORIAL_IMAGES.techDefault;
    case 'business':
      return TOPIC_EDITORIAL_IMAGES.businessDefault;
    case 'science':
      return TOPIC_EDITORIAL_IMAGES.scienceDefault;
    case 'health':
      return TOPIC_EDITORIAL_IMAGES.healthDefault;
    case 'sports':
      return TOPIC_EDITORIAL_IMAGES.sportsDefault;
    case 'entertainment':
      return TOPIC_EDITORIAL_IMAGES.entertainmentDefault;
    case 'politics':
      return TOPIC_EDITORIAL_IMAGES.politicsDefault;
    case 'world':
      return TOPIC_EDITORIAL_IMAGES.worldDefault;
    case 'general':
    default:
      return TOPIC_EDITORIAL_IMAGES.newsroom;
  }
};

/**
 * Validates whether an image URL is secure and usable (not generic placeholder, not http)
 */
export const sanitizeImageUrl = (
  imageUrl: string | null | undefined,
  category?: NewsCategory | string,
  title: string = '',
  description: string = ''
): string => {
  if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
    return getRelevantEditorialImage(category, title, description);
  }

  const trimmed = imageUrl.trim();

  // Replace insecure http with https if possible, or swap if it's known broken
  if (trimmed.startsWith('http://')) {
    // Mixed content blocker will fail this on Vercel (https)
    return trimmed.replace('http://', 'https://');
  }

  // Detect generic stock placeholder strings
  const low = trimmed.toLowerCase();
  if (
    low.includes('placeholder') || 
    low.includes('stock-photo') || 
    low.includes('default') || 
    low.includes('518543') // The old generic coffee cup stock photo
  ) {
    return getRelevantEditorialImage(category, title, description);
  }

  return trimmed;
};
