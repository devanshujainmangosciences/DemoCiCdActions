import React from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/redux/redux-hooks';
import {checkEnvVariablesText} from '@/services/utility';

const NoReportsFound = () => {
  const {t} = useTranslation(['common']);
  const loading = useAppSelector((state) => state.app.loader);

  return (
    <div className="p-5 w-100 h-100 d-flex align-items-center">
      {!loading && (
        <h4 className="text-bold lh-base">
          {t(
            checkEnvVariablesText(
              import.meta.env.VITE_NO_RECORDS_AVAILABLE,
              'noRecordsAvaliable'
            )
          )}
        </h4>
      )}
    </div>
  );
};

export default NoReportsFound;
