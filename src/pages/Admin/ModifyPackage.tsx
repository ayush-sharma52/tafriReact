import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

// Define the PackageDTO interface
interface PackageDTO {
    id: number;
    name: string;
    destination: string;
    details: string;
    count: number;
    onHold: number;
    price: number;
    finalprice: number;
    userId: string;
    available: number;
    hold: boolean;
    released: boolean;
    visible: boolean;
}

const ModifyPackage = () => {
    const { id } = useParams<{ id: string }>();
    const packageId = id;
    const [packageData, setPackageData] = useState<PackageDTO | null>(null);
    const [adminHold, setAdminHold] = useState<number>(0);
    const [finalPrice, setFinalPrice] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Fetch package data on component load
    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const response = await fetch(`https://localhost:7259/api/Package/GetPackageById/${packageId}`);
                if (response.ok) {
                    const data = await response.json();
                    setPackageData(data);
                    setFinalPrice(data.finalprice); // Set initial final price
                } else {
                    setErrorMessage("Failed to fetch package details.");
                }
            } catch (error) {
                setErrorMessage("Error fetching package data.");
            }
        };

        fetchPackage();
    }, [packageId]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (packageData) {
            if (finalPrice < packageData.price) {
                setErrorMessage("Final price can't be less than the supplier's price.");
                return;
            }

            const updatedPackage = {
                ...packageData,
                finalprice: finalPrice,
                onHold: packageData.onHold + adminHold,
                available: packageData.count - (packageData.onHold + adminHold),
            };

            try {
                const response = await fetch("https://localhost:7259/api/Package/ModifyPackage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedPackage),
                });

                if (response.ok) {
                    setErrorMessage("Package Modified successfully");
                    // Optionally, redirect to another page, e.g.:
                    // window.location.href = "/admin/pendingPackages";
                } else {
                    setErrorMessage("Failed to update the package details.");
                }
            } catch (error) {
                setErrorMessage("Error submitting package data.");
            }
        }
    };

    if (!packageData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-container" style={{ padding: "20px", backgroundColor: "#000", color: "#fff" }}>
            {errorMessage && <div className="errorMessage" style={{ backgroundColor: "#e60000" }}>{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="content-box" style={{ backgroundColor: "#333", padding: "20px" }}>
                <div className="details-box" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
                    <div className="detail-item">
                        <label>Package Name:</label>
                        <span>{packageData.name}</span>
                    </div>
                    <div className="detail-item">
                        <label>Destination:</label>
                        <span>{packageData.destination}</span>
                    </div>
                    <div className="detail-item">
                        <label>Details:</label>
                        <span>{packageData.details}</span>
                    </div>
                    <div className="detail-item">
                        <label>Count:</label>
                        <span>{packageData.count}</span>
                    </div>
                    <div className="detail-item">
                        <label>Package on Hold:</label>
                        <span>{packageData.onHold}</span>
                    </div>
                    <div className="detail-item">
                        <label>Price:</label>
                        <span>{packageData.price}</span>
                    </div>
                    <div className="detail-item">
                        <label>Supplier Id:</label>
                        <span>{packageData.userId}</span>
                    </div>
                </div>

                <h2 className="section-title" style={{ color: "#e60000" }}>Adjust & Hold</h2>

                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label>Final Price:</label>
                    <input
                        type="number"
                        value={finalPrice}
                        onChange={(e) => setFinalPrice(parseFloat(e.target.value))}
                        step="0.1"
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", backgroundColor: "#1c1c1c", color: "#fff" }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label>Hold More Packages:</label>
                    <input
                        type="number"
                        value={adminHold}
                        onChange={(e) => setAdminHold(parseInt(e.target.value))}
                        step="1"
                        placeholder="Enter number of packages to hold more"
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", backgroundColor: "#1c1c1c", color: "#fff" }}
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="submit-button" style={{ backgroundColor: "#e60000", color: "#fff", padding: "10px 20px" }}>
                        Save Changes
                    </button>
                </div>
            </form>

            <form action="/admin/pending-packages" method="get">
                <button type="submit" className="back-button" style={{ position: "absolute", top: "20px", right: "20px", backgroundColor: "#e60000", padding: "10px 20px", color: "#fff" }}>
                    Back to Dashboard
                </button>
            </form>
        </div>
    );
};

export default ModifyPackage;
