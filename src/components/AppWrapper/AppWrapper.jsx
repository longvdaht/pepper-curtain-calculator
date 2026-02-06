import { h } from 'preact'
import './style.scss'
import consts from '../../consts'

const { APP_WRAPPER_CLASSNAME } = consts

const DISPLAY_NAME = 'AppWrapper'

const Component = ({ children }) => (
	<div className={APP_WRAPPER_CLASSNAME}>
		{children}
	</div>
)

Component.displayName = DISPLAY_NAME

export default Component
