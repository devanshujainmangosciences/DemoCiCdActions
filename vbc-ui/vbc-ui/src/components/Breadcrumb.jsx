/**
 * params:-
 * translatePage -> Name of the i18n json file from which text is to be read
 * breadcrumb -> Array of Strings - Breadcrumbs to be displayed in the Page
 * role-> user Role
 * thems-> user selected theme
 */
import React from 'react';
import {ButtonGroup, Breadcrumb} from '@themesberg/react-bootstrap';
import {QuestionIcon} from '@/assets/icons';
// import {withRouter} from 'react-router';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Routes} from '@/routes';
import {ROLES} from '../constants';
import {useAppSelector} from '@/redux/redux-hooks';

const CustomBreadcrumb = ({translatePage, breadcrumb, theme}) => {
  const {t} = useTranslation([translatePage]);
  // console.log('PUSH=>', breadcrumb);
  // console.log('ROLE=>', role);
  const selectedRole = useAppSelector((state) => state.app.userSelectedRole);

  const isPatientOrApplicant =
    selectedRole.roleName === ROLES.PATIENT ||
    selectedRole.roleName === ROLES.APPLICANT;

  return (
    <div className="justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4">
      {isPatientOrApplicant && (
        <Link
          className="button-toolbar mb-2 mb-md-0"
          aria-label="bread-crumb-link"
          to={Routes.help.path}>
          <ButtonGroup>
            <div className={`question-icon bg-${theme}`}>
              <QuestionIcon fill="#fff" />
            </div>
          </ButtonGroup>
        </Link>
      )}
      <div className="d-block mt-4">
        <Breadcrumb
          className="d-none d-md-inline-block"
          listProps={{
            className: 'breadcrumb-dark breadcrumb-transparent mb-0',
          }}>
          {breadcrumb.map(({id, name, push}, i) => {
            // if (push) {
            //   return (
            //     <Breadcrumb.Item
            //       key={id}
            //       active={i === breadcrumb.length - 1}
            //       onClick={() => history(push)}>
            //       {t(`${translatePage}:${name}`)}
            //     </Breadcrumb.Item>
            //   );
            // }
            return (
              // <Link  to={push}>
              <Breadcrumb.Item
                key={id + name}
                active={i === breadcrumb.length - 1}
                linkAs={'span'}>
                {push ? (
                  <Link to={push}>{t(`${translatePage}:${name}`)}</Link>
                ) : (
                  <>{t(`${translatePage}:${name}`)}</>
                )}
              </Breadcrumb.Item>
              // </Link>
            );
          })}
        </Breadcrumb>
      </div>
    </div>
  );
};
export default CustomBreadcrumb;
