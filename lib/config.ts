const validateFormspreeId = (id: string | undefined, type: string): string => {
  if (!id || id.length < 8) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing required Formspree ${type} ID in production environment`);
    }
    console.warn(`Missing Formspree ${type} ID in development environment. Form submissions will not work.`);
    return 'development-mode';
  }
  return id;
};

export const config = {
  formspree: {
    chatEndpoint: validateFormspreeId(
      process.env.NEXT_PUBLIC_FORMSPREE_CHAT_FORM_ID,
      'chat'
    ),
    newsletterEndpoint: validateFormspreeId(
      process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_FORM_ID,
      'newsletter'
    ),
  },
  company: {
    name: 'FastRetrieve.AI',
    email: 'fastretrieve.ai@gmail.com',
    location: 'Taipei, TAIWAN',
  },
  isProduction: process.env.NODE_ENV === 'production',
} as const;

export const getFormspreeUrl = (formId: string) => {
  if (formId === 'development-mode') {
    console.warn('Using development mode Formspree URL. Form submissions will not work.');
    return '#development-mode';
  }
  return `https://formspree.io/f/${formId}`;
}; 