import { ByteWriter } from '../../../utils/bytemgr.js'
import { HwpFileHeader } from '../../container/fileheader.js'

export function ConvertHwpFileHeaderToCfb(HwpFileHeaderInstance: HwpFileHeader): ArrayBuffer {
  const ByteWriterInstance = new ByteWriter(new ArrayBuffer(256))
  ByteWriterInstance.WriteString('HWP Document File') // Hwp File Signature
  ByteWriterInstance.WriteUInt16(ConvertVersionToCfb(HwpFileHeaderInstance)) // Version
  return ByteWriterInstance.ArrayBuffer()
}

function ConvertVersionToCfb(HwpFileHeaderInstance: HwpFileHeader): number {
  return ((Number(HwpFileHeaderInstance.Version.split('.')[0]) & 0xff) << 24)
    | ((Number(HwpFileHeaderInstance.Version.split('.')[1]) & 0xff) << 16)
    | ((Number(HwpFileHeaderInstance.Version.split('.')[2]) & 0xff) << 8)
    | (Number(HwpFileHeaderInstance.Version.split('.')[3]) & 0xff)
}