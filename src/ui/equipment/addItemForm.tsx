'use client'

import styles from './inventoryTable.module.scss';
import { useState, useActionState, useEffect } from 'react';
import { NewItem } from '@/lib/definitions';
import { uploadNewItem } from '@/lib/data';

const initialState = { message: null };

export default function AddItemForm() {
    const [newItem, setNewItem] = useState({});

    const [state, formAction] = useActionState(uploadNewItem, initialState)

    const list = ['Cartridges', 'Sanitizer', "Paint"]

    const [newCategory, setNewCategory] = useState('')
    const [CategoryList, setCategoryList] = useState(list)

    const [category, setCategory] = useState('')
    const [addItem, setAddItem] = useState(false)

    return (
        <div>
            {!addItem && (
                <button className={styles.addItemBtn} onClick={() => setAddItem(true)}>+ Add Item</button>
            )}
            {addItem && (<form className={styles.addItemForm} action={formAction} >
                <input list="CategoryType"
                    name='category'
                    placeholder='Category'
                    onChange={(e) => setCategory(e.target.value)} />
                <datalist id="CategoryType">
                    {CategoryList.map((category, i) => (
                        <option key={i} value={category} />
                    ))}

                </datalist>
                <input name="name" placeholder="Name" />

                <input type="number"
                    name='cost' placeholder='Cost' />
                <label htmlFor=""> Purchase Date</label>
                <input type="date" name='date' />
                <input type="text" name='note' placeholder='Note (optional)' />
                {['Cartridges', 'Sanitizer'].includes(category) ? <input type='number' name='quantity' placeholder='quantity' /> : undefined}




                <div className={styles.form_btns}>


                    <button type='submit'>Submit</button>
                    <button onClick={() => setAddItem(false)}>Cancel</button>
                </div>
                {state.message && <p>{state.message}</p>}
                {state.errors?.name && <p>{state.errors.name[0]}</p>}


            </form>
            )}
        </div>

    )
}