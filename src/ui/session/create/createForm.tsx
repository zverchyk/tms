'use client'
import styles from './createForm.module.scss'
import { useState } from 'react';
import Link from 'next/link';

export default function CreateForm() {
    const [fileUploaded, setFileUploaded] = useState(false);

    return (
        <div className={styles.formContainer}>
            <div className={styles.formCard}>
                <div className={styles.formHeader}>
                    <h2 className={styles.formTitle}>Create New Session</h2>
                    <p className={styles.formSubtitle}>Fill out the details for your tattoo session</p>
                </div>

                <form className={styles.sessionForm}>
                    {/* Basic Information */}
                    <div className={styles.formSection}>
                        <h3 className={styles.sectionTitle}>Basic Information</h3>
                        
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Client Name</label>
                            <input type="text" className={styles.inputField} placeholder="Enter client name" />
                        </div>

                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Date</label>
                                <input type="date" className={styles.inputField} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Start Time</label>
                                <input type="time" className={styles.inputField} />
                            </div>
                        </div>
                    </div>

                    {/* Session Details */}
                    <div className={styles.formSection}>
                        <h3 className={styles.sectionTitle}>Session Details</h3>
                        
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Tattoo Type</label>
                            <input list="tattooTypes" className={styles.inputField} placeholder="Select or type tattoo type" />
                            <datalist id="tattooTypes">
                                <option value="Blackwork" />
                                <option value="Realism" />
                                <option value="Japanese" />
                                <option value="Lettering" />
                                <option value="Traditional" />
                            </datalist>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Design/Style</label>
                            <input type="text" className={styles.inputField} placeholder="Describe the design" />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Placement</label>
                            <input list="placements" className={styles.inputField} placeholder="Select or type placement" />
                            <datalist id="placements">
                                <option value="Arm" />
                                <option value="Leg" />
                                <option value="Back" />
                                <option value="Chest" />
                                <option value="Shoulder" />
                            </datalist>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Pricing (optional)</label>
                            <input type="text" className={styles.inputField} placeholder="$0.00" />
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className={styles.formSection}>
                        <h3 className={styles.sectionTitle}>Reference Image</h3>
                        
                        <div className={styles.fileUpload}>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
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
                            <small className={styles.fileNote}>JPG, PNG files supported</small>
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
                        <button type="submit" className={`${styles.actionButton} ${styles.primary}`}>
                            Create Session
                        </button>
                        <Link href='/main' className={styles.buttonLink}>
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