import { h, createRef } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { append, is, last } from 'ramda'

import questionnaireData from '../../data/questionnaireData'
import config from '../../config'
import { getAllMostRecentAnswers, getAnswer, removeAllAnswers } from '../../utilities/answers'

import AppWrapper from '../AppWrapper'
import QuestionnairePageTemplate from '../QuestionnairePageTemplate'
import ContentWrapper from '../ContentWrapper'
import ProgressNumberBar from '../ProgressNumberBar'

const {
	PAGE_SEARCHPARAMS_KEY,
	SHOW_PROGRESS_BAR,
	SHOW_PROGRESS_NUMBER,
	RESET_SCROLL_ON_PAGE_CHANGE,
} = config

const DISPLAY_NAME = 'Questionnaire'

const firstPageId = questionnaireData[0].id
const lastPageId = questionnaireData[questionnaireData.length - 1].id

const getPageIdFromQueryParam = () => {
	const { location } = window
	const currentUrl = new URL(location)
	const pageId = currentUrl.searchParams.get(PAGE_SEARCHPARAMS_KEY)
	const isPage = questionnaireData.findIndex(x => x.id === pageId) !== -1
	return isPage ? pageId : undefined
}

const Component = ({ customerEmail }) => {
	const [ pageHistoryTrace, setPageHistoryTrace ] = useState(() => (
		[ getPageIdFromQueryParam() || firstPageId ]
	))
	const pushPageHistoryTrace = pageId => {
		const newPageHistoryTrace = append(pageId, pageHistoryTrace)
		setPageHistoryTrace(newPageHistoryTrace)
	}

	const currentPageId = last(pageHistoryTrace)
	
	const currentPageIndex = questionnaireData.findIndex(x => x.id === currentPageId)
	const currentPage = questionnaireData[currentPageIndex]
	const currentPageNumber = currentPageIndex + 1
	const isFirstPage = currentPageId === firstPageId
	const isLastPage = currentPageId === lastPageId
	const nextPageIndex = !isLastPage ? (currentPageIndex + 1) : null
	const nextPageId = !isLastPage ? questionnaireData[nextPageIndex].id : null
	const previousPageIndex = !isFirstPage ? (currentPageIndex - 1) : null
	const previousPageId = !isFirstPage ? questionnaireData[previousPageIndex].id : null

	const handleGoToNextPage = () => {
		if (is(String, currentPage.nextPageId)) {
			pushPageHistoryTrace(currentPage.nextPageId)
			return
		}
		if (is(Function, currentPage.nextPageId)) {
			const nextPageId = currentPage.nextPageId({
				answer: getAnswer(currentPageId),
				answers: getAllMostRecentAnswers(),
			})
			pushPageHistoryTrace(nextPageId)
			return
		}
		pushPageHistoryTrace(nextPageId)
	}

	const handleGoToPreviousPage = () => {
		if (is(String, currentPage.previousPageId)) {
			pushPageHistoryTrace(currentPage.previousPageId)
			return
		}
		if (is(Function, currentPage.previousPageId)) {
			const previousPageId = currentPage.previousPageId({
				answer: getAnswer(currentPageId),
				answers: getAllMostRecentAnswers(),
			})
			pushPageHistoryTrace(previousPageId)
			return
		}
		pushPageHistoryTrace(previousPageId)
	}

	const handleResetButton = () => {
		removeAllAnswers();
		pushPageHistoryTrace(firstPageId)
	}

	useEffect(() => {
		const handlePopState = () => {
			const pageId = getPageIdFromQueryParam()

			if (!pageId) {
				pushPageHistoryTrace(firstPageId)
				return
			}

			pushPageHistoryTrace(pageId)
		}

		window.addEventListener('popstate', handlePopState)
		return () => window.removeEventListener('popstate', handlePopState)
	}, [ firstPageId ])

	useEffect(() => {
		const  { history, location } = window
		const currentUrl = new URL(location)
		const existing = currentUrl.searchParams.get(PAGE_SEARCHPARAMS_KEY)

		if (existing === currentPageId) {
			return
		}

		currentUrl.searchParams.set(PAGE_SEARCHPARAMS_KEY, currentPageId)
		history.pushState({}, document.title, currentUrl)
	}, [currentPageId])

	const progressPercent = currentPageIndex === 24 ? 100 : (currentPageIndex / questionnaireData.length) * 100
	const progressPercentFormatted = `${progressPercent}%`
	const showBackButton = !isFirstPage
	const showNextButton = !isLastPage

	const topRef = createRef(null);

	useEffect(() => {
		if (!RESET_SCROLL_ON_PAGE_CHANGE) {
			return
		}
		if (!topRef || currentPageIndex === 0) return;
		window.scroll(0, topRef.current.base.offsetTop - 100)
		// questionRef.current?.scrollIntoView({
		// 	block: 'start',
		// 	behavior: 'auto'
		// })
		// window.scroll(0, 0)
	}, [ currentPage.id, topRef ])

	return (
		<AppWrapper ref={topRef}>
			{SHOW_PROGRESS_BAR && (
				<progress
					value={progressPercent}
					max="100"
				>
					{progressPercentFormatted}
				</progress>
			)}
			{SHOW_PROGRESS_NUMBER && (
				<ProgressNumberBar
					current={currentPageNumber}
					total={questionnaireData.length}
				/>
			)}
			<ContentWrapper>
				{currentPage.pageComponent ? (
					<currentPage.pageComponent
						onGoToNextPage={handleGoToNextPage}
						onReset={handleResetButton}
					/>
				) : (
					<QuestionnairePageTemplate
						id={currentPage.id}
						key={currentPage.id}
						onGoToNextPage={handleGoToNextPage}
						onGoToPreviousPage={handleGoToPreviousPage}
						questions={currentPage.questions}
						showBackButton={showBackButton}
						showNextButton={showNextButton}
						stepText={currentPage.stepText}
						title={currentPage.title}
						helperText={currentPage.helperText}
						measurementText={currentPage.measurementText}
					/>
				)}
			</ContentWrapper>
		</AppWrapper>
	)
}

Component.displayName = DISPLAY_NAME

export default Component
