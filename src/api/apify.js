/**
 * @file apify
 * @author ienix(enix@foxmail.com)
 *
 * @since 2018/1/16
 */

import {apify, request} from 'i-apify';

import list from './list';
import option from './option';

// @link https://www.npmjs.com/package/i-apify
export default apify(request.post, list, option);
