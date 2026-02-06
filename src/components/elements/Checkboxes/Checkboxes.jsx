import { Fragment, h } from 'preact'
import './style.scss'
import renderOptionId from '../../../utilities/renderOptionId'
import consts from '../../../consts'

const {
	CHECKBOX_WRAPPER_CLASSNAME,
	CHECKBOX_INPUT_CLASSNAME,
	CHECKBOX_LABEL_CLASSNAME,
	CHECKBOXES_WRAPPER_CLASSNAME,
} = consts

const DISPLAY_NAME = 'Checkboxes'

const DEFAULT_PROPS = {
	onValueChange: () => {}
}

const toggleListItem = (item, list) => (
	list.includes(item) ? list.filter(x => x !== item) : list.concat(item)
)

const Component = props => {
	const {
		onValueChange,
		value: valueProp,
		questionId,
		options,
	} = props

	const defaultedValue = Array.isArray(valueProp) ? valueProp : []

	const handleInput = event => {
		const newList = toggleListItem(event.target.value, defaultedValue)
		onValueChange(newList)
	}

	return (
		<div className={CHECKBOXES_WRAPPER_CLASSNAME}>
			{options.map(option => (
				<div className={CHECKBOX_WRAPPER_CLASSNAME}>
					<input
						key={renderOptionId(questionId, option.id)}
						type="checkbox"
						id={renderOptionId(questionId, option.id)}
						name={renderOptionId(questionId, option.id)}
						value={option.id}
						onInput={handleInput}
						checked={defaultedValue.includes(option.id)}
						className={CHECKBOX_INPUT_CLASSNAME}
					/>
					<label
						htmlFor={renderOptionId(questionId, option.id)}
						className={CHECKBOX_LABEL_CLASSNAME}
					>
						{option.title}
					</label>
				</div>
			))}
		</div>
	)
}

Component.displayName = DISPLAY_NAME
Component.defaultProps = DEFAULT_PROPS

export default Component
