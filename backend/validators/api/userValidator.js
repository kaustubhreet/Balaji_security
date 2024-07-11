const { Validator } = require('node-input-validator');

// Define validation rules
const userRegister = {
    name: 'required|string',
    email: 'required|email',
    password: 'required|string|minLength:6',
    confirmPassword: 'required|string|same:password',
    mobile: 'required|string',
    adharNumber: 'required|string',
    panNumber: 'required|string',
    fatherName: 'required|string',
    motherName: 'required|string',
    nomineeName: 'required|string',
    'bankDetails.accountHolderName': 'required|string',
    'bankDetails.accountNumber': 'required|string',
    'bankDetails.ifscCode': 'required|string',
};

const userLogin={
    email: 'required|email',
    password:'required|string|minLength:6'
}

const changePassword={
  currentPassword: 'required|string',
  newPassword: 'required|string',
  confirmPassword:  'required|string|same:newPassword'
}

const validateSchema={
    userRegister:userRegister,
    userLogin:userLogin,
    changePassword:changePassword

}


// Middleware function to validate user input
const inputValidation = async (data,type) => {
    const v = new Validator(data, validateSchema[type]);
    const valid = await v.check();
    if (!valid) {
      return v.errors[Object.keys(v.errors)[0]].message;
    } else {
      return false;
    }
};

module.exports = {inputValidation};


