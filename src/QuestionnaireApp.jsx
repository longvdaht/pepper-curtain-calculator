import { h } from 'preact'
import './styles/global.scss'

import Questionnaire from './components/Questionnaire'

const App = ({ customerEmail }) => {
	return <Questionnaire customerEmail={customerEmail} />
}

export default App
