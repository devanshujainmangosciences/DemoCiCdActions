/**
 * This module contains a Meesage card component.
 * this is pure components which render message card  
 * <CustomModal
      title, => (string) to show title of Modal
      Show, => (boolean to decide hide/show Modal)
      children, => to render inside modal
      handleClose, => callback to call on closing the modal
      source, => url to load in iframe  
    </CustomModal>

    deleteModalText => this paramater can be passed in the Custom modal to use it as a confirm/cancel modal
    onConfirmDelete=> this prop is callback for confirmation
    closeButton=> provides the css for cross button
 */
import {Modal, Button} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import React from 'react';

const CustomModal = ({
  Show,
  children,
  title,
  handleClose,
  cssClass,
  closeButton,
  deleteModalText,
  onConfirmDelete,
}) => {
  const {t} = useTranslation(['patientDetails']);
  const onDeleteButtonPress = () => {
    onConfirmDelete();
    handleClose();
  };

  //Component to be rendered for confirm/cancle type modal
  const deleteModalData = (deleteModalText) => {
    return (
      <div className="flex-center">
        <div>
          <div className="text-pure-black mb-3 text-center">
            <strong>{deleteModalText}</strong>
          </div>
          <div className="buttons">
            <div className="btn-cancle-patient" onClick={() => handleClose()}>
              {t('cancel')}
            </div>
            <div className="btn-confirm-patient" onClick={onDeleteButtonPress}>
              {t('confirm')}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal
      className={cssClass}
      // as={Modal.Dialog}
      centered
      show={Show ? true : false}
      onHide={handleClose}>
      {title && (
        <Modal.Header>
          <Modal.Title className="h6">{title}</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
      )}
      {closeButton && (
        <div className="privacy-policy-close" onClick={handleClose}>
          <div
            className={`${
              cssClass === 'privacy-modal' ? 'cross' : 'small-cross'
            }`}>
            +
          </div>
        </div>
      )}
      <Modal.Body>
        {deleteModalText && deleteModalData(deleteModalText, onConfirmDelete)}
        {children}
      </Modal.Body>
    </Modal>
  );
};
CustomModal.propTypes = {
  Show: PropTypes.any,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  handleClose: PropTypes.func,
};
export default CustomModal;
