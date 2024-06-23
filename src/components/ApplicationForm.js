import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ApplicationForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    preferredInterviewTime: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!form.fullName) newErrors.fullName = 'Full Name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid Email is required';
    if (!form.phoneNumber || isNaN(form.phoneNumber)) newErrors.phoneNumber = 'Valid Phone Number is required';
    
    if ((form.position === 'Developer' || form.position === 'Designer') && 
        (!form.relevantExperience || isNaN(form.relevantExperience) || form.relevantExperience <= 0)) {
      newErrors.relevantExperience = 'Relevant Experience must be a number greater than 0';
    }

    if (form.position === 'Designer' && (!form.portfolioURL || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(form.portfolioURL))) {
      newErrors.portfolioURL = 'Valid Portfolio URL is required';
    }

    if (form.position === 'Manager' && !form.managementExperience) {
      newErrors.managementExperience = 'Management Experience is required';
    }

    if (!Object.values(form.additionalSkills).some(skill => skill)) {
      newErrors.additionalSkills = 'At least one skill must be selected';
    }

    if (!form.preferredInterviewTime || isNaN(new Date(form.preferredInterviewTime))) {
      newErrors.preferredInterviewTime = 'Valid Date and Time is required';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setForm(prevForm => ({
        ...prevForm,
        additionalSkills: {
          ...prevForm.additionalSkills,
          [name]: checked,
        },
      }));
    } else {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container mt-5">
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
              id="phoneNumber"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="position">Applying for Position</label>
            <select
              className="form-control"
              id="position"
              name="position"
              value={form.position}
              onChange={handleChange}
            >
              <option value="">Select a position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {(form.position === 'Developer' || form.position === 'Designer') && (
            <div className="form-group">
              <label htmlFor="relevantExperience">Relevant Experience (years)</label>
              <input
                type="number"
                className={`form-control ${errors.relevantExperience ? 'is-invalid' : ''}`}
                id="relevantExperience"
                name="relevantExperience"
                value={form.relevantExperience}
                onChange={handleChange}
              />
              {errors.relevantExperience && <div className="invalid-feedback">{errors.relevantExperience}</div>}
            </div>
          )}

          {form.position === 'Designer' && (
            <div className="form-group">
              <label htmlFor="portfolioURL">Portfolio URL</label>
              <input
                type="text"
                className={`form-control ${errors.portfolioURL ? 'is-invalid' : ''}`}
                id="portfolioURL"
                name="portfolioURL"
                value={form.portfolioURL}
                onChange={handleChange}
              />
              {errors.portfolioURL && <div className="invalid-feedback">{errors.portfolioURL}</div>}
            </div>
          )}

          {form.position === 'Manager' && (
            <div className="form-group">
              <label htmlFor="managementExperience">Management Experience</label>
              <textarea
                className={`form-control ${errors.managementExperience ? 'is-invalid' : ''}`}
                id="managementExperience"
                name="managementExperience"
                value={form.managementExperience}
                onChange={handleChange}
              ></textarea>
              {errors.managementExperience && <div className="invalid-feedback">{errors.managementExperience}</div>}
            </div>
          )}

          <div className="form-group">
            <label>Additional Skills</label>
            {Object.keys(form.additionalSkills).map(skill => (
              <div className="form-check" key={skill}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={skill}
                  name={skill}
                  checked={form.additionalSkills[skill]}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={skill}>
                  {skill}
                </label>
              </div>
            ))}
            {errors.additionalSkills && <div className="text-danger">{errors.additionalSkills}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="preferredInterviewTime">Preferred Interview Time</label>
            <input
              type="datetime-local"
              className={`form-control ${errors.preferredInterviewTime ? 'is-invalid' : ''}`}
              id="preferredInterviewTime"
              name="preferredInterviewTime"
              value={form.preferredInterviewTime}
              onChange={handleChange}
            />
            {errors.preferredInterviewTime && <div className="invalid-feedback">{errors.preferredInterviewTime}</div>}
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      ) : (
        <div className="mt-5">
          <h2>Form Submitted Successfully!</h2>
          <pre>{JSON.stringify(form, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ApplicationForm;
