import { h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import './style.scss'
import consts from '../../../consts'

const DISPLAY_NAME = 'SegmentedSlider'

const {
	SEGMENTED_SLIDER_WRAPPER_CLASSNAME,
	SEGMENTED_SLIDER_INPUT_CLASSNAME,
	SEGMENTED_SLIDER_LABEL_CLASSNAME,
	SEGMENTED_SLIDER_LABEL_LIST_CLASSNAME,
	SEGMENTED_SLIDER_LABEL_LIST_ITEM_CLASSNAME,
} = consts

const findIndexOfOptionFromId = (id, options) => options.findIndex(option => option.id === id)

const DEFAULT_PROPS = {
	onValueChange: () => {}
}

const Component = props => {
	const {
		name,
		options,
		onValueChange,
		value: valueProp,
	} = props

	const inputRef = useRef()
	const value = findIndexOfOptionFromId(valueProp, options)
	const max = options.length - 1
	const progress = (value / max) * 100

	useEffect(() => {
		if (!inputRef.current) return
		inputRef.current.style.setProperty('--progress-percent', `${progress}%`)
	}, [ progress ])

	const handleChange = index => {
		const option = options[index]
		onValueChange(option.id)
	}

	const handleInput = event => handleChange(event.target.value)
	const handleLabelClick = index => () => handleChange(index)

	return (
		<div className={SEGMENTED_SLIDER_WRAPPER_CLASSNAME}>
			<ul
				className={SEGMENTED_SLIDER_LABEL_LIST_CLASSNAME}
			>
				{options.map((option, index) => (
					<li className={SEGMENTED_SLIDER_LABEL_LIST_ITEM_CLASSNAME}>
						<label
							className={SEGMENTED_SLIDER_LABEL_CLASSNAME}
							for={name}
							key={index}
							onClick={handleLabelClick(index)}
						>
							{option.title}
						</label>
					</li>
				))}
			</ul>
			<input
				className={SEGMENTED_SLIDER_INPUT_CLASSNAME}
				ref={inputRef}
				max={max}
				min="0"
				name={name}
				onInput={handleInput}
				type="range"
				value={value}
			/>
		</div>
	)
}

Component.displayName = DISPLAY_NAME
Component.defaultProps = DEFAULT_PROPS

export default Component
