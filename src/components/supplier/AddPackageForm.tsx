// src/components/supplier/AddPackageForm.tsx
import React, { useState } from 'react';
import { PackageDTO } from '../../types/Package';

interface AddPackageFormProps {
    onPackageAdded: (packages: PackageDTO[]) => void; 
}

const AddPackageForm: React.FC<AddPackageFormProps> = ({ onPackageAdded }) => {
    const [formData, setFormData] = useState<PackageDTO>({
        name: '',
        destination: '',
        details: '',
        count: 0,
        onHold: 0,
        price: 0,
        released: false
    });
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'released' ? value === 'true' : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const supplierId = sessionStorage.getItem('UserId');

        const payload: PackageDTO = {
            ...formData,
            userId: Number(supplierId),
            available: formData.count - formData.onHold,
            hold: formData.onHold > 0
        };

        try {
            const response = await fetch("https://localhost:7259/api/Package/AddPackage", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setErrorMessage('Package added successfully');
                // Refresh the package list
                const newPackages = await fetch(`https://localhost:7259/api/Package/GetPackagesBySupplier/${supplierId}`).then(res => res.json());
                onPackageAdded(newPackages);

                // Clear form inputs
                setFormData({
                    name: '',
                    destination: '',
                    details: '',
                    count: 0,
                    onHold: 0,
                    price: 0,
                    released: false
                });
            } else {
                setErrorMessage('Failed to save the package details');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Error saving package details');
        }
    };

    return (
        <div className="form-container">
            <h2 className="section-title">Add Package</h2>
            {errorMessage && <div className="errorMessage">{errorMessage}</div>}
            <form onSubmit={handleSubmit} className="add-package-form">
                <div className="form-group">
                    <label>Package Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Destination:</label>
                    <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Details:</label>
                    <textarea name="details" value={formData.details} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Count:</label>
                    <input type="number" name="count" value={formData.count} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Hold Package Count:</label>
                    <input type="number" name="onHold" value={formData.onHold} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" required />
                </div>
                <div className="form-group">
                    <label>Release:</label>
                    <select name="released" value={formData.released.toString()} onChange={handleChange} required>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" className="submit-button">Add Package</button>
                </div>
            </form>
        </div>
    );
};

export default AddPackageForm;
