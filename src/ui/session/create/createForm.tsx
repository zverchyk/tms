'use client'
import styles from './createForm.module.scss'
import { useState } from 'react';
import Link from 'next/link';

export default function CreateForm() {
    const [fileUploaded, setFileUploaded] = useState(false);

    return (
        <form className={styles.sessionForm}>
            <h2>Create New Tattoo Session</h2>

            <label>
                <span>👤 Client Name:</span>
                <input type="text" />
            </label>

            <label>
                <span>📅 Date:</span>
                <input type="date" />
            </label>

            <label>
                <span>⏰ Start Time:</span>
                <input type="text" placeholder="11:00 AM" />
            </label>

            <h3>Session Notes Template:</h3>

            <label>
                Tattoo Type:

                <input list="tattooTypes" />
                <datalist id="tattooTypes">
                    <option value="Blackwork" />
                    <option value="Realism" />
                    <option value="Japanese" />
                    <option value="Lettering" />
                    <option value="Traditional" />
                </datalist>
            </label>

            <label>
                Design/Style:
                <input type="text" />
            </label>

            <label>
                Placement:
                <input list="tattooTypes" />
                <datalist id="tattooTypes">
                    <option value="Blackwork" />
                    <option value="Realism" />
                    <option value="Japanese" />
                    <option value="Lettering" />
                    <option value="Traditional" />
                </datalist>
            </label>

            <label>
                Pricing (optional):
                <input type="text" />
            </label>

            <h3>🔄 Upload Flash Reference</h3>

            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={() => setFileUploaded(true)}
            />
            {fileUploaded && <span>✅ Uploaded</span>}

            <small>(JPG, PNG; stored in Drive "TattooApp Flash")</small>


            <label>
                Add reminder 1 hour before
                <input type="checkbox" />

            </label>


            <div className={styles.buttonGroup}>
                <button type="submit" className={styles.submitBtn}>⬆ Create Session</button>
                <Link href='/main'>
                    <button type="button" className={styles.cancelBtn}>Cancel</button>
                </Link>

            </div>
        </form>
    );

}