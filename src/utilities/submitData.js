import { getAllMostRecentAnswers, removeAllAnswers } from './answers'
import config from '../config'

const { QUESTIONNAIRE_COMPLETED_EVENT_ID } = config

const submitData = ({ customerEmail }) => {
	const allMostRecentAnswers = getAllMostRecentAnswers()
	window._learnq = window._learnq || []
	window._learnq.push([ 'identify', {
		'$email': customerEmail,
	}])
	window._learnq.push([ 'track',
		QUESTIONNAIRE_COMPLETED_EVENT_ID,
		allMostRecentAnswers,
	])
	removeAllAnswers()
}

export default submitData
