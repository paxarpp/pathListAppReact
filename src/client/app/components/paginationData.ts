import { IPath } from './interfaces';

const paginationData = (page: number, stringOnPage: number, pathListsCar: IPath[] ): IPath[] => {
  const pages =
    pathListsCar.length % stringOnPage === 0
      ? pathListsCar.length / stringOnPage
      : Math.ceil(pathListsCar.length / stringOnPage);
  if (page > pages) {
    return pathListsCar.filter((elem: IPath, idx: number) => {
      if (idx >= (pages - 1) * stringOnPage && idx <= pages * stringOnPage - 1) {
        return elem;
      }
    });
  } else {
    return pathListsCar.filter((elem: IPath, idx: number) => {
      if (idx >= (page - 1) * stringOnPage && idx <= page * stringOnPage - 1) {
        return elem;
      }
    });
  }
};

export default paginationData;
