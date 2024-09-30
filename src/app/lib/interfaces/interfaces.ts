import { combineReducers } from "@reduxjs/toolkit";
import { ReactElement, ReactNode } from "react";
// H O O K S

export interface ILocaleStorage {
  key: string;
}

// S T O R E S

export interface IInitialStateRequest {
  requests: IRequest[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rootReducer = combineReducers({})
export type IRootState = ReturnType<typeof rootReducer>

// C O M P O N E N T S

export interface INavigationItem {
  title: string;
  path: string;
  icon: ReactElement;
}

// F O R M S

export interface IUser {
  id: string;
  email: string;
  password: string;
  username: string;
}

export type IRequest = {
  id: string;
  requestType: "order" | "delivery";
  cityOrigin: string;
  cityDestination: string;
  type?: string;
  date: string;
  description?: string;
  createdAt: string;
  userEmail: string;
  userId: string;
};

// G L O B A L S

export interface IProtectedRoute {
  isLoggedIn: boolean;
}

export type IUserRow = {
  typeRequest: string,
  cityOrigin: string,
  cityDestination: string,
  date: string,
  createdAt: string,
  edit: ReactNode,
  deleteIcon: ReactNode
}
