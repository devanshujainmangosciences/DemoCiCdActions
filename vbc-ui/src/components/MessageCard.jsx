/**
 * This module contains a Message card component.
 * this is pure components which render message card  
 * <MessageCard
    </MessageCard>
 */
import React from 'react';
import {SELECTED_ROLE_NAME} from '../constants';
import PropTypes from 'prop-types';
import {secureLocalStorage} from '@/services/web.storage';

const MessageCard = (props) => {
  const selectedRoleName = secureLocalStorage.getItem(SELECTED_ROLE_NAME);
  const {heading, message} = props;
  return (
    <div className={`message-container ${selectedRoleName}`}>
      <span className="message-heading">{heading}</span>
      <span className="message">{message}</span>
    </div>
  );
};
MessageCard.propTypes = {
  heading: PropTypes.string,
  message: PropTypes.string,
};
export default MessageCard;
