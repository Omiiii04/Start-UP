import { UGCScreeningResult } from '../types';

/**
 * UGC Academic Integrity Compliance & Keyword Engine
 * References UGC Regulations 2018
 */

const RESTRICTED_KEYWORDS = [
  'write my assignment',
  'complete my assignment',
  'assignment proxy',
  'do my thesis',
  'write my thesis',
  'ghostwrite',
  'ghostwriting',
  'final year project proxy',
  'fake results',
  'synthetic data for publication',
  'write dissertation',
  'author paper for me',
];

export function screenRequirementUGC(text: string): UGCScreeningResult {
  const lower = text.toLowerCase();
  const flaggedKeywords: string[] = [];

  for (const keyword of RESTRICTED_KEYWORDS) {
    if (lower.includes(keyword)) {
      flaggedKeywords.push(keyword);
    }
  }

  if (flaggedKeywords.length > 0) {
    return {
      passed: false,
      flaggedKeywords,
      recommendation: 'restructure_to_mentorship',
      notes: `Contains prohibited academic submission terms: "${flaggedKeywords.join(', ')}". Engagement must be restructured to technical mentorship or code review before SOW generation.`,
    };
  }

  return {
    passed: true,
    flaggedKeywords: [],
    recommendation: 'proceed',
    notes: 'Standard technical scope verified. Complies with UGC 2018 academic integrity guidelines.',
  };
}
