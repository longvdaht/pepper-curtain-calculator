import { h, Fragment } from 'preact'

import consts from '../../consts'
import config from '../../config'
import './style.scss'
import { getAllMostRecentAnswers } from '../../utilities/answers'

// import results images
import RodPocketOnePanel from '../../assets/results-cafe-rod-pocket-one-panel.png'
import RodPocketTwoPanel from '../../assets/results-cafe-rod-pocket-two-panel.png'
import RodPocketHeaderOnePanel from '../../assets/results-cafe-rod-pocket-header-one-panel.png'
import RodPocketHeaderTwoPanel from '../../assets/results-cafe-rod-pocket-header-two-panel.png'
import RodPocketDoubleHeaderOnePanel from '../../assets/results-cafe-rod-pocket-double-header-one-panel.png'
import RodPocketDoubleHeaderTwoPanel from '../../assets/results-cafe-rod-pocket-double-header-two-panel.png'
import RingTopOnePanel from '../../assets/results-cafe-ring-top-one-panel.png'
import RingTopTwoPanel from '../../assets/results-cafe-ring-top-two-panel.png'
import PinchPleatOnePanel from '../../assets/results-cafe-pinch-pleat-one-panel.png'
import PinchPleatTwoPanel from '../../assets/results-cafe-pinch-pleat-two-panel.png'
import TailoredPleatOnePanel from '../../assets/results-cafe-tailored-pleat-one-panel.png'
import TailoredPleatTwoPanel from '../../assets/results-cafe-tailored-pleat-two-panel.png'

const { PAGE_HEADING_ELEMENT, SHOW_BACK_BUTTON } = config

const {
	ACTIONS_WRAPPER_CLASSNAME,
	BUTTON_CLASSNAME,
	BACK_BUTTON_CLASSNAME,
	NEXT_BUTTON_CLASSNAME,
	PAGE_HEADING_CLASSNAME,
	PAGE_WRAPPER_CLASSNAME,
	FOOTER_TEXT_CLASSNAME,
} = consts

const DISPLAY_NAME = 'QuestionnaireCafeResults'
const RESULT_OPTIONS_WRAPPER_CLASSNAME = 'result-options-wrapper'
const RESULT_OPTION_HEADING_CLASSNAME = 'result-option-heading'
const RESULT_OPTION_IMAGE_CLASSNAME = 'result-option-image'
const RESULT_OPTION_DETAILS_WRAPPER_CLASSNAME = 'result-option-details-wrapper'

const CURTAIN_STYLE = {
	ROD_POCKET: 'rod-pocket',
	ROD_POCKET_HEADER: 'rod-pocket-header',
	ROD_POCKET_DOUBLE_HEADER: 'double-rod-pocket-header',
	RING_TOP: 'ring-top',
	PINCH_PLEAT: 'pinch-pleat',
	TAILORED_PLEAT: 'tailored-pleat',
}

const CURTAIN_PANEL_COUNT = {
	ONE_PANEL: 'one-panel',
	TWO_PANEL: 'two-panel',
}

const CLIP_OPTIONS = {
	CLIPS: 'clips-yes',
	NO_CLIPS: 'clips-no',
}

const getImageSrc = (style, variant) => ({
	[CURTAIN_STYLE.ROD_POCKET]: {
		[CURTAIN_PANEL_COUNT.ONE_PANEL]: RodPocketOnePanel,
		[CURTAIN_PANEL_COUNT.TWO_PANEL]: RodPocketTwoPanel,
	},
	[CURTAIN_STYLE.ROD_POCKET_HEADER]: {
		[CURTAIN_PANEL_COUNT.ONE_PANEL]: RodPocketHeaderOnePanel,
		[CURTAIN_PANEL_COUNT.TWO_PANEL]: RodPocketHeaderTwoPanel,
	},
	[CURTAIN_STYLE.ROD_POCKET_DOUBLE_HEADER]: {
		[CURTAIN_PANEL_COUNT.ONE_PANEL]: RodPocketDoubleHeaderOnePanel,
		[CURTAIN_PANEL_COUNT.TWO_PANEL]: RodPocketDoubleHeaderTwoPanel,
	},
	[CURTAIN_STYLE.RING_TOP]: {
		[CURTAIN_PANEL_COUNT.ONE_PANEL]: RingTopOnePanel,
		[CURTAIN_PANEL_COUNT.TWO_PANEL]: RingTopTwoPanel,
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
	[CURTAIN_STYLE.ROD_POCKET_HEADER]: 'Rod Pocket w/ Header',
	[CURTAIN_STYLE.ROD_POCKET_DOUBLE_HEADER]: 'Double Rod Pocket w/ Header',
	[CURTAIN_STYLE.RING_TOP]: 'Ring Top',
	[CURTAIN_STYLE.PINCH_PLEAT]: 'Pinch Pleat',
	[CURTAIN_STYLE.TAILORED_PLEAT]: 'Tailored Pleat',
}[id])

const DEFAULT_PROPS = {
	onGoToNextPage: () => { }
}

const Component = props => {
	const {
		onReset
	} = props

	const {
		"cafe-style": style,
		'rod-width': rodWidth,
		"cafe-clips": clips,
		"cafe-rod-single-measurement": cafeRodSingleMeasurement,
		"cafe-rod-double-measurement": cafeRodDoubleMeasurement,
		"cafe-rod-clip-placement": cafeRodPlacementClips,
		"cafe-rod-no-clip-placement": cafeRodPlacementNoClips,
	} = getAllMostRecentAnswers()

	const rodWidthRounded = Math.ceil(parseFloat(rodWidth))
	const cafeRodSingleMeasurementFloat = parseFloat(cafeRodSingleMeasurement)
	const cafeRodDoubleMeasurementFloat = parseFloat(cafeRodDoubleMeasurement)
	const cafeRodPlacementClipsFloat = parseFloat(cafeRodPlacementClips)
	const cafeRodPlacementNoClipsFloat = parseFloat(cafeRodPlacementNoClips)

	const isWidthCategory1 = [CURTAIN_STYLE.ROD_POCKET, CURTAIN_STYLE.ROD_POCKET_HEADER, CURTAIN_STYLE.ROD_POCKET_DOUBLE_HEADER].includes(style)
	const isWidthCategory2 = [CURTAIN_STYLE.PINCH_PLEAT, CURTAIN_STYLE.TAILORED_PLEAT].includes(style)
	const styleTitle = getImageTitle(style)

	const length = style === CURTAIN_STYLE.ROD_POCKET ? (
		clips === CLIP_OPTIONS.CLIPS ? (
			Math.floor(cafeRodPlacementClipsFloat - 2)
		) : clips === CLIP_OPTIONS.NO_CLIPS ? (
			Math.floor(cafeRodPlacementNoClipsFloat + .5)
		) : null
	) : style === CURTAIN_STYLE.ROD_POCKET_HEADER ? (
		Math.floor(cafeRodSingleMeasurementFloat + 2)
	) : style === CURTAIN_STYLE.ROD_POCKET_DOUBLE_HEADER ? (
		Math.ceil(cafeRodDoubleMeasurementFloat + 5)
	) : style === CURTAIN_STYLE.RING_TOP ? (
		Math.floor(cafeRodPlacementNoClipsFloat - .5)
	) : style === CURTAIN_STYLE.TAILORED_PLEAT ? (
		clips === CLIP_OPTIONS.CLIPS ? (
			Math.floor(cafeRodPlacementClipsFloat - 2)
		) : clips === CLIP_OPTIONS.NO_CLIPS ? (
			Math.floor(cafeRodPlacementNoClipsFloat - .5)
		) : null
	) : style === CURTAIN_STYLE.PINCH_PLEAT || style ? (
		clips === CLIP_OPTIONS.CLIPS ? (
			Math.floor(cafeRodPlacementClipsFloat - 2)
		) : clips === CLIP_OPTIONS.NO_CLIPS ? (
			Math.floor(cafeRodPlacementNoClipsFloat - .5)
		) : null
					) : null

	const options = [
		{
			key: 0,
			className: isWidthCategory1 ? (
				rodWidthRounded > 75 ? 'visually-hidden' : ''
			) : style === CURTAIN_STYLE.RING_TOP ? (
				rodWidthRounded > 50 ? 'visually-hidden' : ''
			) : (
				rodWidthRounded > 98 ? 'visually-hidden' : ''
			),
			title: 'Option 1',
			image: {
				src: getImageSrc(style, CURTAIN_PANEL_COUNT.ONE_PANEL),
				alt: styleTitle,
			},
			panelCount: 1,
			width: isWidthCategory1 ? (
				rodWidthRounded <= 17 ? 25 : rodWidthRounded <= 33 ? 50 : rodWidthRounded <= 50 ? 75 : rodWidthRounded <= 75 ? 100 : null
			) : style === CURTAIN_STYLE.RING_TOP ? (
				rodWidthRounded <= 25 ? 50 : rodWidthRounded <= 37 ? 75 : rodWidthRounded <= 50 ? 100 : null
			) : (
				rodWidthRounded <= 25 ? 25 : rodWidthRounded <= 50 ? 50 : rodWidthRounded <= 75 ? 75 : rodWidthRounded <= 98 ? 100 : null
			),
			length,
		},
		{
			key: 1,
			className: isWidthCategory1 ? (
				rodWidthRounded < 18 ? 'visually-hidden' : ''
			) : style === CURTAIN_STYLE.RING_TOP ? (
				''
			) : (
				rodWidthRounded < 26 ? 'visually-hidden' : ''
			),
			title: isWidthCategory1 ? (
				rodWidthRounded > 75 ? 'Option 1' : 'Option 2'
			) : style === CURTAIN_STYLE.RING_TOP ? (
				rodWidthRounded > 50 ? 'Option 1' : 'Option 2'
			) : (
				rodWidthRounded > 98 ? 'Option 1' : 'Option 2'
			),
			image: {
				src: getImageSrc(style, CURTAIN_PANEL_COUNT.TWO_PANEL),
				alt: styleTitle,
			},
			panelCount: 2,
			width: isWidthCategory1 ? (
				rodWidthRounded <= 18 ? null : rodWidthRounded <= 33 ? 25 : rodWidthRounded <= 50 ? 50 : rodWidthRounded <= 75 ? 50 : rodWidthRounded <= 100 ? 75 : 100
			) : style === CURTAIN_STYLE.RING_TOP ? (
				rodWidthRounded <= 25 ? 25 : rodWidthRounded <= 37 ? 50 : rodWidthRounded <= 50 ? 50 : rodWidthRounded <= 75 ? 75 : 100
			) : (
				rodWidthRounded <= 25 ? null : rodWidthRounded <= 50 ? 25 : rodWidthRounded <= 75 ? 50 : rodWidthRounded <= 98 ? 50 : rodWidthRounded <= 148 ? 75 : 100
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
			<div className='footer-text'>
				Note: Adding pom pom trim to the bottom of your curtains? Subtract 1 inch from your length.
			</div>
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
						Shop Curtain Now
					</button>
				: 
					<a
						className={`${BUTTON_CLASSNAME} ${NEXT_BUTTON_CLASSNAME}`}
						href="/collections/custom-cafe-curtains"
					>
						Shop Curtains
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
