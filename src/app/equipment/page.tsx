


import styles from './equipment.module.scss';
import Image from 'next/image';

import { ProgressBar } from '@/ui/accessories/Accessories';

import diamond from '@/public/icons/diamond.png'

import InventoryTable from '@/ui/equipment/inventoryTable';

import AddItemForm from '@/ui/equipment/addItemForm'

import { BackButton } from '@/ui/accessories/buttons';

import { Suspense } from 'react';


export default function Equipment() {



    // const handleAdd = () => {
    //     setEquipmentList((prev) => [...prev, newItem]);
    //     setNewItem({ name: '', category: '', brand: '', date: '', notes: '', cost: 0, quantity: 0 });
    // };


    return (
        <div className={styles.equipmentWrapper}>
            <BackButton href="/main"></BackButton>
            <h2>My Equipment ✏️</h2>
            <AddItemForm />

            <InventoryTable />



        </div>
    );
}
