import { h, Fragment } from 'preact'

import consts from '../../consts'
import config from '../../config'
import './style.scss'
import { getAllMostRecentAnswers } from '../../utilities/answers'

import RodPocketOnePanel from '../../assets/result-rod-pocket-one-panel.jpg'
import RodPocketTwoPanel from '../../assets/result-rod-pocket-two-panel.jpg'
import RingTopOnePanel from '../../assets/result-ring-top-one-panel.jpg'
import RingTopTwoPanel from '../../assets/result-ring-top-two-panel.jpg'
import GrommetOnePanel from '../../assets/result-grommet-one-panel.jpg'
import GrommetTwoPanel from '../../assets/result-grommet-two-panel.jpg'
import PinchPleatOnePanel from '../../assets/result-pinch-pleat-one-panel.jpg'
import PinchPleatTwoPanel from '../../assets/result-pinch-pleat-two-panel.jpg'
import TailoredPleatOnePanel from '../../assets/result-tailored-pleat-one-panel.jpg'
import TailoredPleatTwoPanel from '../../assets/result-tailored-pleat-two-panel.jpg'

const { PAGE_HEADING_ELEMENT, SHOW_BACK_BUTTON } = config

const {
	ACTIONS_WRAPPER_CLASSNAME,
	BUTTON_CLASSNAME,
	BACK_BUTTON_CLASSNAME,
	NEXT_BUTTON_CLASSNAME,
	PAGE_HEADING_CLASSNAME,
	PAGE_WRAPPER_CLASSNAME,
} = consts

const DISPLAY_NAME = 'QuestionnaireResults'
const RESULT_OPTIONS_WRAPPER_CLASSNAME = 'result-options-wrapper'
const RESULT_OPTION_HEADING_CLASSNAME = 'result-option-heading'
const RESULT_OPTION_IMAGE_CLASSNAME = 'result-option-image'
const RESULT_OPTION_DETAILS_WRAPPER_CLASSNAME = 'result-option-details-wrapper'

const CURTAIN_STYLE = {
	ROD_POCKET: 'rod-pocket',
	RING_TOP: 'ring-top',
	GROMMET: 'grommet',
	PINCH_PLEAT: 'pinch-pleat',
	TAILORED_PLEAT: 'tailored-pleat',
}

const CURTAIN_PANEL_COUNT = {
	ONE_PANEL: 'one-panel',
	TWO_PANEL: 'two-panel',
}

const TAILORING_OPTIONS = {
	BREAK_AT_FLOOR: 'break-at-floor',
	PUDDLE: 'puddle',
}

const getImageSrc = (style, variant) => ({
	[CURTAIN_STYLE.ROD_POCKET]: {
		[CURTAIN_PANEL_COUNT.ONE_PANEL]: RodPocketOnePanel,
		[CURTAIN_PANEL_COUNT.TWO_PANEL]: RodPocketTwoPanel,
	},
	[CURTAIN_STYLE.RING_TOP]: {
		[CURTAIN_PANEL_COUNT.ONE_PANEL]: RingTopOnePanel,
		[CURTAIN_PANEL_COUNT.TWO_PANEL]: RingTopTwoPanel,
	},
	[CURTAIN_STYLE.GROMMET]: {
		[CURTAIN_PANEL_COUNT.ONE_PANEL]: GrommetOnePanel,
		[CURTAIN_PANEL_COUNT.TWO_PANEL]: GrommetTwoPanel,
	},
	[CURTAIN_STYLE.PINCH_PLEAT]: {
		[CURTAIN_PANEL_COUNT.ONE_PANEL]: PinchPleatOnePanel,
		[CURTAIN_PANEL_COUNT.TWO_PANEL]: PinchPleatTwoPanel,
	},
	[CURTAIN_STYLE.TAILORED_PLEAT]: {
		[CURTAIN_PANEL_COUNT.ONE_PANEL]: TailoredPleatOnePanel,
		[CURTAIN_PANEL_COUNT.TWO_PANEL]: TailoredPleatTwoPanel,
	},
}[style][variant])

const getImageTitle = id => ({
	[CURTAIN_STYLE.ROD_POCKET]: 'Rod Pocket',
	[CURTAIN_STYLE.RING_TOP]: 'Ring Top',
	[CURTAIN_STYLE.GROMMET]: 'Grommet',
	[CURTAIN_STYLE.PINCH_PLEAT]: 'Pinch Pleat',
	[CURTAIN_STYLE.TAILORED_PLEAT]: 'Tailored Pleat',
}[id])

const DEFAULT_PROPS = {
	onGoToNextPage: () => { },
}

const Component = props => {
	const {
		onReset
	} = props

	const {
		style,
		'window-width': windowWidth,
		tailoring,
		'rod-bottom-to-floor': rodBottomToFloor,
		'rod-top-to-floor': rodTopToFloor,
	} = getAllMostRecentAnswers()

	const windowWidthRounded = Math.ceil(parseFloat(windowWidth))
	const rodBottomToFloorFloat = parseFloat(rodBottomToFloor)
	const rodTopToFloorFloat = parseFloat(rodTopToFloor)

	const isWidthCategory1 = [CURTAIN_STYLE.ROD_POCKET, CURTAIN_STYLE.RING_TOP, CURTAIN_STYLE.GROMMET].includes(style)
	const isLengthCategory1 = [CURTAIN_STYLE.PINCH_PLEAT, CURTAIN_STYLE.RING_TOP, CURTAIN_STYLE.TAILORED_PLEAT].includes(style)
	const isLengthCategory2 = [CURTAIN_STYLE.GROMMET].includes(style)
	const styleTitle = getImageTitle(style)

	const length = isLengthCategory1 ? (
		tailoring === TAILORING_OPTIONS.BREAK_AT_FLOOR ? (
			Math.round(rodBottomToFloorFloat - 1)
		) : tailoring === TAILORING_OPTIONS.PUDDLE ? (
			Math.round(rodBottomToFloorFloat + 2)
		) : null
	) : isLengthCategory2 ? (
		tailoring === TAILORING_OPTIONS.BREAK_AT_FLOOR ? (
			Math.round(rodTopToFloorFloat + 1.5)
		) : tailoring === TAILORING_OPTIONS.PUDDLE ? (
			Math.round(rodTopToFloorFloat + 5.5)
		) : null
	) : (
		tailoring === TAILORING_OPTIONS.BREAK_AT_FLOOR ? (
			Math.round(rodTopToFloorFloat - 0)
		) : tailoring === TAILORING_OPTIONS.PUDDLE ? (
			Math.round(rodTopToFloorFloat + 4)
		) : null
	)

	const options = [
		{
			key: 0,
			className: isWidthCategory1 ? (
				windowWidthRounded > 50 ? 'visually-hidden' : ''
			) : (
				windowWidthRounded > 98 ? 'visually-hidden' : ''
			),
			title: 'Option 1',
			image: {
				src: getImageSrc(style, CURTAIN_PANEL_COUNT.ONE_PANEL),
				alt: styleTitle,
			},
			panelCount: 1,
			width: isWidthCategory1 ? (
				windowWidthRounded <= 25 ? 50 : windowWidthRounded <= 37 ? 75 : windowWidthRounded <= 50 ? 100 : windowWidthRounded <= 100 ? 100 : null
			) : (
				windowWidthRounded <= 23 ? 25 : windowWidthRounded <= 48 ? 50 : windowWidthRounded <= 73 ? 75 : windowWidthRounded <= 98 ? 100 : null
			),
			length,
		},
		{
			key: 1,
			className: isWidthCategory1 ? (
				''
			) : (
				windowWidthRounded < 24 ? 'visually-hidden' : ''
			),
			title: isWidthCategory1 ? (
				windowWidthRounded > 50 ? 'Option 1' : 'Option 2'
			) : (
				windowWidthRounded > 98 ? 'Option 1' : 'Option 2'
			),
			image: {
				src: getImageSrc(style, CURTAIN_PANEL_COUNT.TWO_PANEL),
				alt: styleTitle,
			},
			panelCount: 2,
			width: isWidthCategory1 ? (
				windowWidthRounded <= 25 ? 25 : windowWidthRounded <= 50 ? 50 : windowWidthRounded <= 75 ? 75 : 100
			) : (
				windowWidthRounded <= 48 ? 25 : windowWidthRounded <= 98 ? 50 : windowWidthRounded <= 148 ? 75 : 100
			),
			length
		},
	]

	const handleResetButton = onReset;

	const isProductPage = window.location.pathname.startsWith('/products/');

	return (
		<div className={PAGE_WRAPPER_CLASSNAME}>
			<PAGE_HEADING_ELEMENT className={PAGE_HEADING_CLASSNAME}>
				Your Perfect Curtains
			</PAGE_HEADING_ELEMENT>
			<div className={RESULT_OPTIONS_WRAPPER_CLASSNAME}>
				{options.map(option => (
					<div key={option.key} className={option.className}>
						<h3 className={RESULT_OPTION_HEADING_CLASSNAME}>
							{option.title}
						</h3>
						<img
							className={RESULT_OPTION_IMAGE_CLASSNAME}
							src={option.image.src}
							alt={option.image.alt}
						/>
						<div className={RESULT_OPTION_DETAILS_WRAPPER_CLASSNAME}>
							<table>
								<tr>
									<th colSpan={3}>
										{option.panelCount}
										{' '}
										{option.panelCount == 1 ? 'Panel' : 'Panels'}
									</th>
								</tr>
								{option.width && (
									<tr>
										<td>
											Width:
										</td>
										<td className="result-block">
										{option.width}
										”
										</td>
										<td>{option.panelCount == 2 && ' (each)'}</td>
									</tr>
								)}
								{option.length && (
									<tr>
										<td>
											Length:
										</td>
										<td className="result-block">
										{option.length}
										”
										</td>
										<td></td>
									</tr>
								)}
							</table>
						</div>
					</div>
				))}
			</div>
			<div className={ACTIONS_WRAPPER_CLASSNAME}>
				{isProductPage ?
					<button
						className={`${BUTTON_CLASSNAME} ${NEXT_BUTTON_CLASSNAME} modal__close-button`}
						type="button" aria-label="Close" 
					>
						Shop
					</button>
				: 
					<a
						className={`${BUTTON_CLASSNAME} ${NEXT_BUTTON_CLASSNAME}`}
						href="/collections/curtains"
					>
						Shop
					</a>
				}
				<button
					className={`${BUTTON_CLASSNAME} ${BACK_BUTTON_CLASSNAME}`}
					type="button"
					onClick={handleResetButton}
				>
					Reset
				</button>
			</div>
		</div>
	)
}

Component.defaultProps = DEFAULT_PROPS
Component.displayName = DISPLAY_NAME

export default Component
