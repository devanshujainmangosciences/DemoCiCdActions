/**
 * Component is used to Preview  the uploaded file in Modal
 * It accepts two props:-
 *     file and setFile
 */
import {Button} from '@themesberg/react-bootstrap';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {getDocumentType} from '@/services/utility';
import CustomModal from './Modal';

const PreviewDownloads = ({file, setFile}) => {
  const [fileToDisplay, setfileToDisplay] = useState('');
  const [imageToDisplay, setimageToDisplay] = useState('');
  useEffect(() => {
    if (file && file?.value && file?.name) {
      const format = getDocumentType(file.name);
      if (format === 'PDF') {
        const objectFile = new Blob([file.value], {
          type: 'application/pdf',
        });
        const objectFileURL = URL.createObjectURL(objectFile);
        setfileToDisplay(objectFileURL);
      } else {
        const objectFileURL = window.URL.createObjectURL(
          new Blob([file.value])
        );
        setimageToDisplay(objectFileURL);
      }
    }
  }, [file]);

  useEffect(() => {
    if (!fileToDisplay || !imageToDisplay) setFile({});
  }, [fileToDisplay, imageToDisplay]);

  return (
    <>
      <CustomModal
        Show={fileToDisplay}
        // title={'Preview'}
        handleClose={() => setfileToDisplay('')}>
        <div className="document-preview">
          <object
            data={fileToDisplay}
            type="application/pdf"
            width="100%"
            height="100%"></object>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            type="button"
            onClick={() => setfileToDisplay('')}
            className="mt-3 bg-dark">
            Close
          </Button>
        </div>
      </CustomModal>
      <CustomModal
        Show={imageToDisplay}
        // title={'Preview'}
        handleClose={() => setimageToDisplay('')}>
        <div>
          <img src={imageToDisplay} />
        </div>
        <div className="d-flex justify-content-center">
          <Button
            type="button"
            onClick={() => setimageToDisplay('')}
            className="mt-3 bg-dark ">
            Close
          </Button>
        </div>
      </CustomModal>
    </>
  );
};

export default PreviewDownloads;
