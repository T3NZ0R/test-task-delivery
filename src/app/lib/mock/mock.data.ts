import { THeadCells } from "../interfaces/interfaces";

export const headCells: THeadCells[] = [
  {
    id: "userEmail",
    label: "userEmail",
  },
  { id: "requestType", label: "typeOfRequest" },
  { id: "cityOrigin", label: "cityOfOrigin" },
  { id: "cityDestination", label: "destinationCity" },
  { id: "date", label: "dateOfDispatch" },
  { id: "createdAt", label: "createdAt" },
];

export const requestsData = [
  {
    id: "a772a262-f7b5-4db3-9e63-ef39d7a5145d",
    cityOrigin: "Lviv",
    cityDestination: "Sambir",
    date: "2024-10-08T01:29:53.079Z",
    createdAt: "2024-09-30T01:29:53.079Z",
    requestType: "delivery",
    userEmail: "t3nz0r@gmail.com",
    userId: "c2d7158b-370f-4a4e-bc5e-a02f3b8ba4fa",
  },
  {
    id: "5e9035aa-637a-475a-8706-fb99bf4b8517",
    cityOrigin: "Artemivs’k",
    cityDestination: "Armyansk",
    type: "clothes",
    date: "2024-10-15T03:09:50.634Z",
    createdAt: "2024-09-30T03:09:50.634Z",
    description: "qwe qwe qwe qwe qwe qwe qwe ",
    requestType: "order",
    userEmail: "t3nz0r@gmail.com",
    userId: "c2d7158b-370f-4a4e-bc5e-a02f3b8ba4fa",
  },
];
