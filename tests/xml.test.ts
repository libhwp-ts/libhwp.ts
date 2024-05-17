import test from 'ava'
import * as Zod from 'zod'
import * as XMLUtils from '../sources/utils/xml.js'

test('ValidateXML should return true for valid XML data', T => {
  const ValidXML = '<root><element>Value</element></root>'
  const Result = XMLUtils.ValidateXML(ValidXML)
  T.true(Result)
})

test('ValidateXML should return false for invalid XML data', T => {
  const InvalidXML = '<root><element>Value</root>'
  const Result = XMLUtils.ValidateXML(InvalidXML)
  const SchemaResult = Zod.object({
    err: Zod.object({ 
      code: Zod.string(),
      msg: Zod.string(),
      line: Zod.number(),
      col: Zod.number() 
    })
    }).safeParse(Result)
  if (SchemaResult.success) {
    T.pass()
    return
  }
  T.fail()
})

test('ParseXML should return an object for valid XML data', T => {
  const ValidXML = '<root><element>Value</element></root>'
  const Expected = { root: { element: 'Value' } }
  const Result = XMLUtils.ParseXML(ValidXML)
  T.deepEqual(Result, Expected)
})
