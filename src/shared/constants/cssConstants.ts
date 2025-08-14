export const CSS_CONSTANTS = {
  colors: {
    primary: '#4A90E2',
    primaryHover: '#357ABD',
    text: '#FFFFFF',
    textSecondary: '#A0A0A0',
    background: '#2F3645',
    backgroundSecondary: '#22262F',
    backgroundTertiary: '#3A4252',
    backgroundHover: '#5A6270',
    border: '#4A5260',
    error: '#DC3545',
    overlay: 'rgba(0, 0, 0, 0.5)',
    active: 'rgba(74, 144, 226, 0.7)',
    activeHover: 'rgba(53, 122, 189, 0.8)',
    hover: 'rgba(58, 66, 82, 0.6)',
  },
  spacing: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
  },
  typography: {
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: 'bold',
    },
    lineHeight: {
      tight: '1.1',
      normal: '1.5',
    },
  },
  borders: {
    radius: {
      sm: '4px',
      md: '6px',
      lg: '10px',
    },
    width: '1px',
  },
  effects: {
    transition: '0.2s',
    zIndex: {
      modal: '1000',
    },
  },
} as const; 