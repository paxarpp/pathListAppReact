const saveToLocalStorage = (cars, pathLists) => {
  localStorage.setItem('cars', JSON.stringify(cars));
  localStorage.setItem('pathLists', JSON.stringify(pathLists));
};
export default saveToLocalStorage;
