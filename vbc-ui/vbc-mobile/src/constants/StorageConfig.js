/**
 * Storing files in External Storage -
 * requires RNFetchBlob library and
 * its configuration.
 * This module defines the configuration
 * used to save files in external storage
 */

import RNFetchBlob from 'rn-fetch-blob';

const fileName = 'vbc-document';

/** android config */
export const AndroidStorageConfig = {
  addAndroidDownloads: {
    useDownloadManager: true,
    mediaScannable: true,
    notification: true,
    // mime: 'application/pdf',
    path: RNFetchBlob.fs.dirs.DownloadDir + '/' + fileName,
  },
};

// gets mime type based on document format
const getMimeType = (documentFormat) => {
  if (documentFormat === 'pdf') {
    return 'application/pdf';
  } else if (documentFormat === 'jpeg' || documentFormat === 'jpg') {
    return 'image/jpeg';
  } else if (documentFormat === 'png') {
    return 'image/png';
  }
};

// sets mime type based on document format and generates android config
export const getAndroidStorageConfig = (documentFormat) => {
  const config = {
    addAndroidDownloads: {
      useDownloadManager: true,
      mediaScannable: true,
      notification: true,
      mime: getMimeType(documentFormat),
      path:
        RNFetchBlob.fs.dirs.DownloadDir + '/' + fileName + '.' + documentFormat,
    },
  };
  return config;
};

// sets mime type based on document format and generates android config
export const getIosStorageConfig = (documentFormat) => {
  const config = {
    fileCache: true,
    title: fileName,
    path:
      RNFetchBlob.fs.dirs.DocumentDir + '/' + fileName + '.' + documentFormat,
  };
  return config;
};

/** ios config */
export const IosStorageConfig = {
  fileCache: true,
  title: 'PBP Document',
  path: RNFetchBlob.fs.dirs.DocumentDir + '/' + fileName,
};
