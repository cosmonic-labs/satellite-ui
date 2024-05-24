import {rootLogger} from '@/services/logger/root-logger';

export const latticeLogger = rootLogger.getChildLogger('Lattice');
export const eventLogger = latticeLogger.getChildLogger('Event');
export const selectorLogger = latticeLogger.getChildLogger('Selector');
export const latticeProviderLogger = latticeLogger.getChildLogger('Provider');
