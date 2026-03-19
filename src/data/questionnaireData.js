import QuestionnaireResults from "../components/QuestionnaireResults";
import QuestionnaireCafeResults from "../components/QuestionnaireCafeResults";
import FullLengthImage from "../assets/curtain-full-length.png";
import CafeLengthImage from "../assets/curtain-cafe-length.png";
import RodPocketImage from "../assets/curtain-rod-pocket.png";
import RingTopImage from "../assets/curtain-ring-top.png";
import GrommetImage from "../assets/curtain-grommet.jpg";
import PinchPleatImage from "../assets/curtain-pinch-pleat.png";
import TailoredPleatImage from "../assets/curtain-tailored-pleat.jpg";
import RodHeaderImage from "../assets/curtain-rod-header.png";
import DoubleRodHeaderImage from "../assets/curtain-double-rod-header.png";
import MeasureImage from "../assets/curtain-measure.png";
import MeasureRodImage from "../assets/curtain-measure-rod.png";
import MeasureTopToSillImage from "../assets/curtain-measure-top-to-sill.png";
import MeasureBottomToSillImage from "../assets/curtain-measure-bottom-to-sill.png";
import MeasureBetweenRods from "../assets/curtain-measure-between-rods.png";
import PuddleImage from "../assets/curtain-puddle.png";
import FloorImage from "../assets/curtain-floor.png";
import RodPocketMeasureImage from "../assets/curtain-measure-rod-pocket.png";
import RingTopMeasureImage from "../assets/curtain-measure-ringtop.png";
import ClipsImage from "../assets/cafe-clips.png";
import NoClipsImage from "../assets/cafe-no-clips.png";
import RomanShadeImage from "../assets/roman-shade.png";
import RomanShadeFlat from "../assets/roman-shade-flat.png";
import RomanShadeKnifePleat from "../assets/roman-shade-knife-pleat.png";
import RomanShadeRelaxed from "../assets/roman-shade-relaxed.png";
import RomanShadeScalloped from "../assets/roman-shade-scalloped.png";
import RomanShadeInsideMount from "../assets/roman-shade-inside-mount.png";
import RomanShadeOutsideMount from "../assets/roman-shade-outside-mount.png";
import RomanShadeWidthInside from "../assets/roman-shade-width-inside.png";
import RomanShadeWidthOutside from "../assets/roman-shade-width-outside.png";
import RomanShadeLengthInside from "../assets/roman-shade-length-inside.png";
import RomanShadeLengthOutside from "../assets/roman-shade-length-outside.png";
import RomanShadeHeadrail from "../assets/roman-shade-headrail.png";
import ValanceCorniceImage from "../assets/valance-cornice-image.png";
import ValanceCorniceWidth from "../assets/valance-cornice-width.png";
import ValanceCorniceHeight from "../assets/valance-cornice-height.png";
import ValanceCorniceClearance from "../assets/valance-cornice-clearance.png";
import ValanceCorniceDepth from "../assets/valance-cornice-depth.png";
import { isNil } from "ramda";
import QuestionnaireRomanResults from "../components/QuestionnaireRomanResults";
import QuestionnaireValanceCorniceResults from "../components/QuestionnaireValanceCorniceResults";

export default [
  {
    id: "treatment",
    stepText: "Step 1",
    title: "Select Your Window Treatment",
    questions: [
      {
        id: "treatment",
        questionType: "multi-choice",
        validation: (value) => !isNil(value),
        options: [
          {
            id: "rod-pocket",
            title: "Curtains",
            image: {
              src: FullLengthImage,
              alt: "Full Length Curtain",
            },
            description: "",
          },
          {
            id: "cafe-length",
            title: "Cafe Curtain",
            image: {
              src: CafeLengthImage,
              alt: "Cafe Curtain",
            },
            description: "",
          },
          {
            id: "roman-shade",
            title: "Roman Shade",
            image: {
              src: RomanShadeImage,
              alt: "Roman Shade",
            },
            description: "",
          },
          {
            id: "valance-cornice",
            title: "Valance / Cornice",
            image: {
              src: ValanceCorniceImage,
              alt: "Valance / Cornice",
            },
            description: "",
          },
        ],
      },
    ],
    nextPageId: ({ answers }) =>
      answers.treatment === "cafe-length" ? "cafe-style" 
      : answers.treatment === "roman-shade" ? "roman-style"
      : answers.treatment === "valance-cornice" ? "valance-cornice-width"
      : "style",
  },
  {
    id: "style",
    stepText: "Step 2",
    title: "Choose Your Style",
    questions: [
      {
        id: "style",
        questionType: "multi-choice",
        validation: (value) => !isNil(value),
        options: [
          {
            id: "rod-pocket",
            title: "Rod Pocket",
            image: {
              src: RodPocketImage,
              alt: "Rod Pocket Curtain",
            },
            description: "Classic curtain with clean style",
          },
          {
            id: "ring-top",
            title: "Ring Top",
            image: {
              src: RingTopImage,
              alt: "Ring Top Curtain",
            },
            description: "Perfect for frequent opening and closing",
          },
          {
            id: "grommet",
            title: "Grommet",
            image: {
              src: GrommetImage,
              alt: "Grommet Curtain",
            },
            description: "A modern and streamlined style",
          },
          {
            id: "pinch-pleat",
            title: "Pinch Pleat",
            image: {
              src: PinchPleatImage,
              alt: "Pinch Pleat Curtain",
            },
            description: "An elegant and traditional look",
          },
          {
            id: "tailored-pleat",
            title: "Tailored Pleat",
            image: {
              src: TailoredPleatImage,
              alt: "Tailored Pleat Curtain",
            },
            description: "A sleek silhouette with subtle sophistication",
          },
        ],
      },
    ],
    helperText: "Note: Calculations will differ between styles.",
    nextPageId: "tailoring",
    previousPageId: "treatment",
  },
  {
    id: "cafe-style",
    stepText: "Step 2",
    title: "Choose Your Style",
    questions: [
      {
        id: "cafe-style",
        questionType: "multi-choice",
        validation: (value) => !isNil(value),
        options: [
          {
            id: "rod-pocket",
            title: "Rod Pocket",
            image: {
              src: RodPocketImage,
              alt: "Rod Pocket Curtain",
            },
            description: "Classic curtain with clean style",
          },
          {
            id: "rod-pocket-header",
            title: "Rod Pocket w/ Header",
            image: {
              src: RodHeaderImage,
              alt: "Rod Pocket w/ Header Curtain",
            },
            description: "Touch of flare on a classic style",
          },
          {
            id: "double-rod-pocket-header",
            title: "Double Rod Pocket w/ Header",
            image: {
              src: DoubleRodHeaderImage,
              alt: "Double Rod Pocket w/ Header Curtain",
            },
            description: "Ideal for French doors and cabinets",
          },
          {
            id: "ring-top",
            title: "Ring Top",
            image: {
              src: RingTopImage,
              alt: "Ring Top Curtain",
            },
            description: "Perfect for frequent opening and closing",
          },
          {
            id: "pinch-pleat",
            title: "Pinch Pleat",
            image: {
              src: PinchPleatImage,
              alt: "Pinch Pleat Curtain",
            },
            description: "An elegant and traditional look",
          },
          {
            id: "tailored-pleat",
            title: "Tailored Pleat",
            image: {
              src: TailoredPleatImage,
              alt: "Tailored Pleat Curtain",
            },
            description: "A sleek silhouette with subtle sophistication",
          },
        ],
      },
    ],
    helperText: "Note: Calculations will differ between styles.",
    nextPageId: ({ answers }) =>
      answers["cafe-style"] === "rod-pocket-header" ||
      answers["cafe-style"] === "double-rod-pocket-header" ||
      answers["cafe-style"] === "ring-top"
        ? "cafe-rod-pocket-width"
        : "cafe-clips",
    previousPageId: "treatment",
  },
  {
    id: "roman-style",
    stepText: "Step 2",
    title: "Choose Your Style",
    questions: [
      {
        id: "roman-style",
        questionType: "multi-choice",
        validation: (value) => !isNil(value),
        options: [
          {
            id: "roman-flat",
            title: "Flat",
            image: {
              src: RomanShadeFlat,
              alt: "Roman shade flat",
            },
            description: "A timeless, clean look that works beautifully in any space.",
          },
          {
            id: "roman-knife-pleat",
            title: "Knife Pleat",
            image: {
              src: RomanShadeKnifePleat,
              alt: "Roman shade knife pleat",
            },
            description: "A crisp, tailored style perfect for modern spaces.",
          },
          {
            id: "roman-relaxed",
            title: "Relaxed",
            image: {
              src: RomanShadeRelaxed,
              alt: "Roman Shade Relaxed",
            },
            description: "A curved silhouette that feels effortless and polished.",
          },
          {
            id: "roman-scalloped",
            title: "scalloped",
            image: {
              src: RomanShadeScalloped,
              alt: "scalloped",
            },
            description: "A softly scalloped edge adds refined detail with a hint of whimsy.",
          },
        ],
      },
    ],
    helperText: "Note: Calculations will differ between styles.",
    nextPageId: "roman-mount-type",
    previousPageId: "treatment",
  },
  {
    id: "valance-cornice-width",
    stepText: "Step 2",
    title: "Measure Your Width",
    questions: [
      {
        id: "valance-cornice-width",
        image: {
          src: ValanceCorniceWidth,
          alt: "Measure Your Width",
        },
        validation: (value) => !isNil(value),
        questionType: "two-select",
        options: {
          primary: {
            label: "INCHES",
            min: 20,
            max: 103,
            step: 1,
            placeholder: "Inches"
          },
          secondary: {
            label: "FRACTION",
            options: [
              { label: '0' },
              { label: '1/2' },
            ],
            placeholder: "Fraction"
          }
        },
      },
    ],
    helperText:
      "Measure the total width of your window, including the molding. If installing over an existing shade or curtain, measure the widest area. Round up to the nearest 1/2”.",
    nextPageId: "valance-cornice-height",
    previousPageId: "treatment",
  },
  {
    id: "cafe-clips",
    stepText: "Step 3",
    title: "Are You Using Clips?",
    questions: [
      {
        id: "cafe-clips",
        questionType: "multi-choice",
        validation: (value) => !isNil(value),
        options: [
          {
            id: "clips-yes",
            title: "Yes",
            image: {
              src: ClipsImage,
              alt: "Clips",
            },
            description: "",
          },
          {
            id: "clips-no",
            title: "No",
            image: {
              src: NoClipsImage,
              alt: "No clips",
            },
            description: "",
          },
        ],
      },
    ],
    nextPageId: "cafe-rod-width",
    previousPageId: "cafe-style",
  },
  {
    id: "tailoring",
    stepText: "Step 3",
    title: "Select Your Tailoring",
    questions: [
      {
        id: "tailoring",
        questionType: "multi-choice",
        validation: (value) => !isNil(value),
        options: [
          {
            id: "break-at-floor",
            title: "Break at Floor",
            image: {
              src: FloorImage,
              alt: "Break at Floor Curtain",
            },
            description: "Clean and classic",
          },
          {
            id: "puddle",
            title: "Puddle",
            image: {
              src: PuddleImage,
              alt: "Puddling Curtain",
            },
            description: "A formal effect",
          },
        ],
      },
    ],
    nextPageId: "window-width",
    previousPageId: "style",
  },
  {
    id: "roman-mount-type",
    stepText: "Step 3",
    title: "Determine Mount Type",
    questions: [
      {
        id: "roman-mount-type",
        questionType: "multi-choice",
        validation: (value) => !isNil(value),
        options: [
          {
            id: "inside-mount",
            title: "Inside mount",
            image: {
              src: RomanShadeInsideMount,
              alt: "Inside Mount",
            },
            description: "Clean, streamlined look; best for highlighting window molding",
            description2: "Requires 1½ inches of window depth; 2½ inches for 60”+ W/L shades",
          },
          {
            id: "outside-mount",
            title: "Outside mount",
            image: {
              src: RomanShadeOutsideMount,
              alt: "Outside Mount",
            },
            description: "Best for privacy and light control; ideal for covering or enlarging a window",
            description2: "Requires 2” of flat mounting space above the window",
          },
        ],
      },
    ],
    nextPageId: ({ answers }) =>
      answers["roman-mount-type"] === "inside-mount"
        ? "roman-shade-width-inside"
        : "roman-shade-width-outside",
    previousPageId: "roman-style",
  },
  {
    id: "valance-cornice-height",
    stepText: "Step 3",
    title: "Measure Your Height",
    questions: [
      {
        id: "valance-cornice-height",
        image: {
          src: ValanceCorniceHeight,
          alt: "Measure Your Height",
        },
        validation: (value) => !isNil(value),
        questionType: "two-select",
        options: {
          primary: {
            label: "INCHES",
            min: 20,
            max: 103,
            step: 1,
            placeholder: "Inches"
          },
          secondary: {
            label: "FRACTION",
            options: [
              { label: '0' },
              { label: '1/2' },
            ],
            placeholder: "Fraction"
          }
        },
      },
    ],
    helperText:
      "Measure the height of your window, including the molding. Round up to the nearest 1/2”.",
    nextPageId: "valance-cornice-clearance",
    previousPageId: "valance-cornice-width",
  },
  {
    id: "window-width",
    stepText: "Step 4",
    title: "Measure Your Window Width",
    questions: [
      {
        id: "window-width",
        image: {
          src: MeasureImage,
          alt: "Ring Top Curtain",
        },
        validation: (value) => !isNil(value),
        questionType: "number-field",
        step: 0.01,
      },
    ],
    helperText:
      "Please include the width of your window molding. Have a french return rod? Take the length of the entire rod (including the sides).",
    nextPageId: ({ answers }) =>
      answers.style === "rod-pocket"
        ? "rod-top-to-floor"
        : answers.style === "grommet"
        ? "rod-top-to-floor"
        : "rod-bottom-to-floor",
    previousPageId: "tailoring",    
  },
  {
    id: "cafe-rod-pocket-width",
    stepText: "Step 3",
    title: "Measure Your Rod Width",
    questions: [
      {
        id: "rod-width",
        image: {
          src: MeasureRodImage,
          alt: "Rod Measurement",
        },
        validation: (value) => !isNil(value),
        questionType: "number-field",
        step: 0.01,
      },
    ],
    nextPageId: ({ answers }) =>
      answers["cafe-style"] === "rod-pocket-header"
        ? "rod-placement-single"
        : answers["cafe-style"] === "double-rod-pocket-header"
        ? "rod-placement-double"
        : answers["cafe-style"] === "ring-top"
        ? "rod-placement-no-clips-ring-top"
        : answers["cafe-clips"] === "clips-yes"
        ? "rod-placement-clips"
        : "rod-placement-no-clips",
    previousPageId: "cafe-style",
  },
  {
    id: "cafe-rod-width",
    stepText: "Step 4",
    title: "Measure Your Rod Width",
    questions: [
      {
        id: "rod-width",
        image: {
          src: MeasureRodImage,
          alt: "Rod Measurement",
        },
        validation: (value) => !isNil(value),
        questionType: "number-field",
        step: 0.01,
      },
    ],
    nextPageId: ({ answers }) =>
      answers["cafe-clips"] === "clips-yes"
        ? "rod-placement-clips"
        : "rod-placement-no-clips",
    previousPageId: "cafe-clips",
  },
  {
    id: "rod-placement-single",
    stepText: "Step 4",
    title: "Determine Your Rod Placement",
    questions: [
      {
        id: "cafe-rod-single-measurement",
        validation: (value) => !isNil(value),
        image: {
          src: MeasureTopToSillImage,
          alt: "Rod Placement Single",
        },
        questionType: "number-field",
        max: 200,
        step: 0.01,
        measurementText: "(Top of the rod to sill)",
      },
    ],
    helperText:
      "Not sure? Cafe curtains are designed to hang from the middle of the window. Be sure the rod does not align with the grill.",
    nextPageId: "cafe-results",
    previousPageId: "cafe-rod-pocket-width",
  },
  {
    id: "rod-placement-double",
    stepText: "Step 4",
    title: "Determine Your Rod Placement",
    questions: [
      {
        id: "cafe-rod-double-measurement",
        validation: (value) => !isNil(value),
        image: {
          src: MeasureBetweenRods,
          alt: "Rod Placement Double",
        },
        questionType: "number-field",
        max: 200,
        step: 0.01,
        measurementText: "(Between rods)",
      },
    ],
    helperText:
      "Not sure? Cafe curtains are designed to hang from the middle of the window. Be sure the rod does not align with the grill.",
    nextPageId: "cafe-results",
    previousPageId: "cafe-rod-pocket-width",
  },
  {
    id: "rod-placement-no-clips-ring-top",
    stepText: "Step 4",
    title: "Determine Your Rod Placement",
    questions: [
      {
        id: "cafe-rod-no-clip-placement",
        validation: (value) => !isNil(value),
        image: {
          src: MeasureBottomToSillImage,
          alt: "Rod Placement",
        },
        questionType: "number-field",
        max: 200,
        step: 0.01,
        measurementText: "(Bottom of the rod to sill)",
      },
    ],
    helperText:
      "Not sure? Cafe curtains are designed to hang from the middle of the window. Be sure the rod is in the middle of the window pane so it does not align with the grill.",
    nextPageId: "cafe-results",
    previousPageId: "cafe-rod-pocket-width",
  },
  {
    id: "roman-shade-width-inside",
    stepText: "Step 4",
    title: "Measure Your Width",
    questions: [
      {
        id: "roman-shade-width",
        image: {
          src: RomanShadeWidthInside,
          alt: "Roman shade width inside",
        },
        validation: (value) => !isNil(value),
        questionType: "two-select",
        options: {
          primary: {
            label: "INCHES",
            min: 18,
            max: 96,
            step: 1,
            placeholder: "Inches"
          },
          secondary: {
            label: "FRACTION",
            options: [
              { label: '0' },
              { label: '1/8' },
              { label: '1/4' },
              { label: '3/8' },
              { label: '1/2' },
              { label: '5/8' },
              { label: '3/4' },
              { label: '7/8' }
            ],
            placeholder: "Fraction"
          }
        },
      },
    ],
    helperText:
      "Measure the width of your window at 3 points inside window casing—top, middle, bottom; use the narrowest measurement and round up to the nearest 1/8”.",
    nextPageId: "roman-shade-length-inside",
    previousPageId: "roman-mount-type",
  },
  {
    id: "roman-shade-width-outside",
    stepText: "Step 4",
    title: "Measure Your Width",
    questions: [
      {
        id: "roman-shade-width",
        image: {
          src: RomanShadeWidthOutside,
          alt: "Roman shade width outside",
        },
        validation: (value) => !isNil(value),
        questionType: "two-select",
        options: {
          primary: {
            label: "INCHES",
            min: 18,
            max: 96,
            step: 1,
            placeholder: "Inches"
          },
          secondary: {
            label: "FRACTION",
            options: [
              { label: '0' },
              { label: '1/8' },
              { label: '1/4' },
              { label: '3/8' },
              { label: '1/2' },
              { label: '5/8' },
              { label: '3/4' },
              { label: '7/8' }
            ],
            placeholder: "Fraction"
          }
        },
      },
    ],
    helperText:
      "Measure the width of your window at 3 points including the molding—top, middle, bottom; use the widest measurement and round up to the nearest 1/8”.  Add +2”.",
    measurementText: "(When mounting directly to the molding, use the narrowest measurement of the molding’s flat surface; do not add 2”)",
    nextPageId: "roman-shade-length-outside",
    previousPageId: "roman-mount-type",
  },
  {
    id: "valance-cornice-clearance",
    stepText: "Step 4",
    title: "Measure Your Clearance",
    questions: [
      {
        id: "valance-cornice-clearance",
        image: {
          src: ValanceCorniceClearance,
          alt: "Measure Your Clearance",
        },
        validation: (value) => !isNil(value),
        questionType: "two-select",
        options: {
          primary: {
            label: "INCHES",
            min: 1,
            max: 14,
            step: 1,
            placeholder: "Inches"
          },
          secondary: {
            label: "FRACTION",
            options: [
              { label: '0' },
              { label: '1/2' },
            ],
            placeholder: "Fraction"
          }
        },
      },
    ],
    helperText:
      "Measure the height of your top molding. If layering over a shade or curtain, measure from the top of that treatment to the bottom of the top molding. Round up to the nearest ½”.",
    nextPageId: "valance-cornice-depth",
    previousPageId: "valance-cornice-height",
  },
  {
    id: "rod-top-to-floor",
    stepText: "Step 5",
    title: "Determine Your Rod Height",
    questions: [
      {
        id: "rod-top-to-floor",
        validation: (value) => !isNil(value),
        image: {
          src: RodPocketMeasureImage,
          alt: "Rod Top Measurement",
        },
        questionType: "number-field",
        max: 200,
        step: 0.01,
        measurementText: "(Top of rod to floor)",
      },
    ],
    helperText: "Not sure? We suggest hanging your rod 6-8” above the window.",
    nextPageId: "results",
    previousPageId: "window-width",
  },
  {
    id: "rod-placement-clips",
    stepText: "Step 5",
    title: "Determine Your Rod Placement",
    questions: [
      {
        id: "cafe-rod-clip-placement",
        validation: (value) => !isNil(value),
        image: {
          src: MeasureTopToSillImage,
          alt: "Rod Placement",
        },
        questionType: "number-field",
        max: 200,
        step: 0.01,
        measurementText: "(Top of the rod to sill)",
      },
    ],
    helperText:
      "Not sure? Cafe curtains are designed to hang from the middle of the window. Be sure the rod is in the middle of the window pane so it does not align with the grill.",
    nextPageId: "cafe-results",
    previousPageId: "cafe-rod-width",
  },
  {
    id: "rod-bottom-to-floor",
    stepText: "Step 5",
    title: "Determine Your Rod Height",
    questions: [
      {
        id: "rod-bottom-to-floor",
        validation: (value) => !isNil(value),
        image: {
          src: RingTopMeasureImage,
          alt: "Rod Bottom Measurement",
        },
        questionType: "number-field",
        max: 225,
        step: 0.01,
        measurementText: "(Bottom of rod to floor)",
      },
    ],
    helperText: "Not sure? We suggest hanging your rod 6-8” above the window.",
    nextPageId: "results",
    previousPageId: "window-width",
  },
  {
    id: "rod-placement-no-clips",
    stepText: "Step 5",
    title: "Determine Your Rod Placement",
    questions: [
      {
        id: "cafe-rod-no-clip-placement",
        validation: (value) => !isNil(value),
        image: {
          src: MeasureBottomToSillImage,
          alt: "Rod Placement",
        },
        questionType: "number-field",
        max: 200,
        step: 0.01,
        measurementText: "(Bottom of the rod to sill)",
      },
    ],
    helperText:
      "Not sure? Cafe curtains are designed to hang from the middle of the window. Be sure the rod is in the middle of the window pane so it does not align with the grill.",
    nextPageId: "cafe-results",
    previousPageId: "cafe-rod-width",
  },
  {
    id: "roman-shade-length-inside",
    stepText: "Step 5",
    title: "Measure Your Length",
    questions: [
      {
        id: "roman-shade-length",
        image: {
          src: RomanShadeLengthInside,
          alt: "Roman shade length inside",
        },
        validation: (value) => !isNil(value),
        questionType: "two-select",
        options: {
          primary: {
            label: "INCHES",
            min: 24,
            max: 108,
            step: 1,
            placeholder: "Inches"
          },
          secondary: {
            label: "FRACTION",
            options: [
              { label: '0' },
              { label: '1/4' },
              { label: '1/2' },
              { label: '3/4' }
            ],
            placeholder: "Fraction"
          }
        },
      },
    ],
    helperText:
      "Measure the height of the window at 3 points inside window casing—left, center, right; use the longest measurement to the nearest 1/4”.",
    nextPageId: "roman-results",
    previousPageId: "roman-shade-width-inside",
  },
  {
    id: "roman-shade-length-outside",
    stepText: "Step 5",
    title: "Measure Your Length",
    questions: [
      {
        id: "roman-shade-length",
        image: {
          src: RomanShadeLengthOutside,
          alt: "Roman shade length outside",
        },
        validation: (value) => !isNil(value),
        questionType: "two-select",
        options: {
          primary: {
            label: "INCHES",
            min: 24,
            max: 108,
            step: 1,
            placeholder: "Inches"
          },
          secondary: {
            label: "FRACTION",
            options: [
              { label: '0' },
              { label: '1/4' },
              { label: '1/2' },
              { label: '3/4' }
            ],
            placeholder: "Fraction"
          }
        },
         
      },
    ],
    helperText:
      "Measure the height of the window at 3 points, including the molding—left, center, right; use the longest measurement to the nearest 1/4”. Add 2” to the bottom for additional light control",
    measurementText: "(When mounting directly to the molding, measure from the top of the molding’s flat surface to the bottom of the sill)",
    nextPageId: "roman-shade-headrail-depth",
    previousPageId: "roman-shade-width-outside",
  },
  {
    id: "valance-cornice-depth",
    stepText: "Step 5",
    title: "Measure Your Depth",
    questions: [
      {
        id: "valance-cornice-depth",
        image: {
          src: ValanceCorniceDepth,
          alt: "Measure Your Depth",
        },
        validation: (value) => !isNil(value),
        questionType: "two-select",
        options: {
          secondary: {
            label: "INCHES",
            options: [
              { label: '0"', value: 0 },
              { label: '1/2"', value: 0.5 },
              { label: '1"', value: 1 },
              { label: '1 1/2"', value: 1.5 },
              { label: '2"', value: 2 },
              { label: '2 1/2"', value: 2.5 },
              { label: '3"', value: 3 },
              { label: '3 1/2"', value: 3.5 },
              { label: '4"', value: 4 },
            ],
            placeholder: "Inches"
          }
        },
      },
    ],
    helperText:
      "Measure from the wall out to the front edge of your window molding or any existing treatment, using whichever projects the farthest. Round up to the nearest 1/2”",
    nextPageId: "valance-cornice-results",
    previousPageId: "valance-cornice-clearance",
  },
  {
    id: "roman-shade-headrail-depth",
    stepText: "Step 6",
    title: "Measure Your Depth",
    questions: [
      {
        id: "roman-shade-depth",
        image: {
          src: RomanShadeHeadrail,
          alt: "Roman shade Headrail Depth",
        },
        validation: (value) => !isNil(value),
        questionType: "two-select",
        options: {
          secondary: {
            label: "INCHES",
            options: [
              { label: '0"', value: 0 },
              { label: '1/8"', value: 0.125 },
              { label: '1/4"', value: 0.25 },
              { label: '3/8"', value: 0.375 },
              { label: '1/2"', value: 0.5 },
              { label: '5/8"', value: 0.625 },
              { label: '3/4"', value: 0.75 },
              { label: '7/8"', value: 0.875 },
              { label: '1"', value: 1 },
              { label: '1 1/8"', value: 1.125 },
              { label: '1 1/4"', value: 1.25 },
              { label: '1 3/8"', value: 1.375 },
              { label: '1 1/2"', value: 1.5 },
              { label: '1 5/8"', value: 1.625 },
              { label: '1 3/4"', value: 1.75 },
              { label: '1 7/8"', value: 1.875 },
              { label: '2"', value: 2 },
              { label: '2 1/8"', value: 2.125 },
              { label: '2 1/4"', value: 2.25 },
              { label: '2 3/8"', value: 2.375 },
            ],
            placeholder: "Inches"
          }
        },
         
      },
    ],
    helperText:
      "Measure from the wall straight out to the front edge of your window molding (the part that protrudes the farthest).",
    nextPageId: "roman-results",
    previousPageId: "roman-shade-length-outside",
  },
  {
    id: "results",
    pageComponent: QuestionnaireResults,
  },
  {
    id: "cafe-results",
    pageComponent: QuestionnaireCafeResults,
  },
  {
    id: "roman-results",
    pageComponent: QuestionnaireRomanResults,
  },
  {
    id: "valance-cornice-results",
    pageComponent: QuestionnaireValanceCorniceResults,
  },
];
