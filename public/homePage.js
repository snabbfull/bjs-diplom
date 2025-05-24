//Кнопка выхода

const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

//Получение данных о текущем пользователе

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

//Блок с курсами валют

const newRatesBoard = new RatesBoard();

function getNewStocks() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      newRatesBoard.clearTable();
      newRatesBoard.fillTable(response.data);
    }
  });
}

getNewStocks();

setInterval(getNewStocks, 60000);

//*Блок по управлению средствами

const moneyManager = new MoneyManager();

//**Попоплнение баланса

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      moneyManager.setMessage(true, "Успешно");
      ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

//**Конвертация средств

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      moneyManager.setMessage(true, "Успешно");
      ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

//**Перевод средств

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      moneyManager.setMessage(true, "Успешно");
      ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

//*Блок с избранными пользователями

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

//**Добавить пользователя в избранное

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, "Успешно");
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};

//**Удалить пользователя из избранных

favoritesWidget.removeUserCallback = (id) => {
  ApiConnector.removeUserFromFavorites(id, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, "Успешно");
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};
