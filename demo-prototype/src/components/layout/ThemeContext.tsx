import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';

/**
 * Provided by PrototypeShell; consumed by PhoneFrame / WindowFrame.
 * Propagates the shell's theme toggle to every device frame automatically —
 * no need to pass theme="light/dark" as a prop on each page.
 */
export const ThemeContext = createContext<Theme>('light');

/**
 * Returns the current prototype theme ('light' | 'dark').
 * Use inside page components to style theme-sensitive elements
 * without hardcoding colors.
 *
 * Example:
 *   const theme = useTheme();
 *   <div className={theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}>
 *
 * Prefer Tailwind tokens (bg-background / text-foreground / dark: variants)
 * over raw hex or neutral-* values whenever possible.
 */
export const useTheme = () => useContext(ThemeContext);
