import diamond from '@/public/icons/diamond.png';
import Image from 'next/image';

import styles from './inventoryTable.module.scss';

import fetchFakeData from '@/lib/data';

import { ProgressBar } from '../accessories/Accessories';
import { useState } from 'react';
type Props = {
    query: string;
}

export function InventoryTable({ query }: Props) {
    const equipmentData = fetchFakeData(query)



    return (
        <div className={styles.inventoryList}>
            <div className={styles.header_section}>
                <h3>Equipment Inventory</h3>
                {/* make a pop up window for filter */}

                <div className={styles.filter}>
                    Filter
                    <select>
                        <option>All</option>
                        <option>Machine</option>
                        <option>Power Supply</option>
                        <option>Needle Type</option>
                    </select>
                    <input type="text" placeholder="Search" />
                </div>
            </div>

            {equipmentData.map((item, index) => (
                <div key={index} className={styles.inventoryItem}>
                    <Image
                        src={diamond}
                        width={512}
                        height={512}
                        alt="no image"
                        className={styles.inventoryIcon}
                    />

                    <p>{item.name}</p>
                    {item.date ? <p>{item.date}</p> : <span>        </span>}
                    <p>${item.cost}</p>
                    <p>{item.notes}</p>
                    {item?.quantity ? <ProgressBar progress={item.quantity} /> : null}
                    <div className={styles.itemButtons}>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function AddItem() {
    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        brand: '',
        date: '',
        notes: '',
        cost: 0,
        quantity: 0
    });

    return (
        <div className="i"></div>

    )
}