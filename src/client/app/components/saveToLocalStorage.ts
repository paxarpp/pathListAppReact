import { IPath, ICar } from '../components/interfaces';

const saveToLocalStorage = (cars: ICar[], pathLists: IPath[]): void => {
  try {
    localStorage.setItem('cars', JSON.stringify(cars));
    localStorage.setItem('pathLists', JSON.stringify(pathLists));
  } catch (err) {
    alert(`ошибка сохранения данных: ${err}`);
  }
};
export default saveToLocalStorage;
