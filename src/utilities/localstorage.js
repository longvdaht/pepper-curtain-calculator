import config from '../config'

const { LOCALSTORAGE_KEY } = config

const loadLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem(LOCALSTORAGE_KEY)
		if (!serializedState) {
			return []
		}
		return JSON.parse(serializedState)
	} catch (error) {
		return []
	}
}

const setLocalStorage = state => {
	try {
		const serializedState = JSON.stringify(state)
		localStorage.setItem(LOCALSTORAGE_KEY, serializedState)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('There was an error setting the local storage.')
	}
}

const unsetLocalStorage = () => localStorage.removeItem(LOCALSTORAGE_KEY)

export {
	loadLocalStorage,
	setLocalStorage,
	unsetLocalStorage,
}
