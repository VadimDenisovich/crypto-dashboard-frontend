import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3b82f6' },
    success: { main: '#22c55e' },
    error: { main: '#ef4444' },
    warning: { main: '#f97316' },
    info: { main: '#0ea5e9' },
    background: { default: '#0b0e14', paper: '#1e222d' },
    divider: '#2a2e39',
    text: { primary: '#f8fafc', secondary: '#94a3b8' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '1.5rem', fontWeight: 700 },
    h2: { fontSize: '1.25rem', fontWeight: 600 },
    h3: { fontSize: '1.125rem', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { backgroundImage: 'none', boxShadow: 'none', border: '1px solid #2a2e39', borderRadius: 12 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#131722', borderRight: '1px solid #2a2e39' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#131722', borderBottom: '1px solid #2a2e39', backgroundImage: 'none', boxShadow: 'none' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: '1px solid #2a2e39', padding: '12px 16px' },
        head: { color: '#94a3b8', fontWeight: 600, backgroundColor: 'rgba(19, 23, 34, 0.5)' },
      },
    },
  },
});