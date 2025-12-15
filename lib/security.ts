// Security utilities for production
export const isProduction = process.env.NODE_ENV === 'production'

export const corsOptions = {
  origin: isProduction 
    ? [process.env.NEXTAUTH_URL || 'https://your-domain.com']
    : ['http://localhost:3000'],
  credentials: true,
}

export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}

export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '')
}