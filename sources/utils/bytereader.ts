/**
 * Represents a byte reader that allows reading various types of data from a buffer.
 */
export class ByteReader {
  private View: DataView
  private OffsetByte: number = 0

  /**
   * Creates a new instance of the ByteReader class.
   * @param BufferParam - The buffer to read from.
   */
  constructor(BufferParam: ArrayBuffer) {
    this.View = new DataView(BufferParam)
  }

  /**
   * Reads a 32-bit unsigned integer from the buffer.
   * @returns The read 32-bit unsigned integer.
   */
  ReadUInt32(): number {
    const Result = this.View.getUint32(this.OffsetByte, true)
    this.OffsetByte += 4
    return Result
  }

  /**
   * Reads a 32-bit signed integer from the buffer.
   * @returns The read 32-bit signed integer.
   */
  ReadInt32(): number {
    const Result = this.View.getInt32(this.OffsetByte, true)
    this.OffsetByte += 4
    return Result
  }

  /**
   * Reads a 16-bit signed integer from the buffer.
   * @returns The read 16-bit signed integer.
   */
  ReadInt16(): number {
    const Result = this.View.getUint16(this.OffsetByte, true)
    this.OffsetByte += 2
    return Result
  }

  /**
   * Reads a 16-bit unsigned integer from the buffer.
   * @returns The read 16-bit unsigned integer.
   */
  ReadUInt16(): number {
    const Result = this.View.getUint16(this.OffsetByte, true)
    this.OffsetByte += 2
    return Result
  }

  /**
   * Reads an 8-bit signed integer from the buffer.
   * @returns The read 8-bit signed integer.
   */
  ReadInt8(): number {
    const Result = this.View.getInt8(this.OffsetByte)
    this.OffsetByte += 1
    return Result
  }

  /**
   * Reads an 8-bit unsigned integer from the buffer.
   * @returns The read 8-bit unsigned integer.
   */
  ReadUInt8(): number {
    const Result = this.View.getUint8(this.OffsetByte)
    this.OffsetByte += 1
    return Result
  }

  /**
   * Reads a record from the buffer.
   * @returns An array containing the tag ID, level, and size of the record.
   */
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

  /**
   * Reads a specified number of bytes from the buffer.
   * @param Byte - The number of bytes to read.
   * @returns The read bytes as an ArrayBuffer.
   */
  Read(Byte: number): ArrayBuffer {
    const Result = this.View.buffer.slice(this.OffsetByte, this.OffsetByte + Byte)
    this.OffsetByte += Byte
    return Result
  }

  /**
   * Reads a string from the buffer.
   * @returns The read string.
   */
  ReadString(): string {
    const Length = this.ReadUInt16()
    const Result: string[] = []

    for (let I = 0; I < Length; I++) {
      Result.push(String.fromCharCode(this.ReadUInt16()))
    }

    return Result.join('')
  }

  /**
   * Returns the number of remaining bytes in the buffer.
   * @returns The number of remaining bytes.
   */
  RemainByte(): number {
    return this.View.byteLength - this.OffsetByte
  }

  /**
   * Skips a specified number of bytes in the buffer.
   * @param Offset - The number of bytes to skip.
   */
  SkipByte(Offset: number): void {
    this.OffsetByte += Offset
  }

  /**
   * Checks if the end of the buffer has been reached.
   * @returns True if the end of the buffer has been reached, false otherwise.
   */
  IsEOF(): boolean {
    return this.View.byteLength <= this.OffsetByte
  }
}