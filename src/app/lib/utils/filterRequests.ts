import { IRequest } from "../interfaces/interfaces";
import { t } from "i18next";

export const filterRequests = (requests: IRequest[], filter: string) => {
  return requests.filter((request) => {
    if (
      request.userEmail.toLowerCase().includes(filter.toLowerCase()) ||
      t(request.requestType).toLowerCase().includes(filter.toLowerCase()) ||
      request.cityOrigin.toLowerCase().includes(filter.toLowerCase()) ||
      request.cityDestination.toLowerCase().includes(filter.toLowerCase())
    ) {
      return request;
    }
  });
};

import dayjs from "dayjs";

export const filterRequestsByDateRange = (
  requests: IRequest[],
  startDate: string,
  endDate: string,
  field: "createdAt" | "date"
) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  return requests.filter((request) => {
    const requestDate = dayjs(request[field]);

    return (
      (requestDate.isAfter(start, "day") && requestDate.isBefore(end, "day")) ||
      requestDate.isSame(start, "day") ||
      requestDate.isSame(end, "day")
    );
  });
};
