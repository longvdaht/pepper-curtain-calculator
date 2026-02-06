const validateAnswers = (answers, questionData) => {
  const keys = Object.keys(answers);

  const passed =
    keys.findIndex((key) => {
      const answer = answers[key];
      const { validation } = questionData.find(
        (questionDataItem) => questionDataItem.id === key
      );

      if (!validation) {
        return false;
      }

      const validationResult = validation(answer);
      const reverseBoolValidationResult = !validationResult;
      return reverseBoolValidationResult;
    }) === -1;

  return {
    passed,
  };
};

export default validateAnswers;
