import * as Cfb from 'cfb'

/**
 * Represents a CFB (Compound File Binary) Manager.
 */
export class CfbManager {
  protected Container: Cfb.CFB$Container

  /**
   * Creates a new instance of the CfbManager class.
   * @param Data The CFB container or an ArrayBuffer to decode.
   */
  constructor(Data?: Cfb.CFB$Container | ArrayBuffer) {
    if (Data instanceof ArrayBuffer) {
      this.Container = DecodeFileBinary(Data)
      return
    }
    if (typeof Data === 'undefined') {
      this.Container = Cfb.utils.cfb_new()
      return
    }
    this.Container = Data
  }

  /**
   * Returns the CFB container.
   * @returns The CFB container.
   */
  ReturnAsContainer(): Cfb.CFB$Container {
    PostprocessInit(this.Container)
    return this.Container
  }

  /**
   * Returns the CFB container as an ArrayBuffer.
   * @returns The CFB container as an ArrayBuffer.
   */
  ReturnAsArrayBuffer(): ArrayBuffer {
    PostprocessInit(this.Container)
    return EncodeFileBinary(this.Container)
  }

  /**
   * Adds an entry to the CFB container.
   * @param EntryName The name of the entry.
   * @param Data The data of the entry as an ArrayBuffer.
   */
  AddEntry(EntryName: string, Data: ArrayBuffer): void {
    PostprocessInit(this.Container)
    Cfb.utils.cfb_add(this.Container, EntryName, Data)
  }

  /**
   * Moves an entry within the CFB container.
   * @param EntryName The name of the entry to move.
   * @param NewEntryName The new name for the entry.
   */
  MoveEntry(EntryName: string, NewEntryName: string): void {
    PostprocessInit(this.Container)
    Cfb.utils.cfb_mov(this.Container, EntryName, NewEntryName)
  }

  /**
   * Deletes an entry from the CFB container.
   * @param EntryName The name of the entry to delete.
   */
  DeleteEntry(EntryName: string): void {
    PostprocessInit(this.Container)
    Cfb.utils.cfb_del(this.Container, EntryName)
  }
}

function PostprocessInit(Container: Cfb.CFB$Container): void {
  Cfb.utils.cfb_del(Container, '/\u0001Sh33tJ5')
}

function DecodeFileBinary(FileBuffer: ArrayBuffer): Cfb.CFB$Container {
  try {
    return Cfb.read(new Uint8Array(FileBuffer), {type: 'buffer'})
  }
  catch (Cause) {
    throw new CfbDecodingError(['Failed to decode binary data to Cfb.CFB$Container.', { cause: Cause }])
  }
}

function EncodeFileBinary(Data: Cfb.CFB$Container): ArrayBuffer {
  try {
    return new Uint8Array(Cfb.write(Data, {type: 'buffer'}) as Buffer | Uint8Array | number[]).buffer as ArrayBuffer
  } catch (Cause) {
    throw new CfbEncodingError(['Failed to encode Cfb.CFB$Container to binary data.', { cause: Cause }])
  }
}

export class CfbError extends Error {
  constructor(Args: Parameters<ErrorConstructor>) {
    super(...Args)
  }
}

export class CfbDecodingError extends CfbError {
  constructor(Args: Parameters<ErrorConstructor>) {
    super(Args)
  }
}

export class CfbEncodingError extends CfbError {
  constructor(Args: Parameters<ErrorConstructor>) {
    super(Args)
  }
}