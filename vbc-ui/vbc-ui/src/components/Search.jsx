/*
Search Component is generic component can be used as input search.

Props:- value:- value that is displayed in the search bar, it will be the state passed as a prop from parent component
        searchCallback:- callback function passed from parent to capture the onchange on the search component

*/

import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {FormControl, InputGroup, Button} from '@themesberg/react-bootstrap';
import {USER_THEME} from '../constants';

import React from 'react';

const Search = ({
  searchKey = 'Search',
  placeholder = 'Search',
  value = '',
  searchCallback,
}) => {
  const userTheme = localStorage.getItem(USER_THEME);
  const onSearchChange = (e) => {
    searchCallback(e.target.value);
  };
  return (
    <div className="custom-search">
      <InputGroup className="mb-3">
        <FormControl
          placeholder={placeholder}
          id="search-input"
          value={value}
          onChange={onSearchChange}
        />
        <Button
          variant="outline-secondary"
          className={`search-button search-button-${userTheme}`}
          data-testid="search-button">
          <FontAwesomeIcon icon={faSearch} size="sm" />
          <span className="m-2 search-key">{searchKey}</span>
        </Button>
      </InputGroup>
    </div>
  );
};

export default Search;
