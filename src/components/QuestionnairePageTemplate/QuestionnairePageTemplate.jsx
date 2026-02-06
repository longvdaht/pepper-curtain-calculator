import { h } from 'preact'
import { useState } from 'preact/hooks'
import { assoc } from 'ramda'

import { setAnswers as setAnswersInLocalStorage, getAnswer } from '../../utilities/answers'
import validateAnswers from '../../utilities/validateAnswers'
import consts from '../../consts'
import config from '../../config'
import './styles.scss'

import QuestionTemplate from '../QuestionTemplate'

const DISPLAY_NAME = 'QuestionnairePageTemplate'
const FOOTER_TEXT_CLASSNAME = 'footer-text'

const { PERSIST_ANSWERS, SHOW_BACK_BUTTON, PAGE_STEP_ELEMENT, PAGE_HEADING_ELEMENT } = config

const {
	ACTIONS_WRAPPER_CLASSNAME,
	BACK_BUTTON_CLASSNAME,
	BUTTON_CLASSNAME,
	FORM_CLASSNAME,
	NEXT_BUTTON_CLASSNAME,
	PAGE_HEADING_CLASSNAME,
	PAGE_WRAPPER_CLASSNAME,
} = consts

const DEFAULT_PROPS = {}

const Component = props => {
	const {
		id,
		onGoToNextPage,
		onGoToPreviousPage,
		questions,
		showBackButton,
		showNextButton,
		stepText,
		title,
		helperText,
		measurementText,
	} = props

	const [answers, setAnswers] = useState(() => questions.reduce((acc, question) => {
		const persistedValue = PERSIST_ANSWERS ? getAnswer(question.id) : null
		const value = persistedValue ? persistedValue : question.defaultValue
		return assoc(question.id, value, acc)
	}, {}))

	const handleBackButtonClick = onGoToPreviousPage
	const setAnswer = (questionId, value) => {
		const newAnswers = assoc(questionId, value, answers)
		setAnswers(newAnswers)
	}
	const handleQuestionValueChange = questionId => value => setAnswer(questionId, value)
	const handleSubmit = event => {
		event.preventDefault()
		const { passed } = validateAnswers(answers, questions)
		if (!passed) {
			setError(true)
			return;
		}
		setAnswersInLocalStorage(answers)
		onGoToNextPage()
	}

	const [error, setError] = useState()

	const handleize = (str) => str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");

	const isProductPage = window.location.pathname.startsWith('/products/');

	return (
		<div className={`${PAGE_WRAPPER_CLASSNAME} page-${stepText ? handleize(stepText) : ''} step-${title ? handleize(title) : ''} step-${id}`} >
			<form
				className={FORM_CLASSNAME}
				onSubmit={handleSubmit}
			>
				{stepText && (
					<PAGE_STEP_ELEMENT className={PAGE_HEADING_CLASSNAME}>
						{stepText}
					</PAGE_STEP_ELEMENT>
				)}
				{title && (
					<PAGE_HEADING_ELEMENT className={PAGE_HEADING_CLASSNAME}>
						{title}
					</PAGE_HEADING_ELEMENT>
				)}
				{helperText && (
					<div className={FOOTER_TEXT_CLASSNAME}>
						{helperText}
					</div>
				)}
				{questions.map(question => (
					<QuestionTemplate
						id={question.id}
						key={question.id}
						onValueChange={handleQuestionValueChange(question.id)}
						options={question.options}
						questionId={question.id}
						questionTitle={question.title}
						questionType={question.questionType}
						value={answers[question.id]}
						measurementText={question.measurementText ? question.measurementText : measurementText && isProductPage ? measurementText: '' }
						image={question.image}
						max={question.max}
						min={question.min}
						step={question.step}
						error={error}
					/>

				))}
				<div className={ACTIONS_WRAPPER_CLASSNAME}>
					{showNextButton && (
						<button
							className={`${BUTTON_CLASSNAME} ${NEXT_BUTTON_CLASSNAME}`}
							type="submit"
						>
							Continue
						</button>
					)}
					{SHOW_BACK_BUTTON && showBackButton && (
						<button
							className={`${BUTTON_CLASSNAME} ${BACK_BUTTON_CLASSNAME}`}
							type="button"
							onClick={handleBackButtonClick}
						>
							Back
						</button>
					)}
				</div>
				{measurementText && !isProductPage ? (
					<div class="measurement-text">
						{measurementText}
					</div>
				) : '' }
			</form>
		</div>
	)
}

Component.defaultProps = DEFAULT_PROPS
Component.displayName = DISPLAY_NAME

export default Component
