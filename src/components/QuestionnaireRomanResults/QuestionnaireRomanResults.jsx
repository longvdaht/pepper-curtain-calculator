import { h, Fragment } from 'preact'

import consts from '../../consts'
import config from '../../config'
// import './style.scss'
import { getAllMostRecentAnswers } from '../../utilities/answers'

import RomanShadeFlatInside from "../../assets/roman-shade-flat-inside.png";
import RomanShadeFlatOutside from "../../assets/roman-shade-flat-outside.png";
import RomanShadeKnifePleatInside from "../../assets/roman-shade-knife-pleat-inside.png";
import RomanShadeKnifePleatOutside from "../../assets/roman-shade-knife-pleat-outside.png";
import RomanShadeRelaxedInside from "../../assets/roman-shade-relaxed-inside.png";
import RomanShadeRelaxedOutside from "../../assets/roman-shade-relaxed-outside.png";
import RomanShadeScallopedInside from "../../assets/roman-shade-scalloped-inside.png";
import RomanShadeScallopedOutside from "../../assets/roman-shade-scalloped-outside.png";

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

const getImageSrc = (style, type) => ({
    [ROMAN_STYLE.FLAT]: {
      [ROMAN_MOUNT_TYPE.INSIDE_MOUNT]: RomanShadeFlatInside,
      [ROMAN_MOUNT_TYPE.OUTSIDE_MOUNT]: RomanShadeFlatOutside
    },
    [ROMAN_STYLE.KNIFE_PLEAT]: {
      [ROMAN_MOUNT_TYPE.INSIDE_MOUNT]: RomanShadeKnifePleatInside,
      [ROMAN_MOUNT_TYPE.OUTSIDE_MOUNT]: RomanShadeKnifePleatOutside
    },
    [ROMAN_STYLE.RELAXED]: {
      [ROMAN_MOUNT_TYPE.INSIDE_MOUNT]: RomanShadeRelaxedInside,
      [ROMAN_MOUNT_TYPE.OUTSIDE_MOUNT]: RomanShadeRelaxedOutside
    },
    [ROMAN_STYLE.SCALLOPED]: {
      [ROMAN_MOUNT_TYPE.INSIDE_MOUNT]: RomanShadeScallopedInside,
      [ROMAN_MOUNT_TYPE.OUTSIDE_MOUNT]: RomanShadeScallopedOutside
    },
}[style][type])

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

    const toNumber = (str) => {
      const [whole, frac] = String(str).trim().split(' ')
      if (!frac) return Number(whole)
      const [n, d] = frac.split('/')
      return Number(whole) + n / d
    }

    const pickMin = (obj) => Object.values(obj).reduce((a, b) => (toNumber(b) < toNumber(a) ? b : a))
    const pickMax = (obj) => Object.values(obj).reduce((a, b) => (toNumber(b) > toNumber(a) ? b : a))
    const isInside = romanMountType === ROMAN_MOUNT_TYPE.INSIDE_MOUNT
    const isScalloped = style === ROMAN_STYLE.SCALLOPED

    const widthOffset = isInside ? 0 : 2
    const lengthOffset = isInside ? 0 : 6
    
    const romanShadeWidthStr = isInside ? pickMin(romanShadeWidth) : pickMax(romanShadeWidth)
    const splitWidthInchesFraction = romanShadeWidthStr.trim().split(' ')
    const romanShadeWidthInches = Number(splitWidthInchesFraction[0]) + widthOffset
    const romanShadeWidthFraction = splitWidthInchesFraction[1] || null

    const width = romanShadeWidthFraction && romanShadeWidthFraction != 0 ? (
      romanShadeWidthInches + ' ' + romanShadeWidthFraction
    ) : romanShadeWidthInches

    const romanShadeLengthStr = pickMax(romanShadeLength)
    const splitLengthInchesFraction = romanShadeLengthStr.trim().split(' ')
    const romanShadeLengthInches = Number(splitLengthInchesFraction[0]) + lengthOffset
    const romanShadeLengthFraction = splitLengthInchesFraction[1] || null
    const styleTitle = getImageTitle(style, romanMountType)

    const lengthInches = isScalloped && isInside ? 
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
            width,
            length,
            headrail
        }
    ]

    const handleResetButton = onReset;

    const isProductPage = window.location.pathname.startsWith('/products/');

    return (
        <div className={`${PAGE_WRAPPER_CLASSNAME} roman-result-wrapper`}>
            <PAGE_HEADING_ELEMENT className={PAGE_HEADING_CLASSNAME}>
                Your Perfect Roman Shade
            </PAGE_HEADING_ELEMENT>
            <div className='footer-text'>
              Note: When ordering an inside mount, enter your exact window width. We’ll automatically subtract 1/2" to allow for proper clearance.
            </div>
            <div className={RESULT_OPTIONS_WRAPPER_CLASSNAME}>
                {options.map(option => (
                    <div key={option.key} className={option.className}>
                        <h3 class={RESULT_OPTION_HEADING_CLASSNAME}>
                            {option.title}
                        </h3>
                        <img
                            className={RESULT_OPTION_IMAGE_CLASSNAME}
                            src={option.image.src}
                            alt={option.image.alt}
                        />
                        <div className={RESULT_OPTION_DETAILS_WRAPPER_CLASSNAME}>
                            <table>
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
                        Shop Roman Shades
                    </button>
                : 
                    <a
                        className={`${BUTTON_CLASSNAME} ${NEXT_BUTTON_CLASSNAME}`}
                        href="/collections/custom-roman-shades"
                    >
                        Shop Roman Shades
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
