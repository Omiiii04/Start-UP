/**
 * GST Calculation Engine
 * SAC Code 998314: Software Design & Development
 * SAC Code 998315: Cloud Infrastructure & Hosting
 */

export interface GSTBreakdown {
  subtotal: number;
  isMaharashtra: boolean;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  igstRate: number;
  igstAmount: number;
  totalTax: number;
  grandTotal: number;
  sacCode: string;
  sacDescription: string;
}

export function calculateGST(
  subtotal: number, 
  isMaharashtra: boolean = true, 
  sacCode: '998314' | '998315' = '998314'
): GSTBreakdown {
  const sacDescriptions = {
    '998314': 'Information technology software design and development services',
    '998315': 'Hosting and infrastructure provisioning services',
  };

  if (isMaharashtra) {
    // Intra-state (Maharashtra to Maharashtra)
    const cgstRate = 0.09;
    const sgstRate = 0.09;
    const cgstAmount = Math.round(subtotal * cgstRate);
    const sgstAmount = Math.round(subtotal * sgstRate);
    const totalTax = cgstAmount + sgstAmount;
    const grandTotal = subtotal + totalTax;

    return {
      subtotal,
      isMaharashtra: true,
      cgstRate: 9,
      cgstAmount,
      sgstRate: 9,
      sgstAmount,
      igstRate: 0,
      igstAmount: 0,
      totalTax,
      grandTotal,
      sacCode,
      sacDescription: sacDescriptions[sacCode],
    };
  } else {
    // Inter-state (Maharashtra to other Indian States)
    const igstRate = 0.18;
    const igstAmount = Math.round(subtotal * igstRate);
    const totalTax = igstAmount;
    const grandTotal = subtotal + totalTax;

    return {
      subtotal,
      isMaharashtra: false,
      cgstRate: 0,
      cgstAmount: 0,
      sgstRate: 0,
      sgstAmount: 0,
      igstRate: 18,
      igstAmount,
      totalTax,
      grandTotal,
      sacCode,
      sacDescription: sacDescriptions[sacCode],
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
