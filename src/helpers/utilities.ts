import { Percent } from '@uniswap/sdk-core';
import bn, { Decimal } from 'decimal.js';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_DECIMALS } from '../constants/base/numbers';


/**
 * Generates a random UUID.
 * @returns {string} A random UUID.
 */
export const getUuid = () => uuidv4();
export function capitalize(string: string): string {
  return string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Takes in a string of text and returns a string that is ellipsed if it is longer than
 * the maxLength.
 * @param {string} text - the text to ellipse
 * @param {number} [maxLength=9999] - the max length of the text
 * @returns {string} the ellipsed text
 */
export function ellipseText(
  text: string = '',
  maxLength: number = 9999
): string {
  if (text.length <= maxLength) {
    return text;
  }
  const _maxLength = maxLength - 3;
  let ellipse = false;
  let currentLength = 0;
  const result =
    text
      .split(' ')
      .filter((word) => {
        currentLength += word.length;
        if (ellipse || currentLength >= _maxLength) {
          ellipse = true;
          return false;
        } else {
          return true;
        }
      })
      .join(' ') + '...';
  return result;
}

/**
 * Takes in a string of an address and returns a string with the first and last `width` characters removed.
 * @param {string} address - the address to ellipse
 * @param {number} [width=10] - the number of characters to remove from the beginning and end of the address
 * @returns {string} - the ellipsed address
 */
export function ellipseAddress(
  address: string = '',
  width: number = 10
): string {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

/**
 * Takes in a string and a number and returns a string with the number of spaces
 * added to the left of the string.
 * @param {string} n - the string to pad
 * @param {number} width - the number of spaces to add to the left of the string
 * @param {string} [z=0] - the character to add to the left of the string
 * @returns {string} - the padded string
 */
export function padLeft(n: string, width: number, z?: string): string {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/**
 * Sanitizes a hex string to make sure it is in the correct format.
 * @param {string} hex - the hex string to sanitize
 * @returns {string} the sanitized hex string
 */
export function sanitizeHex(hex: string): string {
  hex = hex.substring(0, 2) === '0x' ? hex.substring(2) : hex;
  if (hex === '') {
    return '';
  }
  hex = hex.length % 2 !== 0 ? '0' + hex : hex;
  return '0x' + hex;
}

/**
 * Removes the hex prefix from a hex string.
 * @param {string} hex - the hex string to remove the prefix from
 * @returns {string} the hex string without the prefix
 */
export function removeHexPrefix(hex: string): string {
  return hex.toLowerCase().replace('0x', '');
}

/**
 * Takes in a string of code and adds the correct amount of spaces to the beginning of each line.
 * @param {string} func - the function to format
 * @param {any[]} arrVals - the array of values to add to the function
 * @returns None
 */
export function getDataString(func: string, arrVals: any[]): string {
  let val = '';
  for (let i = 0; i < arrVals.length; i++) {
    val += padLeft(arrVals[i], 64);
  }
  const data = func + val;
  return data;
}

export function isMobile(): boolean {
  let mobile: boolean = false;

  function hasTouchEvent(): boolean {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (e) {
      return false;
    }
  }

  function hasMobileUserAgent(): boolean {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      return true;
    } else if (hasTouchEvent()) {
      return true;
    }
    return false;
  }

  mobile = hasMobileUserAgent();

  return mobile;
}

export function isObject(obj: any): boolean {
  return typeof obj === 'object' && !!Object.keys(obj).length;
}

/**
 * Returns true if the current time is within the market hours.
 * @returns {boolean} - True if the current time is within the market hours.
 */
export const isMarketHourCondition = (timestamp_sec: string) => {
  // Treat data updated within last 2 minutes as within market hour.
  return (
    new Date().getTime() - new Date(parseInt(timestamp_sec) * 1e3).getTime() <=
    2 * 60 * 1e3
  );
};

/**
 * Takes in a number and returns a string of the number with the correct formatting.
 * @param {number | string} num - the number to format
 * @param {string} [type='currency'] - the type of number to format
 * @returns {string} - the formatted number
 */
export const numberParse = (
  num: number | string,
  type?: string,
  config?: {
    prefix?: string;
    decimals?: number;
  }
) => {
  const defaultDecimals = config?.decimals || DEFAULT_DECIMALS;
  switch (type) {
    case 'currency':
      return `${config?.prefix ?? '$'}${addCommas(
        roundBN(num, defaultDecimals)
      )}`;
    case 'currencyLarge':
      return `${config?.prefix ?? '$'}${numberParseLarge(
        num,
        defaultDecimals
      )}`;
    case 'table':
      return addCommas(roundBN(num, 0));
    default:
      return addCommas(roundBN(num, defaultDecimals));
  }
};

/**
 * Takes in a number and returns a string with the number formatted
 * with k, m, b, t, etc suffix.
 * @param {number | string} num - the number to format
 * @returns {string} - the formatted number
 */
export const numberParseLarge = (num: number | string, decimal = 0) => {
  const numLen = Math.trunc(Number(num)).toString().length;
  const numSuffix = ['', 'K', 'M', 'B', 'T', 'Q', 'S', 'Z', 'Y'];
  const numDivided = [1, 1e3, 1e6, 1e9, 1e12, 1e15, 1e18, 1e21, 1e24];

  let numSuffixIndex = 0;
  if (numLen > 3) {
    if (numLen % 3) numSuffixIndex = Math.floor(numLen / 3);
    else numSuffixIndex = Math.floor(numLen / 3) - 1;
  }
  const numNoRound =
    Math.floor(
      (Number(num) / numDivided[numSuffixIndex]) * Math.pow(10, decimal)
    ) / Math.pow(10, decimal);
  return `${Number(numNoRound).toFixed(decimal)}${numSuffix[numSuffixIndex]}`;
};
/**
 * Takes in a number or string and returns a string with two decimal places.
 * @param {number | string} num - the number to format
 * @returns {string} - the number with two decimal places
 */
export const decimalFix = (num: number | string) => {
  return Number(num).toFixed(2);
};

/** deep copy using lodash clonedeep */
export const deepCopy = (obj: any) => {
  return _.cloneDeep(obj);
};
/**
 * Deep copy an object.
 * @param {any} obj - the object to copy
 * @returns {any} - the copied object
 */
// export const deepCopy = (obj: any) => {
//   if (obj === null || typeof obj !== 'object') {
//     return obj;
//   }

//   let temp = obj.constructor(); // give temp the original obj's constructor
//   for (let key in obj) {
//     temp[key] = deepCopy(obj[key]);
//   }

//   return temp;
// };

// Generate random evm address.
export const generateRandomEvmAddress = () => {
  return '0x' + Math.random().toString(36).substring(2, 15);
};

// Convert timestamp to date in locale language month and digits day format.
export const timestampToMonthDay = (timestamp: number) => {
  const date = new Date(timestamp * 1e3);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}`;
};

// Convert timestamp to date in locale language month and digits year format.
export const timestampToMonthYear = (timestamp: number) => {
  const date = new Date(timestamp * 1e3);
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

// Convert timestamp to date according to UTC
export const timestampToUTCString = (timestamp: number, type?: string) => {
  const date = new Date(timestamp * 1e3).toUTCString().split(' ');

  switch (type) {
    case 'MonthDay':
      return `${date[2]} ${date[1]}`;
    case 'MonthYear':
      return `${date[2]} ${date[3]}`;
    case 'YearMonth':
      return `${date[3]} ${date[2]}`;
    case 'DayMonthYear':
      return `${date[1]} ${date[2]} ${date[3]}`;
    case 'MonthDayYear':
      return `${date[2]} ${date[1]}, ${date[3]}`;
    default:
      return date.toLocaleString(); //Wed, 19 Oct 2022 21:30:00 GMT
  }
};

// Convert number to percentage.
export const numberToPercentage = (
  num: number | string | null | undefined,
  sd?: number
) => {
  return num !== null && num !== undefined
    ? `${roundBN(BN(num).times(100), sd ?? 2)}%`
    : '-';
};

/**
 * Counts the number of decimals in a number.
 * @param {number} value - the number to count the decimals of
 * @returns {number} - the number of decimals in the number
 */
export const countDecimals = function (value: number | string) {
  if (Math.floor(Number(value).valueOf()) === Number(value).valueOf()) return 0;

  let str = typeof value === 'number' ? value.toString() : value;
  if (str.indexOf('.') !== -1 && str.indexOf('-') !== -1) {
    return str.split('-')[1] || 0;
  } else if (str.indexOf('.') !== -1) {
    return str.split('.')[1].length || 0;
  }
};

export const now = () => new Date().getTime();

// Get the digits in a number.
export const getDigits = (num: number | string | bn) => {
  return BN(num).toFixed(0).length;
};

// return string with limited length, if string is longer than length, add ...
export const limitString = (str: string, length: number) => {
  if (str.length > length) {
    return str.substring(0, length) + '...';
  }
  return str;
};

// Serialize object
export const serialize = (obj: any) => {
  return JSON.stringify(obj);
};

// Deserialize object
export const deserialize = (str: string) => {
  return JSON.parse(str);
};

export const ethersErrorParser = (error: any) => {
  const match = error.message.match(/"data":{"message":"(.+)"}/);
  return {
    cause: match ? match[1] : error.message,
  };
};

export const isSlippageRelatedError = (error: string) => {
  const slippageError = [
    'Insufficient_Liquidity_Mint',
    'Insufficient_Token_Withdrawn',
    'Slippage_Too_Large',
  ];

  return slippageError.includes(error);
};

export const slippageToNumber: (slippage: Percent) => number = (slippage) => {
  return Number(slippage.toFixed(6)) / 100;
};
export const BN = (val: Decimal | string | number): Decimal => new bn(val);
Decimal.set({
  precision: 50,
  rounding: Decimal.ROUND_DOWN,
  defaults: true,
  maxE: 9e15,
  minE: -9e15,
  toExpPos: 9e15,
  toExpNeg: -9e15,
});

export const errorInfoParser = (error: any) => {
  if (error) {
    if (JSON.stringify(error) === '{}') {
      return 'No details error information';
    } else if (error?.message) {
      return limitString(error?.message, 50);
    } else if (error?.reason) {
      return `${
        error?.title ? error?.title : 'Leveraged Farming (Pseudo Delta Neutral)'
      }: ${limitString(error.reason, 50)}`;
    } else return limitString(error, 50);
  } else return 'No error property';
};

export const isTVLGreaterOrEqualToCapacity = (
  TVL: string | number,
  capacity: string | number,
  leverage: string | number
) => {
  return BN(TVL).gte(BN(capacity));
};

export const calculateThreshold = (
  priceMovementThreshold: string | number,
  leverage: number | string
) => {
  return BN(priceMovementThreshold).div(leverage).div(100).toNumber();
};
export const roundBN = (value: Decimal | number | string, decimal: number) => {
  // return BN(value).toFixed(decimal, Decimal.ROUND_FLOOR);
  return BN(value).toFixed(decimal);
};

// Add commas to a number string
export const addCommas = (str: string) => {
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
