// @flow

import * as React from 'react'
import { createGlobalStyle } from 'styled-components'

import styled from 'styled-components'
import { Grid } from '@material-ui/core'

export const Button = styled.button`
  background: white;
  margin: 2px;
  padding: 2px;
  border: 1px;
`

export const CardContainer = styled.div`
  border: solid #ddd 1px;
  border-radius: 5px;
  min-width: 100px;
  padding: 5px;
  margin-left: 5px;
`

export const Page = (props: Object) => (
  <Grid container justify={'center'}>
    <Grid item xs={12} sm={12} md={10} {...props} />
  </Grid>
)

export const GlobalStyle = createGlobalStyle`
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI',
  'Noto Sans Japanese', 'ヒラギノ角ゴ ProN W3', Meiryo, sans-serif;
  margin: 0;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

td {
  text-align: center;
}

* {
  cursor:'pointer'
}
`
