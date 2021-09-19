const detectMobileDevice = () => 'ontouchstart' in document.documentElement

export default detectMobileDevice
