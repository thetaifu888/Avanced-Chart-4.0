const configurationData = {
  supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
};

export const onReady = (callback) => {
  setTimeout(() => callback(configurationData));
};
