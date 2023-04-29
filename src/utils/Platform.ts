export function getOs(): string {
  return navigator?.platform;
}

export function getUserAgent(): string {
  return navigator?.userAgent;
}

export function getBrowserName(): string {
  const userAgent = getUserAgent();
  let browserName;

  if (userAgent?.indexOf('Chrome') !== -1) {
    browserName = 'Google Chrome';
  } else if (userAgent?.indexOf('Safari') !== -1) {
    browserName = 'Safari';
  } else if (userAgent?.indexOf('Firefox') !== -1) {
    browserName = 'Mozilla Firefox';
  } else if (userAgent?.indexOf('Edge') !== -1) {
    browserName = 'Microsoft Edge';
  } else if (
    userAgent?.indexOf('Opera') !== -1 ||
    userAgent?.indexOf('OPR') !== -1
  ) {
    browserName = 'Opera';
  } else if (userAgent?.indexOf('Trident') !== -1) {
    browserName = 'Microsoft Internet Explorer';
  } else {
    browserName = 'unknown';
  }

  return browserName;
}
