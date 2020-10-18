import * as crypto from 'crypto-js';
import { TinyColor } from '@ctrl/tinycolor';
import {WordArray} from 'crypto-js';

export class Utils {

  static isDark(color: string): boolean {
    const tmp = new TinyColor(color);
    return tmp.isDark();
  }

  static tint(color: string, amount: number = 25): string {
    const tmp = new TinyColor(color);
    return tmp.tint(amount).toHexString();
  }

  static parseQueryString(str: string): Map<string, string> {
    const ret = new Map<string, string>();

    str = str.trim().replace(/^([?#&])/, '');

    if (!str) {
      return ret;
    }

    str.split('&').forEach(function (param) {
      const parts = param.replace(/\+/g, ' ').split('=');
      // Firefox (pre 40) decodes `%3D` to `=`
      // https://github.com/sindresorhus/query-string/pull/37
      let key = parts.shift();
      let val = parts.length > 0 ? parts.join('=') : undefined;

      key = decodeURIComponent(key);

      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (ret[key] === undefined) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }
    });

    return ret;
  }

  static copyToClipboard(str) {
    const el = document.createElement('textarea');  // Create a <textarea> element
    el.value = str;                                 // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
    el.style.position = 'absolute';
    el.style.left = '-9999px';                      // Move outside the screen to make it invisible
    document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
    const selected =
      document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false;                                    // Mark as false to know no selection existed before
    el.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
      document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
      document.getSelection().addRange(selected);   // Restore the original selection
    }
  }

  static removeHash() {
    let scrollV: number, scrollH: number;
    const loc = window.location;
    if ('replaceState' in history) {
      history.replaceState('', document.title, loc.pathname + loc.search);
    } else {
      // Prevent scrolling by storing the page's current scroll offset
      scrollV = document.body.scrollTop;
      scrollH = document.body.scrollLeft;

      loc.hash = '';

      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scrollV;
      document.body.scrollLeft = scrollH;
    }
  }

  static passwordHash(pwd: string): string {
    return crypto.SHA3(pwd).toString();
  }

  static encryptData(object, passPhrase): string {
    // Calculate MD5 checksum, and add it to the decoded string
    let decodedString = JSON.stringify(object);
    const hash = crypto.SHA3(decodedString);
    decodedString = hash.toString() + ';' + decodedString;
    return crypto.AES.encrypt(decodedString, passPhrase).toString();
  }

  static decryptData(encodedBytes, passPhrase): Object {
    const decryptedWords = crypto.AES.decrypt(encodedBytes, passPhrase);
    let decrypted: any;
    try {
      decrypted = crypto.enc.Utf8.stringify(decryptedWords);
    } catch (e) {
      // Possibly ill-formed decryptedWords
      return null;
    }
    const index = decrypted.indexOf(';');
    if (index < 0) {
      return null;
    }
    const hash = decrypted.substr(0, index);
    const result = decrypted.substr(index + 1);
    if (hash !== crypto.SHA3(result).toString()) {
      return null;
    }
    return JSON.parse(result);
  }
}
