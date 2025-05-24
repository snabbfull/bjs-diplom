const myLogoutButton = new LogoutButton();

myLogoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const newRatesBoard = new RatesBoard();

function getMyStocks() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      newRatesBoard.clearTable();
      newRatesBoard.fillTable(response.data);
    }
  });
}

getMyStocks();

setInterval(getMyStocks, 60000);

const myMoneyManager = new MoneyManager();

myMoneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      myMoneyManager.setMessage(true, "Успешно");
      ProfileWidget.showProfile(response.data);
    } else {
      myMoneyManager.setMessage(false, "Неудачно");
    }
  });
};

myMoneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      myMoneyManager.setMessage(true, "Успешно");
      ProfileWidget.showProfile(response.data);
    } else {
      myMoneyManager.setMessage(false, "Неудачно");
    }
  });
};

myMoneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      myMoneyManager.setMessage(true, "Успешно");
      ProfileWidget.showProfile(response.data);
    } else {
      myMoneyManager.setMessage(false, "Неудачно");
    }
  });
};

const myFavoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success) {
    myFavoritesWidget.clearTable();
    myFavoritesWidget.fillTable(response.data);
    myMoneyManager.updateUsersList(response.data);
  }
});

myFavoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      myFavoritesWidget.clearTable();
      myFavoritesWidget.fillTable(response.data);
      myMoneyManager.updateUsersList(response.data);
      myFavoritesWidget.setMessage(true, "Успешно");
    } else {
      myFavoritesWidget.setMessage(false, "Неудачно");
    }
  });
};

myFavoritesWidget.removeUserCallback = (id) => {
  ApiConnector.removeUserFromFavorites(id, (response) => {
    if (response.success) {
      myFavoritesWidget.clearTable();
      myFavoritesWidget.fillTable(response.data);
      myMoneyManager.updateUsersList(response.data);
      myFavoritesWidget.setMessage(true, "Успешно");
    } else {
      myFavoritesWidget.setMessage(false, "Неудачно");
    }
  });
};
