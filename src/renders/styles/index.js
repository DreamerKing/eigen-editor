import getCustomStyle from './inlineStyle'
import customStyle from '../../const'
let customStyleMap = {}

export default customStyleMap = getCustomStyle({
  fontSizes: customStyle.fontSizes,
  colors: customStyle.colors,
  fontFamilies: customStyle.fontFamilies,
  indentStyles: customStyle.textIndent,
  LetterSpaces: customStyle.LetterSpaces,
  LeftRightMargins: customStyle.LeftRightMargins,
  TopMargins: customStyle.TopMargins,
  BottomMargins: customStyle.BottomMargins,
  LineHeights: customStyle.LineHeights
})