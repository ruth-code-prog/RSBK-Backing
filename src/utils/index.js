import {Dimensions} from 'react-native';

export * from './colors';
export * from './fonts';
export * from './useForm';
export * from './localstorage';
export * from './showMessage';
export * from './date';

export const deviceWidth = () => Dimensions.get('window').width;

export const deviceHeight = () => Dimensions.get('window').height;
