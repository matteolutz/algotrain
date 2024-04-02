import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...args: Array<ClassValue>) => twMerge(clsx(...args));

export default cn;