// babel.config.js
import styleXPlugin from '@stylexjs/babel-plugin';


const config = {
  plugins: [
    [
      styleXPlugin,
      {
        dev: true,
        // Set this to true for snapshot testing
        // default: false
        test: false,
        // Required for CSS variable support
        unstable_moduleResolution: 
        {
          // type: 'commonJS' | 'haste'
          // default: 'commonJS'
          type: 'commonJS',
          rootDir: "./src",
        },
      },
    ],
  ],
};

export default config;