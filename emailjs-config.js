// EmailJS Configuration for T'peach Artistry
// Replace these values with your actual EmailJS credentials

export const EMAIL_CONFIG = {
    // Get this from EmailJS Dashboard > Email Services > Your Gmail Service
    SERVICE_ID: 'service_xxxxxxx', // Replace with your Gmail service ID
    
    // Get this from EmailJS Dashboard > Email Templates > Your Template
    TEMPLATE_ID: 'template_xxxxxxx', // Replace with your template ID
    
    // Get this from EmailJS Dashboard > Account > General
    PUBLIC_KEY: 'xxxxxxxxxxxxxxx', // Replace with your public key
    
    // Your business email (where you want to receive inquiries)
    BUSINESS_EMAIL: 'your-email@gmail.com' // Replace with your Gmail address
};

// Template variables that will be sent to EmailJS
export const TEMPLATE_PARAMS = {
    from_name: '', // Customer's name
    from_email: '', // Customer's email
    phone: '', // Customer's phone
    service: '', // Selected service
    message: '', // Customer's message
    to_email: EMAIL_CONFIG.BUSINESS_EMAIL // Your Gmail
};