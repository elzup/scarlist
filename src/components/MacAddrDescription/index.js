// @flow
import * as React from 'react'
import { Typography } from '@material-ui/core'

type Props = {}

const MacAddrDescription = (props: Props) => (
  <>
    <Typography variant="h5">Macアドレスの調べ方</Typography>
    <Typography>
      ※目的のアクセスポイントに接続している状態で調べてください。
    </Typography>
    <section>
      <Typography variant="h6">Mac</Typography>
      <Typography>
        <a
          href="https://www.webantena.net/mac/os-x-sierra-macaddress/"
          target="_blank"
          rel="noopener noreferrer"
        >
          [Mac]Mac OS
          SierraでMACアドレスを確認する方法｜Mac｜WEBデザインの小ネタとTIPSのまとめサイト「ウェブアンテナ」
        </a>
        <br />
        <code>{"$ ifconfig en0 | awk '/ether/{print $2}'"}</code>
      </Typography>

      <Typography variant="h6">Linux</Typography>
      <Typography>
        <a
          href="https://www.akakagemaru.info/port/linux.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Linux IPアドレス Macアドレス 確認方法
        </a>
        <br />
        <code>
          {
            "$ ifconfig en0 | grep -o -E '([[:xdigit:]]{1,2}:){5}[[:xdigit:]]{1,2}'"
          }
        </code>
      </Typography>

      <Typography variant="h6">Windows</Typography>
      <Typography>
        <a
          href="https://121ware.com/qasearch/1007/app/servlet/qadoc?QID=017966"
          target="_blank"
          rel="noopener noreferrer"
        >
          121ware.com &gt; サービス＆サポート &gt; Q&amp;A &gt; Q&amp;A番号
          017966
        </a>
      </Typography>

      <Typography variant="h6">Android</Typography>
      <Typography>
        設定 > ネットワークとインターネット > Wi-Fi > (アクセスポイントを選択) >
        ネットワークの詳細
      </Typography>

      <Typography variant="h6">iOS</Typography>
      <Typography color="secondary">※iOS は動作しない可能性あり</Typography>
      <Typography>設定 > 一般 > 情報 > Wi-Fi アドレス</Typography>
    </section>
  </>
)

export default MacAddrDescription
