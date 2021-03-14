
to compile babel

use npx

in babel of newer node


package:

  "babel": {
    "presets": [
      "es2015",
      "stage-2",
      "react"
    ]
  },
  
  
install:

npm install babel-preset-react

npm install babel-preset-es2015

npm install babel-preset-stage-2


code...

compile to working....

npx babel ijf_react_utils_dev.js --out-file ../src/main/resources/js/ijf_react_utils.js

To watch files...
npx babel ijf_react_utils_dev.js -w --out-file ../src/main/resources/js/ijf_react_utils.js



test with remote

atlas-clean

atlas-package

deploy