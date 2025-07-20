import styles from './settings.module.scss';

export default function Settings() {
    return (

        <form className={styles.settingsPanel}>
            <h2>⚙️ Settings</h2>

            <section>
                <h3>🟢 Google Integration</h3>
                <p>Signed in as: artist.email@gmail.com</p>
                <div className={styles.buttonGroup}>
                    <button type="button">Re-authorize Access</button>
                    <button type="button">Disconnect Account</button>
                </div>
            </section>

            <section>
                <h3>📁 Storage & Documents</h3>
                <div>
                    App Folder:
                    <input type="text" value="/TattooApp Sessions/" readOnly />
                    <button type="button">Change Folder</button>
                </div>
                <div>
                    Permissions:
                    <button type="button">Docs</button>
                    <button type="button">Drive</button>
                    <button type="button">Calendar</button>
                </div>
                <button type="button" className={styles.dangerButton}>Delete All App Files</button>
            </section>

            <section>
                <h3>📅 Calendar Integration</h3>
                <label><input type="checkbox" /> Enable Calendar Sync</label>
                <label><input type="checkbox" /> Add reminder 1 hour before</label>
                <label>
                    <input type="checkbox" /> Auto-detect timezone:
                    <input type="text" value="America/Edmonton" readOnly />
                </label>
            </section>

            <section>
                <h3>🎯 Session Defaults</h3>
                <label>
                    Default Title:
                    <input type="text" value="Tattoo with [Client Name]" />
                </label>
                <label>
                    Default Form:
                    <input type="text" placeholder="Tattoo Type" />
                    <input type="text" placeholder="Design Notes" />
                </label>
            </section>

            <section>
                <h3>🎨 Appearance</h3>
                <label><input type="radio" name="theme" /> Light</label>
                <label><input type="radio" name="theme" /> Dark</label>
                <label>
                    Accent Color:
                    <select>
                        <option>Red</option>
                        <option>Blue</option>
                        <option>Green</option>
                    </select>
                    <input type="checkbox" /> Edit
                </label>
            </section>

            <section>
                <h3>🔒 Privacy & Security</h3>
                <label><input type="checkbox" /> Show token exit warnings</label>
                <label><input type="checkbox" /> Clear Session Cache</label>
                <p>Last login: 10:32 AM</p>
            </section>

            <button type="submit" className={styles.saveButton}>Save Settings</button>
        </form>
    );
}
