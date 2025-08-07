'use client';
import { useState } from 'react';
import styles from './clientFeedbackForm.module.scss';

interface ClientFeedbackFormProps {
  sessionId: string;
}

export default function ClientFeedbackForm({ sessionId }: ClientFeedbackFormProps) {
  const [formData, setFormData] = useState({
    overallQuality: 0,
    timeQuality: 0,
    painWorthIt: 0,
    personalComment: '',
    tipAmount: '',
    customTipAmount: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (field: 'overallQuality' | 'timeQuality' | 'painWorthIt', rating: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: rating
    }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      personalComment: e.target.value
    }));
  };

  const handleTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Clear custom amount if selecting preset
      ...(name === 'tipAmount' && value !== 'custom' ? { customTipAmount: '' } : {}),
      // Clear preset if entering custom amount
      ...(name === 'customTipAmount' && value ? { tipAmount: 'custom' } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement form submission logic
    console.log('Client Feedback:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Thank you for your feedback! Your review helps us improve our services.');
    setIsSubmitting(false);
  };

  const StarRating = ({ 
    rating, 
    onRatingChange, 
    label, 
    description,
    specialType = false 
  }: { 
    rating: number; 
    onRatingChange: (rating: number) => void;
    label: string;
    description: string;
    specialType?: boolean;
  }) => (
    <div className={styles.ratingGroup}>
      <div className={styles.ratingHeader}>
        <label className={styles.ratingLabel}>{label}</label>
        <p className={styles.ratingDescription}>{description}</p>
      </div>
      <div className={styles.starRating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`${styles.star} ${star <= rating ? styles.starActive : ''} ${specialType ? styles.starSpecial : ''}`}
            onClick={() => onRatingChange(star)}
          >
            {specialType ? '💖' : '★'}
          </button>
        ))}
        <span className={styles.ratingText}>
          {rating === 0 ? 'No rating' : specialType ? getRatingText(rating) : `${rating}/5`}
        </span>
      </div>
    </div>
  );

  const getRatingText = (rating: number) => {
    const texts = [
      '', 
      'Not at all', 
      'Maybe not', 
      'Somewhat', 
      'Definitely', 
      'Absolutely!'
    ];
    return texts[rating];
  };

  const getOverallFeedback = () => {
    const avg = (formData.overallQuality + formData.timeQuality + formData.painWorthIt) / 3;
    if (avg === 0) return '';
    if (avg >= 4.5) return 'Amazing experience! 🌟';
    if (avg >= 3.5) return 'Great experience! 😊';
    if (avg >= 2.5) return 'Good experience 👍';
    if (avg >= 1.5) return 'Okay experience 🤔';
    return 'We\'d love to improve 💙';
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>How was your tattoo experience?</h1>
          <p className={styles.formSubtitle}>
            Your feedback for session #{sessionId} helps us provide better service
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.feedbackForm}>
          {/* Overall Quality Rating */}
          <div className={styles.formSection}>
            <StarRating
              rating={formData.overallQuality}
              onRatingChange={(rating) => handleRatingChange('overallQuality', rating)}
              label="Overall Quality"
              description="How would you rate the overall quality of your tattoo and service?"
            />
          </div>

          {/* Time Quality Rating */}
          <div className={styles.formSection}>
            <StarRating
              rating={formData.timeQuality}
              onRatingChange={(rating) => handleRatingChange('timeQuality', rating)}
              label="Quality of Time Spent"
              description="How satisfied are you with how your time was spent during the session?"
            />
          </div>

          {/* Pain Worth It Rating */}
          <div className={styles.formSection}>
            <StarRating
              rating={formData.painWorthIt}
              onRatingChange={(rating) => handleRatingChange('painWorthIt', rating)}
              label="Was the Pain Worth It?"
              description="Considering the final result, do you feel the discomfort was worth it?"
              specialType={true}
            />
          </div>

          {/* Overall Feedback Display */}
          {getOverallFeedback() && (
            <div className={styles.overallFeedback}>
              <p className={styles.feedbackText}>{getOverallFeedback()}</p>
            </div>
          )}

          {/* Tip Section */}
          <div className={styles.formSection}>
            <div className={styles.tipSection}>
              <div className={styles.tipHeader}>
                <h3 className={styles.sectionTitle}>Show Your Appreciation</h3>
                <span className={styles.optionalTag}>Optional</span>
              </div>
              <p className={styles.sectionDescription}>
                If you&apos;re happy with your experience, consider leaving a tip for your artist
              </p>
              
              <div className={styles.tipOptions}>
                <div className={styles.presetTips}>
                  {['$10', '$20', '$30', '$50'].map((amount) => (
                    <label key={amount} className={styles.tipOption}>
                      <input
                        type="radio"
                        name="tipAmount"
                        value={amount}
                        checked={formData.tipAmount === amount}
                        onChange={handleTipChange}
                        className={styles.tipRadio}
                      />
                      <div className={styles.tipButton}>
                        {amount}
                      </div>
                    </label>
                  ))}
                  
                  <label className={styles.tipOption}>
                    <input
                      type="radio"
                      name="tipAmount"
                      value="custom"
                      checked={formData.tipAmount === 'custom' || formData.customTipAmount !== ''}
                      onChange={handleTipChange}
                      className={styles.tipRadio}
                    />
                    <div className={styles.tipButton}>
                      Custom
                    </div>
                  </label>
                </div>
                
                {(formData.tipAmount === 'custom' || formData.customTipAmount) && (
                  <div className={styles.customTipWrapper}>
                    <div className={styles.customTipInput}>
                      <span className={styles.dollarSign}>$</span>
                      <input
                        type="number"
                        name="customTipAmount"
                        value={formData.customTipAmount}
                        onChange={handleTipChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className={styles.customTipField}
                      />
                    </div>
                  </div>
                )}
                
                {(formData.tipAmount || formData.customTipAmount) && (
                  <div className={styles.tipSummary}>
                    <div className={styles.tipAmount}>
                      💝 Tip Amount: {formData.tipAmount === 'custom' || formData.customTipAmount 
                        ? `$${formData.customTipAmount || '0.00'}` 
                        : formData.tipAmount}
                    </div>
                    <div className={styles.tipNote}>
                      Your artist will be notified of your generous tip!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Personal Comment */}
          <div className={styles.formSection}>
            <div className={styles.commentSection}>
              <div className={styles.commentHeader}>
                <h3 className={styles.sectionTitle}>Personal Comment</h3>
                <span className={styles.optionalTag}>Optional</span>
              </div>
              <p className={styles.sectionDescription}>
                Share your thoughts, experience, or any additional feedback you&apos;d like to provide
              </p>
              
              <div className={styles.commentInputWrapper}>
                <textarea
                  value={formData.personalComment}
                  onChange={handleCommentChange}
                  className={styles.commentField}
                  placeholder="Tell us about your experience... What did you love? What could we improve? How do you feel about your new tattoo?"
                  rows={6}
                  maxLength={1000}
                />
                <div className={styles.characterCount}>
                  {formData.personalComment.length}/1000 characters
                </div>
              </div>
            </div>
          </div>

          {/* Submission Guidelines */}
          <div className={styles.guidelinesSection}>
            <h4 className={styles.guidelinesTitle}>Before you submit:</h4>
            <ul className={styles.guidelinesList}>
              <li>Your feedback helps us improve our services</li>
              <li>Your review may be used for testimonials (with your permission)</li>
              <li>We read every comment and take your suggestions seriously</li>
              <li>Feel free to contact us directly if you have specific concerns</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className={styles.submitSection}>
            <button
              type="submit"
              disabled={isSubmitting || formData.overallQuality === 0}
              className={styles.submitButton}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner}></div>
                  Submitting Feedback...
                </>
              ) : (
                'Submit Your Feedback'
              )}
            </button>
            <p className={styles.submitNote}>
              Thank you for taking the time to share your experience with us! 💙
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}