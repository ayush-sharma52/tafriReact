import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/Admin/AddMapLocation.css"

interface MapLocation {
  MapId : number;
  Name: string;
  Lattitude: number;
  Longitude: number;
  Url : String;
}

const AddMapLocation: React.FC = () => {
  const [formData, setFormData] = useState<MapLocation>({
    MapId:0,
    Name: "",
    Lattitude: 0,
    Longitude: 0,
    Url : "something"
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7259/api/Map/AddLocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });


      if (!response.ok) {
        const error = await response.text();
        console.log(error);
        setErrors([error]);
      } else {
        // Handle success case (e.g., show success message)
        setErrors(["Location added successfully"]);
      }
    } catch (err) {
      console.log(err + " inside catch");
      setErrors([`Error: ${err}`]);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-content">
        <h2 className="section-title">Create Map Location</h2>
        <p>
          Add locations to help users find the best travel packages with ease.
          Enhance the user experience by making your location visible on the map.
        </p>

       

        <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="errorMessage">
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}
          <div className="form-group">
            <label htmlFor="Name">Location Name</label>
            <input
              type="text"
              className="form-control"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Lattitude">Enter Lattitude</label>
            <input
              type="number"
              className="form-control"
              name="Lattitude"
              value={formData.Lattitude}
              onChange={handleChange}
              required
              step="any"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Longitude">Enter Longitude</label>
            <input
              type="number"
              className="form-control"
              name="Longitude"
              value={formData.Longitude}
              onChange={handleChange}
              required
              step="any"
            />
          </div>

          <button type="submit" className="btn-custom">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMapLocation;
