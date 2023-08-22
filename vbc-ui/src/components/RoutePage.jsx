/**
 * This Component is used for going to Any Page in the Admin Section, it recieces Children:- Mostly a button component  and url is the URL that we want the route to go,
 * URL can have Ids that need to be replaced with the correct ID
 */
import React from 'react';
import {useNavigate} from 'react-router-dom';

const RoutePage = ({children, url, id, state}) => {
  const history = useNavigate();
  const routeToEditPage = (url, id) => {
    const URL = url.replace(':id', id);
    history(URL, {state: state});
  };
  return <div onClick={() => routeToEditPage(url, id)}>{children}</div>;
};

export default RoutePage;
