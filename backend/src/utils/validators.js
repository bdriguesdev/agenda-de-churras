const passwordValidator = password => {
    const errorObject = {
        name: 'ValidationError',
        errors: {
            email: {
                message: "Você deve enviar uma senha válida."
            }
        }
    }

    const isPasswordValid = /^([a-zA-Z0-9]{3,35})$/.test(password);

    if(typeof password !== 'string') throw errorObject; 
    else if(password.length < 3 || password.length > 35) {
        errorObject.errors.email.message = "Você deve enviar uma senha que contenha entre 3 a 35 caracteres.";
        throw errorObject;
    } else if(!isPasswordValid) {
        errorObject.errors.email.message = "Você deve enviar uma senha que apenas contenha: A-Z, a-z ou 0-9.";
        throw errorObject;
    }
};

module.exports = {
    passwordValidator
};