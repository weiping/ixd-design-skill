// tailwind.config.js — Tailwind theme extension for Phase 6 design tokens
// Fill in <<placeholders>> from doc/ixd/phase6-visual.md
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
        // Functional colors
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        destructive: 'hsl(var(--destructive))',
      },
      fontSize: {
        'display': ['<<Display-size>>', { lineHeight: '<<line-height>>' }],
        'h1': ['<<H1-size>>', { lineHeight: '<<line-height>>', fontWeight: '600' }],
        'h2': ['<<H2-size>>', { lineHeight: '<<line-height>>', fontWeight: '600' }],
        'body': ['<<Body-size>>', { lineHeight: '<<line-height>>' }],
        'caption': ['<<Caption-size>>', { lineHeight: '<<line-height>>' }],
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)', // Mobile safe area
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
    }
  }
};
