import { createMuiTheme } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
import red from '@material-ui/core/colors/red'

export const palette = {
  primary: orange,
  secondary: red,
}

const baseTheme = createMuiTheme()
const theme = createMuiTheme({
  palette,
  overrides: {
    MuiGrid: {
      container: {
        marginBottom: '30px',
      },
    },
    MuiPaper: {
      root: {
        marginTop: '8px',
        padding: '8px',
        [baseTheme.breakpoints.up('md')]: {
          padding: '12px',
        },
      },
    },
    MuiAppBar: {
      root: {
        padding: 0,
        margin: 0,
      },
    },
    MuiButton: {
      root: {
        minWidth: '60px',
      },
    },
  },
})

export default theme
