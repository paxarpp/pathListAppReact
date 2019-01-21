const saveToLocalStorage = (cars, pathLists) => {
  try {
    localStorage.setItem('cars', JSON.stringify(cars));
    localStorage.setItem('pathLists', JSON.stringify(pathLists));
  } catch (err) {
    alert(`ошибка сохранения данных: ${err}`);
  }
};
export default saveToLocalStorage;
