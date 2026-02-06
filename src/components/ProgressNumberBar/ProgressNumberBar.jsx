import { h } from 'preact'
import './style.scss'
import consts from '../../consts'

const { PROGRESS_NUMBER_WRAPPER_CLASSNAME } = consts

const DISPLAY_NAME = 'ProgressNumberBar'

const Component = props => {
	const {
		current,
		total,
	} = props

	if (!current || !total) {
		return null
	}

	return (
		<div className={PROGRESS_NUMBER_WRAPPER_CLASSNAME}>
			{current} / {total}
		</div>
	)
}

Component.displayName = DISPLAY_NAME

export default Component
