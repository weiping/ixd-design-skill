// src/pages/__tests__/CommunityHome.test.tsx
// Mobile page test template — copy and adapt for each page
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommunityHome } from '../CommunityHome';

describe('CommunityHome', () => {
  // ① Smoke — renders without crashing (catches import errors, undefined vars)
  it('renders without crashing', () => {
    expect(() => render(<CommunityHome />)).not.toThrow();
  });

  // ② Device frame — MUST wrap in PhoneFrame (data-testid="phone-frame" built-in)
  it('wraps in PhoneFrame', () => {
    const { getByTestId } = render(<CommunityHome />);
    expect(getByTestId('phone-frame')).toBeInTheDocument();
  });

  // ③ Key content — replace with actual content from Phase 4 spec
  it('shows main content area', () => {
    render(<CommunityHome />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  // ④ Key interaction — add per Phase 4 interaction spec (optional but recommended)
  it('clicking a feed card opens detail', async () => {
    const user = userEvent.setup();
    render(<CommunityHome />);
    // implement per Phase 4 spec
  });
});
