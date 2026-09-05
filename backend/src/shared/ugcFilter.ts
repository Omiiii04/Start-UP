/**
 * UGC Compliance Screener
 * Mirrors frontend/src/utils/ugcFilter.ts — backend enforcement is mandatory.
 *
 * Regulation: UGC (Promotion of Academic Integrity and Prevention of
 * Plagiarism in Higher Educational Institutions) Regulations, 2018.
 */

export interface UGCScreeningResult {
  passed: boolean;
  flaggedKeywords: string[];
  recommendation: 'proceed' | 'restructure_to_mentorship' | 'reject';
  notes: string;
}

const RESTRICTED_KEYWORDS: string[] = [
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
  'proxy submission',
  'academic fraud',
  'plagiarism',
  'submit for me',
  'do my homework',
  'write my report',
  'complete my project for me',
  'finish my final year project',
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
      notes: `Contains prohibited academic submission terms: "${flaggedKeywords.join(', ')}". ` +
        `Engagement must be restructured to technical mentorship, code review, ` +
        `or infrastructure guidance before SOW can be generated.`,
    };
  }

  return {
    passed: true,
    flaggedKeywords: [],
    recommendation: 'proceed',
    notes: 'Standard technical scope verified. Complies with UGC 2018 academic integrity guidelines.',
  };
}
