export interface HwpSection {
  Text: string
}

export interface HwpBodyText {
  [Index: number]: HwpSection
}