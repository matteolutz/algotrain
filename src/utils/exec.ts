import * as util from 'util';
import { exec as execCb } from 'child_process';

const exec = util.promisify(execCb);

export default exec;