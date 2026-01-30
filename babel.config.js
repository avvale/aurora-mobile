module.exports = function (api) {
  api.cache(true);
  // En bare workflow, usar NODE_ENV es confiable:
  // - npx expo run:ios/android → development
  // - Build release en Xcode/Android Studio → production
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      // Solo elimina console.logs en producción
      isProduction && ['transform-remove-console', { exclude: ['error', 'warn'] }],
    ].filter(Boolean),
  };
};
