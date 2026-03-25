import { h, Fragment } from 'preact'

import consts from '../../consts'
import config from '../../config'
// import './style.scss'
import { getAllMostRecentAnswers } from '../../utilities/answers'

import ValanceCorniceImage from "../../assets/valance-cornice-result.png";

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

const DISPLAY_NAME = 'QuestionnaireValanceCorniceResults'
const RESULT_OPTIONS_WRAPPER_CLASSNAME = 'result-options-wrapper roman-result-wrapper'
const RESULT_OPTION_HEADING_CLASSNAME = 'result-option-heading'
const RESULT_OPTION_IMAGE_CLASSNAME = 'result-option-image'
const RESULT_OPTION_DETAILS_WRAPPER_CLASSNAME = 'result-option-details-wrapper'

const DEFAULT_PROPS = {
    onGoToNextPage: () => { }
}

const Component = props => {
    const {
        onReset
    } = props

    const {
        "valance-cornice-width": valanceCorniceWidth,
        "valance-cornice-width": valanceCorniceHeight,
        "valance-cornice-depth": valanceCorniceDepth,
        "valance-cornice-clearance": valanceCorniceClearance
    } = getAllMostRecentAnswers()

    const splitWidthValue = valanceCorniceWidth.trim().split(' ')
    const valanceCorniceWidthInches = Number(splitWidthValue[0]) + 3;
    const valanceCorniceWidthFraction = splitWidthValue[1] || null;
    let width = valanceCorniceWidthInches
    if (valanceCorniceWidthFraction) {
        width = valanceCorniceWidthInches + ' ' + valanceCorniceWidthFraction;
    }

    const HEIGHT_OPTIONS = [10, 14, 18];

    function ceilOption(value) {
      return HEIGHT_OPTIONS.find(opt => opt >= value) ?? HEIGHT_OPTIONS[HEIGHT_OPTIONS.length - 1];
    }

    function calculateLenght(step3, step4) {
      const H1 = step3 / 6;
      const H2 = step4 + 4;

      return Math.max(
          ceilOption(H1),
          ceilOption(H2)
      );
    }
    function fractionToDecimal(value) {
      const splitValue = value.trim().split(' ');
      const inches = parseFloat(splitValue[0]) || 0;
      const fraction = splitValue[1] || 0;

      return parseFloat(inches) + parseFloat(fraction);
    }

    const height = calculateLenght(fractionToDecimal(valanceCorniceHeight), fractionToDecimal(valanceCorniceClearance));

    function calculateDepth(step5) {
      const value = step5 + 1.5;
      return value <= 3.5 ? 3.5 : 5.5;
    }

    const depth = calculateDepth(fractionToDecimal(valanceCorniceDepth));

    const options = [
      {
        key: 0,
        className: '',
        title: "Valance/Cornice",
        image: {
            src: ValanceCorniceImage,
            alt: "Valance/Cornice",
        },
        panelCount: 1,
        width,
        height,
        depth
      }
    ]

    const handleResetButton = onReset;

    const isProductPage = window.location.pathname.startsWith('/products/');

    return (
        <div className={PAGE_WRAPPER_CLASSNAME}>
            <PAGE_HEADING_ELEMENT className={PAGE_HEADING_CLASSNAME}>
                Your Perfect Top Treatment
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
                                    <th colSpan={3}>Valance / Cornice</th>
                                </tr>
                                {option.width && (
                                    <tr>
                                        <td>
                                            Width:
                                        </td>
                                        <td className="result-block">
                                        {option.width}”
                                        </td>
                                        <td></td>
                                    </tr>
                                )}
                                {option.height && (
                                    <tr>
                                        <td>
                                            Height:
                                        </td>
                                        <td className="result-block">
                                        {option.height}”
                                        </td>
                                        <td></td>
                                    </tr>
                                )}
                                {option.depth && (
                                    <tr>
                                        <td>
                                            Depth:
                                        </td>
                                        <td className="result-block">
                                        {option.depth}”
                                        </td>
                                        <td></td>
                                    </tr>
                                )}
                            </table>
                            <div class="roman-note">
                                (We recommend mounting 4-6” above the window trim.)
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
                        Shop
                    </button>
                : 
                    <a
                        className={`${BUTTON_CLASSNAME} ${NEXT_BUTTON_CLASSNAME}`}
                        href="/collections/valances-cornices"
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
