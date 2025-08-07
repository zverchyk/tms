'use client';
import { useState } from 'react';
import styles from './artistFeedbackForm.module.scss';

interface ArtistFeedbackFormProps {
  sessionId: string;
}

interface EquipmentUsage {
  category: string;
  name: string;
  quantityUsed?: number;
  notes?: string;
}

const equipmentCategories = [


  { id: 'needles', label: 'Needles', icon: '💉', hasQuantity: true },
  { id: 'cartridges', label: 'Cartridges', icon: '🎯', hasQuantity: true },
  { id: 'sanitizer', label: 'Sanitizer', icon: '🧴', hasQuantity: true },
  { id: 'ink', label: 'Ink & Paint', icon: '🎨', hasQuantity: true },
  { id: 'other', label: 'Other Equipment', icon: '🔧', hasQuantity: false }
];

const commonEquipment = {
  needles: ['3RL', '5RL', '7RL', '9RL', '3RS', '5RS', '7RS', '9RS', '11RS', '13RS'],
  cartridges: ['Cheyenne 3RL', 'Cheyenne 5RL', 'Cheyenne 7RL', 'Kwadron 3RL', 'Kwadron 5RL'],
  sanitizer: ['Green Soap', 'Madacide', 'Cavicide', 'A-dec ICX'],
  ink: ['Eternal Ink', 'World Famous', 'Intenze', 'Dynamic', 'Kuro Sumi'],
  other: ['Gloves', 'Paper Towels', 'Plastic Wrap', 'Razors', 'Transfer Paper']
};

export default function ArtistFeedbackForm({ sessionId }: ArtistFeedbackFormProps) {
  const [formData, setFormData] = useState({
    sessionRating: 0,
    clientSatisfaction: 0,
    sessionDuration: '',
    sessionNotes: '',
    challenges: '',
    improvements: ''
  });
  
  const [equipmentUsage, setEquipmentUsage] = useState<EquipmentUsage[]>([]);
  const [tattooPhoto, setTattooPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (field: 'sessionRating' | 'clientSatisfaction', rating: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: rating
    }));
  };

  const addEquipmentUsage = (category: string, name: string) => {
    const newUsage: EquipmentUsage = {
      category,
      name,
      quantityUsed: equipmentCategories.find(cat => cat.id === category)?.hasQuantity ? 1 : undefined,
      notes: ''
    };
    setEquipmentUsage(prev => [...prev, newUsage]);
  };

  const updateEquipmentUsage = (index: number, field: keyof EquipmentUsage, value: string | number) => {
    setEquipmentUsage(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const removeEquipmentUsage = (index: number) => {
    setEquipmentUsage(prev => prev.filter((_, i) => i !== index));
  };

  const handleTattooPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTattooPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement form submission logic
    console.log('Session Feedback:', formData);
    console.log('Equipment Usage:', equipmentUsage);
    console.log('Tattoo Photo:', tattooPhoto);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Session feedback submitted successfully!');
    setIsSubmitting(false);
  };

  const StarRating = ({ rating, onRatingChange, label }: { 
    rating: number; 
    onRatingChange: (rating: number) => void;
    label: string;
  }) => (
    <div className={styles.ratingGroup}>
      <label className={styles.ratingLabel}>{label}</label>
      <div className={styles.starRating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`${styles.star} ${star <= rating ? styles.starActive : ''}`}
            onClick={() => onRatingChange(star)}
          >
            ★
          </button>
        ))}
        <span className={styles.ratingText}>
          {rating === 0 ? 'No rating' : `${rating}/5`}
        </span>
      </div>
    </div>
  );

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Session Feedback</h1>
          <p className={styles.formSubtitle}>
            Provide feedback and details for session #{sessionId}
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.feedbackForm}>
          {/* Session Rating */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Session Rating</h3>
            
            <StarRating
              rating={formData.sessionRating}
              onRatingChange={(rating) => handleRatingChange('sessionRating', rating)}
              label="Overall Session Quality"
            />
            
            <StarRating
              rating={formData.clientSatisfaction}
              onRatingChange={(rating) => handleRatingChange('clientSatisfaction', rating)}
              label="Client Satisfaction"
            />
          </div>

          {/* Session Details */}
          {/* <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Session Details</h3>
            
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Session Duration</label>
              <select
                name="sessionDuration"
                value={formData.sessionDuration}
                onChange={handleInputChange}
                className={styles.selectField}
                required
              >
                <option value="">Select duration</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="3 hours">3 hours</option>
                <option value="4 hours">4 hours</option>
                <option value="5 hours">5 hours</option>
                <option value="6+ hours">6+ hours</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Session Notes</label>
              <textarea
                name="sessionNotes"
                value={formData.sessionNotes}
                onChange={handleInputChange}
                className={styles.textareaField}
                placeholder="Describe the session, technique used, client behavior, etc."
                rows={4}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Challenges Encountered</label>
              <textarea
                name="challenges"
                value={formData.challenges}
                onChange={handleInputChange}
                className={styles.textareaField}
                placeholder="Any difficulties, unexpected issues, or complications..."
                rows={3}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Areas for Improvement</label>
              <textarea
                name="improvements"
                value={formData.improvements}
                onChange={handleInputChange}
                className={styles.textareaField}
                placeholder="What could be done better next time?"
                rows={3}
              />
            </div>
          </div> */}

          {/* Equipment Usage */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Equipment Used</h3>
            <p className={styles.sectionDescription}>
              Track the equipment and supplies used during this session
            </p>
            
            <div className={styles.equipmentCategories}>
              {equipmentCategories.map((category) => (
                <div key={category.id} className={styles.categorySection}>
                  <h4 className={styles.categoryTitle}>
                    <span className={styles.categoryIcon}>{category.icon}</span>
                    {category.label}
                  </h4>
                  
                  <div className={styles.equipmentOptions}>
                    {commonEquipment[category.id as keyof typeof commonEquipment]?.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={styles.equipmentButton}
                        onClick={() => addEquipmentUsage(category.id, item)}
                      >
                        + {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Used Equipment List */}
            {equipmentUsage.length > 0 && (
              <div className={styles.usedEquipment}>
                <h4 className={styles.usedEquipmentTitle}>Equipment Used This Session:</h4>
                {equipmentUsage.map((usage, index) => (
                  <div key={index} className={styles.usageItem}>
                    <div className={styles.usageHeader}>
                      <span className={styles.usageName}>
                        {equipmentCategories.find(cat => cat.id === usage.category)?.icon} {usage.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeEquipmentUsage(index)}
                        className={styles.removeButton}
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className={styles.usageDetails}>
                      {usage.quantityUsed !== undefined && (
                        <div className={styles.quantityInput}>
                          <label>Quantity Used:</label>
                          <input
                            type="number"
                            min="1"
                            value={usage.quantityUsed}
                            onChange={(e) => updateEquipmentUsage(index, 'quantityUsed', parseInt(e.target.value) || 1)}
                            className={styles.quantityField}
                          />
                        </div>
                      )}
                      
                      <div className={styles.notesInput}>
                        <label>Notes:</label>
                        <input
                          type="text"
                          placeholder="Optional notes about usage..."
                          value={usage.notes || ''}
                          onChange={(e) => updateEquipmentUsage(index, 'notes', e.target.value)}
                          className={styles.notesField}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tattoo Photo */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Completed Tattoo Photo (Optional)</h3>
            <p className={styles.sectionDescription}>
              Upload a photo of the finished tattoo for your portfolio and client records
            </p>
            
            <div className={styles.fileUpload}>
              <input
                type="file"
                id="tattooPhoto"
                accept="image/*"
                onChange={handleTattooPhotoUpload}
                className={styles.fileInput}
              />
              <label htmlFor="tattooPhoto" className={styles.fileLabel}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Choose Tattoo Photo</span>
                <small>PNG, JPG up to 10MB</small>
              </label>
            </div>

            {tattooPhoto && (
              <div className={styles.imagePreview}>
                <div className={styles.imageItem}>
                  <img 
                    src={URL.createObjectURL(tattooPhoto)} 
                    alt="Completed tattoo"
                    className={styles.previewImage}
                  />
                  <button
                    type="button"
                    onClick={() => setTattooPhoto(null)}
                    className={styles.removeButton}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className={styles.submitSection}>
            <button
              type="submit"
              disabled={isSubmitting || formData.sessionRating === 0}
              className={styles.submitButton}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner}></div>
                  Submitting Feedback...
                </>
              ) : (
                'Submit Session Feedback'
              )}
            </button>
            <p className={styles.submitNote}>
              This feedback will be saved to session #{sessionId} and help improve future sessions.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}