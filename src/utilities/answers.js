import { assoc, prop, uniq } from 'ramda'

import { loadLocalStorage, setLocalStorage, unsetLocalStorage } from './localstorage'

const mostRecentAnswer = (questionId, tags) => {
	const matchingAnswers = tags.filter(([id]) => id === questionId)
	if (!matchingAnswers || !matchingAnswers.length) return undefined
	return matchingAnswers[matchingAnswers.length - 1]
}

const setAnswer = (key, value) => {
	const currentState = loadLocalStorage()
	const newState = [
		...currentState,
		[key, value],
	]
	setLocalStorage(newState)
}

const setAnswers = answersObject => {
	const currentState = loadLocalStorage()
	const keys = Object.keys(answersObject)
	const newAnswers = keys.map(key => [key, answersObject[key]])
	const newState = [
		...currentState,
		...newAnswers,
	]
	setLocalStorage(newState)
}

const getAnswer = key => {
	const currentState = loadLocalStorage()
	const answer = mostRecentAnswer(key, currentState)
	return prop(1, answer)
}

const getAllMostRecentAnswers = () => {
	const currentState = loadLocalStorage()
	const allKeys = currentState.map(([x]) => x)
	const uniqueKeys = uniq(allKeys)
	const answers = uniqueKeys.reduce((acc, key) => {
		const value = prop(1, mostRecentAnswer(key, currentState))
		return assoc(key, value, acc)
	}, {})
	return answers
}

const getAllAnswers = () => loadLocalStorage()

const removeAllAnswers = unsetLocalStorage

export {
	mostRecentAnswer,
	setAnswer,
	setAnswers,
	getAnswer,
	getAllMostRecentAnswers,
	getAllAnswers,
	removeAllAnswers,
}
