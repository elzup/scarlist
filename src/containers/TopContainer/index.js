// @flow
import { connect } from 'react-redux'
import * as React from 'react'

import type { State as RootState } from '../../types'
import RoomListContainer from '../RoomListContainer'

import { loadData } from './logic'
import { Page } from '../../components'
// import * as selectors from './selectors'
import UserForm from '../UserForm'
import { Typography } from '@material-ui/core'
import { Paper } from '@material-ui/core'

type Props = {
  loadData: typeof loadData,
  roomIds: string[],
}

class TopContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    return (
      <div>
        <Page>
          <RoomListContainer />
          <Paper>
            <UserForm />
          </Paper>
          <Paper>
            <Typography variant="h5">Macアドレスの調べ方</Typography>
            <Typography>
              ※目的のアクセスポイントに接続している状態で調べてください。
            </Typography>
            <section>
              <Typography variant="h6">iOS</Typography>
              <Typography>設定 > 一般 > 情報 > Wi-Fi アドレス</Typography>

              <Typography variant="h6">Android</Typography>
              <Typography>
                設定 > ネットワークとインターネット > Wi-Fi >
                (アクセスポイントを選択) > ネットワークの詳細
              </Typography>

              <Typography variant="h6">Mac</Typography>
              <Typography>
                <code>
                  {
                    "ifconfig <Interface ex:eth0,eth1> | awk '/ether/{print $2}'"
                  }
                </code>
              </Typography>

              <Typography variant="h6">Linux</Typography>
              <Typography>
                <code>
                  {
                    "ifconfig <Interface ex:eth0,eth1> | grep -o -E '([[:xdigit:]]{1,2}:){5}[[:xdigit:]]{1,2}'"
                  }
                </code>
              </Typography>

              <Typography variant="h6">Windows</Typography>
              <Typography>
                <a href="https://121ware.com/qasearch/1007/app/servlet/qadoc?QID=017966">
                  参考リンク
                </a>
              </Typography>
            </section>
          </Paper>
        </Page>
      </div>
    )
  }
}

const ms = (state: RootState) => ({})

const conn = connect(
  ms,
  { loadData },
)

export default conn(TopContainer)
