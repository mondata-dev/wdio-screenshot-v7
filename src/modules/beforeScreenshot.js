import debug from 'debug';

import scroll from '../scripts/scroll';
import scrollbars from '../scripts/scrollbars';
import removeElement from '../scripts/removeElement';
import triggerResize from '../scripts/triggerResize';
import hideElement from '../scripts/hideElement';

import getElements from '../utils/getElements';

const log = debug('wdio-screenshot:beforeScreenshot');

export default async function beforeScreenshot(browser, options) {
  // hide scrollbars
  log('hide scrollbars');
  await browser.execute(scrollbars, false);

  log('trigger resize event to allow js components to resize properly');
  await browser.execute(triggerResize);

  // hide elements
  if (Array.isArray(options.hide) && options.hide.length) {
    log('hide the following elements: %s', options.hide.join(', '));

    for (let i = 0; i < options.hide.length; i++) {
      let elements = await getElements(options.hide[i]);
      // browser.execute cannot convert array of elements to corresponding DOM element
      for (const elem of elements) {
        await browser.execute(hideElement, elem, true);
      }
    }
  }

  // remove elements
  if (Array.isArray(options.remove) && options.remove.length) {
    log('remove the following elements: %s', options.remove.join(', '));

    for (let i = 0; i < options.remove.length; i++) {
      let elements = await getElements(options.remove[i]);
      // browser.execute cannot convert array of elements to corresponding DOM element
      for (const elem of elements) {
        await browser.execute(removeElement, elem, true);
      }
    }
  }

  // scroll back to start
  const x = 0;
  const y = 0;
  log('scroll back to start x: %s, y: %s', x, y);
  await browser.execute(scroll, x, y);

  // wait a bit for browser render
  const pause = 200;
  log('wait %s ms for browser render', pause);
  await browser.pause(pause);
}
