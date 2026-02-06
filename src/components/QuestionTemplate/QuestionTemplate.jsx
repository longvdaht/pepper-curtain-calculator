import { h } from 'preact'
import { useState } from 'preact/hooks'

import renderOptionId from '../../utilities/renderOptionId'

import SegmentedSlider from '../elements/SegmentedSlider'
import Checkboxes from '../elements/Checkboxes'

import './style.scss'
import { useEffect } from 'preact/hooks'

const DISPLAY_NAME = 'QuestionTemplate'

const LEGEND_CLASSNAME = 'question-legend'
const FIELDSET_CLASSNAME = 'question-fieldset'

const RADIOS_WRAPPER_CLASSNAME = 'radios-wrapper'
const RADIO_WRAPPER_CLASSNAME = 'radio-wrapper'
const RADIO_IMAGE_CLASSNAME = 'radio-image'
const SEGMENTED_SLIDER_WRAPPER_CLASSNAME = 'segmented-slider-wrapper'
const NUMBER_FIELD_WRAPPER_CLASSNAME = 'number-field-wrapper'
const NUMBER_FIELD_IMAGE_WRAPPER_CLASSNAME = 'number-field-image-wrapper'
const NUMBER_FIELD_INPUT_CLASSNAME = 'number-field-input'
const TWO_SELECT_FIELDS_WRAPPER_CLASSNAME = 'select-field-image-wrapper'
const TWO_SELECT_FIELDS_INPUT_CLASSNAME = 'select-field-input select__select'

const QUESTION_TYPE = {
	MULTI_CHOICE: 'multi-choice',
	MULTI_SELECT: 'multi-select',
	NUMBER_FIELD: 'number-field',
	SEGMENT_SLIDER: 'segmented-slider',
	TWO_SELECT: 'two-select',
}

const ERROR_MESSAGE = 'Please select an option'

const DEFAULT_PROPS = {
	questionType: QUESTION_TYPE.MULTI_CHOICE,
	onValueChange: () => { },
}

const Component = props => {
	const {
		id,
		image,
		max,
		measurementText,
		min,
		step,
		onValueChange,
		options,
		questionId,
		questionTitle,
		questionType,
		value: valueProp,
		error,
	} = props

	const [errorMessage, setErrorMessage] = useState()

	const handleRadioInput = e => onValueChange(e.target.value)
	const handleSegmentedSliderChange = value => onValueChange(value)
	const handleCheckboxChange = list => onValueChange(list)
	const handleNumberFieldChange = e => onValueChange(e.target.value)

	const renderMultiSelect = () => (
		<Checkboxes
			options={options}
			questionId={questionId}
			value={valueProp}
			onValueChange={handleCheckboxChange}
		/>
	)

	const renderMultiChoice = () => (
		<div className={RADIOS_WRAPPER_CLASSNAME}>
			{options.map(option => (
				<div className={RADIO_WRAPPER_CLASSNAME}>
					<input
						key={renderOptionId(questionId, option.id)}
						type="radio"
						id={renderOptionId(questionId, option.id)}
						name={questionId}
						value={option.id}
						onInput={handleRadioInput}
						checked={valueProp === option.id}
						aria-label={`${option.title}, ${option.description}`}
					/>
					<label
						htmlFor={renderOptionId(questionId, option.id)}
						aria-label={`${option.title}, ${option.description}`}
					>
						{option.image && (
							<img
								className={RADIO_IMAGE_CLASSNAME}
								src={option.image.src}
								alt={option.image.alt}
							/>
						)}
						<div className="option-title">
							{option.title}
						</div>
						<div className="option-description">
							{option.description}
						</div>
						{option.description2 ? (
							<div className="option-description option-description2">
								{option.description2}
							</div>
						) : ''}
						
					</label>
				</div>
			))}
		</div>
	)

	const renderSegmentSlider = () => (
		<SegmentedSlider
			name={questionId}
			onValueChange={handleSegmentedSliderChange}
			options={options}
			value={valueProp}
		/>
	)

	const renderNumberField = () => (
		<div className={NUMBER_FIELD_WRAPPER_CLASSNAME}>
			{image && (
				<div className={NUMBER_FIELD_IMAGE_WRAPPER_CLASSNAME}>
					<img
						src={image.src}
						alt={image.alt}
					/>
				</div>
			)}
			<div className="number-field-layout">
				<div>
					<input
						type="number"
						name={questionId}
						onInput={handleNumberFieldChange}
						id={questionId}
						options={options}
						value={valueProp}
						className={NUMBER_FIELD_INPUT_CLASSNAME}
						step={step}
						max={max}
						min={min}
					/>
				</div>
				<label
					className="number-field-label"
					for={questionId}
				>
					INCHES
				</label>
				<div className="number-field-helper">
					{measurementText}
				</div>
			</div>
		</div>
	)

  const parseDisplayValue = (raw) => {
    if (!raw) {
      return { inches: '', fraction: '' }
    }

    // "33 1/2" → ["33", "1/2"]
    const parts = raw.toString().split(' ')

    return {
      inches: Number(parts[0]) || '',
      fraction: parts[1] || '',
    }
  }
  const [twoSelectValue, setTwoSelectValue] = useState(
    parseDisplayValue(valueProp)
  )

  useEffect(() => {
    setTwoSelectValue(parseDisplayValue(valueProp))
  }, [valueProp])

  const renderTwoSelectFields = () => {
    const { primary, secondary } = options
    const { inches, fraction } = twoSelectValue

    const buildFinalValue = (nextInches, nextFraction) => {
      if (!nextInches) return

      const finalValue = nextFraction && nextFraction != 0
        ? `${nextInches} ${nextFraction}`
        : `${nextInches}`

      onValueChange(finalValue)
    }

    const handlePrimaryChange = (e) => {
      const nextInches = e.target.value
      setTwoSelectValue((prev) => ({
        ...prev,
        inches: nextInches,
      }))
      buildFinalValue(nextInches, fraction)
    }

    const handleSecondaryChange = (e) => {
      const nextFraction = e.target.value
      setTwoSelectValue((prev) => ({
        ...prev,
        fraction: nextFraction,
      }))
      buildFinalValue(inches, nextFraction)
    }

    return (
      <div className={TWO_SELECT_FIELDS_WRAPPER_CLASSNAME}>
        {image && (
          <div className={NUMBER_FIELD_IMAGE_WRAPPER_CLASSNAME}>
            <img src={image.src} alt={image.alt} />
          </div>
        )}

        <div className="select-field-layout">
          <div className="select-row">
            {primary && (
              <div class="select-wrapper">
                <select
                  id={`${questionId}-inches`}
                  value={inches}
                  onChange={handlePrimaryChange}
                  className={TWO_SELECT_FIELDS_INPUT_CLASSNAME}
                >
                <option value="" disabled>
                  {primary.placeholder}
                </option>

                {Array.from(
                  { length: primary.max - primary.min + 1 },
                  (_, i) => primary.min + i
                ).map((n) => (
                  <option key={n} value={n}>
                  {n}
                  </option>
                ))}
                </select>
              </div>
            )}

            <div class="select-wrapper">
              <select
              id={`${questionId}-fraction`}
              value={primary ? fraction : inches}
              onChange={primary ? handleSecondaryChange : handlePrimaryChange}
              className={TWO_SELECT_FIELDS_INPUT_CLASSNAME}
              >
              <option value="" disabled>
                {secondary.placeholder}
              </option>
              {secondary.options.map((opt) => (
                <option key={opt.label} value={opt.value ? opt.value : opt.label}>
                  {opt.label}
                </option>
              ))}
              </select>
            </div>
          </div>

          <div className="number-field-helper">
            {measurementText}
          </div>
        </div>
      </div>
    )
  }

	const renderFormElement = {
		[QUESTION_TYPE.MULTI_CHOICE]: renderMultiChoice,
		[QUESTION_TYPE.MULTI_SELECT]: renderMultiSelect,
		[QUESTION_TYPE.NUMBER_FIELD]: renderNumberField,
		[QUESTION_TYPE.SEGMENT_SLIDER]: renderSegmentSlider,
    	[QUESTION_TYPE.TWO_SELECT]: renderTwoSelectFields,
	}[questionType]

	const renderErrorMessage = questionType => {
		return questionType === 'number-field' ? 'Please enter a value' : ERROR_MESSAGE
	}

	if (error) {
		setErrorMessage(renderErrorMessage(questionType))
	}

	return (
		<fieldset className={`${FIELDSET_CLASSNAME} question-${id}`}>
			<legend className={LEGEND_CLASSNAME}>
				{questionTitle}
			</legend>
			{renderFormElement()}
			{errorMessage && <div className={'error-wrapper'}>{errorMessage}</div>}
		</fieldset>
	)
}

Component.displayName = DISPLAY_NAME
Component.defaultProps = DEFAULT_PROPS

export default Component
