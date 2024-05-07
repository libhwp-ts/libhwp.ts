import type { HwpFileHeader } from './container/fileheader.js'
import type { HwpDocInfo } from './container/docinfo.js'
import type { HwpBodyText } from './container/bodytext.js'
import type { HwpSummaryInformation } from './container/hwpsummaryinformation.js'
import type { HwpBinData } from './container/bindata.js'
import type { HwpPrvText } from './container/prvtext.js'
import type { HwpPrvImage } from './container/prvimage.js'
import type { HwpDocOptions } from './container/docoptions.js'
import type { HwpScripts } from './container/scripts.js'
import type { HwpXMLTemplate } from './container/xmltemplate.js'
import type { HwpDocHistory } from './container/dochistory.js'

/**
 * Represents the container type for an HWP file.
 */
export interface HwpContainerType {
  FileHeader: HwpFileHeader
  DocInfo: HwpDocInfo
  BodyText: HwpBodyText
  HwpSummaryInformation: HwpSummaryInformation
  BinData: HwpBinData
  PrvText: HwpPrvText
  PrvImage: HwpPrvImage
  DocOptions: HwpDocOptions
  Scripts: HwpScripts
  XMLTemplate: HwpXMLTemplate
  DocHistory: HwpDocHistory
}

export class HwpContainer {
  public Content: HwpContainerType = null

  constructor(private readonly DataParam: ArrayBuffer | HwpContainerType) {
    if (!(DataParam instanceof ArrayBuffer)) {
      this.Content = DataParam
      return
    }
    
  }
}