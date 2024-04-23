export class ByteReader {
  private View: DataView

  private OffsetByte: number = 0

  constructor(BufferParam: ArrayBuffer) {
    this.View = new DataView(BufferParam)
  }

  ReadUInt32(): number {
    const Result = this.View.getUint32(this.OffsetByte, true)
    this.OffsetByte += 4
    return Result
  }

  ReadInt32(): number {
    const Result = this.View.getInt32(this.OffsetByte, true)
    this.OffsetByte += 4
    return Result
  }

  ReadInt16(): number {
    const Result = this.View.getUint16(this.OffsetByte, true)
    this.OffsetByte += 2
    return Result
  }

  ReadUInt16(): number {
    const Result = this.View.getUint16(this.OffsetByte, true)
    this.OffsetByte += 2
    return Result
  }

  ReadInt8(): number {
    const Result = this.View.getInt8(this.OffsetByte)
    this.OffsetByte += 1
    return Result
  }

  ReadUInt8(): number {
    const Result = this.View.getUint8(this.OffsetByte)
    this.OffsetByte += 1
    return Result
  }

  ReadRecord(): [number, number, number] {
    const Value = this.ReadUInt32()

    const TagID = Value & 0x3FF
    const Level = (Value >> 10) & 0x3FF
    const Size = (Value >> 20) & 0xFFF

    if (Size === 0xFFF) {
      return [TagID, Level, this.ReadUInt32()]
    }

    return [TagID, Level, Size]
  }

  Read(Byte: number): ArrayBuffer {
    const Result = this.View.buffer.slice(this.OffsetByte, this.OffsetByte + Byte)
    this.OffsetByte += Byte
    return Result
  }

  ReadString(): string {
    const Length = this.ReadUInt16()
    const Result: string[] = []

    for (let I = 0; I < Length; I++) {
      Result.push(String.fromCharCode(this.ReadUInt16()))
    }

    return Result.join('')
  }

  RemainByte() {
    return this.View.byteLength - this.OffsetByte
  }

  SkipByte(Offset: number) {
    this.OffsetByte += Offset
  }

  IsEOF() {
    return this.View.byteLength <= this.OffsetByte
  }
}