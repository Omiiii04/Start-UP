/**
 * Server-side GST Calculation Engine
 * Mirrors frontend/src/utils/gst.ts — backend is authoritative.
 *
 * SAC 998314: Software Design & Development Services
 * SAC 998315: Cloud Infrastructure & Hosting Services
 */

export interface GSTBreakdown {
  subtotalInr: number;
  isMaharashtra: boolean;
  cgstRate: number;
  cgstInr: number;
  sgstRate: number;
  sgstInr: number;
  igstRate: number;
  igstInr: number;
  totalTaxInr: number;
  grandTotalInr: number;
  sacCode: '998314' | '998315';
  sacDescription: string;
}

const SAC_DESCRIPTIONS: Record<string, string> = {
  '998314': 'Information technology software design and development services',
  '998315': 'Hosting and infrastructure provisioning services',
};

export function calculateGST(
  subtotalInr: number,
  isMaharashtra: boolean = true,
  sacCode: '998314' | '998315' = '998314'
): GSTBreakdown {
  const sacDescription = SAC_DESCRIPTIONS[sacCode];

  if (isMaharashtra) {
    // Intra-state: CGST 9% + SGST 9% = 18%
    const cgstInr = Math.round(subtotalInr * 0.09);
    const sgstInr = Math.round(subtotalInr * 0.09);
    const totalTaxInr = cgstInr + sgstInr;

    return {
      subtotalInr,
      isMaharashtra: true,
      cgstRate: 9,
      cgstInr,
      sgstRate: 9,
      sgstInr,
      igstRate: 0,
      igstInr: 0,
      totalTaxInr,
      grandTotalInr: subtotalInr + totalTaxInr,
      sacCode,
      sacDescription,
    };
  } else {
    // Inter-state: IGST 18%
    const igstInr = Math.round(subtotalInr * 0.18);

    return {
      subtotalInr,
      isMaharashtra: false,
      cgstRate: 0,
      cgstInr: 0,
      sgstRate: 0,
      sgstInr: 0,
      igstRate: 18,
      igstInr,
      totalTaxInr: igstInr,
      grandTotalInr: subtotalInr + igstInr,
      sacCode,
      sacDescription,
    };
  }
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
