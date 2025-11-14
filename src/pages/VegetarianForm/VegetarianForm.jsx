import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "./VegetarianForm.css";
import lang from "../../lang.json";
import "primereact/resources/themes/lara-light-cyan/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css

const VegetarianForm = ({ lang: currentLang }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    country: "",
    isVegetarian: "",
    vegetarianTime: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    gender: false,
    country: false,
    isVegetarian: false,
    vegetarianTime: false,
  });

  const t = (key) => {
    return lang.vegetarian[currentLang][key];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error for this field when user starts filling it
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      name: !formData.name,
      gender: !formData.gender,
      country: !formData.country,
      isVegetarian: !formData.isVegetarian,
      vegetarianTime: !formData.vegetarianTime,
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      return; // Stop submission if there are errors
    }

    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = t("form-submitting");

    // If the current language is Chinese, find the English country name
    let countryToSubmit = formData.country;
    if (currentLang === "zh") {
      const countryIndex = lang.vegetarian.zh.countries.indexOf(
        formData.country
      );
      if (countryIndex !== -1) {
        countryToSubmit = lang.vegetarian.en.countries[countryIndex];
      }
    }

    const dataToSubmit = {
      ...formData,
      country: countryToSubmit,
    };

    try {
      const response = await fetch("/api/save-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.text();

      if (response.ok) {
        alert(t("form-alert-success"));
        // Reset form
        setFormData({
          name: "",
          gender: "",
          country: "",
          isVegetarian: "",
          vegetarianTime: "",
        });
        // Reset errors
        setErrors({
          name: false,
          gender: false,
          country: false,
          isVegetarian: false,
          vegetarianTime: false,
        });
      } else {
        alert(`${t("form-alert-error")} ${result}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(t("form-alert-connection-error"));
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = t("form-submit-button");
    }
  };

  const countryOptions = t("countries").map((country) => ({
    label: country,
    value: country,
  }));

  return (
    <div className="vegetarian-form-container">
      <div className="form-header">
        <h1>{t("form-header-title-1")}</h1>
        {currentLang === "zh" && <h2>{t("form-header-title-2")}</h2>}
      </div>

      <div className="form-description">
        <p>{t("form-description-1")}</p>
        {currentLang === "zh" && <p>{t("form-description-2")}</p>}
      </div>

      <form onSubmit={handleSubmit} className="vegetarian-form">
        {/* Field 1: Name */}
        <div className="form-group">
          <label htmlFor="name">
            {t("form-field-name")} <span className="required-asterisk">*</span>
          </label>
          {errors.name && (
            <div className="error-message">{t("form-required-field")}</div>
          )}
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t("form-country-placeholder")}
          />
        </div>

        {/* Field 2: Gender */}
        <div className="form-group">
          <label>
            {t("form-field-gender")}{" "}
            <span className="required-asterisk">*</span>
          </label>
          {errors.gender && (
            <div className="error-message">{t("form-required-field")}</div>
          )}
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleInputChange}
              />
              <span>{t("form-gender-male")}</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleInputChange}
              />
              <span>{t("form-gender-female")}</span>
            </label>
          </div>
        </div>

        {/* Field 3: Country */}
        <div className="form-group">
          <label htmlFor="country">
            {t("form-field-country")}{" "}
            <span className="required-asterisk">*</span>
          </label>
          {errors.country && (
            <div className="error-message">{t("form-required-field")}</div>
          )}
          <Dropdown
            id="country"
            name="country"
            value={formData.country}
            options={countryOptions}
            onChange={handleInputChange}
            placeholder={t("form-country-placeholder")}
            filter
            editable
            showClear
            filterBy="label"
          />
        </div>

        {/* Field 5: Already Vegetarian */}
        <div className="form-group">
          <label htmlFor="isVegetarian">
            {t("form-field-is-vegetarian")}{" "}
            <span className="required-asterisk">*</span>
          </label>
          {errors.isVegetarian && (
            <div className="error-message">{t("form-required-field")}</div>
          )}
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="isVegetarian"
                value="yes"
                checked={formData.isVegetarian === "yes"}
                onChange={handleInputChange}
              />
              <span>{t("form-is-vegetarian-yes")}</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="isVegetarian"
                value="no"
                checked={formData.isVegetarian === "no"}
                onChange={handleInputChange}
              />
              <span>{t("form-is-vegetarian-no")}</span>
            </label>
          </div>
        </div>

        {/* Field 7: Vegetarian Time */}
        <div className="form-group">
          <label>
            {t("form-field-vegetarian-time")}{" "}
            <span className="required-asterisk">*</span>
          </label>
          <div className="info-text">{t("form-vegetarian-time-info")}</div>
          {errors.vegetarianTime && (
            <div className="error-message">{t("form-required-field")}</div>
          )}
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="vegetarianTime"
                value="life-after-life"
                checked={formData.vegetarianTime === "life-after-life"}
                onChange={handleInputChange}
              />
              <span>{t("form-vegetarian-time-life-after-life")}</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="vegetarianTime"
                value="whole-life"
                checked={formData.vegetarianTime === "whole-life"}
                onChange={handleInputChange}
              />
              <span>{t("form-vegetarian-time-whole-life")}</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="vegetarianTime"
                value="1-year"
                checked={formData.vegetarianTime === "1-year"}
                onChange={handleInputChange}
              />
              <span>{t("form-vegetarian-time-1-year")}</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="vegetarianTime"
                value="1-month"
                checked={formData.vegetarianTime === "1-month"}
                onChange={handleInputChange}
              />
              <span>{t("form-vegetarian-time-1-month")}</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="vegetarianTime"
                value="7-days"
                checked={formData.vegetarianTime === "7-days"}
                onChange={handleInputChange}
              />
              <span>{t("form-vegetarian-time-7-days")}</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="vegetarianTime"
                value="1-day-per-week"
                checked={formData.vegetarianTime === "1-day-per-week"}
                onChange={handleInputChange}
              />
              <span>{t("form-vegetarian-time-1-day-per-week")}</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="vegetarianTime"
                value="1-day"
                checked={formData.vegetarianTime === "1-day"}
                onChange={handleInputChange}
              />
              <span>{t("form-vegetarian-time-1-day")}</span>
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">
          {t("form-submit-button")}
        </button>
      </form>
    </div>
  );
};

export default VegetarianForm;
