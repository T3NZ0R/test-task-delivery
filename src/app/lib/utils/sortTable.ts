import { IRequest } from "../interfaces/interfaces";

export const descendingComparator = <T extends IRequest>(
  a: T,
  b: T,
  orderBy: keyof Omit<T, "type" | "description" >
) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (
  order: "asc" | "desc",
  orderBy: keyof Omit<IRequest, "type" | "description" >
) => {
  return order === "desc"
    ? (a: IRequest, b: IRequest) => descendingComparator(a, b, orderBy)
    : (a: IRequest, b: IRequest) => -descendingComparator(a, b, orderBy);
};

export const stableSort = <T extends IRequest>(
  array: T[],
  comparator: (a: T, b: T) => number
): T[] => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
