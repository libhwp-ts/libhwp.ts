import { HwpContainerError } from '../container.js'
import * as Cfb from 'cfb'

export function DecodeFileBinary(FileBuffer: ArrayBuffer): Cfb.CFB$Container {
  try {
    return Cfb.read(new Uint8Array(FileBuffer), {type: 'buffer'})
  }
  catch (Cause) {
    throw new HwpCfbDecodingError(['Failed to decode binary data to Cfb.CFB$Container.', { cause: Cause }])
  }
}

/**
 * @name EncodeFileBinary
 * @description Encodes the data instance of Cfb.CFB$Container to binary data.
 * Note that write export function of cfb module returns Buffer type in Node.js and Uint8Array type in browser.
 * @param Data {@link Cfb.CFB$Container} The data instance of Cfb.CFB$Container to encode.
 * @returns The encoded binary data.
 */
export function EncodeFileBinary(Data: Cfb.CFB$Container): ArrayBuffer {
  try {
    return new Uint8Array(Cfb.write(Data, {type: 'buffer'}) as Buffer | Uint8Array | number[]).buffer as ArrayBuffer
  } catch (Cause) {
    throw new HwpCfbEncodingError(['Failed to encode Cfb.CFB$Container to binary data.', { cause: Cause }])
  }
}

export class HwpCfbError extends HwpContainerError {
  constructor(Args: Parameters<ErrorConstructor>) {
    super(Args)
  }
}

export class HwpCfbDecodingError extends HwpCfbError {
  constructor(Args: Parameters<ErrorConstructor>) {
    super(Args)
  }
}

export class HwpCfbEncodingError extends HwpCfbError {
  constructor(Args: Parameters<ErrorConstructor>) {
    super(Args)
  }
}