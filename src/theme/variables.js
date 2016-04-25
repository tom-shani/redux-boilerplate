/**
 *  Define js versions of scss variables here.
 */
import Color from 'color'
/* eslint-disable new-cap */
const white = Color('white')

const defaultPallete = {
  gray05: white.darken(0.05).hexString(),
  gray15: white.darken(0.15).hexString(),
  gray25: white.darken(0.25).hexString(),
  gray50: white.darken(0.5).hexString(),
  gray75: white.darken(0.75).hexString()
}

const pomoColors = {
  darkRed: '#8e2800',
  red: '#b64926',
  orange: '#ffb03b',
  yellow: '#fff0a5',
  green: '#468966'
}

const bootstrapColors = {
  brandPrimary: pomoColors.red,
  brandSecondary: pomoColors.green,
  brandSuccess: pomoColors.green,
  brandWarning: pomoColors.orange,
  brandDanger: pomoColors.darkRed,
  brandInfo: pomoColors.yellow
}

const bootstrapExtraColors = {
  brandPi25: Color(bootstrapColors.brandPrimary).mix(Color(bootstrapColors.brandInfo), 0.25),
  brandPi50: Color(bootstrapColors.brandPrimary).mix(Color(bootstrapColors.brandInfo), 0.50)
}

export default {
  palette: {
    ...defaultPallete,
    ...pomoColors,
    ...bootstrapColors,
    ...bootstrapExtraColors
  }
}
