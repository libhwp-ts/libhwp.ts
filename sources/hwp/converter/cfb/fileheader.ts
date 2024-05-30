import { ByteWriter, ByteReader } from '../../../utils/bytemgr.js'
import { BitWriter, BitReader } from '../../../utils/bitmgr.js'
import { HwpFileHeader } from '../../container/fileheader.js'

const HwpFileHeaderFlags = Object.entries(new HwpFileHeader()).filter(([Key, Value]) => Key !== 'UUID' && typeof Value === 'boolean').map(([Key]) => Key)

export function ConvertHwpFileHeaderToCfb(HwpFileHeaderInstance: HwpFileHeader): ArrayBuffer {
  const ByteWriterInstance = new ByteWriter(new ArrayBuffer(256))
  ByteWriterInstance.WriteString('HWP Document File') // Hwp File Signature
  ByteWriterInstance.Write(ConvertVersionToCfb(HwpFileHeaderInstance)) // Version
  ByteWriterInstance.Write(ConvertFlagsToCfb(HwpFileHeaderInstance)) // Flags
  ByteWriterInstance.Write(new ArrayBuffer(4)) // Ignore KOGL section
  ByteWriterInstance.Write(ConvertEncryptionVersionToCfb(HwpFileHeaderInstance)) // Encryption Version
  return ByteWriterInstance.ArrayBuffer()
}

function ConvertVersionToCfb(HwpFileHeaderInstance: HwpFileHeader): ArrayBuffer {
  const ByteWriterInstance = new ByteWriter(new ArrayBuffer(4))
  const VersionNumber = ((Number(HwpFileHeaderInstance.Version.split('.')[0]) & 0xff) << 24)
    | ((Number(HwpFileHeaderInstance.Version.split('.')[1]) & 0xff) << 16)
    | ((Number(HwpFileHeaderInstance.Version.split('.')[2]) & 0xff) << 8)
    | (Number(HwpFileHeaderInstance.Version.split('.')[3]) & 0xff)
  ByteWriterInstance.WriteUInt32(VersionNumber)
  return ByteWriterInstance.ArrayBuffer()
}

function ConvertFlagsToCfb(HwpFileHeaderInstance: HwpFileHeader): ArrayBuffer {
  const BitWriterInstance = new BitWriter(new ArrayBuffer(4))
  HwpFileHeaderFlags.forEach(Flag => BitWriterInstance.WriteBit(HwpFileHeaderInstance[Flag]))
  return BitWriterInstance.ArrayBuffer()
}

function ConvertEncryptionVersionToCfb(HwpFileHeaderInstance: HwpFileHeader): ArrayBuffer {
  const ByteWriterInstance = new ByteWriter(new ArrayBuffer(4))
  ByteWriterInstance.WriteUInt16(HwpFileHeaderInstance.EncryptionVersion)
  return ByteWriterInstance.ArrayBuffer()
}

export function ConvertCfbToHwpFileHeader(CfbArrayBuffer: ArrayBuffer): HwpFileHeader {
  const ByteReaderInstance = new ByteReader(CfbArrayBuffer)
  if (ByteReaderInstance.ArrayBuffer().byteLength !== 256) {
    throw new Error(`ArrayBuffer for HwpFileHeader must be 256 bytes long. Actual: ${ByteReaderInstance.ArrayBuffer().byteLength}`)
  }
  if (new ByteReader(ByteReaderInstance.ArrayBuffer().slice(0, 17)).ReadString(Infinity) !== 'HWP Document File') {
    throw new Error('Invalid Hwp File Signature')
  }
  const HwpFileHeaderInstance = new HwpFileHeader()
  HwpFileHeaderInstance.Version = ConvertCfbToVersion(ByteReaderInstance.ArrayBuffer().slice(17, 21))
  Object.entries(ConvertCfbToFlags(ByteReaderInstance.ArrayBuffer().slice(21, 25)))
    .filter(([Key, Value]) => Key !== 'UUID' && typeof Value === 'boolean' && Value === true).map(([Key]) => Key)
    .forEach(Flag => HwpFileHeaderInstance[Flag] = true)
  HwpFileHeaderInstance.EncryptionVersion = new ByteReader(ByteReaderInstance.ArrayBuffer().slice(29, 31)).ReadUInt16() as 0 | 1 | 2
  return HwpFileHeaderInstance
}

function ConvertCfbToVersion(CfbArrayBuffer: ArrayBuffer): string {
  const ByteReaderInstance = new ByteReader(CfbArrayBuffer)
  const VersionNumber = ByteReaderInstance.ReadUInt32()
  return `${(VersionNumber >>> 24) & 0xff}.${(VersionNumber >>> 16) & 0xff}.${(VersionNumber >>> 8) & 0xff}.${VersionNumber & 0xff}`
}

function ConvertCfbToFlags(CfbArrayBuffer: ArrayBuffer): HwpFileHeader {
  const BitReaderInstance = new BitReader(CfbArrayBuffer)
  const HwpFileHeaderInstance = new HwpFileHeader()
  HwpFileHeaderFlags.forEach(Flag => HwpFileHeaderInstance[Flag] = BitReaderInstance.ReadBit())
  return HwpFileHeaderInstance
}