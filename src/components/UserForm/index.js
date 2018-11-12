// @flow
import * as React from 'react'
import type { User } from '../../types'
import { TextField, Button } from '@material-ui/core'
import { ImgWrapper, Photo } from '../UserTile'

type Props = {
  user: ?User,
  updateUser: Function,
  loading: boolean,
}

class UserForm extends React.Component<Props> {
  nameRef: ?HTMLInputElement
  macRef: ?HTMLInputElement

  onClickButton = () => {
    if (!this.nameRef || !this.macRef) {
      return
    }
    const name = this.nameRef.value
    const macAddrs = this.macRef.value
      .split(',')
      .filter(v => !!v)
      .map(v => v.toLowerCase().replace(/-/g, ':'))
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
          <ImgWrapper>
            <Photo data-timeout={true} src={props.user.photoURL} alt="" />
          </ImgWrapper>
          <TextField
            style={{ minWidth: '300px', margin: '8px' }}
            label="名前"
            disabled={props.loading}
            inputRef={ref => (this.nameRef = ref)}
            defaultValue={props.user.name || props.user.displayName}
          />
          <TextField
            style={{ minWidth: '300px', margin: '8px' }}
            label="MACアドレス"
            disabled={props.loading}
            helperText="複数登録はカンマ(,)区切り"
            inputRef={ref => (this.macRef = ref)}
            defaultValue={(props.user.macAddrs || []).join(',')}
          />
        </div>
        <Button
          style={{ marginTop: '10px' }}
          variant="contained"
          disabled={props.loading}
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
