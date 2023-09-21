import debug from 'debug';

import scrollbars from '../scripts/scrollbars';
import removeElement from '../scripts/removeElement';
import hideElement from '../scripts/hideElement';

import getElements from '../utils/getElements';

const log = debug('wdio-screenshot:afterScreenshot');

export default async function afterScreenshot(browser, options) {
    // show elements
    if (Array.isArray(options.hide) && options.hide.length) {
        log('show the following elements again: %s', options.hide.join(', '));


        for (let i = 0; i < options.hide.length; i++) {
            let elements = await getElements(options.hide[i]);
            // browser.execute cannot convert array of elements to corresponding DOM element
            for (const elem of elements) {
              await browser.execute(hideElement, elem, false);
            }
        }
    }

    // add elements again
    if (Array.isArray(options.remove) && options.remove.length) {
        log('add the following elements again: %s', options.remove.join(', '));

      for (let i = 0; i < options.remove.length; i++) {
        let elements = await getElements(options.remove[i]);
        // browser.execute cannot convert array of elements to corresponding DOM element
        for (const elem of elements) {
          await browser.execute(removeElement, elem, false);
        }
      }
    }

    // show scrollbars
    log('show scrollbars again');
    await browser.execute(scrollbars, true);
}
