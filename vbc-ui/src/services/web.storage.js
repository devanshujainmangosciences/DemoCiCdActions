/** This code is importing the necessary modules from the `crypto-js` and `secure-web-storage` libraries
to create a secure local storage for web applications. It uses the `SHA256` algorithm to hash the
keys, and the `AES` algorithm to encrypt and decrypt the data stored in the local storage. The
`encutf8` module is used to convert the decrypted data to a readable format. The
`secureLocalStorage` object is created using the `SecureStorage` constructor from the
`secure-web-storage` library, which takes the `localStorage` object as the first argument and an
options object as the second argument. The options object contains the `hash`, `encrypt`, and
`decrypt` functions that are used to secure the local storage data. The
`import.meta.env.VITE_WEB_STORAGE_SECRET_KEY` is used as a salt to create the hashing. */
import SecureStorage from 'secure-web-storage/secure-storage';
import AES from 'crypto-js/aes';
import SHA256 from 'crypto-js/sha256';
import encutf8 from 'crypto-js/enc-utf8';

/**
 * Secure Local Storage is used to secure the localstorage data with CryptoJS 265 Algorithm
 * WEB_STORAGE_SECRET_KEY is as salt to create the hashing
 */
export const secureLocalStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
    key = SHA256(key, import.meta.env.VITE_WEB_STORAGE_SECRET_KEY);
    return key.toString();
  },
  encrypt: function encrypt(data) {
    data = AES.encrypt(data, import.meta.env.VITE_WEB_STORAGE_SECRET_KEY);
    data = data.toString();
    return data;
  },
  decrypt: function decrypt(data) {
    data = AES.decrypt(data, import.meta.env.VITE_WEB_STORAGE_SECRET_KEY);
    data = data.toString(encutf8);
    return data;
  },
});
