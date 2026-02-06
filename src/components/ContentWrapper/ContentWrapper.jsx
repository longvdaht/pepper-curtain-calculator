import { h } from 'preact'
import './style.scss'
import consts from '../../consts'

const { CONTENT_WRAPPER_CLASSNAME } = consts

const DISPLAY_NAME = 'ContentWrapper'

const Component = ({ children }) => (
	<div className={CONTENT_WRAPPER_CLASSNAME}>
		{children}
	</div>
)

Component.displayName = DISPLAY_NAME

export default Component
