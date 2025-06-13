// tailwind.config.js
module.exports = {
  content: [
    './templates/**/*.html',         // Django templates
    './**/templates/**/*.html',      // falls mehrere Apps
    './static/js/**/*.js',           // falls du JS verwendest
    './*.html'                       // für einzelne HTML-Dateien
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
