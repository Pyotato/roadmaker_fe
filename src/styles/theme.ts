// xTiny = Extra Tiny
// lg = large
// xl = Extra Large
// xxl = Extra Extra Large
// ul = Ultra Large
// uul = Ultra Ultra Large

const calcRem = (size: number) => `${size / 16}rem`;

export const colors = {
  color_grey1: '#f0f1f3',
  color_primary: '#524FA1',
  color_grey2: '#E1E2E4',
  color_grey3: '#E9EBF',
  color_grey4: '#a8a9ab',
  color_primary_white: '#F0F1F3',
  color_text_role_danger: '#fa466a',
  color_text_role_success: '#00ab53',
};

export const borderRadii = {
  radius_small: calcRem(5),
  radius_medium: calcRem(14),
  radius_l: '60vw', //calcRem(30),
  radius_xl: '90vw', //calcRem(50),
  radius_circle: '100%',
};

export const fontSizes = {
  fontSize_xxxTiny: calcRem(3),
  fontSize_xxTiny: calcRem(5),
  fontSize_xTiny: calcRem(8),
  fontSize_tiny: calcRem(11),
  fontSize_small: calcRem(14),
  fontSize_base: calcRem(16),
  fontSize_lg: calcRem(18),
  fontSize_xl: calcRem(20),
  fontSize_xxl: calcRem(22),
  fontSize_xxxl: calcRem(24),
  fontSize_ul: calcRem(30),
  fontSize_titleSize: calcRem(50),
  fontSize_xlTitleSize: calcRem(70),
  fontSize_xxlTitleSize: calcRem(120),
};

export const inputSizes = {
  inputSize_xxTiny: calcRem(10),
  inputSize_xTiny: calcRem(30),
  inputSize_tiny: calcRem(50),
  inputSize_small: calcRem(70),
  inputSize_base: calcRem(100),
  inputSize_lg: calcRem(120),
  inputSize_xl: calcRem(160),
  inputSize_xxl: calcRem(200),
  inputSize_xxxl: calcRem(240),
  inputSize_ul: calcRem(280),
  inputSize_titleSize: calcRem(320),
  inputSize_xlTitleSize: calcRem(360),
  inputSize_xxlTitleSize: calcRem(420),
};

export const inputHeights = {
  inputSize_xxTiny: calcRem(10),
  inputSize_xTiny: calcRem(30),
  inputSize_tiny: calcRem(50),
  inputSize_small: calcRem(70),
  inputSize_base: calcRem(100),
  inputSize_lg: calcRem(120),
  inputSize_xl: calcRem(160),
  inputSize_xxl: calcRem(200),
  inputSize_xxxl: calcRem(240),
  inputSize_ul: calcRem(280),
  inputSize_titleSize: calcRem(320),
  inputSize_xlTitleSize: calcRem(360),
  inputSize_xxlTitleSize: calcRem(420),
};

export const fontWeights = {
  fontWeight_regular: '400',
  fontWeight_bold: '700',
  fontWeight_bolder: '900',
};

export const paddings = {
  padding_inputs: calcRem(4),
  padding_small: calcRem(8),
  padding_base: calcRem(10),
  padding_lg: calcRem(12),
  padding_xl: calcRem(14),
  padding_xxl: calcRem(16),
  padding_xxxl: calcRem(18),
  padding_ul: calcRem(40),
  padding_uul: calcRem(55),
  padding_uuul: calcRem(70),
  padding_uuuul: calcRem(120),
  padding_uuuuul: calcRem(170),
};

export const margins = {
  margin_base: calcRem(10),
  margin_small: calcRem(8),
  margin_lg: calcRem(12),
  margin_xl: calcRem(14),
  margin_xxl: calcRem(16),
  margin_xxxl: calcRem(18),
  margin_ul: calcRem(30),
  margin_uul: calcRem(45),
  margin_uuul: calcRem(55),
  margin_uuuul: calcRem(120),
};

export const interval = {
  interval_base: calcRem(50),
  interval_lg: calcRem(100),
  interval_xl: calcRem(150),
  interval_xxl: calcRem(200),
};

export const verticalInterval = {
  verticalInterval_base: `${calcRem(10)} 0 ${calcRem(10)} 0`,
};

export const deviceSizes = {
  deviceSize_S: '575px',
  deviceSize_M: '767px',
  deviceSize_Default: '1024px',
};

export const device = {
  device_S: `only screen and (max-width: ${deviceSizes.deviceSize_S})`,
  device_M: `only screen and (max-width: ${deviceSizes.deviceSize_M})`,
  device_Default: `only screen and (max-width: ${deviceSizes.deviceSize_Default})`,
};

export const fontStyles = {
  default_font: 'mainFont',
};

export const imgSizes = {
  img_size_xs: calcRem(4),
  img_size_small: calcRem(8),
  img_size_base: calcRem(24),
  img_size_lg: calcRem(100),
  img_size_xl: calcRem(120),
  img_size_xxl: calcRem(140),
  img_size_xxxl: calcRem(160),
  img_size_ul: calcRem(200),
  img_size_uul: calcRem(240),
  img_size_uuul: calcRem(300),
  img_size_uuuul: calcRem(360),
};

export const theme = {
  fontSizes,
  colors,
  fontStyles,
  borderRadii,
  deviceSizes,
  device,
  paddings,
  margins,
  interval,
  verticalInterval,
  fontWeights,
  inputSizes,
  inputHeights,
  imgSizes,
};
