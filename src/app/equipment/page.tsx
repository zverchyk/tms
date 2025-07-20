'use client'

import { useState } from 'react';
import styles from './equipment.module.scss';
import Image from 'next/image';

import { ProgressBar } from '@/ui/accessories/Accessories';

import diamond from '@/public/icons/diamond.png'

import { InventoryTable } from '@/ui/equipment/inventoryTable';


export default function Equipment() {



    // const handleAdd = () => {
    //     setEquipmentList((prev) => [...prev, newItem]);
    //     setNewItem({ name: '', category: '', brand: '', date: '', notes: '', cost: 0, quantity: 0 });
    // };

    return (
        <div className={styles.equipmentWrapper}>
            <h2>My Equipment ✏️</h2>

            <InventoryTable query="equipment" />

        </div>
    );
}
