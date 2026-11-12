export interface FeatureDetail {
  title: string
  description: string
  icon: string
  tag?: string
}

export interface FeatureSectionConfig {
  id: string
  eyebrow: string
  heading: string
  subheading: string
  description: string
  callout?: string
  cta: {
    label: string
    to: string
  }
  items: FeatureDetail[]
}

export const FEATURES_HERO = {
  eyebrow: 'PLATFORM CAPABILITIES',
  title: 'Everything you need to manage firmware updates securely.',
  subtitle:
    'From firmware upload and cryptographic verification to controlled deployments and post-update monitoring, manage the firmware lifecycle through one centralised platform.',
  supportingStatement:
    'Built for embedded developers and IoT operators who need more than a basic firmware upload mechanism.',
  primaryCta: { label: 'Explore the Platform', to: '#capabilities' },
  secondaryCta: { label: 'View Documentation', to: '/docs' },
}

export const FIRMWARE_MANAGEMENT_SECTION: FeatureSectionConfig = {
  id: 'firmware-management',
  eyebrow: 'LIFECYCLE MANAGEMENT',
  heading: 'Manage firmware from release to deployment.',
  subheading: 'Firmware Repository & Artefacts',
  description:
    'Organise firmware artefacts, track versions, and manage the process of making new firmware available to your connected devices.',
  cta: { label: 'Explore Firmware Management', to: '/docs/integration' },
  items: [
    {
      title: 'Firmware Repository',
      description:
        'Maintain a centralised collection of firmware releases and their associated metadata. Keep firmware versions organised and accessible to authorised operators.',
      icon: 'i-lucide-package-search',
    },
    {
      title: 'Secure Firmware Upload',
      description:
        'Upload firmware binaries through controlled storage workflows using signed upload URLs and S3-compatible object storage.',
      icon: 'i-lucide-upload-cloud',
    },
    {
      title: 'Version Management',
      description:
        'Maintain identifiable firmware versions, release information, and device compatibility metadata to support controlled deployments.',
      icon: 'i-lucide-git-branch',
    },
    {
      title: 'Integrity Verification',
      description:
        'Calculate and verify SHA-256 checksums to detect accidental corruption or unexpected changes to firmware binaries.',
      icon: 'i-lucide-fingerprint',
    },
    {
      title: 'Signed Firmware Manifests',
      description:
        'Associate firmware releases with cryptographically signed manifests containing the information devices need to validate an update.',
      icon: 'i-lucide-file-check-2',
    },
  ],
}

export const FIRMWARE_SECURITY_SECTION: FeatureSectionConfig = {
  id: 'firmware-security',
  eyebrow: 'CRYPTOGRAPHIC TRUST',
  heading: 'Verify firmware before it reaches the device.',
  subheading: 'Authenticity & Supply Chain Protection',
  description:
    'A successful download does not automatically mean firmware is trustworthy. The update process must establish that the firmware is intact and authorised before installation.',
  callout:
    'Security principle: A firmware image should not be installed simply because it was successfully downloaded. Its integrity and authenticity must be validated first.',
  cta: { label: 'Explore Security Architecture', to: '/security' },
  items: [
    {
      title: 'Digital Firmware Signatures',
      description:
        'Generate signed firmware manifests using supported signing algorithms, including ECDSA P-256, Ed25519, and RSA-SHA256, subject to the configured signing and verification implementation.',
      icon: 'i-lucide-file-signature',
      tag: 'P-256 / Ed25519 / RSA',
    },
    {
      title: 'SHA-256 Integrity Checks',
      description:
        'Compare the downloaded firmware checksum with the expected manifest value before proceeding with installation.',
      icon: 'i-lucide-shield-check',
      tag: 'SHA-256',
    },
    {
      title: 'Signature Verification',
      description:
        'Use the device-side verification process to validate the firmware manifest before writing the firmware image to flash.',
      icon: 'i-lucide-binary',
      tag: 'Device-Side',
    },
    {
      title: 'Authenticated Firmware Delivery',
      description:
        'Protect communication between devices and the platform using HTTPS/TLS and configured device authentication mechanisms.',
      icon: 'i-lucide-lock',
      tag: 'HTTPS / TLS',
    },
    {
      title: 'Signing Key Protection',
      description:
        'Separate signing operations from ordinary firmware distribution. Production deployments should use a dedicated secrets manager or Hardware Security Module (HSM) for private signing keys.',
      icon: 'i-lucide-key-round',
      tag: 'HSM / Vault',
    },
  ],
}

export const DEVICE_IDENTITY_SECTION: FeatureSectionConfig = {
  id: 'device-identity',
  eyebrow: 'IDENTITY & ACCESS',
  heading: 'Give every device a trusted identity.',
  subheading: 'Device Credentials & Access Governance',
  description:
    'Manage device access using authentication mechanisms designed for connected devices and constrained embedded environments.',
  cta: { label: 'Explore Device Security', to: '/security' },
  items: [
    {
      title: 'Device Registration',
      description:
        'Register devices and associate them with identifiable device records, metadata, and firmware information.',
      icon: 'i-lucide-cpu',
    },
    {
      title: 'Device JWT Authentication',
      description:
        'Use device-specific authentication tokens to authenticate supported device requests to the platform.',
      icon: 'i-lucide-key',
    },
    {
      title: 'API Key Management',
      description:
        'Create and manage API credentials for authorised integrations. Store credential hashes rather than plaintext API keys.',
      icon: 'i-lucide-shield-alert',
    },
    {
      title: 'PKI and X.509 Certificates',
      description:
        'Support certificate-based device identity and mutual TLS (mTLS) authentication where provisioned and configured.',
      icon: 'i-lucide-badge-check',
    },
    {
      title: 'Role-Based Access Control',
      description:
        'Separate administrative and operational permissions through the platform\'s ADMIN and OPERATOR roles.',
      icon: 'i-lucide-user-check',
    },
  ],
}

export const CAMPAIGN_MANAGEMENT_SECTION: FeatureSectionConfig = {
  id: 'campaign-management',
  eyebrow: 'ORCHESTRATION',
  heading: 'Deploy updates with control, not guesswork.',
  subheading: 'Deployment Strategies & Guardrails',
  description:
    'Coordinate firmware releases across devices and groups. Choose an update strategy that reflects the operational risk and requirements of each deployment.',
  cta: { label: 'Explore OTA Campaigns', to: '/docs' },
  items: [
    {
      title: 'Immediate Deployment',
      description:
        'Make an approved firmware release available for immediate deployment to the selected target devices.',
      icon: 'i-lucide-zap',
    },
    {
      title: 'Gradual Rollouts',
      description:
        'Distribute firmware progressively instead of exposing the entire fleet to a new release at once.',
      icon: 'i-lucide-trending-up',
    },
    {
      title: 'Canary Deployments',
      description:
        'Start with a limited group of devices, observe the outcome, and use the results to inform wider deployment.',
      icon: 'i-lucide-flask-conical',
    },
    {
      title: 'Scheduled Campaigns',
      description:
        'Plan deployments for a selected time rather than initiating every update immediately.',
      icon: 'i-lucide-calendar-clock',
    },
    {
      title: 'Campaign Monitoring',
      description:
        'Monitor campaign progress and device update states to identify successful, pending, and failed deployments.',
      icon: 'i-lucide-activity',
    },
  ],
}

export const FLEET_MONITORING_SECTION: FeatureSectionConfig = {
  id: 'fleet-monitoring',
  eyebrow: 'OBSERVABILITY',
  heading: 'Understand what is happening across your fleet.',
  subheading: 'Device State & Telemetry Ingestion',
  description:
    'A firmware deployment does not end when the server sends an update. Operators need visibility into device status and the outcome of each deployment.',
  cta: { label: 'Explore Fleet Monitoring', to: '/docs' },
  items: [
    {
      title: 'Device Status',
      description:
        'View registered devices and their reported operational and connection status.',
      icon: 'i-lucide-server',
    },
    {
      title: 'Firmware Version Visibility',
      description:
        'Track reported firmware versions to understand which releases are running across your fleet.',
      icon: 'i-lucide-layers',
    },
    {
      title: 'Update Progress',
      description:
        'Monitor device-reported update progress and lifecycle events in real time.',
      icon: 'i-lucide-refresh-cw',
    },
    {
      title: 'Telemetry Collection',
      description:
        'Receive device telemetry and event data through the platform\'s supported reporting mechanisms.',
      icon: 'i-lucide-rss',
    },
    {
      title: 'Error Visibility',
      description:
        'Inspect reported failures and error events to support troubleshooting and operational response.',
      icon: 'i-lucide-alert-circle',
    },
    {
      title: 'Update History',
      description:
        'Review available update events and deployment outcomes for individual devices.',
      icon: 'i-lucide-history',
    },
  ],
}

export const ROLLBACK_RECOVERY_SECTION: FeatureSectionConfig = {
  id: 'rollback-recovery',
  eyebrow: 'RESILIENCE',
  heading: 'Plan for failed updates before they happen.',
  subheading: 'Post-Boot Watchdog & Failure Containment',
  description:
    'A reliable firmware update system must account for power loss, interrupted downloads, defective firmware, and devices that fail to complete their post-update checks.',
  callout:
    'Important: Rollback behaviour depends on the device hardware, bootloader, partition layout, firmware implementation, and successful health validation. It should not be assumed to work identically across all ESP32 and ESP8266 configurations.',
  cta: { label: 'Explore Reliability', to: '/docs/integration' },
  items: [
    {
      title: 'Post-Boot Health Validation',
      description:
        'Use device-side health checks to determine whether a newly installed firmware image has started successfully.',
      icon: 'i-lucide-heart-pulse',
    },
    {
      title: 'Rollback Policies',
      description:
        'Configure supported rollback behaviour to define how failed update attempts should be handled.',
      icon: 'i-lucide-sliders-horizontal',
    },
    {
      title: 'ESP32 OTA Rollback',
      description:
        'Use ESP32\'s supported OTA rollback mechanism to return to a previous application partition when the configured post-boot validation process fails.',
      icon: 'i-lucide-rotate-ccw',
    },
    {
      title: 'Update Retry Handling',
      description:
        'Use retry logic to handle recoverable update failures and temporary communication problems.',
      icon: 'i-lucide-rotate-cw',
    },
    {
      title: 'Failure Reporting',
      description:
        'Report update lifecycle events so operators can investigate failures and identify affected devices.',
      icon: 'i-lucide-file-warning',
    },
  ],
}

export const EMBEDDED_LIBRARIES_SECTION: FeatureSectionConfig = {
  id: 'embedded-libraries',
  eyebrow: 'EMBEDDED CLIENT SDKS',
  heading: 'Built with the device in mind.',
  subheading: 'ESP32 & ESP8266 C++ Libraries',
  description:
    'Connect supported embedded devices to the platform through Arduino-compatible C++ client libraries.',
  callout:
    'Compatibility note: ESP32 and ESP8266 are not equivalent hardware platforms. Available memory, flash layout, cryptographic libraries, SDK behaviour, and OTA partition support affect which features can be enabled on each device.',
  cta: { label: 'View Integration Documentation', to: '/docs/integration' },
  items: [
    {
      title: 'ESP32 Client',
      description:
        'Integrate ESP32 devices with the firmware update pipeline, including update checks, downloads, integrity verification, signature verification, and firmware installation.',
      icon: 'i-lucide-cpu',
      tag: 'v1.2.0',
    },
    {
      title: 'ESP8266 Client',
      description:
        'Support ESP8266-based devices through a dedicated client implementation designed around the platform\'s available capabilities and hardware constraints.',
      icon: 'i-lucide-microchip',
      tag: 'Resource-Constrained',
    },
    {
      title: 'Filesystem OTA',
      description:
        'Support filesystem image update workflows using compatible filesystem configurations such as LittleFS and SPIFFS.',
      icon: 'i-lucide-hard-drive',
      tag: 'LittleFS / SPIFFS',
    },
    {
      title: 'Device Authentication',
      description:
        'Integrate supported device authentication mechanisms, including device JWT and configured certificate-based authentication.',
      icon: 'i-lucide-shield-check',
      tag: 'JWT / X.509',
    },
    {
      title: 'Lifecycle Callbacks',
      description:
        'Expose update lifecycle events to application firmware so embedded applications can respond to update progress and outcomes.',
      icon: 'i-lucide-code-2',
      tag: 'C++ Callbacks',
    },
    {
      title: 'Watchdog and Retry Support',
      description:
        'Use supported health validation and retry mechanisms to improve update reliability.',
      icon: 'i-lucide-timer',
      tag: 'Watchdog',
    },
  ],
}

export const AUDIT_ADMINISTRATION_SECTION: FeatureSectionConfig = {
  id: 'audit-administration',
  eyebrow: 'GOVERNANCE & ADMIN',
  heading: 'Maintain visibility over important operations.',
  subheading: 'Audit Trails & Security Controls',
  description:
    'Firmware management involves security-sensitive actions. Operators need to understand what happened, while administrators need control over platform access and configuration.',
  cta: { label: 'Explore the Platform', to: '/register' },
  items: [
    {
      title: 'Audit Logs',
      description:
        'Record important platform activities to support operational traceability and security investigations.',
      icon: 'i-lucide-scroll-text',
    },
    {
      title: 'User and Role Management',
      description:
        'Manage platform users and separate administrative responsibilities from operational access.',
      icon: 'i-lucide-users',
    },
    {
      title: 'PKI Management',
      description:
        'Manage supported certificate-related operations and device identity configurations.',
      icon: 'i-lucide-award',
    },
    {
      title: 'Platform Settings',
      description:
        'Configure platform-level settings through the administrative interface.',
      icon: 'i-lucide-settings',
    },
    {
      title: 'API Documentation',
      description:
        'Explore the REST API through the platform\'s Swagger/OpenAPI documentation where available.',
      icon: 'i-lucide-file-json-2',
    },
  ],
}

export const DEVELOPER_INTEGRATION_SECTION: FeatureSectionConfig = {
  id: 'developer-integration',
  eyebrow: 'DEVELOPER WORKFLOW',
  heading: 'Integrate firmware updates into your existing workflow.',
  subheading: 'REST API, SDKs & Infrastructure',
  description:
    'The platform is designed around a modular REST API and embedded client libraries, allowing developers to connect their firmware and applications to the update lifecycle.',
  cta: { label: 'Start Building', to: '/api/docs' },
  items: [
    {
      title: 'REST API',
      description:
        'Integrate device management, firmware operations, OTA campaigns, and supported platform workflows through the versioned API.',
      icon: 'i-lucide-webhook',
    },
    {
      title: 'Swagger / OpenAPI',
      description:
        'Explore documented endpoints and inspect request and response structures.',
      icon: 'i-lucide-file-code-2',
    },
    {
      title: 'Arduino Compatibility',
      description:
        'Develop and integrate the ESP32 and ESP8266 client libraries in supported Arduino and PlatformIO environments.',
      icon: 'i-lucide-terminal',
    },
    {
      title: 'Event-Driven Firmware Integration',
      description:
        'Use available client lifecycle callbacks to integrate update progress and outcomes into embedded application logic.',
      icon: 'i-lucide-git-commit',
    },
    {
      title: 'Self-Hosted Infrastructure',
      description:
        'Deploy the platform using its supported containerised infrastructure and storage configuration.',
      icon: 'i-lucide-container',
    },
  ],
}

export const FEATURES_FAQ = [
  {
    value: 'what-is-platform',
    label: 'What is the Secure FOTA Platform?',
    content:
      'It is a firmware management platform designed to help teams manage firmware releases, authenticate devices, coordinate OTA campaigns, and monitor device update activity.',
  },
  {
    value: 'supported-devices',
    label: 'Which devices are supported?',
    content:
      'The project includes Arduino-compatible client libraries for ESP32 and ESP8266 devices. Compatibility depends on the board, SDK, flash layout, and available device capabilities.',
  },
  {
    value: 'firmware-protection',
    label: 'How does the platform protect firmware?',
    content:
      'The update workflow uses SHA-256 integrity checks and cryptographic signatures to help devices verify firmware authenticity before installation. Communication is protected using configured TLS and device authentication mechanisms.',
  },
  {
    value: 'staged-deployments',
    label: 'Does the platform support staged deployments?',
    content:
      'Yes. The campaign strategies include immediate, gradual, canary, and scheduled deployment modes.',
  },
  {
    value: 'automatic-rollback',
    label: 'Does it support automatic rollback?',
    content:
      'Rollback policies and device-side recovery mechanisms are included. Actual rollback capability depends on the device\'s OTA implementation, partition configuration, and bootloader support.',
  },
  {
    value: 'own-infrastructure',
    label: 'Can I use my own infrastructure?',
    content:
      'The project is designed around containerised infrastructure and S3-compatible storage, allowing supported self-hosted deployment configurations.',
  },
  {
    value: 'esp8266-parity',
    label: 'Does ESP8266 support every ESP32 security feature?',
    content:
      'No. ESP8266 has tighter memory and hardware constraints, and its cryptographic and OTA capabilities differ. The available implementation must be evaluated against the target board and SDK.',
  },
  {
    value: 'app-integration',
    label: 'Can I integrate the platform with my own application?',
    content:
      'The platform provides a versioned REST API and embedded client libraries for supported device integrations. Refer to the API documentation for the available endpoints and authentication requirements.',
  },
  {
    value: 'production-readiness',
    label: 'Is the platform production-ready?',
    content:
      'Production readiness depends on deployment configuration, signing key protection, certificate provisioning, infrastructure hardening, testing, monitoring, and the target device\'s OTA capabilities. Teams should validate these requirements before deploying to production.',
  },
]
