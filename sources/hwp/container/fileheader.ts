import { HwpContainerError } from '../container.js'
import * as Semver from 'semver'

export interface IHwpFileHeader {
  Version?: string
  Compressed?: boolean
  ProtectedByPassword?: boolean
  DistributedDocument?: boolean
  ScriptSaved?: boolean
  DRMProtected?: boolean
  XMLTemplateHistoryExist?: boolean
  DocHistoryExist?: boolean
  SignatureExist?: boolean
  EncryptedByPublicCert?: boolean
  SignatureDraftSaved?: boolean
  DRM2ProtectedByPublicCert?: boolean
  CCLDocument?: boolean
  OptimizedForMobile?: boolean
  PrivateInfoSecureDoc?: boolean
  VersionControlDoc?: boolean
  KOGLDocument?: boolean
  VideoControlIncluded?: boolean
  OrderFieldControlIncluded?: boolean
  EncryptionVersion?: number
  KOGLCountryCode?: 'KOR' | 'US'
}

/**
 * Represents the file header of an HWP document.
 */
export class HwpFileHeader {
  /**
   * The version of the HWP document.
   */
  protected Version: string = '0.0.0.0'

  /**
   * Indicates whether the document is compressed.
   */
  public Compressed: boolean = false

  /**
   * Indicates whether the document is protected by a password.
   */
  public ProtectedByPassword: boolean = false

  /**
   * Indicates whether the document is a distributed document.
   */
  public DistributedDocument: boolean = false

  /**
   * Indicates whether the script is saved in the document.
   */
  public ScriptSaved: boolean = false

  /**
   * Indicates whether the document is DRM protected.
   */
  public DRMProtected: boolean = false

  /**
   * Indicates whether the document has XML template history.
   */
  public XMLTemplateHistoryExist: boolean = false

  /**
   * Indicates whether the document has document history.
   */
  public DocHistoryExist: boolean = false

  /**
   * Indicates whether the document has a signature.
   */
  public SignatureExist: boolean = false

  /**
   * Indicates whether the document is encrypted by a public certificate.
   */
  public EncryptedByPublicCert: boolean = false

  /**
   * Indicates whether the signature draft is saved.
   */
  public SignatureDraftSaved: boolean = false

  /**
   * Indicates whether the document is DRM-protected by a public certificate.
   */
  public DRM2ProtectedByPublicCert: boolean = false

  /**
   * Indicates whether the document is a CCL document.
   */
  public CCLDocument: boolean = false

  /**
   * Indicates whether the document is optimized for mobile.
   */
  public OptimizedForMobile: boolean = false

  /**
   * Indicates whether the document contains encrypted private information.
   */
  public PrivateInfoSecureDoc: boolean = false

  /**
   * Indicates whether the document is a version control document.
   */
  public VersionControlDoc: boolean = false

  /**
   * Indicates whether the document is a KOGL document.
   */
  public KOGLDocument: boolean = false

  /**
   * Indicates whether the document includes video control.
   */
  public VideoControlIncluded: boolean = false

  /**
   * Indicates whether the document includes order field control.
   */
  public OrderFieldControlIncluded: boolean = false

  /**
   * The encryption version of the document.
   */
  public EncryptionVersion: 0 | 1 | 2 | 3 | 4 = 0

  /**
   * The KOGL country code of the document.
   */
  public KOGLCountryCode: 'KOR' | 'US' = undefined

  /**
   * The UUID (Universally Unique Identifier) of the HwpFileHeader instance.
   */
  public readonly UUID: string = crypto.randomUUID()

  /**
   * Creates a new instance of the HwpFileHeader class.
   * @param Options - The options to initialize the file header.
   */
  constructor(Options?: IHwpFileHeader) {
    for (const Key in Options) {
      this[Key] = Options[Key]
    }
  }

  /**
   * Set the version of the HwpFileHeader instance.
   * @param {string} Version - The version string to set. Must be a valid SemVer string.
   * @throws {HwpFileHeaderVersionError} If the version string is invalid.
   */
  SetVersion(Version: string): void {
    if (Semver.valid(Version) === null) {
      throw new HwpFileHeaderVersionError(['Invalid version string. The version string must be a valid SemVer string.', { cause: new Error().stack }])
    }
    this.Version = Version 
  }

  /**
   * Set the version safely of the HwpFileHeader instance.
   * 
   * @param {string} Version - The version to set.
   */
  SetVersionSafe(Version: string): void {
    if (Semver.valid(Version) === null) {
      return null
    }
    this.Version = Version
  }

  /**
   * Get the version of the HwpFileHeader instance.
   * @returns The version of the HwpFileHeader instance.
   */
  GetVersion(): string {
    return this.Version
  }
}

export class HwpFileHeaderError extends HwpContainerError {
  constructor(Args: Parameters<ErrorConstructor>) {
    super(Args)
  }
}

export class HwpFileHeaderVersionError extends HwpFileHeaderError {
  constructor(Args: Parameters<ErrorConstructor>) {
    super(Args)
  }
}