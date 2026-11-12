export interface SecurityPrinciple {
  id: string
  title: string
  summary: string
  description: string
  icon: string
  badge: string
}

export interface VerificationPipelineStep {
  step: string
  title: string
  action: string
  mechanism: string
  status: 'PENDING' | 'CHECKING' | 'VERIFIED' | 'REJECTED'
  detail: string
}

export interface ThreatItem {
  threat: string
  impact: string
  protection: string
  mitigatedBy: string
}

export interface SecurityLayer {
  layer: string
  title: string
  mechanism: string
  target: 'Server' | 'Device' | 'Transport' | 'Governance'
  icon: string
}

export const SECURITY_HERO = {
  eyebrow: 'SECURITY BY DESIGN',
  title: 'Trust every update. Verify every firmware release.',
  description:
    'Firmware is one of the most critical components of an IoT device. If it is compromised, an attacker may gain control over the device, manipulate its behaviour, or compromise the wider connected environment.',
  subdescription:
    'Secure FOTA Platform introduces multiple layers of protection across the firmware update lifecycle - combining device authentication, cryptographic firmware verification, protected delivery, deployment controls, and recovery mechanisms.',
  supportingStatement:
    'Security should not depend on trusting a firmware download. It should depend on independently verifying the firmware before installation.',
  primaryCta: { label: 'Explore Security Architecture', to: '#architecture' },
  secondaryCta: { label: 'View Documentation', to: '/docs' },
}

export const SECURITY_PRINCIPLES: SecurityPrinciple[] = [
  {
    id: 'protect',
    title: 'Protection',
    summary: 'Prevent unauthorised access and firmware modification.',
    description:
      'Prevent unauthorised access, firmware modification, and unauthorised deployment operations through authentication, access controls, and cryptographic verification.',
    icon: 'i-lucide-shield-lock',
    badge: 'LAYER 1',
  },
  {
    id: 'authenticate',
    title: 'Authentication',
    summary: 'Establish operator and device identity.',
    description:
      'Establish the identity of operators and devices before allowing access to protected platform resources.',
    icon: 'i-lucide-key-round',
    badge: 'LAYER 2',
  },
  {
    id: 'verify',
    title: 'Verification',
    summary: 'Validate integrity and authenticity before flashing.',
    description:
      'Validate firmware integrity and authenticity before the device commits an update to flash.',
    icon: 'i-lucide-file-check-2',
    badge: 'LAYER 3',
  },
  {
    id: 'detect',
    title: 'Detection',
    summary: 'Identify failures and suspicious activity.',
    description:
      'Identify corrupted firmware, unsuccessful deployments, device-reported errors, and campaign failure conditions.',
    icon: 'i-lucide-radar',
    badge: 'LAYER 4',
  },
  {
    id: 'recover',
    title: 'Recovery',
    summary: 'Contain failures and restore known-good state.',
    description:
      'Use supported device rollback mechanisms and platform rollback policies to reduce the impact of unsuccessful firmware deployments.',
    icon: 'i-lucide-rotate-ccw',
    badge: 'LAYER 5',
  },
]

export const VERIFICATION_PIPELINE: VerificationPipelineStep[] = [
  {
    step: '01',
    title: 'Update Check',
    action: 'Device authenticates & queries campaign endpoints',
    mechanism: 'HTTPS / TLS + Device JWT or mTLS',
    status: 'VERIFIED',
    detail: 'Requests available signed manifest for target hardware.',
  },
  {
    step: '02',
    title: 'Firmware Download',
    action: 'Retrieve firmware image and manifest payload',
    mechanism: 'Temporary Signed Storage URL',
    status: 'VERIFIED',
    detail: 'Downloads binary directly from S3/MinIO bucket with short expiry.',
  },
  {
    step: '03',
    title: 'SHA-256 Checksum Verification',
    action: 'Stream-calculate payload digest vs expected value',
    mechanism: 'Hardware SHA-256 Engine',
    status: 'CHECKING',
    detail: 'Mismatched checksum halts installation immediately before flash write.',
  },
  {
    step: '04',
    title: 'Signature Verification',
    action: 'Validate signed manifest using trusted public key',
    mechanism: 'ECDSA P-256 / Ed25519 / RSA',
    status: 'PENDING',
    detail: 'Manifest signature must match configured server signing key.',
  },
  {
    step: '05',
    title: 'Flash & Boot Validation',
    action: 'Commit to inactive OTA partition & execute watchdog',
    mechanism: 'ESP32 OTA Partition + Health Watchdog',
    status: 'PENDING',
    detail: 'Post-boot confirmation required before setting partition active.',
  },
]

export const THREAT_MODEL: ThreatItem[] = [
  {
    threat: 'Firmware tampering',
    impact: 'Malicious or corrupted firmware installed on devices',
    protection: 'SHA-256 checksum & cryptographic signature verification',
    mitigatedBy: 'Device-side verifier',
  },
  {
    threat: 'Device impersonation',
    impact: 'Unauthorised device accesses platform API',
    protection: 'Per-device credentials, device JWT & mTLS certificates',
    mitigatedBy: 'DeviceAuth Service',
  },
  {
    threat: 'Credential theft',
    impact: 'Unauthorised REST API access',
    protection: 'Credential hashing (bcrypt/argon2), restricted scopes, key rotation',
    mitigatedBy: 'Platform Auth Engine',
  },
  {
    threat: 'Firmware URL exposure',
    impact: 'Unauthorised binary downloads',
    protection: 'Signed object storage URLs with configurable expiration',
    mitigatedBy: 'Storage Policy Engine',
  },
  {
    threat: 'Man-in-the-middle attack',
    impact: 'Communication interception or payload modification',
    protection: 'Strict HTTPS/TLS with server certificate validation',
    mitigatedBy: 'Transport Layer Security',
  },
  {
    threat: 'Signing key compromise',
    impact: 'Malicious firmware signed as authentic',
    protection: 'Restricted signing access, HSM / Vault custody, key rotation',
    mitigatedBy: 'Key Management System',
  },
  {
    threat: 'Defective firmware release',
    impact: 'Fleet degradation or device bricking',
    protection: 'Canary rollouts & automated campaign failure thresholds',
    mitigatedBy: 'Campaign Guardrails',
  },
  {
    threat: 'Interrupted installation',
    impact: 'Device rendered unbootable',
    protection: 'Inactive OTA partition flashing, bootloader recovery & retry logic',
    mitigatedBy: 'Dual Partition Bootloader',
  },
  {
    threat: 'Privilege escalation',
    impact: 'Unauthorised administrative actions',
    protection: 'Backend RBAC enforcement (ADMIN / OPERATOR roles)',
    mitigatedBy: 'Backend Guards',
  },
  {
    threat: 'Missing operational visibility',
    impact: 'Delayed incident detection & response',
    protection: 'Telemetry ingestion, update state reporting & audit logging',
    mitigatedBy: 'Observability Subsystem',
  },
]

export const ARCHITECTURE_LAYERS: SecurityLayer[] = [
  {
    layer: 'Layer 1',
    title: 'Operator Identity',
    mechanism: 'JWT-based operator authentication & RBAC permissions',
    target: 'Governance',
    icon: 'i-lucide-user-check',
  },
  {
    layer: 'Layer 2',
    title: 'Device Identity',
    mechanism: 'Per-device credentials, device JWTs & X.509 mTLS certificates',
    target: 'Device',
    icon: 'i-lucide-fingerprint',
  },
  {
    layer: 'Layer 3',
    title: 'Secure Transport',
    mechanism: 'HTTPS / TLS with time-limited signed S3/MinIO URLs',
    target: 'Transport',
    icon: 'i-lucide-lock',
  },
  {
    layer: 'Layer 4',
    title: 'Firmware Authenticity',
    mechanism: 'SHA-256 integrity checks & ECDSA / Ed25519 signature validation',
    target: 'Server',
    icon: 'i-lucide-file-key-2',
  },
  {
    layer: 'Layer 5',
    title: 'Installation & Recovery',
    mechanism: 'Dual-partition OTA flashing, post-boot watchdog & rollback',
    target: 'Device',
    icon: 'i-lucide-rotate-ccw',
  },
  {
    layer: 'Layer 6',
    title: 'Operational Accountability',
    mechanism: 'Immutable audit logs, telemetry ingestion & campaign guardrails',
    target: 'Governance',
    icon: 'i-lucide-scroll-text',
  },
]

export const SECURITY_FAQ = [
  {
    value: 'verification-process',
    label: 'How does the platform verify firmware authenticity?',
    content:
      'The platform generates firmware manifests containing SHA-256 checksum information and supports configured digital signatures. The device-side verification process checks integrity and signature authenticity before installation.',
  },
  {
    value: 'signing-algorithms',
    label: 'What signing algorithms are supported?',
    content:
      'The documented signing options include ECDSA P-256, Ed25519, and RSA-SHA256. Device-side compatibility depends on the embedded cryptographic library and SDK version.',
  },
  {
    value: 'sha256-sufficiency',
    label: 'Is SHA-256 enough to secure firmware?',
    content:
      'No. SHA-256 detects accidental corruption when compared against a trusted expected checksum. A digital signature provides a mechanism for authenticating the manifest author and verifying that it has not been tampered with.',
  },
  {
    value: 'mtls-explanation',
    label: 'What is mutual TLS (mTLS)?',
    content:
      'Mutual TLS authenticates both the client device and the server using X.509 certificates during the TLS handshake, establishing mutual trust before application data is exchanged.',
  },
  {
    value: 'x509-support',
    label: 'Does the platform support X.509 certificates?',
    content:
      'Yes. The documented PKI workflow supports PKCS#10 CSR submission and signed X.509 device certificates for configured certificate-based authentication.',
  },
  {
    value: 'signing-key-location',
    label: 'Where should firmware signing keys be stored?',
    content:
      'For production environments, use a Hardware Security Module (HSM) or a dedicated secrets/key management service. Avoid distributing private signing keys to embedded devices or storing them in environment variables.',
  },
  {
    value: 'rollback-capabilities',
    label: 'Can the platform automatically roll back failed updates?',
    content:
      'The platform supports rollback policies and campaign failure monitoring. Physical device rollback requires compatible bootloader and firmware support. The documented ESP32 implementation uses native OTA rollback and post-boot health validation.',
  },
  {
    value: 'esp8266-vs-esp32',
    label: 'Is ESP8266 as secure as ESP32?',
    content:
      'The platforms have different hardware and software constraints. ESP8266 has more limited RAM and may not support the same cryptographic algorithms or OTA partition arrangements. Security configuration must be validated for the target environment.',
  },
  {
    value: 'tls-vs-signing',
    label: 'Does TLS eliminate the need for firmware signing?',
    content:
      'No. TLS protects communication in transit, while firmware signatures establish firmware authenticity independently of the delivery connection or storage provider.',
  },
  {
    value: 'vulnerability-guarantees',
    label: 'Does the platform guarantee that firmware is vulnerability-free?',
    content:
      'No. Signature verification establishes that firmware matches an authorised signing identity. It does not prove that the firmware has no software vulnerabilities. Firmware testing and security analysis remain necessary.',
  },
  {
    value: 'production-readiness',
    label: 'Is the platform suitable for production deployments?',
    content:
      'The platform provides security mechanisms intended to support secure firmware management. Production suitability depends on correct key management, certificate provisioning, TLS validation, backend hardening, hardware compatibility, and operational testing.',
  },
]
