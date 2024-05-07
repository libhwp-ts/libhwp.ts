import * as Cfb from 'cfb'

function DecodeFileBinary(FileBuffer: ArrayBuffer): Cfb.CFB$Container {
  return Cfb.read(new Uint8Array(FileBuffer), {type: 'buffer'})
}

/**
 * @name EncodeFileBinary
 * @description Encodes the data instance of Cfb.CFB$Container to binary data.
 * Note that write export function of cfb module returns Buffer type in Node.js and Uint8Array type in browser.
 * @param Data {@link Cfb.CFB$Container} The data instance of Cfb.CFB$Container to encode.
 * @returns The encoded binary data.
 */
function EncodeFileBinary(Data: Cfb.CFB$Container): ArrayBuffer {
  return new Uint8Array(Cfb.write(Data, {type: 'buffer'}) as Buffer | Uint8Array | number[]).buffer as ArrayBuffer
}