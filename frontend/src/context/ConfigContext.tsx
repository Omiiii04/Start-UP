/**
 * ConfigContext
 *
 * Fetches public configuration from the backend on startup.
 * This avoids the need for frontend env variables beyond VITE_API_URL.
 *
 * Provides:
 *   - googleClientId     — for Google OAuth (GoogleOAuthProvider)
 *   - telegramBotUsername — for Telegram deep links
 *   - isConfigLoaded     — false until the config fetch resolves
 *   - hasGoogleAuth      — true if a valid Google Client ID was returned
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getPublicConfig, PublicConfig } from '../api/client';

interface ConfigContextType {
  config: PublicConfig | null;
  isConfigLoaded: boolean;
  hasGoogleAuth: boolean;
  telegramBotUsername: string;
}

const DEFAULT_TELEGRAM_USERNAME = 'start_up';

const ConfigContext = createContext<ConfigContextType>({
  config: null,
  isConfigLoaded: false,
  hasGoogleAuth: false,
  telegramBotUsername: DEFAULT_TELEGRAM_USERNAME,
});

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<PublicConfig | null>(null);
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getPublicConfig()
      .then((cfg) => {
        if (!cancelled) {
          setConfig(cfg);
          setIsConfigLoaded(true);
        }
      })
      .catch((err) => {
        // Config load failure is non-fatal — app can still function without Google auth
        console.warn('[Config] Could not load app config from backend:', err?.message);
        if (!cancelled) {
          setConfig({ googleClientId: '', telegramBotUsername: DEFAULT_TELEGRAM_USERNAME });
          setIsConfigLoaded(true);
        }
      });

    return () => { cancelled = true; };
  }, []);

  const hasGoogleAuth = Boolean(config?.googleClientId && config.googleClientId.length > 10);
  const telegramBotUsername = config?.telegramBotUsername || DEFAULT_TELEGRAM_USERNAME;

  return (
    <ConfigContext.Provider value={{ config, isConfigLoaded, hasGoogleAuth, telegramBotUsername }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): ConfigContextType => {
  return useContext(ConfigContext);
};
