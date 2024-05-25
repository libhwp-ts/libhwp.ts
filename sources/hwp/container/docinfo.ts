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

interface IHwpDocProperties {
  AreaCount: number
  StartingNumber: HwpStartingNumber
  CaretLocation: CaretLocation
}

type IHwpIDMappingsIndex = 'binary' | 'hangulfont' | 'englishfont' | 'hanjafont'
  | 'japanesefont' | 'otherfont' | 'symbolfont' | 'userfont'
  | 'boundarybackground' | 'charshape' | 'tabdef' | 'paragraphnumber'
  | 'starttable' | 'paragraphshape' | 'style' | 'memoshape'
  | 'changetracking' | 'changetrackinguser'

interface IHwpIDMappings {
  [Index: number]: IHwpIDMappingsIndex
}

interface IHwpBinData {
  
}

export interface IHwpDocInfo {
  DocProperties: IHwpDocProperties
  IDMappings: IHwpIDMappings
  BinData: IHwpBinData
}