import {rootLogger} from '@/services/logger/root-logger';

export const eventLogger = rootLogger.getChildLogger('Lattice Event');
export const selectorLogger = rootLogger.getChildLogger('Lattice Selector');
