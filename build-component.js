const fs = require('fs-extra');
    const concat = require('concat');

    build = async () =>{
        const files = [
            './dist/widget-test/browser/main.js'
          ];

          await fs.ensureDir('widget');
          await concat(files, 'widget/wp-widget.js');
    }
    build();
