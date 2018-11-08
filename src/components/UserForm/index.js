// @flow
import * as React from 'react'
import type { User } from '../../types'
import { Grid } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'

type Props = {
  user: ?User,
  updateUser: Function,
}

class UserForm extends React.Component<Props> {
  nameRef: ?HTMLInputElement
  macRef: ?HTMLInputElement

  onClickButton = () => {
    if (!this.nameRef || !this.macRef) {
      return
    }
    const name = this.nameRef.value
    const macAddrs = this.macRef.value.split(',').filter(v => !!v)
    this.props.updateUser({ ...this.props.user, name, macAddrs })
  }

  render() {
    const { props } = this
    if (!props.user) {
      return <div>loading</div>
    }
    return (
      <form noValidate autoComplete="off">
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <TextField
            style={{ minWidth: '300px', paddingLeft: '8px' }}
            label="名前"
            inputRef={ref => (this.nameRef = ref)}
            defaultValue={props.user.name || props.user.displayName}
          />
          <TextField
            label="Macアドレス"
            style={{ minWidth: '300px', paddingLeft: '8px' }}
            helperText="複数登録はカンマ(,)区切り"
            inputRef={ref => (this.macRef = ref)}
            defaultValue={(props.user.macAddrs || []).join(',')}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.onClickButton}
        >
          保存
        </Button>
      </form>
    )
  }
}

export default UserForm
