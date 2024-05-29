import { BitManager, BitReader, BitWriter } from '../sources/utils/bitmgr.js'
import test from 'ava'

test('BitManager IsEOF array[4]', T => {
  if (new BitManager(new Uint8Array([0, 1, 2, 3]).buffer).IsEOF()) {
    T.fail()
  } else {
    T.pass()
  }
})

test('BitManager IsEOF array[0]', T => {
  if (new BitManager(new Uint8Array([]).buffer).IsEOF()) {
    T.pass()
  } else {
    T.fail()
  }
})

test('BitManager Reverse', T => {
  const BitManagerInstance = new BitManager(new Uint8Array([0, 1, 2, 3]).buffer)
  BitManagerInstance.Reverse()
  if (T.deepEqual(new Uint8Array(BitManagerInstance.ArrayBuffer()), new Uint8Array([3, 2, 1, 0]))) {
    T.pass()
  } else {
    T.fail()
  }
})

test('BitReader ReadBit 00', T => {
  const BitReaderInstance = new BitReader(new Uint8Array([0]).buffer)
  if (BitReaderInstance.ReadBit() === false) {
    T.pass()
  } else {
    T.fail()
  }
})

test('BitReader ReadBit EF EF', T => {
  const BitReaderInstance = new BitReader(new Uint8Array([0xEF, 0xEF]).buffer)
  if (BitReaderInstance.ReadBit() !== true) {
    T.fail()
  }
  BitReaderInstance.SkipBit(12)
  if (BitReaderInstance.ReadBit() === false) {
    T.pass()
  } else {
    T.fail()
  }
})

test('BitWriter WriteBit 03', T => {
  const BitWriterInstance = new BitWriter(new Uint8Array([0]).buffer)
  BitWriterInstance.WriteBit(true)
  BitWriterInstance.WriteBit(true)
  if (T.deepEqual(new Uint8Array(BitWriterInstance.ArrayBuffer()), new Uint8Array([3]))) {
    T.pass()
  } else {
    T.fail()
  }
})

test('BitWriter WriteBit 89', T => {
  const BitWriterInstance = new BitWriter(new Uint8Array([0]).buffer)
  const Dataset = [1, 0, 0, 1, 0, 0, 0, 1]
  Dataset.forEach(Value => BitWriterInstance.WriteBit(Value === 1))
  if (T.deepEqual(new Uint8Array(BitWriterInstance.ArrayBuffer()), new Uint8Array([137]))) {
    T.pass()
  } else {
    T.fail()
  }
})