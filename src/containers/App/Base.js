// HACKME
import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { refInit } from '../Firebase/logic'
import { getRedirect } from '../Redirect/selectors'
import { clearRedirect } from '../Redirect/actions'

type Props = {
	refInit: Function,
	redirect: ?string,
	clearRedirect: typeof clearRedirect,
}

class Base extends React.Component<Props> {
	componentDidMount() {
		this.props.refInit()
	}
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.node.childNodes[0].scrollTop = 0
		}
	}

	render() {
		if (this.props.redirect !== null) {
			this.props.clearRedirect()
			return <Redirect to={this.props.redirect} />
		}
		return (
			<div
				ref={node => {
					this.node = node
				}}
			>
				{this.props.children}
			</div>
		)
	}
}

const ms = (state: State) => ({
	redirect: getRedirect(state),
})

const conn = connect(ms, { refInit, clearRedirect })

export default conn(Base)
