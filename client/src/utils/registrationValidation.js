export function validateAll(data, setValidationError, form) {
  var flag = true;

  if (form === 1) {
    if (isNaN(new Date(data["dateOfBirth"]))) {
      setValidationError(prev => ({
        ...prev,
        dateOfBirth: true,
      }))
    }
    Object.keys(data).slice(0, 9).forEach((key) => {
      if (data[key] === (undefined) || data[key] === "") {
        setValidationError(prev => ({
          ...prev,
          [key]: true,
        }))

        flag = false;
      } else {
        setValidationError(prev => ({
          ...prev,
          [key]: false,
        }))
      }
    });

  } else {

    Object.keys(data).slice(9, 14).forEach((key) => {
      if (data[key] === (undefined) || data[key] === "") {
        setValidationError(prev => ({
          ...prev,
          [key]: true,
        }))
        flag = false;
      } else {
        setValidationError(prev => ({
          ...prev,
          [key]: false,
        }))
      }
    });
  }

  return flag;

}