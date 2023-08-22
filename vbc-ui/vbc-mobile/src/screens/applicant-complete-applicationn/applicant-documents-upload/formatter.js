/**
 * Formatter module that helps
 * to format data for
 * ApplicantsDocumentsUpload module
 */

/** required fields */
export const requiredFields = ['selectedUploadingDocumentType', 'selectFile'];

export const getDocumentsForDropdown = (documentTypes) => {
  let documentsForDropdown = [];
  if (Object.keys(documentTypes).length > 0 && documentTypes['FINANCIAL']) {
    documentTypes['FINANCIAL'].map((item) => {
      documentsForDropdown.push({
        id: documentsForDropdown.length + 1,
        value: item,
        name: item,
      });
    });
  }
  return documentsForDropdown;
};

/** get required document status
 * It transform required documents -
 * into dropdown values
 * with the status of pending/uploaded documents
 */
export const getRequiredDocumentStatus = (requiredDocuments) => {
  let requiredDocumentsStatus = [];
  Object.keys(requiredDocuments).map((item, index) => {
    const length = Object.keys(requiredDocuments[item]).length;
    let status = 'Uploaded';
    Object.keys(requiredDocuments[item]).map((item1) => {
      if (status === 'Uploaded') {
        if (!requiredDocuments[item][item1]) {
          status = `${item1 - 1}/${length} Pending`;
          return;
        } else {
          status = 'Uploaded';
        }
      }
    });
    requiredDocumentsStatus.push({
      id: index + 1,
      value: item,
      name: item,
      status,
    });
  });
  return {requiredDocumentsStatus};
};
