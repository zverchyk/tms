'use client';

import styles from './inventoryTable.module.scss';
import { useState, useActionState, useEffect} from 'react';
// import { NewItem } from '@/lib/definitions';
import { uploadNewItem } from '@/lib/data';

const initialState = { message: null };

export default function AddItemForm() {
    const [state, formAction] = useActionState(uploadNewItem, initialState);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Lock body scroll when modal is open
    const toggleFormOpen = (open: boolean) => {
        setIsFormOpen(open);
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        cost: '',
        date: '',
        note: '',
        quantity: ''
    });

    const categories = [
        { id: 'machine', label: 'Tattoo Machine', icon: '⚡', hasQuantity: false },
        { id: 'power-supply', label: 'Power Supply', icon: '🔌', hasQuantity: false },
        { id: 'needles', label: 'Needles', icon: '💉', hasQuantity: true },
        { id: 'cartridges', label: 'Cartridges', icon: '🎯', hasQuantity: true },
        { id: 'sanitizer', label: 'Sanitizer', icon: '🧴', hasQuantity: true },
        { id: 'ink', label: 'Ink & Paint', icon: '🎨', hasQuantity: true },
        { id: 'other', label: 'Other Equipment', icon: '🔧', hasQuantity: false }
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleCategorySelect = (categoryId: string) => {
        handleInputChange('category', categoryId);
        setCurrentStep(2);
    };

    const resetForm = () => {
        setFormData({
            category: '',
            name: '',
            cost: '',
            date: '',
            note: '',
            quantity: ''
        });
        setCurrentStep(1);
        toggleFormOpen(false);
    };

    const selectedCategory = categories.find(cat => cat.id === formData.category);
    
    // blocks scrolling the page when the 'add item' is open
    useEffect(() => {
        console.log(document.body)
        console.log(document.documentElement)
        if (isFormOpen) {
          const timer = setTimeout(() => {

            document.documentElement.classList.add('overflow-hidden');
          }, 10);
      
          return () => {
            clearTimeout(timer);
            document.documentElement.classList.remove('overflow-hidden');
          };
        }
      }, [isFormOpen]);
      
    return (
        <div className={styles.addItemContainer}>
            {!isFormOpen && (
                <button 
                    className={styles.addItemTrigger}
                    onClick={() => toggleFormOpen(true)}
                >
                    <div className={styles.addIconWrapper}>
                        <span className={styles.addIcon}>+</span>
                        <div className={styles.addGlow}></div>
                    </div>
                    <span>Add New Equipment</span>
                    <div className={styles.buttonRipple}></div>
                </button>
            )}

            {isFormOpen && (
                <div className={styles.addItemModal}>
                    <div className={styles.modalBackdrop} onClick={resetForm}></div>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={styles.headerContent}>
                                <h2>Add New Equipment</h2>
                                <p>Step {currentStep} of 3</p>
                            </div>
                            <button 
                                className={styles.closeButton}
                                onClick={resetForm}
                            >
                                ×
                            </button>
                        </div>

                        <div className={styles.progressBar}>
                            <div className={styles.progressTrack}>
                                <div 
                                    className={styles.progressFill}
                                    style={{ '--progress': (currentStep / 3) * 100 + '%' } as React.CSSProperties}
                                ></div>
                            </div>
                            <div className={styles.progressSteps}>
                                {[1, 2, 3].map(step => (
                                    <div 
                                        key={step}
                                        className={`${styles.progressStep} ${step <= currentStep ? styles.active : ''}`}
                                    >
                                        <span>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form className={styles.addItemForm} action={formAction}>
                            {currentStep === 1 && (
                                <div className={styles.formStep}>
                                    <div className={styles.stepHeader}>
                                        <h3>Choose Equipment Category</h3>
                                        <p>Select the type of equipment you&apos;re adding</p>
                                    </div>
                                    
                                    <div className={styles.categoryGrid}>
                                        {categories.map(category => (
                                            <button
                                                key={category.id}
                                                type="button"
                                                className={`${styles.categoryCard} ${formData.category === category.id ? styles.selected : ''}`}
                                                onClick={() => handleCategorySelect(category.id)}
                                            >
                                                <div className={styles.categoryIcon}>{category.icon}</div>
                                                <span className={styles.categoryLabel}>{category.label}</span>
                                                <div className={styles.categoryGlow}></div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className={styles.formStep}>
                                    <div className={styles.stepHeader}>
                                        <h3>Equipment Details</h3>
                                        <p>Provide basic information about the equipment</p>
                                    </div>

                                    {selectedCategory && (
                                        <div className={styles.selectedCategory}>
                                            <span className={styles.selectedIcon}>{selectedCategory.icon}</span>
                                            <span>{selectedCategory.label}</span>
                                        </div>
                                    )}

                                    <div className={styles.formFields}>
                                        <div className={styles.fieldGroup}>
                                            <label className={styles.fieldLabel}>Equipment Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className={styles.fieldInput}
                                                placeholder="Enter equipment name..."
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <label className={styles.fieldLabel}>Cost ($)</label>
                                            <input
                                                type="number"
                                                name="cost"
                                                className={styles.fieldInput}
                                                placeholder="0.00"
                                                step="0.01"
                                                value={formData.cost}
                                                onChange={(e) => handleInputChange('cost', e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <label className={styles.fieldLabel}>Purchase Date</label>
                                            <input
                                                type="date"
                                                name="date"
                                                className={styles.fieldInput}
                                                value={formData.date}
                                                onChange={(e) => handleInputChange('date', e.target.value)}
                                            />
                                        </div>

                                        {selectedCategory?.hasQuantity && (
                                            <div className={styles.fieldGroup}>
                                                <label className={styles.fieldLabel}>Initial Stock Level (%)</label>
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    className={styles.fieldInput}
                                                    placeholder="100"
                                                    min="0"
                                                    max="100"
                                                    value={formData.quantity}
                                                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className={styles.formStep}>
                                    <div className={styles.stepHeader}>
                                        <h3>Additional Information</h3>
                                        <p>Add notes and finalize your equipment entry</p>
                                    </div>

                                    <div className={styles.summaryCard}>
                                        <div className={styles.summaryHeader}>
                                            <span className={styles.summaryIcon}>{selectedCategory?.icon}</span>
                                            <div>
                                                <h4>{formData.name || 'Unnamed Equipment'}</h4>
                                                <p>{selectedCategory?.label}</p>
                                            </div>
                                            <span className={styles.summaryPrice}>${formData.cost || '0.00'}</span>
                                        </div>
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>Notes (Optional)</label>
                                        <textarea
                                            name="note"
                                            className={styles.fieldTextarea}
                                            placeholder="Add any additional notes about this equipment..."
                                            rows={4}
                                            value={formData.note}
                                            onChange={(e) => handleInputChange('note', e.target.value)}
                                        />
                                    </div>

                                    <input type="hidden" name="category" value={formData.category} />
                                    <input type="hidden" name="name" value={formData.name} />
                                    <input type="hidden" name="cost" value={formData.cost} />
                                    <input type="hidden" name="date" value={formData.date} />
                                    {selectedCategory?.hasQuantity && (
                                        <input type="hidden" name="quantity" value={formData.quantity} />
                                    )}
                                </div>
                            )}

                            <div className={styles.formActions}>
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        className={styles.prevButton}
                                        onClick={handlePrev}
                                    >
                                        ← Previous
                                    </button>
                                )}

                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        className={styles.nextButton}
                                        onClick={handleNext}
                                        disabled={
                                            (currentStep === 1 && !formData.category) ||
                                            (currentStep === 2 && (!formData.name || !formData.cost))
                                        }
                                    >
                                        Next →
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className={styles.submitButton}
                                    >
                                        <span className={styles.submitIcon}>✓</span>
                                        Add Equipment
                                        <div className={styles.submitGlow}></div>
                                    </button>
                                )}

                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                            </div>

                            {state.message && (
                                <div className={styles.formMessage}>
                                    <span className={styles.messageIcon}>ℹ️</span>
                                    {state.message}
                                </div>
                            )}
                            {state.errors?.name && (
                                <div className={styles.formError}>
                                    <span className={styles.errorIcon}>⚠️</span>
                                    {state.errors.name[0]}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}