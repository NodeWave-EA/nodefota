export const siteConfig = {
  name: 'NODEFOTA',
  shortName: 'NODEFOTA',
  fullName: 'NODEFOTA - Secure Firmware Over-The-Air Platform',
  url: 'https://fota.nodewave.net',
  description:
    'Secure Firmware Over-The-Air (FOTA) update management platform for ESP32 and ESP8266 IoT fleets. Cryptographic release signing, X.509 mTLS device identity, controlled canary rollouts, and automated rollback recovery.',
  tagLine: 'Secure Firmware. Reliable Updates. Complete Fleet Control.',
  email: 'info@nodewave.net',
  securityEmail: 'security@nodewave.net',
  calendly: 'https://calendly.com/nodewave-info/30min',
  repository: 'https://github.com/NodeWave-EA/nodefota',
  docsUrl: 'https://fota.nodewave.net/docs',
  social: {
    github: 'https://github.com/NodeWave-EA',
    twitter: 'https://twitter.com/nodewave_ea',
    linkedin: 'https://linkedin.com/company/nodewave-ea',
    tiktok: 'https://tiktok.com/@nodewave_ea',
  },
  contact: {
    email: 'info@nodewave.net',
    phone: '+254 705 598 248',
    address: 'Nairobi, Kenya',
  },
  platform: {
    supportedTargets: ['ESP32', 'ESP32-S3', 'ESP8266'],
    signatureAlgorithms: ['ECDSA P-256', 'Ed25519', 'RSA-SHA256'],
    hashAlgorithm: 'SHA-256',
    authMechanisms: ['X.509 / mTLS', 'Device JWT', 'Scoped API Keys'],
    rolloutStrategies: [
      'IMMEDIATE',
      'GRADUAL',
      'CANARY',
      'SCHEDULED',
    ],
    standards: ['NIST SP 800-193', 'IETF RFC 9019'],
  },
  company: {
    name: 'NodeWave',
    website: 'https://nodewave.net',
    logo: 'https://fota.nodewave.net/logo.svg',
    founded: 2024,
    region: 'East Africa',
    industries: [
      'IoT Firmware Security',
      'Embedded Systems',
      'Cloud Infrastructure',
      'Edge Computing',
    ],
    tagline: 'Leader in IoT Solutions',
  },
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/NodeWave-EA/nodefota',
      icon: 'i-lucide-github',
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/company/nodewave-ea',
      icon: 'i-lucide-linkedin',
    },
    {
      platform: 'X (Twitter)',
      url: 'https://twitter.com/nodewave_ea',
      icon: 'i-lucide-twitter',
    },
  ],
  postAddress: {
    streetAddress:
      'Falcon Road, off Enterprise Road, Industrial Area, Nairobi, Kenya',
    locality: 'Nairobi',
    addressRegion: 'Nairobi County',
    postalCode: '00100',
    addressCountry: 'KE',
  },
} as const
