export function getOs(): string {
  const userAgent = navigator?.userAgent || '';

  if (/windows/i.test(userAgent)) {
    return 'Windows';
  } else if (/android/i.test(userAgent)) {
    return 'Android';
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return 'iOS';
  } else if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
    return 'macOS';
  } else if (/Linux/i.test(userAgent)) {
    return 'Linux';
  }

  return 'Unknown';
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
