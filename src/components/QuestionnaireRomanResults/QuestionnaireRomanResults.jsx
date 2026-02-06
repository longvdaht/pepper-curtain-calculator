import { h, Fragment } from 'preact'

import consts from '../../consts'
import config from '../../config'
// import './style.scss'
import { getAllMostRecentAnswers } from '../../utilities/answers'

import RomanShadeFlat from "../../assets/roman-shade-flat.png";
import RomanShadeKnifePleat from "../../assets/roman-shade-knife-pleat.png";
import RomanShadeRelaxed from "../../assets/roman-shade-relaxed.png";
import RomanShadeScalloped from "../../assets/roman-shade-scalloped.png";

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

const DISPLAY_NAME = 'QuestionnaireRomanResults'
const RESULT_OPTIONS_WRAPPER_CLASSNAME = 'result-options-wrapper roman-result-wrapper'
const RESULT_OPTION_HEADING_CLASSNAME = 'result-option-heading'
const RESULT_OPTION_IMAGE_CLASSNAME = 'result-option-image'
const RESULT_OPTION_DETAILS_WRAPPER_CLASSNAME = 'result-option-details-wrapper'

const ROMAN_STYLE = {
    FLAT: 'roman-flat',
    KNIFE_PLEAT: 'roman-knife-pleat',
    RELAXED: 'roman-relaxed',
    SCALLOPED: "roman-scalloped"
}

const ROMAN_MOUNT_TYPE = {
    INSIDE_MOUNT: 'inside-mount',
    OUTSIDE_MOUNT: 'outside-mount',
}

const getImageSrc = (style) => ({
    [ROMAN_STYLE.FLAT]: RomanShadeFlat,
    [ROMAN_STYLE.KNIFE_PLEAT]: RomanShadeKnifePleat,
    [ROMAN_STYLE.RELAXED]: RomanShadeRelaxed,
    [ROMAN_STYLE.SCALLOPED]: RomanShadeScalloped,
}[style])

const getImageTitle = (id, type) => ({
    [ROMAN_STYLE.FLAT]: {
      [ROMAN_MOUNT_TYPE.INSIDE_MOUNT]: 'Flat, Inside Mount',
      [ROMAN_MOUNT_TYPE.OUTSIDE_MOUNT]: 'Flat, Outside Mount'
    },
    [ROMAN_STYLE.KNIFE_PLEAT]: {
      [ROMAN_MOUNT_TYPE.INSIDE_MOUNT]: 'Knife Pleat, Inside Mount',
      [ROMAN_MOUNT_TYPE.OUTSIDE_MOUNT]: 'Knife Pleat, Outside Mount'
    },
    [ROMAN_STYLE.RELAXED]: {
      [ROMAN_MOUNT_TYPE.INSIDE_MOUNT]: 'Relaxed, Inside Mount',
      [ROMAN_MOUNT_TYPE.OUTSIDE_MOUNT]: 'Relaxed, Outside Mount'
    },
    [ROMAN_STYLE.SCALLOPED]: {
      [ROMAN_MOUNT_TYPE.INSIDE_MOUNT]: 'Scalloped, Inside Mount',
      [ROMAN_MOUNT_TYPE.OUTSIDE_MOUNT]: 'Scalloped, Outside Mount'
    },
}[id][type])

const DEFAULT_PROPS = {
    onGoToNextPage: () => { }
}

const Component = props => {
    const {
        onReset
    } = props

    const {
        "roman-style": style,
        "roman-mount-type": romanMountType,
        "roman-shade-width": romanShadeWidth,
        "roman-shade-length": romanShadeLength,
        "roman-shade-depth": RomanShadeHeadrail
    } = getAllMostRecentAnswers()

    const splitWidthInchesFraction = romanShadeWidth.trim().split(' ')
    const romanShadeWidthInches = Number(splitWidthInchesFraction[0])

    const splitLengthInchesFraction = romanShadeLength.trim().split(' ')
    const romanShadeLengthInches = Number(splitLengthInchesFraction[0])
    const romanShadeLengthFraction = splitLengthInchesFraction[1] || null
    const styleTitle = getImageTitle(style, romanMountType)

    const lengthInches = style === ROMAN_STYLE.SCALLOPED && romanMountType === ROMAN_MOUNT_TYPE.INSIDE_MOUNT ? 
          (Math.floor(romanShadeLengthInches + 1) ) : romanShadeLengthInches

    const length = romanShadeLengthFraction && romanShadeLengthFraction != 0 ? (
            lengthInches + ' ' + romanShadeLengthFraction
    ) : lengthInches

    const romanShadeDepthInches = parseFloat(RomanShadeHeadrail) || 0
    const headrail = romanShadeDepthInches >= 1.5 || romanShadeWidthInches >= 60 || lengthInches >= 60 ? 2.5 : 1.5

    const options = [
        {
            key: 0,
            className: '',
            title: styleTitle,
            image: {
                src: getImageSrc(style, romanMountType),
                alt: styleTitle,
            },
            panelCount: 1,
            width: romanShadeWidth,
            length,
            headrail
        }
    ]

    const handleResetButton = onReset;

    const isProductPage = window.location.pathname.startsWith('/products/');

    return (
        <div className={PAGE_WRAPPER_CLASSNAME}>
            <PAGE_HEADING_ELEMENT className={PAGE_HEADING_CLASSNAME}>
                Your Perfect Roman Shade
            </PAGE_HEADING_ELEMENT>
            
            <div className={RESULT_OPTIONS_WRAPPER_CLASSNAME}>
                {options.map(option => (
                    <div key={option.key} className={option.className}>
                        <img
                            className={RESULT_OPTION_IMAGE_CLASSNAME}
                            src={option.image.src}
                            alt={option.image.alt}
                        />
                        <div className={RESULT_OPTION_DETAILS_WRAPPER_CLASSNAME}>
                            <table>
                                <tr>
                                    <th colSpan={3}>{option.title}</th>
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
                                        <td></td>
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
                                {option.headrail && (
                                    <tr>
                                        <td>
                                            Headrail:
                                        </td>
                                        <td className="result-block">
                                        {option.headrail}
                                        ”
                                        </td>
                                        <td></td>
                                    </tr>
                                )}
                            </table>
                            <div class="roman-note">
                                (If any window in the room requires a 2.5″ headrail depth, we recommend using 2.5″ for all shades for consistency.)
                            </div>
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
                        Shop ROMAN SHADES
                    </button>
                : 
                    <a
                        className={`${BUTTON_CLASSNAME} ${NEXT_BUTTON_CLASSNAME}`}
                        href="/collections/custom-roman-shades"
                    >
                        Shop ROMAN SHADES
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
