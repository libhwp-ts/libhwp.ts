export interface IHwpFileHeader {
  Version: string
  Compressed: boolean
  ProtectedByPassword: boolean
  DistributedDocument: boolean
  ScriptSaved: boolean
  DRMProtected: boolean
  XMLTemplateHistoryExist: boolean
  DocHistoryExist: boolean
  SignatureExist: boolean
  EncryptedByPublicCert: boolean
  SignatureDraftSaved: boolean
  DRM2ProtectedByPublicCert: boolean
  CCLDocument: boolean
  OptimizedForMobile: boolean
  PrivateInfoSecureDoc: boolean
  VersionControlDoc: boolean
  KOGLDocument: boolean
  VideoControlIncluded: boolean
  OrderFieldControlIncluded: boolean
  EncryptionVersion: number
  KOGLCountryCode?: 'KOR' | 'US'
}
