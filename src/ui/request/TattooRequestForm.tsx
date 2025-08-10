'use client';
import { useState } from 'react';
import styles from './tattooRequestForm.module.scss';
import Image from 'next/image';

interface TattooRequestFormProps {
  artistName: string;
}

const bodyParts = [
  'Arm', 'Leg', 'Back', 'Chest', 'Shoulder', 'Wrist', 'Ankle', 
  'Neck', 'Hand', 'Foot', 'Ribs', 'Thigh', 'Forearm', 'Upper Arm',
  'Lower Back', 'Upper Back', 'Stomach', 'Hip', 'Other'
];

const tattooStyles = [
  'Traditional', 'Realism', 'Watercolor', 'Geometric', 'Minimalist',
  'Blackwork', 'Neo-Traditional', 'Japanese', 'Tribal', 'Portrait',
  'Abstract', 'Dotwork', 'Linework', 'Other'
];

export default function TattooRequestForm({ artistName }: TattooRequestFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tattooIdea: '',
    bodyPart: '',
    customBodyPart: '',
    style: '',
    customStyle: '',
    size: '',
    budget: '',
    timeframe: '',
    hasAllergies: false,
    allergies: '',
    additionalNotes: ''
  });
  
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [bodyPartImage, setBodyPartImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setReferenceImages(prev => [...prev, ...newFiles].slice(0, 5)); // Max 5 images
    }
  };

  const handleBodyPartUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBodyPartImage(e.target.files[0]);
    }
  };

  const removeReferenceImage = (index: number) => {
    setReferenceImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement form submission logic
    console.log('Form data:', formData);
    console.log('Reference images:', referenceImages);
    console.log('Body part image:', bodyPartImage);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Request submitted successfully! The artist will contact you soon.');
    setIsSubmitting(false);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Tattoo Request</h1>
          <p className={styles.formSubtitle}>
            Request a custom tattoo from <strong>{artistName}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.requestForm}>
          {/* Personal Information */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>
          </div>

          {/* Tattoo Details */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Tattoo Details</h3>
            
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Tattoo Idea/Description *</label>
              <textarea
                name="tattooIdea"
                value={formData.tattooIdea}
                onChange={handleInputChange}
                className={styles.textareaField}
                placeholder="Describe your tattoo idea in detail..."
                rows={4}
                required
              />
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Body Part *</label>
                <select
                  name="bodyPart"
                  value={formData.bodyPart}
                  onChange={handleInputChange}
                  className={styles.selectField}
                  required
                >
                  <option value="">Select body part</option>
                  {bodyParts.map(part => (
                    <option key={part} value={part}>{part}</option>
                  ))}
                </select>
                {formData.bodyPart === 'Other' && (
                  <input
                    type="text"
                    name="customBodyPart"
                    value={formData.customBodyPart}
                    onChange={handleInputChange}
                    className={styles.inputField}
                    placeholder="Specify body part"
                    style={{ marginTop: '0.5rem' }}
                  />
                )}
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Preferred Style</label>
                <select
                  name="style"
                  value={formData.style}
                  onChange={handleInputChange}
                  className={styles.selectField}
                >
                  <option value="">Select style (optional)</option>
                  {tattooStyles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
                {formData.style === 'Other' && (
                  <input
                    type="text"
                    name="customStyle"
                    value={formData.customStyle}
                    onChange={handleInputChange}
                    className={styles.inputField}
                    placeholder="Specify style"
                    style={{ marginTop: '0.5rem' }}
                  />
                )}
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Approximate Size</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className={styles.selectField}
                >
                  <option value="">Select size</option>
                  <option value="Small (1-3 inches)">Small (1-3 inches)</option>
                  <option value="Medium (3-6 inches)">Medium (3-6 inches)</option>
                  <option value="Large (6-12 inches)">Large (6-12 inches)</option>
                  <option value="Extra Large (12+ inches)">Extra Large (12+ inches)</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Budget Range</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={styles.selectField}
                >
                  <option value="">Select budget</option>
                  <option value="Under $200">Under $200</option>
                  <option value="$200 - $500">$200 - $500</option>
                  <option value="$500 - $1000">$500 - $1000</option>
                  <option value="$1000 - $2000">$1000 - $2000</option>
                  <option value="Over $2000">Over $2000</option>
                  <option value="Open to discussion">Open to discussion</option>
                </select>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Preferred Timeframe</label>
              <select
                name="timeframe"
                value={formData.timeframe}
                onChange={handleInputChange}
                className={styles.selectField}
              >
                <option value="">Select timeframe</option>
                <option value="ASAP">As soon as possible</option>
                <option value="1-2 weeks">Within 1-2 weeks</option>
                <option value="1 month">Within 1 month</option>
                <option value="2-3 months">Within 2-3 months</option>
                <option value="Flexible">I&apos;m flexible</option>
              </select>
            </div>
          </div>

          {/* Reference Images */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Reference Images</h3>
            <p className={styles.sectionDescription}>
              Upload up to 5 reference images to help communicate your vision
            </p>
            
            <div className={styles.fileUpload}>
              <input
                type="file"
                id="referenceImages"
                multiple
                accept="image/*"
                onChange={handleReferenceUpload}
                className={styles.fileInput}
              />
              <label htmlFor="referenceImages" className={styles.fileLabel}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Choose Reference Images</span>
                <small>PNG, JPG, GIF up to 10MB each</small>
              </label>
            </div>

            {referenceImages.length > 0 && (
              <div className={styles.imagePreview}>
                {referenceImages.map((file, index) => (
                  <div key={index} className={styles.imageItem}>
                    <Image 
                      src={URL.createObjectURL(file)} 
                      alt={`Reference ${index + 1}`}
                      className={styles.previewImage}
                      width={100}
                      height={100}
                    />  
                    <button
                      type="button"
                      onClick={() => removeReferenceImage(index)}
                      className={styles.removeButton}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Body Part Photo */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Body Part Photo (Optional)</h3>
            <p className={styles.sectionDescription}>
              Upload a photo of the specific area where you want the tattoo for better placement planning
            </p>
            
            <div className={styles.fileUpload}>
              <input
                type="file"
                id="bodyPartImage"
                accept="image/*"
                onChange={handleBodyPartUpload}
                className={styles.fileInput}
              />
              <label htmlFor="bodyPartImage" className={styles.fileLabel}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Choose Body Part Photo</span>
                <small>PNG, JPG up to 10MB</small>
              </label>
            </div>

            {bodyPartImage && (
              <div className={styles.imagePreview}>
                <div className={styles.imageItem}>
                  <Image 
                    src={URL.createObjectURL(bodyPartImage)} 
                    alt="Body part"
                    className={styles.previewImage}
                  />
                  <button
                    type="button"
                    onClick={() => setBodyPartImage(null)}
                    className={styles.removeButton}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Health Information */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Health Information</h3>
            
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="hasAllergies"
                  checked={formData.hasAllergies}
                  onChange={handleInputChange}
                  className={styles.checkbox}
                />
                <div className={styles.checkboxCustom}></div>
                <span>I have allergies or skin sensitivities</span>
              </label>
            </div>

            {formData.hasAllergies && (
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Please specify your allergies</label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  className={styles.textareaField}
                  placeholder="List any allergies or skin sensitivities..."
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Additional Notes</h3>
            
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Anything else you&apos;d like the artist to know?</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                className={styles.textareaField}
                placeholder="Any additional information, questions, or special requests..."
                rows={4}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className={styles.submitSection}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner}></div>
                  Submitting Request...
                </>
              ) : (
                'Submit Tattoo Request'
              )}
            </button>
            <p className={styles.submitNote}>
              Your request will be sent directly to {artistName}. They will contact you within 24-48 hours.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}