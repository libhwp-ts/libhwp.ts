interface HwpStartingNumber {
  Page: number
  Footnote: number
  Endnote: number
  Picture: number
  Table: number
  Equation: number
}

interface CaretLocation {
  List: string
  Paragraph: string
  CharUintInParagraph: number
}

interface HwpDocProperties {
  AreaCount: number
  StartingNumber: HwpStartingNumber
  CaretLocation: CaretLocation
}

type HwpIDMappingsIndex = 'binary' | 'hangulfont' | 'englishfont' | 'hanjafont'
  | 'japanesefont' | 'otherfont' | 'symbolfont' | 'userfont'
  | 'boundarybackground' | 'charshape' | 'tabdef' | 'paragraphnumber'
  | 'starttable' | 'paragraphshape' | 'style' | 'memoshape'
  | 'changetracking' | 'changetrackinguser'

interface HwpIDMappings {
  [Index: number]: HwpIDMappingsIndex
}

interface HwpBinData {
  
}

export interface HwpDocInfo {
  DocProperties: HwpDocProperties
  IDMappings: HwpIDMappings
  BinData: HwpBinData
}