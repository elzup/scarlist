// @flow

import { createMuiTheme } from '@material-ui/core/styles'
import lightBlue from '@material-ui/core/colors/lightBlue'

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: {
      main: '#c51162',
    },
  },
  typography: {
    useNextVariants: true,
    h4: {
      padding: '20px',
    },
    h6: {
      padding: '10px',
    },
  },
  paper: {
    padding: '10px',
  },
  tableCell: {
    textAlign: 'center',
  },
  overrides: {
    MuiGrid: {
      container: {
        marginBottom: '30px',
      },
    },
    MuiPaper: {
      root: {
        marginTop: '20px',
        padding: '5px',
      },
    },
    MuiAppBar: {
      root: {
        padding: 0,
        margin: 0,
      },
    },
    MuiChip: {
      root: {
        marginLeft: '10px',
        height: '28px',
      },
      avatar: {
        height: '28px',
        width: '28px',
      },
    },
    MuiButton: {
      root: {
        minWidth: '60px',
      },
    },
    MuiSvgIcon: {
      root: {
        width: '0.8em',
        height: '0.8em',
      },
    },
    MuiListItem: {
      default: {
        paddingTop: '3px',
        paddingBottom: '3px',
      },
    },
  },
})
export default theme
