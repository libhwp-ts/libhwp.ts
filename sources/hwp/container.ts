import type { IHwpFileHeader } from './container/fileheader.js'
import type { IHwpDocInfo } from './container/docinfo.js'
import type { IHwpBodyText } from './container/bodytext.js'
import type { IHwpSummaryInformation } from './container/hwpsummaryinformation.js'
import type { IHwpBinData } from './container/bindata.js'
import type { IHwpPrvText } from './container/prvtext.js'
import type { IHwpPrvImage } from './container/prvimage.js'
import type { IHwpDocOptions } from './container/docoptions.js'
import type { IHwpScripts } from './container/scripts.js'
import type { IHwpXMLTemplate } from './container/xmltemplate.js'
import type { IHwpDocHistory } from './container/dochistory.js'

/**
 * Represents the container type for an HWP file.
 */
export interface IHwpContainerType {
  FileHeader: IHwpFileHeader
  DocInfo: IHwpDocInfo
  BodyText: IHwpBodyText
  HwpSummaryInformation: IHwpSummaryInformation
  BinData: IHwpBinData
  PrvText: IHwpPrvText
  PrvImage: IHwpPrvImage
  DocOptions: IHwpDocOptions
  Scripts: IHwpScripts
  XMLTemplate: IHwpXMLTemplate
  DocHistory: IHwpDocHistory
}

export class HwpContainer {
  public Content: IHwpContainerType = null

  constructor(private readonly DataParam: ArrayBuffer | IHwpContainerType) {
    if (!(DataParam instanceof ArrayBuffer)) {
      this.Content = DataParam
      return
    }
    
  }
}