'use client'
import styles from './edit.module.scss'
import { useState, useEffect } from 'react';
import { fetchSessionById } from '@/lib/data';
import Link from 'next/link';

export default function SessionEdit({id}: {id: string}) {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        startTime: '',
        tattooType: '',
        design: '',
        placement: '',
        pricing: '',
        notes: '',
        contactNumber: '',
        contactEmail: ''
    });

    const [session, setSession] = useState<null | {
        id: string;
        name: string;
        startDate: string;
        notes: string;
        contactNumber: string;
        contactEmail: string;
        pic: string;
    }>(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchSessionById(id);
                if (data) {
                    setSession(data);
                // Parse the date and time if needed
                const [date, time] = data.startDate.includes('T') 
                    ? data.startDate.split('T') 
                    : [data.startDate, ''];
                
                setFormData({
                    name: data.name || '',
                    startDate: date || '',
                    startTime: time.substring(0, 5) || '', // HH:MM format
                    tattooType: '',
                    design: '',
                    placement: '',
                    pricing: '',
                    notes: data.notes || '',
                    contactNumber: data.contactNumber || '',
                    contactEmail: data.contactEmail || ''
                });
                }
            } catch (error) {
                console.error('Error loading session:', error);
            }
        }
        load();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // TODO: Implement save functionality
            console.log('Saving session data:', formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Session updated successfully!');
        } catch (error) {
            console.error('Error updating session:', error);
            alert('Error updating session. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!session) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Loading session details...</p>
            </div>
        );
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.formCard}>
                <div className={styles.formHeader}>
                    <h2 className={styles.formTitle}>Edit Session</h2>
                    <p className={styles.formSubtitle}>Update the details for this tattoo session</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.sessionForm}>
                    {/* Basic Information */}
                    <div className={styles.formSection}>
                        <h3 className={styles.sectionTitle}>Basic Information</h3>
                        
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Client Name *</label>
                            <input 
                                type="text" 
                                name="name"
                                className={styles.inputField} 
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Date *</label>
                                <input 
                                    type="date" 
                                    name="startDate"
                                    className={styles.inputField} 
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Start Time</label>
                                <input 
                                    type="time" 
                                    name="startTime"
                                    className={styles.inputField}
                                    value={formData.startTime}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className={styles.formSection}>
                        <h3 className={styles.sectionTitle}>Contact Information</h3>
                        
                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Phone Number</label>
                                <input 
                                    type="tel" 
                                    name="contactNumber"
                                    className={styles.inputField} 
                                    value={formData.contactNumber}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Email</label>
                                <input 
                                    type="email" 
                                    name="contactEmail"
                                    className={styles.inputField}
                                    value={formData.contactEmail}
                                    onChange={handleInputChange}
                                    placeholder="client@example.com"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Session Details */}
                    <div className={styles.formSection}>
                        <h3 className={styles.sectionTitle}>Session Details</h3>
                        
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Tattoo Type</label>
                            <input 
                                list="tattooTypes" 
                                name="tattooType"
                                className={styles.inputField} 
                                value={formData.tattooType}
                                onChange={handleInputChange}
                                placeholder="Select or type tattoo type" 
                            />
                            <datalist id="tattooTypes">
                                <option value="Blackwork" />
                                <option value="Realism" />
                                <option value="Japanese" />
                                <option value="Lettering" />
                                <option value="Traditional" />
                                <option value="Neo-Traditional" />
                                <option value="Watercolor" />
                                <option value="Geometric" />
                                <option value="Minimalist" />
                            </datalist>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Design/Style</label>
                            <input 
                                type="text" 
                                name="design"
                                className={styles.inputField} 
                                value={formData.design}
                                onChange={handleInputChange}
                                placeholder="Describe the design" 
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Placement</label>
                            <input 
                                list="placements" 
                                name="placement"
                                className={styles.inputField} 
                                value={formData.placement}
                                onChange={handleInputChange}
                                placeholder="Select or type placement" 
                            />
                            <datalist id="placements">
                                <option value="Arm" />
                                <option value="Leg" />
                                <option value="Back" />
                                <option value="Chest" />
                                <option value="Shoulder" />
                                <option value="Wrist" />
                                <option value="Ankle" />
                                <option value="Neck" />
                                <option value="Hand" />
                                <option value="Foot" />
                            </datalist>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Pricing (optional)</label>
                            <input 
                                type="text" 
                                name="pricing"
                                className={styles.inputField} 
                                value={formData.pricing}
                                onChange={handleInputChange}
                                placeholder="$0.00" 
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Session Notes</label>
                            <textarea 
                                name="notes"
                                className={`${styles.inputField} ${styles.textareaField}`}
                                value={formData.notes}
                                onChange={handleInputChange}
                                placeholder="Add any notes about this session..."
                                rows={4}
                            />
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className={styles.formSection}>
                        <h3 className={styles.sectionTitle}>Reference Image</h3>
                        
                        <div className={styles.fileUpload}>
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg, image/gif"
                                onChange={() => setFileUploaded(true)}
                                className={styles.fileInput}
                                id="fileUpload"
                            />
                            <label htmlFor="fileUpload" className={styles.fileLabel}>
                                {fileUploaded ? (
                                    <span className={styles.uploadSuccess}>✅ Image uploaded</span>
                                ) : (
                                    <span className={styles.uploadText}>Click to upload image</span>
                                )}
                            </label>
                            <small className={styles.fileNote}>JPG, PNG, GIF files supported (max 10MB)</small>
                        </div>
                    </div>

                    {/* Options */}
                    <div className={styles.formSection}>
                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="reminder" className={styles.checkbox} />
                            <label htmlFor="reminder" className={styles.checkboxLabel}>
                                Add reminder 1 hour before session
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.formActions}>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`${styles.actionButton} ${styles.primary}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className={styles.spinner}></span>
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                        <Link href={`/session/${id}`} className={styles.buttonLink}>
                            <button type="button" className={`${styles.actionButton} ${styles.secondary}`}>
                                Cancel
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}