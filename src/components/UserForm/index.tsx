import * as React from 'react'
import { TextField, Button, Typography } from '@material-ui/core'
import { User } from '../../types'
import { ImgWrapper, Photo } from '../UserTile'

type Props = {
  user: User | null
  updateUser: (prop: User) => void
  loading: boolean
}

function UserForm(props: Props) {
  const { user } = props

  console.log(user)

  const [name, setName] = React.useState<string>('')
  const [macAddr, setMacAddr] = React.useState<string>(
    user?.macAddrs?.join(',') || '',
  )

  const macAddrs = macAddr
    .split(',')
    .filter(v => !!v)
    .map(v => v.toLowerCase().replace(/-/g, ':'))

  if (!user) {
    return <div>loading</div>
  }
  return (
    <>
      <form noValidate autoComplete="off">
        <ImgWrapper style={{ width: '100px' }}>
          <Photo data-timeout src={user.photoURL} alt="" />
        </ImgWrapper>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <TextField
            style={{ minWidth: '300px', margin: '8px' }}
            label="名前"
            disabled={props.loading}
            onChange={e => setName(e.target.value)}
            defaultValue={user.name || user.displayName}
          />
          <TextField
            style={{ minWidth: '300px', margin: '8px' }}
            label="MACアドレス"
            disabled={props.loading}
            onChange={e => setMacAddr(e.target.value)}
            helperText="複数登録はカンマ(,)区切り"
            defaultValue={macAddr}
          />
        </div>
        <Button
          style={{ marginTop: '10px' }}
          variant="contained"
          disabled={props.loading}
          color="primary"
          onClick={() => {
            props.updateUser({ ...user, name, macAddrs })
          }}
        >
          保存
        </Button>
      </form>
      <Typography>
        アイコンはGoogleアカウントのものになります。
        <a href="https://aboutme.google.com/">変更</a>
      </Typography>
    </>
  )
}

export default UserForm
