import { PATTERN_ERRORS, PATTERNS } from './index.constants';

export const addIdtoDns = (dns: string[]) =>
  dns.map((item) => ({
    id: item,
    dns: item,
    error: ''
  }));

export const dnsNameValidation = (value: string) => {
  if (value && !PATTERNS.dnsName.test(value)) return PATTERN_ERRORS.dnsName;

  return '';
};

export const ipv4Validation = (value: string) => {
  if (value && !PATTERNS.ipv4.test(value)) return PATTERN_ERRORS.ipv4;

  return '';
};

export const portValidation = (value: number) => {
  if (value < 1 || value > 65535) return PATTERN_ERRORS.port;

  return '';
};

export const subnetValidation = (value: string) => {
  if (!value) return PATTERN_ERRORS.required;
  if (!PATTERNS.cidr.test(value)) return PATTERN_ERRORS.cidr;

  return '';
};

export const dnsValidation = (value: string) => {
  if (value && !PATTERNS.ipv4.test(value)) return PATTERN_ERRORS.ipv4;

  return '';
};
