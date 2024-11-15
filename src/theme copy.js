import { createTheme } from '@mui/material/styles';

const primarycolor = '#02363a';
const inputlabelcolor = 'rgb(32, 32, 32)';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: primarycolor, // Custom hover border color for default or primary color
            },
            '&.Mui-focused fieldset:not(.Mui-error)': {
              borderColor: primarycolor, // Custom focus border color (excluding error state)
            },
          },
          '& .MuiInputLabel-root': {
            color: inputlabelcolor, // Default label color
          },
          '& .MuiInputLabel-root.Mui-focused:not(.Mui-error)': {
            color: primarycolor, // Custom label color when focused (excluding error state)
          },
          '&.MuiTextField-root:not(.Mui-error):not([class*="Mui-error"])': {
            '& .MuiOutlinedInput-root:hover fieldset': {
              borderColor: primarycolor,
            },
            '& .MuiOutlinedInput-root.Mui-focused fieldset': {
              borderColor: primarycolor,
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: primarycolor,
            },
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          // General button styles
        },
        containedPrimary: {
          backgroundColor: primarycolor, // Default primary button color
          '&:hover': {
            backgroundColor: '#011f22', // Hover primary button color
          },
        },
        outlinedPrimary: {
          borderColor: primarycolor, // Default border color
          color: primarycolor, // Default text color
          '&:hover': {
            borderColor: primarycolor,
            backgroundColor: 'rgba(2, 54, 58, 0.02)', // Hover background color
            boxShadow: `inset 0 0 0 0.4px ${primarycolor}`, // Subtle shadow for hover effect
          },
        },
        containedError: {}, // Keep default error styles
        outlinedError: {}, // Keep default error styles
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1b4d4f', // Hover border color
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline:not(.Mui-error)': {
            borderColor: primarycolor, // Focus border color (excluding error state)
          },
        },
        icon: {
          color: primarycolor, // Dropdown arrow icon color
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: inputlabelcolor, // Default label color
          '&.Mui-focused:not(.Mui-error)': {
            color: primarycolor, // Focused label color (excluding error state)
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#9e9e9e', // Default color for unselected radio buttons
          '&.Mui-checked': {
            color: primarycolor, // Color for selected radio buttons
          },
          '&:hover': {
            backgroundColor: 'rgba(2, 54, 58, 0.08)', // Hover effect color (slightly tinted background)
          },
        },
      },
    },
  },
});

export default theme;
