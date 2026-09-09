import { NavTab } from '../components/common/Header';

export interface NavigationState {
  tab: NavTab;
  query?: string;
  templateId?: string;
  modal?: string | null;
}

export const TAB_PATH_MAP: Record<NavTab, string> = {
  home: '/',
  browse: '/browse',
  submit: '/submit',
  dashboard: '/dashboard',
  admin: '/admin',
  download: '/download',
  reviews: '/reviews',
  bestseller: '/bestseller',
};

export const PATH_TO_TAB_MAP: Record<string, NavTab> = {
  '': 'home',
  '/': 'home',
  'home': 'home',
  '/home': 'home',
  'browse': 'browse',
  '/browse': 'browse',
  'submit': 'submit',
  '/submit': 'submit',
  'dashboard': 'dashboard',
  '/dashboard': 'dashboard',
  'admin': 'admin',
  '/admin': 'admin',
  'download': 'download',
  '/download': 'download',
  'reviews': 'reviews',
  '/reviews': 'reviews',
  'bestseller': 'bestseller',
  '/bestseller': 'bestseller',
};

const STORAGE_ACTIVE_TAB_KEY = 'pw_active_tab';
const STORAGE_SAVED_QUERY_KEY = 'pw_search_query';

/**
 * Parses the current window location (path, query, hash) into a NavigationState object.
 */
export function parseLocation(): NavigationState {
  if (typeof window === 'undefined') {
    return { tab: 'home', query: '', modal: null };
  }

  // 1. Check hash first for fallback/hash-routing support (e.g. #/browse, #browse)
  const rawHash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  
  // 2. Normalize pathname
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  
  // 3. Search parameters
  const searchParams = new URLSearchParams(window.location.search);

  let tab: NavTab = 'home';
  if (rawHash && PATH_TO_TAB_MAP[rawHash]) {
    tab = PATH_TO_TAB_MAP[rawHash];
  } else if (PATH_TO_TAB_MAP[pathname]) {
    tab = PATH_TO_TAB_MAP[pathname];
  } else {
    // If unknown nested path, check first segment e.g. /browse/item -> browse
    const firstSegment = pathname.split('/').filter(Boolean)[0];
    if (firstSegment && PATH_TO_TAB_MAP[firstSegment]) {
      tab = PATH_TO_TAB_MAP[firstSegment];
    } else {
      // Check session storage if root
      const savedTab = sessionStorage.getItem(STORAGE_ACTIVE_TAB_KEY) as NavTab | null;
      if (savedTab && TAB_PATH_MAP[savedTab] && pathname === '/') {
        tab = savedTab;
      }
    }
  }

  const query = searchParams.get('q') || searchParams.get('search') || sessionStorage.getItem(STORAGE_SAVED_QUERY_KEY) || '';
  const templateId = searchParams.get('template') || undefined;
  const historyState = window.history.state;
  const modal = historyState?.modal || (searchParams.get('support') === '1' ? 'support' : null);

  return {
    tab,
    query,
    templateId,
    modal,
  };
}

/**
 * Constructs a clean URL string based on the tab and optional search query / template.
 */
export function buildUrl(
  tab: NavTab, 
  params?: { query?: string; templateId?: string; support?: boolean }
): string {
  const basePath = TAB_PATH_MAP[tab] || '/';
  const searchParams = new URLSearchParams();

  if (tab === 'browse' && params?.query && params.query.trim()) {
    searchParams.set('q', params.query.trim());
  }
  if (tab === 'submit' && params?.templateId) {
    searchParams.set('template', params.templateId);
  }
  if (params?.support) {
    searchParams.set('support', '1');
  }

  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Pushes a new state to the browser history and updates the address bar URL.
 */
export function pushNavigation(
  tab: NavTab, 
  params?: { query?: string; templateId?: string; modal?: string | null; support?: boolean }
): void {
  if (typeof window === 'undefined') return;

  sessionStorage.setItem(STORAGE_ACTIVE_TAB_KEY, tab);
  if (params?.query !== undefined) {
    sessionStorage.setItem(STORAGE_SAVED_QUERY_KEY, params.query);
  }

  const url = buildUrl(tab, params);
  const state: NavigationState = {
    tab,
    query: params?.query || '',
    templateId: params?.templateId,
    modal: params?.modal || null,
  };

  window.history.pushState(state, '', url);
}

/**
 * Replaces the current state in browser history without creating a new entry.
 */
export function replaceNavigation(
  tab: NavTab, 
  params?: { query?: string; templateId?: string; modal?: string | null; support?: boolean }
): void {
  if (typeof window === 'undefined') return;

  sessionStorage.setItem(STORAGE_ACTIVE_TAB_KEY, tab);
  if (params?.query !== undefined) {
    sessionStorage.setItem(STORAGE_SAVED_QUERY_KEY, params.query);
  }

  const url = buildUrl(tab, params);
  const state: NavigationState = {
    tab,
    query: params?.query || '',
    templateId: params?.templateId,
    modal: params?.modal || null,
  };

  window.history.replaceState(state, '', url);
}
