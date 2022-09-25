export function validateAll(data, validationError, setValidationError, form) {
  var flag = true;

  if (form === 1) {
    if ((new Date(data["dateOfBirth"]) === "Invalid Date") && isNaN(new Date(data["dateOfBirth"]))) {
      validationError["dateOfBirth"] = true;
    }
    Object.keys(data).slice(0, 9).forEach((key) => {
      if (data[key] === (undefined) || data[key] === "") {
        validationError[key] = true;
        flag = false;
      } else {
        validationError[key] = false;
      }
    });

  } else {

    Object.keys(data).slice(9, 14).forEach((key) => {
      if (data[key] === (undefined) || data[key] === "") {
        validationError[key] = true;
        flag = false;
      } else {
        validationError[key] = false;
      }
    });
  }
  setValidationError(validationError);
  return flag;

}