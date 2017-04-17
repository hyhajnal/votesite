'use strict';

import app from '../src/app';
import config from '../src/config';

const port = process.env.PORT || config.listn_port;

(async() => {

  try {
    await app.listen(port);
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.log(error);
  }
})();
