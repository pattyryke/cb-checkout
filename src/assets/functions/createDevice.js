const Device = require('../classes/Device');

const createDevice = async (assetTag) => {
  try {
    const device = new Device(assetTag);
    await device.initializeDevice();
    return device;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { createDevice };
