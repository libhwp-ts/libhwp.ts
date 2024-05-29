import { ByteWriter } from '../../../utils/bytemgr.js'
import { BitWriter } from '../../../utils/bitmgr.js'
import { HwpFileHeader } from '../../container/fileheader.js'

const HwpFileHeaderFlags = Object.entries(new HwpFileHeader()).filter(([Key, Value]) => Key !== 'UUID' && typeof Value === 'boolean').map(([Key]) => Key)

export function ConvertHwpFileHeaderToCfb(HwpFileHeaderInstance: HwpFileHeader): ArrayBuffer {
  const ByteWriterInstance = new ByteWriter(new ArrayBuffer(256))
  ByteWriterInstance.WriteString('HWP Document File') // Hwp File Signature
  ByteWriterInstance.Write(ConvertVersionToCfb(HwpFileHeaderInstance)) // Version
  ByteWriterInstance.Write(ConvertFlagsToCfb(HwpFileHeaderInstance)) // Flags
  return ByteWriterInstance.ArrayBuffer()
}

function ConvertVersionToCfb(HwpFileHeaderInstance: HwpFileHeader): ArrayBuffer {
  const ByteWriterInstance = new ByteWriter(new ArrayBuffer(4))
  const VersionNumber = ((Number(HwpFileHeaderInstance.Version.split('.')[0]) & 0xff) << 24)
    | ((Number(HwpFileHeaderInstance.Version.split('.')[1]) & 0xff) << 16)
    | ((Number(HwpFileHeaderInstance.Version.split('.')[2]) & 0xff) << 8)
    | (Number(HwpFileHeaderInstance.Version.split('.')[3]) & 0xff)
  ByteWriterInstance.WriteUInt8(VersionNumber)
  return ByteWriterInstance.ArrayBuffer()
}

function ConvertFlagsToCfb(HwpFileHeaderInstance: HwpFileHeader): ArrayBuffer {
  const BitWriterInstance = new BitWriter(new ArrayBuffer(4))
  HwpFileHeaderFlags.forEach(Flag => BitWriterInstance.WriteBit(HwpFileHeaderInstance[Flag]))
  return BitWriterInstance.ArrayBuffer()
}