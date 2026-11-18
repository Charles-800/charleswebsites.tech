export type CertificationStatus = 'earned' | 'in_progress' | 'planned';

export interface CertificationItem {
  id: string;
  title: string;
  institution: string;
  institutionLogo?: string;
  status: CertificationStatus;
  dateEarned?: string;
  credentialId?: string;
  certificateFileUrl?: string;
  certificateFileType?: 'image' | 'pdf';
  certificateFileName?: string;
  verificationUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Strictly empty initial dataset:
 * Only genuine credentials added by the owner should ever be displayed.
 */
export const INITIAL_CERTIFICATIONS: CertificationItem[] = [];
