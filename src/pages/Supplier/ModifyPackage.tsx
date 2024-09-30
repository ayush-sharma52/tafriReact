// src/pages/ModifyPackage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/supplier/modifyPackage.css'; 
import { PackageDTO } from '../../types/Package';

const ModifyPackage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<PackageDTO>({
        id: 0,
        name: '',
        destination: '',
        details: '',
        count: 0,
        onHold: 0,
        price: 0,
        released: false,
        available: 0,
        hold: false,
        userId: 0,
    });
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const fetchPackageDetails = async () => {
            if (!id) return;

            try {
                const response = await fetch(`https://localhost:7259/api/Package/GetPackageById/${id}`);
                if (response.ok) {
                    const packageData = await response.json();
                    setFormData(packageData);
                } else {
                    setErrorMessage('Failed to fetch package details.');
                }
            } catch (error) {
                console.error(error);
                setErrorMessage('Error fetching package details.');
            }
        };

        fetchPackageDetails();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const inputValue = type === 'checkbox' 
            ? (e.target as HTMLInputElement).checked 
            : (name === 'released' ? value === 'true' : value); // Convert 'released' string to boolean
        setFormData({
            ...formData,
            [name]: inputValue,
        });
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if ((formData.onHold || 0) > formData.count) {
            setErrorMessage("Hold can't be greater than the total count.");
            return;
        }
        const payload = {
            ...formData,
            released: formData.released === true, // Ensure 'released' is a boolean
            available: formData.count - (formData.onHold || 0),
            hold: (formData.onHold || 0) > 0,
        };
        
        try {
            const response = await fetch('https://localhost:7259/api/Package/ModifyPackage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setErrorMessage('Package modified successfully.');
                navigate('/supplier/dashboard'); 
            } else {
                setErrorMessage('Failed to update the package details.');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Error updating package details.');
        }
    };

    return (
        <div className="admin-container">
            <div className="main-content">
                <div id="modify-package" className="content-section">
                    <h2 className="section-title">Modify Package</h2>
                    {errorMessage && <div className="errorMessage">{errorMessage}</div>}
                    <div className="content-box">
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="id" value={formData.id} />
                            <input type="hidden" name="available" value={formData.available} />
                            <input type="hidden" name="hold" value={formData.hold?.toString()} />
                            <input type="hidden" name="userId" value={formData.userId} />

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
                                <textarea name="details" rows={4} value={formData.details} onChange={handleChange} required />
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
                                <input type="number" name="price" step="0.01" value={formData.price} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Release:</label>
                                <select name="released" value={formData.released.toString()} onChange={handleChange} required>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="submit-button">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifyPackage;
