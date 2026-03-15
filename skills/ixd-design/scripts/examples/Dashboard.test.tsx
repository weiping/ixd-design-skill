// src/pages/desktop/__tests__/Dashboard.test.tsx
// Desktop page test template — copy and adapt for each page
import { render, screen } from '@testing-library/react';
import { Dashboard } from '../Dashboard';

describe('Dashboard', () => {
  // ① Smoke — renders without crashing
  it('renders without crashing', () => {
    expect(() => render(<Dashboard />)).not.toThrow();
  });

  // ② Device frame — MUST wrap in WindowFrame (data-testid="window-frame" built-in)
  it('wraps in WindowFrame', () => {
    const { getByTestId } = render(<Dashboard />);
    expect(getByTestId('window-frame')).toBeInTheDocument();
  });

  // ③ Key content — replace with actual content from Phase 4 spec
  it('shows dashboard content', () => {
    render(<Dashboard />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
