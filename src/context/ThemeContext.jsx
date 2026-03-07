import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { preferencesApi } from '../api/preferencesApi';

const ThemeContext = createContext(null);

function applyTheme(dark) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  // Carrega preferência do banco ao montar
  useEffect(() => {
    preferencesApi.get()
      .then(pref => {
        const isDark = pref?.theme === 'dark';
        setDark(isDark);
        applyTheme(isDark);
      })
      .catch(() => {
        // API indisponível — mantém light como padrão
      });
  }, []);

  const toggleTheme = useCallback(() => {
    setDark(prev => {
      const next = !prev;
      applyTheme(next);
      // Salva no banco sem bloquear a UI
      preferencesApi.update(next ? 'dark' : 'light').catch(() => {});
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
