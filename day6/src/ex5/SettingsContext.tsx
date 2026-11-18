import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type SettingsState = {
  notify: boolean;
  dark: boolean;
  setNotify: (value: boolean) => void;
  setDark: (value: boolean) => void;
};

const SettingsContext = createContext<SettingsState | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  const value = useMemo(() => ({ notify, dark, setNotify, setDark }), [notify, dark]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings phải được dùng bên trong SettingsProvider.');
  return context;
}

export function useDrawerPalette() {
  const { dark } = useSettings();
  return dark
    ? { background: '#111827', surface: '#1F2937', text: '#F9FAFB', muted: '#B8C1D0', line: '#374151', accentBackground: '#432621' }
    : { background: '#F4F5F7', surface: '#FFFFFF', text: '#1F2430', muted: '#6B7280', line: '#D8DCE3', accentBackground: '#FFF1EF' };
}
