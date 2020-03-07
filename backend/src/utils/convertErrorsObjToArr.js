const convertErrorsObjToArr = errors => {
    const errorsArr = [];

    for(error in errors) {
        errorsArr.push(errors[error].message);
    }

    return errorsArr;
};

module.exports = convertErrorsObjToArr;