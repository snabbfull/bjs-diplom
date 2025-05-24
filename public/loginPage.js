"use strict";

const myUserForm = new UserForm();

myUserForm.loginFormCallback = (data) => {
  ApiConnector.login(data, function (response) {
    console.log(response);

    if (response.success) {
      location.reload();
    } else {
      console.error("Error: " + response.error);
      alert("Error: " + response.error);
    }
  });
};

myUserForm.registerFormCallback = (data) => {
  ApiConnector.register(data, function (response) {
    console.log(response);

    if (response.success) {
      location.reload();
    } else {
      console.error("Error: " + response.error);
      alert("Error: " + response.error);
    }
  });
};
