import './style.css';
import validator from 'validator';

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// EmailJS Configuration for Gmail
// IMPORTANT: Replace these with your actual EmailJS credentials from https://emailjs.com
const EMAILJS_SERVICE_ID = 'service_hogl9wd';  // Your Gmail service ID from EmailJS
const EMAILJS_TEMPLATE_ID = 'template_bqwep8d'; // Your email template ID from EmailJS  
const EMAILJS_PUBLIC_KEY = '6UmMqV2Y2Ek-7t9q6';   // Your public key from EmailJS

// Your Gmail address where you want to receive contact form submissions
const BUSINESS_EMAIL = 'tpeachartistry@gmail.com';  // Your T'peach Artistry Gmail address

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// Set minimum date for date picker to today
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayString = `${yyyy}-${mm}-${dd}`;
        dateInput.setAttribute('min', todayString);
        
        // Set default value to today
        dateInput.value = todayString;
    }
    
    // Add event listeners to clear validation states when user starts typing
    setupValidationClearListeners();
    
    // Setup phone number formatting
    setupPhoneNumberFormatting();
});

// Setup listeners to clear validation states when user starts typing
function setupValidationClearListeners() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const fields = form.querySelectorAll('input, select, textarea');
    
    fields.forEach(field => {
        // Clear validation state when user starts typing/selecting
        if (field.type === 'select-one') {
            field.addEventListener('change', () => clearFieldValidation(field));
        } else {
            field.addEventListener('input', () => clearFieldValidation(field));
        }
    });
}

// Clear validation state for a single field
function clearFieldValidation(field) {
    field.classList.remove('invalid');
    removeFieldMessage(field);
}

// Setup phone number formatting
function setupPhoneNumberFormatting() {
    const phoneField = document.querySelector('input[name="phone"]');
    if (!phoneField) return;
    
    phoneField.addEventListener('input', function(e) {
        // Remove all non-digits
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        // Format as (XXX) XXX-XXXX
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        
        e.target.value = value;
    });
    
    // Handle backspace to allow proper deletion
    phoneField.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace') {
            const cursorPosition = e.target.selectionStart;
            const value = e.target.value;
            
            // If cursor is after a formatting character, move it back
            if (cursorPosition > 0 && /[\(\)\s\-]/.test(value[cursorPosition - 1])) {
                setTimeout(() => {
                    e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
                }, 0);
            }
        }
    });
}

// Show field-level validation message
function showFieldMessage(field, message, type) {
    removeFieldMessage(field);
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `field-message field-message-${type}`;
    messageDiv.textContent = message;
    
    // Insert after the field
    field.parentNode.appendChild(messageDiv);
}

// Remove field-level validation message
function removeFieldMessage(field) {
    const existingMessage = field.parentNode.querySelector('.field-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// Form validation function using validator library
function validateForm(formData) {
    const errors = [];
    const warnings = [];
    
    // Get form values
    const name = formData.get('from_name')?.trim();
    const email = formData.get('from_email')?.trim();
    const phone = formData.get('phone')?.trim();
    const service = formData.get('service');
    const preferredDate = formData.get('preferred_date');
    const preferredTime = formData.get('preferred_time');
    const message = formData.get('message')?.trim();
    
    // Required field validation
    if (!name || name.length < 2) {
        errors.push('Name is required and must be at least 2 characters long');
    } else if (!validator.isLength(name, { min: 2, max: 50 })) {
        errors.push('Name must be between 2 and 50 characters');
    }
    
    if (!service) {
        errors.push('Please select a service');
    }
    
    // Email validation (optional but if provided, must be valid)
    if (email && !validator.isEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation (required and must be exactly 10 digits)
    if (!phone) {
        errors.push('Phone number is required');
    } else if (!validator.isLength(phone.replace(/\D/g, ''), { min: 10, max: 10 })) {
        errors.push('Phone number must be exactly 10 digits');
    } else if (!validator.isMobilePhone(phone, 'any')) {
        errors.push('Please enter a valid phone number');
    }
    
    // Date and time validation
    if (preferredDate && preferredTime) {
        const selectedDate = new Date(preferredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            errors.push('Appointment date must be in the future');
        }
        
        // Check if date is within reasonable range (e.g., not more than 6 months ahead)
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
        
        if (selectedDate > sixMonthsFromNow) {
            warnings.push('Appointment date is quite far in the future. Please consider a closer date');
        }
    } else if (preferredDate && !preferredTime) {
        errors.push('DATE_ERROR: Please select a date for your appointment');
        errors.push('TIME_ERROR: Please select a time for your appointment');
    } else if (!preferredDate && preferredTime) {
        errors.push('DATE_ERROR: Please select a date for your appointment');
        errors.push('TIME_ERROR: Please select a time for your appointment');
    }
    
    // Message validation (optional but if provided, check length)
    if (message && !validator.isLength(message, { max: 500 })) {
        errors.push('Message must be less than 500 characters');
    }
    
    return { errors, warnings };
}

// Highlight all invalid fields when form submission fails
function highlightAllInvalidFields(errors) {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Reset all fields to normal state first
    const allFields = form.querySelectorAll('input, select, textarea');
    allFields.forEach(field => {
        field.classList.remove('invalid', 'valid');
        removeFieldMessage(field);
    });
    
    // Highlight all invalid fields at once
    errors.forEach(error => {
        if (error.startsWith('DATE_ERROR:')) {
            const cleanError = error.replace('DATE_ERROR: ', '');
            highlightField('preferred_date', cleanError);
        } else if (error.startsWith('TIME_ERROR:')) {
            const cleanError = error.replace('TIME_ERROR: ', '');
            highlightField('preferred_time', cleanError);
        } else if (error.includes('Name')) {
            highlightField('from_name', error);
        } else if (error.includes('email')) {
            highlightField('from_email', error);
        } else if (error.includes('Phone') || error.includes('phone')) {
            highlightField('phone', error);
        } else if (error.includes('service')) {
            highlightField('service', error);
        } else if (error.includes('Appointment date must be in the future')) {
            highlightField('preferred_date', error);
        } else if (error.includes('date') && !error.includes('time')) {
            highlightField('preferred_date', error);
        } else if (error.includes('time')) {
            highlightField('preferred_time', error);
        } else if (error.includes('Message')) {
            highlightField('message', error);
        }
    });
    
    // Scroll to the first error field for better UX
    const firstErrorField = form.querySelector('.invalid');
    if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Highlight a specific field with error
function highlightField(fieldName, errorMessage) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.classList.add('invalid');
        showFieldMessage(field, errorMessage, 'error');
    }
}

// Clear all validation states and messages
function clearAllValidationStates() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const allFields = form.querySelectorAll('input, select, textarea');
    allFields.forEach(field => {
        field.classList.remove('invalid', 'valid');
        removeFieldMessage(field);
    });
}

// Contact form handling with EmailJS
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Get form data
        const formData = new FormData(this);
        
        // Validate all fields at once
        const validation = validateForm(formData);
        
        console.log('Form validation results:', validation);
        console.log('All form fields being sent:', {
            name: formData.get('from_name'),
            email: formData.get('from_email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            preferred_date: formData.get('preferred_date'),
            preferred_time: formData.get('preferred_time'),
            message: formData.get('message')
        });
        
        // Show errors if any
        if (validation.errors.length > 0) {
            console.log('Validation failed with errors:', validation.errors);
            
            // Clean up error messages for display (remove prefixes)
            const cleanErrors = validation.errors.map(error => {
                return error.replace('DATE_ERROR: ', '').replace('TIME_ERROR: ', '');
            });
            
            const errorMessage = cleanErrors.join('\n• ');
            showNotification(`Please fix the following errors:\n• ${errorMessage}`, 'error');
            highlightAllInvalidFields(validation.errors);
            return;
        }
        
        // Show warnings if any (but allow form submission)
        if (validation.warnings.length > 0) {
            const warningMessage = validation.warnings.join('\n• ');
            showNotification(`Note: ${warningMessage}`, 'warning');
        }
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Prepare template params - ensure all form fields are included
        const templateParams = {
            // Variables that match your EmailJS template
            name: formData.get('from_name') || 'Not provided',
            message: formData.get('message') || 'No message provided',
            time: new Date().toLocaleString(),
            
            // Complete form data for email
            from_name: formData.get('from_name') || 'Not provided',
            from_email: formData.get('from_email') || 'Not provided',
            phone: formData.get('phone') || 'Not provided',
            service: formData.get('service') || 'Not selected',
            preferred_date: formData.get('preferred_date') || 'Not selected',
            preferred_time: formData.get('preferred_time') || 'Not selected',
            
            // Additional email variables
            to_email: BUSINESS_EMAIL,
            reply_to: formData.get('from_email') || BUSINESS_EMAIL,
            
            // Formatted appointment info for easy reading
            appointment_info: formData.get('preferred_date') && formData.get('preferred_time') 
                ? `${new Date(formData.get('preferred_date')).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })} at ${formData.get('preferred_time')}`
                : 'No specific time requested',
            
            // Customer contact summary
            contact_summary: `Name: ${formData.get('from_name') || 'Not provided'}
Email: ${formData.get('from_email') || 'Not provided'}
Phone: ${formData.get('phone') || 'Not provided'}
Service: ${formData.get('service') || 'Not selected'}
Preferred Appointment: ${formData.get('preferred_date') && formData.get('preferred_time') 
    ? `${formData.get('preferred_date')} at ${formData.get('preferred_time')}`
    : 'No specific time requested'}
Message: ${formData.get('message') || 'No message provided'}`
        };
        
        // Send email using EmailJS
        if (typeof emailjs !== 'undefined' && EMAILJS_SERVICE_ID !== 'your_service_id') {
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    let successMessage = `Thank you, ${templateParams.from_name}! We've received your inquiry about ${templateParams.service}.`;
                    
                    if (templateParams.preferred_date && templateParams.preferred_time) {
                        const appointmentDate = new Date(templateParams.preferred_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                        successMessage += ` We've noted your preferred appointment time: ${appointmentDate} at ${templateParams.preferred_time}.`;
                    }
                    
                    successMessage += ' We\'ll contact you soon to confirm!';
                    showNotification(successMessage, 'success');
                    contactForm.reset();
                    
                    // Clear all validation states after successful submission
                    clearAllValidationStates();
                }, function(error) {
                    console.log('FAILED...', error);
                    showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
                })
                .finally(() => {
                    resetSubmitButton();
                });
        } else {
            // Fallback for demo/testing
            setTimeout(() => {
                showNotification(`Thank you, ${templateParams.from_name}! This is a demo - please configure EmailJS to send real emails.`, 'info');
                contactForm.reset();
                resetSubmitButton();
                
                // Clear all validation states after successful submission
                clearAllValidationStates();
            }, 1000);
        }
        
        function resetSubmitButton() {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Open Sans', sans-serif;
    `;
    
    // Set colors based on type
    const colors = {
        success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724' },
        error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24' },
        info: { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460' },
        warning: { bg: '#fff3cd', border: '#ffeaa7', text: '#856404' }
    };
    
    const color = colors[type] || colors.info;
    notification.style.backgroundColor = color.bg;
    notification.style.border = `1px solid ${color.border}`;
    notification.style.color = color.text;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
        color: ${color.text};
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and gallery items
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .gallery-item, .about-text, .contact-info');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gallery lightbox effect (simple implementation)
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = this.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        // Close lightbox on click
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        // Close lightbox on escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initial page load animation
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

console.log('T\'peach Artistry website loaded successfully! 🍑✨');