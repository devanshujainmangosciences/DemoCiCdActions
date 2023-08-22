/**
 * This Reducer contains the global state which holds routeList, allRoutes,
 * selectedRoute, status, pagination Information dedicated for
 * Routes. This Module performs create, update, read and delete Routes and update sub route,
 * update resource permissions and multiple resource permissions.
 * Reducer takes initialState, action type and payload as argument
 * and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes, LAST_ROUTE_VISITED} from '../constants';

const {
  SET_CREATE_ROUTE,
  SET_READ_ROUTE_LIST,
  SET_UPDATE_ROUTE,
  SET_DELETE_ROUTE,
  SET_ALL_ROUTE_LIST,
  SET_SHOW_ROUTE,
  SET_UPDATE_SUB_ROUTE,
  ON_SIDEBAR_ROUTE_CLICK,
} = actionTypes;

const initialState = {
  routeList: null,
  allRoutes: null,
  selectedRoute: null,
  status: null,
  pagination: null,
  routeVisited: null,
  routeClicked: {},
};

export default function route(state = initialState, {type, payload}) {
  const onSideBarRouteClicked = (state, payload) => {
    const {type, location} = payload;
    // console.log('LOCATION FROM REDUCER=>', location);
    localStorage.setItem(LAST_ROUTE_VISITED, location);
    const routeClickedState = {...state.routeClicked};
    routeClickedState[type] = Object.hasOwn(routeClickedState, type)
      ? routeClickedState[type] + 1
      : 0;
    return {...state, routeClicked: routeClickedState, routeVisited: location};
  };

  switch (type) {
    case SET_CREATE_ROUTE:
      return {...state, selectedRoute: payload};
    case SET_READ_ROUTE_LIST:
      return {
        ...state,
        routeList: payload.content,
        pagination: {
          first: payload.first,
          last: payload.last,
          number: payload.number,
          numberOfElements: payload.numberOfElements,
          pageable: payload.pageable,
          size: payload.size,
          totalElements: payload.totalElements,
          totalPages: payload.totalPages,
        },
      };
    case SET_ALL_ROUTE_LIST:
      return {...state, allRoutes: payload.content};
    case SET_UPDATE_ROUTE:
      return {...state, selectedRoute: payload};
    case SET_DELETE_ROUTE:
      return {...state, selectedRoute: payload};
    case SET_SHOW_ROUTE:
      return {...state, selectedRoute: payload};
    case SET_UPDATE_SUB_ROUTE:
      return {...state, selectedRoute: payload};
    case ON_SIDEBAR_ROUTE_CLICK:
      return onSideBarRouteClicked(state, payload);
    default:
      return state;
  }
}
