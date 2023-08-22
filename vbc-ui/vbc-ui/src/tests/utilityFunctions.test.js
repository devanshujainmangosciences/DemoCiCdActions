import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  emailValidator,
  mobileValidator,
  panValidator,
  aadharValidator,
  dobValidator,
  dateValidator,
  fileSizeValidator,
  fileTypeValidator,
  capitalizeFirstLetter,
  checkMinMaxValue,
  checkStrongPassword,
  checkifValueExists,
  dynamicMessageCreation,
  getQueryString,
  isArrayLengthEqual,
  objectsEqual,
  trimmer,
  queryStringStringify,
  negativeNumberValidator,
  convertToCorrectDataType,
  returnMasterDataSelectValues,
  validateURL,
} from '@/services/utility';
import {DATA_TYPE, VALIDATE_DATE_TYPE} from '../constants';

describe('Email Validator Test', () => {
  test('Validate for incorrect email id', () => {
    expect(emailValidator('anandom')).toBe(true);
  });
  test('Validate for correct  email id', () => {
    expect(emailValidator('anandgautam9911@gmail.com')).toBe(false);
  });
});

describe('Mobile Validator test', () => {
  test('Validate for incorrect mobile number', () => {
    expect(mobileValidator('090022')).toBe(true);
  });
  test('Validate for correct mobile number', () => {
    expect(mobileValidator('9003223819')).toBe(false);
  });
});
describe('Pan Validator test', () => {
  test('Validate for incorrect pan number', () => {
    expect(panValidator('BTSJ')).toBe(true);
  });
  test('Validate for correct pan number', () => {
    expect(panValidator('BTSPG3737J')).toBe(false);
  });
});
describe('Aadhar Validator test', () => {
  test('Validate for incorrect aadhar number', () => {
    expect(aadharValidator('090022')).toBe(true);
  });
  test('Validate for correct aadhar number', () => {
    expect(aadharValidator('904150521174')).toBe(false);
  });
});
describe('DOB Validator test', () => {
  test('Validate for incorrect DOB', () => {
    expect(dobValidator('2023-07-18')).toBe(true);
  });
  test('Validate for correct DOB', () => {
    expect(dobValidator('2021-07-18')).toBe(false);
  });
});
describe('Date Validator test', () => {
  test('Validate for restricting future date', () => {
    expect(
      dateValidator('2023-07-22', VALIDATE_DATE_TYPE.RESTRICT_FUTURE_DATE)
    ).toBe(true);
  });
  test('Validate for restricting past date', () => {
    expect(
      dateValidator('2022-07-15', VALIDATE_DATE_TYPE.RESTRICT_PAST_DATE)
    ).toBe(true);
  });
  test('Validate for restricting future date exculding current date', () => {
    expect(
      dateValidator(
        '2023-07-19',
        VALIDATE_DATE_TYPE.RESTRICT_FUTURE_DATE_EXCLUDING_CURRENT
      )
    ).toBe(true);
  });
  test('Validate for restricting past date excluding current date', () => {
    expect(
      dateValidator(
        '2022-07-14',
        VALIDATE_DATE_TYPE.RESTRICT_PAST_DATE_EXCLUDING_CURRENT
      )
    ).toBe(true);
  });
  test('Validate for restricting current date only', () => {
    expect(
      dateValidator('2022-07-19', VALIDATE_DATE_TYPE.ONLY_CURRENT_DATE)
    ).toBe(true);
  });
});

describe('Validate Negative Number test', () => {
  test('Testing Negative number', () => {
    expect(negativeNumberValidator(-1)).toBe(true);
  });
  test('Testing Positive number', () => {
    expect(negativeNumberValidator(1)).toBe(false);
  });
});
describe('Validate Password', () => {
  test('Validate Strong Password', () => {
    expect(checkStrongPassword('Anand@123')).not.toBe(null);
  });
  test('Validate Weak Password', () => {
    expect(checkStrongPassword('Anand123')).toBe(null);
  });
});
describe('File Size Validator', () => {
  test('Validate valid filesize', () => {
    expect(fileSizeValidator(15, 11534336)).toBe(false);
  });
  test('Validate invalid file size', () => {
    expect(fileSizeValidator(15, 16000000)).toBe(true);
  });
});

describe('File Type Validator', () => {
  test('Validate correct file type', () => {
    expect(fileTypeValidator('image/jpeg')).toBe(false);
  });
  test('Validate incorrect file type', () => {
    expect(fileTypeValidator('15/dssd')).toBe(true);
  });
});

describe('Query String Test', () => {
  test('Query String', () => {
    const object = {
      name: 'anand',
      age: 27,
    };
    expect(queryStringStringify(object)).toBe('name=anand&age=27');
  });
});

describe('Equal Object Validator', () => {
  const obj1 = {
    name: 'Anand',
    age: '27',
  };
  const obj2 = {
    name: 'Bolo',
    time: 90,
  };
  test('Objects are equal', () => {
    expect(objectsEqual(obj1, obj1)).toBe(true);
  });
  test('Objects are not equal', () => {
    expect(objectsEqual(obj1, obj2)).toBe(false);
  });
});

describe('Captalize first letter', () => {
  test('captalize first letter', () => {
    expect(capitalizeFirstLetter('anand')).toBe('Anand');
  });
  test('captalize first letter and make other letters smallcase', () => {
    expect(capitalizeFirstLetter('AnanD')).toBe('Anand');
  });
});
describe('Convert to correct data type', () => {
  test('convert to integer', () => {
    expect(convertToCorrectDataType('99', DATA_TYPE.NUMBER)).toBe(99);
  });
  test('Conver to String', () => {
    expect(convertToCorrectDataType(9033, DATA_TYPE.STRING)).toBe('9033');
  });
});
describe('Return master data in correct format', () => {
  test('return master data in correct format', () => {
    const array = [
      {
        id: 1,
        name: 'run',
      },
      {
        id: 2,
        name: 'jump',
      },
    ];
    const expectedValue = [
      {
        id: 1,
        label: 'run',
        value: 'run',
      },
      {
        id: 2,
        label: 'jump',
        value: 'jump',
      },
    ];
    expect(returnMasterDataSelectValues(array)).toStrictEqual(expectedValue);
  });
  test('return no data value in case of null or undefined', () => {
    const nullData = [
      {
        id: 1,
        label: 'No Data!',
        value: '',
      },
    ];
    expect(returnMasterDataSelectValues(undefined)).toStrictEqual(nullData);
  });
  test('return no data value in case of empty array', () => {
    const nullData = [
      {
        id: 1,
        label: 'No Data!',
        value: '',
      },
    ];
    expect(returnMasterDataSelectValues([])).toStrictEqual(nullData);
  });
});

describe('Validate URL', () => {
  test('Validate correct url with https', () => {
    expect(validateURL('https://www.google.com')).toBe(
      'https://www.google.com'
    );
  });
  test('Validate incorrect url', () => {
    expect(validateURL('hts://www.google.com')).toBe('');
  });
  test('Validate correct url with http', () => {
    expect(validateURL('http://www.google.com')).toBe('http://www.google.com');
  });
});

describe('Minimum and maximum value restriction', () => {
  test('Validate invalid value', () => {
    expect(checkMinMaxValue(10, 16, undefined)).toBe(true);
  });
  test('Validate incorrect range value', () => {
    expect(checkMinMaxValue(10, 16, 78)).toBe(true);
  });
  test('Validate correct range value', () => {
    expect(checkMinMaxValue(10, 16, 16)).toBe(false);
  });
  test('Validate correct range value but string', () => {
    expect(checkMinMaxValue(10, 16, '16')).toBe(false);
  });
});

describe('Array length test', () => {
  test('Correct array length', () => {
    expect(isArrayLengthEqual([1, 2, 3], [1, 3, 5])).toBe(true);
  });
  test('incorrect array length', () => {
    expect(isArrayLengthEqual([1, 2, 3], [1, 5])).toBe(false);
  });
  test('invalid array ', () => {
    expect(isArrayLengthEqual(null, [1, 3, 5])).toBe(false);
  });
});

describe('Dynamic Message creation', () => {
  test('Dynamic Messge for one data', () => {
    expect(dynamicMessageCreation('Dynamic message {0}', [22])).toBe(
      'Dynamic message 22'
    );
  });
  test('Dynamic Messge for multiple  data', () => {
    expect(
      dynamicMessageCreation(
        'Dynamic message {0} and {1} and {2}',
        [22, 23, 24]
      )
    ).toBe('Dynamic message 22 and 23 and 24');
  });
  test('Dynamic Messge for empty  data', () => {
    expect(
      dynamicMessageCreation('Dynamic message {0} and {1} and {2}', [])
    ).toBe('Dynamic message {0} and {1} and {2}');
  });
});

describe('Check if value is present', () => {
  test('Test correct array value', () => {
    expect(checkifValueExists([23, 33])).toBe(true);
  });
  test('Test empty array ', () => {
    expect(checkifValueExists([])).toBe(true);
  });
  test('Test undefined value ', () => {
    expect(checkifValueExists(null)).toBe(false);
  });
});
