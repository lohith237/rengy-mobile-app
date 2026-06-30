import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const screenWidth = deviceWidth;
const hp = (percentage) => (deviceHeight * percentage) / 100;
const wp = (percentage) => (deviceWidth * percentage) / 100;

const ITEM_WIDTH = screenWidth / 3.5 - wp(3.5);
export { deviceHeight, deviceWidth, hp, ITEM_WIDTH, wp };
