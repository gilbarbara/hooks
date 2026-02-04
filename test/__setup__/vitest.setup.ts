import '@testing-library/jest-dom';

import * as matchers from 'jest-extended';

process.env.TZ = 'UTC';

expect.extend(matchers);
