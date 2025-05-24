"use strict";

const userForm = new UserForm();

//Форма для ввода логина

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, function (response) {
    if (response.success) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(response.error);
    }
  });
};

//Форма для регистрации

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, function (response) {
    if (response.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(response.error);
    }
  });
};
