// import "preact/debug";
// TODO: remove import for production

import { h, render } from "preact";

import QuestionnaireApp from "./QuestionnaireApp";

import config from "./config";
import "./styles/variables.scss";

const { QUESTIONNAIRE_ELEMENT_ID } = config;
const questionnaireRoot = document.getElementById(QUESTIONNAIRE_ELEMENT_ID);

if (questionnaireRoot) {
  const { customerEmail } = questionnaireRoot.dataset;
  render(<QuestionnaireApp customerEmail={customerEmail} />, questionnaireRoot);
}
