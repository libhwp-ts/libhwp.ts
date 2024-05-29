/**
 * Represents a bit manager for manipulating binary data.
 */
export class BitManager {
  protected View: DataView
  protected OffsetByte: number = 0
  protected OffsetBit: number = 0

  /**
   * Creates a new instance of BitManager.
   * @param BufferParam - The buffer containing the binary data.
   */
  constructor(BufferParam: ArrayBuffer) {
    this.View = new DataView(BufferParam)
  }

  /**
   * Checks if the end of the buffer has been reached.
   * @returns True if the end of the buffer has been reached, false otherwise.
   */
  IsEOF(): boolean {
    return this.View.byteLength <= this.OffsetByte
  }

  /**
   * Reverses the order of bytes in the DataView.
   */
  Reverse(): void {
    const View = new Uint8Array(this.View.buffer)
    const Reversed = new Uint8Array(View.length)
    for (let I = 0; I < View.length; I++) {
      Reversed[I] = View[View.length - I - 1]
    }
    this.View = new DataView(Reversed.buffer)
  }

  /**
   * Skips the specified number of bits in the bit manager.
   * 
   * @param Offset - The number of bits to skip.
   */
  SkipBit(Offset: number): void {
    this.OffsetBit += Offset
    if (this.OffsetBit >= 8) {
      this.OffsetBit -= (this.OffsetBit % 8)
      this.OffsetByte += Math.floor(this.OffsetBit / 8)
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

/**
 * Represents a BitReader class that allows reading individual bits from a binary data source.
 */
export class BitReader extends BitManager {
  /**
   * Reads a single bit from the binary data source.
   * @returns The value of the bit read (true for 1, false for 0).
   */
  ReadBit(): boolean {
    const CurrentByte = this.View.getUint8(this.OffsetByte)
    const Value = (CurrentByte & (1 << this.OffsetBit)) !== 0

    this.OffsetBit++

    if (this.OffsetBit >= 8) {
      this.OffsetBit -= (this.OffsetBit % 8)
      this.OffsetByte += Math.floor(this.OffsetBit / 8)
    }

    return Value
  }
}

/**
 * Represents a BitWriter class that allows writing individual bits.
 */
export class BitWriter extends BitManager {
  /**
   * Writes a bit value to the current byte.
   * @param {boolean} Value - The bit value to write.
   * @returns {void}
   */
  WriteBit(Value: boolean): void {
    let CurrentByte = this.View.getUint8(this.OffsetByte)
    if (Value) {
      CurrentByte |= 1 << this.OffsetBit
    } else {
      CurrentByte &= ~(1 << this.OffsetBit)
    }

    this.View.setUint8(this.OffsetByte, CurrentByte)

    this.OffsetBit++

    if (this.OffsetBit >= 8) {
      this.OffsetBit -= (this.OffsetBit % 8)
      this.OffsetByte += Math.floor(this.OffsetBit / 8)
    }
  }
}