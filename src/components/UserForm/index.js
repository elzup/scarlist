// @flow
import * as React from 'react'
import type { User } from '../../types'
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
        <TextField
          label="名前"
          inputRef={ref => (this.nameRef = ref)}
          defaultValue={props.user.name || props.user.displayName}
        />
        <TextField
          label="Macアドレス"
          helperText="複数登録はカンマ(,)区切り"
          inputRef={ref => (this.macRef = ref)}
          defaultValue={(props.user.macAddrs || []).join(',')}
        />
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
