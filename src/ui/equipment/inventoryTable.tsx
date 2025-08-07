'use client';
import { useState, useEffect } from 'react';
import diamond from '@/assets/icons/diamond.png';
import Image from 'next/image';
import styles from './inventoryTable.module.scss';
import { fetchFakeEquipment } from '@/lib/data';
// import { ProgressBar } from '../accessories/Accessories';
import { EquipmentItem } from '../../lib/definitions';

export default function InventoryTable() {
    const [equipmentData, setEquipmentData] = useState<EquipmentItem[]>([]);
    const [filteredData, setFilteredData] = useState<EquipmentItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchFakeEquipment();
            setEquipmentData(data);
            setFilteredData(data);
        };
        loadData();
    }, []);

    useEffect(() => {
        const filtered = equipmentData.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.notes?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        // Sort data
        filtered.sort((a, b) => {
            let aValue: string | number | undefined = a[sortBy as keyof EquipmentItem];
            let bValue: string | number | undefined = b[sortBy as keyof EquipmentItem];
            
            if (sortBy === 'cost') {
                aValue = Number(aValue) || 0;
                bValue = Number(bValue) || 0;
            }
            
            if (aValue == null) aValue = '';
            if (bValue == null) bValue = '';
            
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredData(filtered);
    }, [equipmentData, searchTerm, selectedCategory, sortBy, sortOrder]);

    // const handleSort = (field: string) => {
    //     if (sortBy === field) {
    //         setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    //     } else {
    //         setSortBy(field);
    //         setSortOrder('asc');
    //     }
    // };

    const toggleItemSelection = (index: number) => {
        setSelectedItems(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const getStatusIcon = (item: EquipmentItem) => {
        if (item.quantity) {
            if (item.quantity > 80) return { icon: '🟢', status: 'In Stock' };
            if (item.quantity > 30) return { icon: '🟡', status: 'Low Stock' };
            return { icon: '🔴', status: 'Critical' };
        }
        return { icon: '⚪', status: 'No Stock Info' };
    };

    const getItemIcon = (category: string) => {
        const icons: { [key: string]: string } = {
            'Machine': '⚡',
            'Power Supply': '🔌',
            'Needle Type': '💉',
            'Cartridges': '🎯',
            'Sanitizer': '🧴',
            'Paint': '🎨',
            'default': '🔧'
        };
        return icons[category] || icons.default;
    };

    return (
        <div className={styles.inventoryContainer}>
            {/* Animated Background */}
            <div className={styles.backgroundElements}>
                <div className={styles.floatingShape1}></div>
                <div className={styles.floatingShape2}></div>
                <div className={styles.floatingShape3}></div>
            </div>

            {/* Modern Header */}
            <div className={styles.inventoryHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.mainTitle}>
                            Equipment Inventory
                            <span className={styles.titleAccent}></span>
                        </h1>
                        <p className={styles.subtitle}>
                            Manage your tattoo equipment and supplies
                        </p>
                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>{filteredData.length}</span>
                                <span className={styles.statLabel}>Items</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>
                                    ${filteredData.reduce((sum, item) => sum + (Number(item.cost) || 0), 0).toLocaleString()}
                                </span>
                                <span className={styles.statLabel}>Total Value</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>
                                    {filteredData.filter(item => item.quantity && item.quantity < 30).length}
                                </span>
                                <span className={styles.statLabel}>Low Stock</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.headerActions}>
                        <button 
                            className={`${styles.filterToggle} ${isFilterOpen ? styles.active : ''}`}
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <span className={styles.filterIcon}>🔍</span>
                            Filters
                            <div className={styles.filterGlow}></div>
                        </button>
                    </div>
                </div>

                {/* Advanced Filters */}
                {isFilterOpen && (
                    <div className={styles.filtersPanel}>
                        <div className={styles.filterGroup}>
                            <label>Search</label>
                            <div className={styles.searchBox}>
                                <span className={styles.searchIcon}>🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search equipment..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div className={styles.filterGroup}>
                            <label>Category</label>
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                <option value="Machine">Machines</option>
                                <option value="Power Supply">Power Supplies</option>
                                <option value="Needle Type">Needles</option>
                                <option value="Cartridges">Cartridges</option>
                                <option value="Sanitizer">Sanitizers</option>
                                <option value="Paint">Paints</option>
                            </select>
                        </div>
                        
                        <div className={styles.filterGroup}>
                            <label>Sort By</label>
                            <div className={styles.sortControls}>
                                <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="name">Name</option>
                                    <option value="cost">Cost</option>
                                    <option value="date">Date</option>
                                    <option value="quantity">Stock</option>
                                </select>
                                <button 
                                    className={styles.sortOrder}
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                >
                                    {sortOrder === 'asc' ? '↑' : '↓'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Equipment Grid */}
            <div className={styles.equipmentGrid}>
                {filteredData.map((item, index) => {
                    const status = getStatusIcon(item);
                    const isSelected = selectedItems.includes(index);
                    
                    return (
                        <div 
                            key={index} 
                            className={`${styles.equipmentCard} ${isSelected ? styles.selected : ''}`}
                            style={{ '--animation-delay': `${index * 0.1}s` } as React.CSSProperties}
                        >
                            <div className={styles.cardGlow}></div>
                            
                            <div className={styles.cardHeader}>
                                <div className={styles.itemIconWrapper}>
                                    <span className={styles.categoryIcon}>
                                        {getItemIcon(item.category || 'default')}
                                    </span>
                                    <Image
                                        src={diamond}
                                        width={40}
                                        height={40}
                                        alt="Equipment"
                                        className={styles.itemImage}
                                    />
                                </div>
                                
                                <div className={styles.statusBadge}>
                                    <span className={styles.statusIcon}>{status.icon}</span>
                                    <span className={styles.statusText}>{status.status}</span>
                                </div>
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.itemName}>{item.name}</h3>
                                <p className={styles.itemCategory}>{item.category || 'Uncategorized'}</p>
                                
                                <div className={styles.itemDetails}>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailLabel}>Cost</span>
                                        <span className={styles.detailValue}>${item.cost}</span>
                                    </div>
                                    
                                    {item.date && (
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Purchase Date</span>
                                            <span className={styles.detailValue}>
                                                {new Date(item.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {item.quantity && (
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Stock Level</span>
                                            <div className={styles.stockLevel}>
                                                <div className={styles.stockBar}>
                                                    <div 
                                                        className={styles.stockFill}
                                                        style={{ '--stock': item.quantity / 100 } as React.CSSProperties}
                                                    ></div>
                                                </div>
                                                <span className={styles.stockValue}>{item.quantity}%</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {item.notes && (
                                    <div className={styles.itemNotes}>
                                        <span className={styles.notesIcon}>📝</span>
                                        <p>{item.notes}</p>
                                    </div>
                                )}
                            </div>

                            <div className={styles.cardActions}>
                                <button 
                                    className={styles.selectButton}
                                    onClick={() => toggleItemSelection(index)}
                                >
                                    <span className={styles.checkbox}>
                                        {isSelected && <span className={styles.checkmark}>✓</span>}
                                    </span>
                                    Select
                                </button>
                                <button className={styles.editButton}>
                                    <span className={styles.buttonIcon}>✏️</span>
                                    Edit
                                </button>
                                <button className={styles.deleteButton}>
                                    <span className={styles.buttonIcon}>🗑️</span>
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
                <div className={styles.bulkActions}>
                    <div className={styles.bulkInfo}>
                        <span>{selectedItems.length} items selected</span>
                    </div>
                    <div className={styles.bulkButtons}>
                        <button className={styles.bulkEdit}>
                            <span>✏️</span>
                            Bulk Edit
                        </button>
                        <button className={styles.bulkDelete}>
                            <span>🗑️</span>
                            Delete Selected
                        </button>
                        <button 
                            className={styles.bulkClear}
                            onClick={() => setSelectedItems([])}
                        >
                            Clear Selection
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

