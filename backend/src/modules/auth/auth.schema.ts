import { z } from 'zod';

export const googleAuthSchema = z.object({
  idToken: z.string().min(1, 'Google ID token is required'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export type GoogleAuthInput = z.infer<typeof googleAuthSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
