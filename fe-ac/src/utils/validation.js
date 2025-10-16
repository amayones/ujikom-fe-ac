// Comprehensive validation utilities
export const ValidationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  
  password: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: 'Password must be at least 8 characters with uppercase, lowercase, number and special character'
  },
  
  phone: {
    pattern: /^[0-9+\-\s]{10,15}$/,
    message: 'Please enter a valid phone number'
  },
  
  name: {
    pattern: /^[a-zA-Z\s]{2,50}$/,
    message: 'Name must contain only letters and spaces (2-50 characters)'
  }
};

export const validateField = (value, rule) => {
  if (!value) return { isValid: false, message: 'This field is required' };
  if (!rule.pattern.test(value)) return { isValid: false, message: rule.message };
  return { isValid: true, message: '' };
};

export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach(field => {
    const validation = validateField(formData[field], rules[field]);
    if (!validation.isValid) {
      errors[field] = validation.message;
      isValid = false;
    }
  });

  return { isValid, errors };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};