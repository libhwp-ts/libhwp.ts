import * as FastXmlParser from 'fast-xml-parser'

export function ValidateXML(XMLData: string) {
  return FastXmlParser.XMLValidator.validate(XMLData)
}

export function ParseXML(XMLData: string) {
  return new FastXmlParser.XMLParser().parse(XMLData)
}
