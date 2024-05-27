/**
 * Represents a byte manager for manipulating binary data.
 */
export class ByteManager {
  protected View: DataView
  protected OffsetByte: number = 0

  /**
   * Creates a new instance of ByteManager.
   * @param BufferParam - The buffer containing the binary data.
   */
  constructor(BufferParam: ArrayBuffer) {
    this.View = new DataView(BufferParam)
  }

  /**
   * Gets the number of remaining bytes in the buffer.
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

/**
 * Represents a byte reader that reads data from an ArrayBuffer.
 */
export class ByteReader extends ByteManager {
  /**
   * Creates a new instance of the ByteReader class.
   * @param BufferParam The ArrayBuffer to read data from.
   */
  constructor(BufferParam: ArrayBuffer) {
    super(BufferParam)
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
   * @param Byte The number of bytes to read.
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
}

/**
 * Represents a class for writing bytes to a buffer.
 */
export class ByteWriter extends ByteManager {
  /**
   * Creates a new instance of the ByteWriter class.
   * @param BufferParam - The buffer to write bytes to.
   */
  constructor(BufferParam: ArrayBuffer) {
    super(BufferParam)
  }

  /**
   * Writes a 32-bit unsigned integer to the buffer.
   * @param Value - The value to write.
   */
  WriteUInt32(Value: number): void {
    this.View.setUint32(this.OffsetByte, Value, true)
    this.OffsetByte += 4
  }

  /**
   * Writes a 32-bit signed integer to the buffer.
   * @param Value - The value to write.
   */
  WriteInt32(Value: number): void {
    this.View.setInt32(this.OffsetByte, Value, true)
    this.OffsetByte += 4
  }

  /**
   * Writes a 16-bit signed integer to the buffer.
   * @param Value - The value to write.
   */
  WriteInt16(Value: number): void {
    this.View.setInt16(this.OffsetByte, Value, true)
    this.OffsetByte += 1
  }

  /**
   * Writes a 16-bit unsigned integer to the buffer.
   * @param Value - The value to write.
   */
  WriteUInt16(Value: number): void {
    this.View.setUint16(this.OffsetByte, Value, true)
    this.OffsetByte += 1
  }

  /**
   * Writes an 8-bit signed integer to the buffer.
   * @param Value - The value to write.
   */
  WriteInt8(Value: number): void {
    this.View.setInt8(this.OffsetByte, Value)
    this.OffsetByte += 1
  }

  /**
   * Writes an 8-bit unsigned integer to the buffer.
   * @param Value - The value to write.
   */
  WriteUInt8(Value: number): void {
    this.View.setUint8(this.OffsetByte, Value)
    this.OffsetByte += 1
  }

  /**
   * Writes a record to the buffer.
   * @param ValueParam - The record value to write.
   */
  WriteRecord(ValueParam: [number, number, number]): void {
    const [TagID, Level, Size] = ValueParam
    const Value = (Size << 20) | (Level << 10) | TagID
    this.WriteUInt32(Value)

    if (Size === 0xFFF) {
      this.WriteUInt32(ValueParam[2])
    }
  }

  /**
   * Writes a specified number of bytes from an ArrayBuffer to the buffer.
   * @param Value - The ArrayBuffer containing the bytes to write.
   */
  Write(Value: ArrayBuffer): void {
    const Buffer = new Uint8Array(Value)
    for (let I = 0; I < Buffer.buffer.byteLength; I++) {
      this.View.setUint8(this.OffsetByte + I, Buffer[I])
    }
    this.OffsetByte += Buffer.buffer.byteLength
  }

  /**
   * Writes a string to the buffer.
   * @param Value - The string to write.
   */
  WriteString(Value: string): void {
    for (let I = 0; I < Value.length; I++) {
      this.WriteUInt16(Value.charCodeAt(I))
    }
  }

  /**
   * Returns the underlying ArrayBuffer.
   * @returns The underlying ArrayBuffer.
   */
  ArrayBuffer(): ArrayBuffer {
    return this.View.buffer
  }
}