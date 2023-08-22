/**
 * This Component show all the messages or communication for the logged in user
 * IMPORTANT:
 */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {MessagesIcon} from '../assets/icons';
import messagesData from '../data/messages';
import {MessageCard, TitleContainer} from '../components';

export default function Messages() {
  const {t} = useTranslation(['messages']);
  return (
    <>
      <TitleContainer
        icon={<MessagesIcon fill="#fff" />}
        title={t('messages')}
      />
      <div className="row">
        {messagesData.map(({heading, message}, index) => {
          return (
            <div key={index} className="column">
              <MessageCard heading={heading} message={message} />
            </div>
          );
        })}
      </div>
    </>
  );
}
