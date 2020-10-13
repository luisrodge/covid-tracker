import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import api from "../data/api";

const UpdateSchema = Yup.object().shape({
  total: Yup.number().min(1, "Must be at least 1").required("Required"),
  type: Yup.string().required("Required"),
  district: Yup.string().required("Required"),
});

const Update = () => {
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      const results = await api("districts");
      setDistricts(results);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    setSubmitting(true);

    try {
      await api("cases", "PUT", values);
      resetForm();
      alert.show("Update Successful", { type: "success" });
    } catch {
      resetForm();
      alert.show("Update Failed", { type: "error" });
    }

    setSubmitting(false);
  };

  if (loading) return null;

  return (
    <div className="update-wrapper">
      <h3>
        <Link to="/">
          <FontAwesomeIcon
            icon={faHome}
            color="#ccc"
            size="lg"
            style={{ marginRight: 16 }}
          />
        </Link>
        Update covid data
      </h3>
      <div className="update-form-wrapper">
        <Formik
          initialValues={{ total: 0, type: "", district: "" }}
          validationSchema={UpdateSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values, setSubmitting, resetForm);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="district">District</label>
                <Field as="select" name="district">
                  <option defaultValue>Select district</option>
                  {districts.map((district) => (
                    <option value={district.name} key={district.name}>
                      {district.name}
                    </option>
                  ))}
                </Field>
                {errors.district && touched.district && (
                  <span className="input-error">{errors.district}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="type">Type</label>
                <Field as="select" name="type">
                  <option defaultValue>Select type</option>
                  <option value="active">Active</option>
                  <option value="recovered">Recovered</option>
                  <option value="deceased">Deceased</option>
                </Field>
                {errors.type && touched.type && (
                  <span className="input-error">{errors.type}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="total">Number Reported</label>
                <input
                  type="number"
                  name="total"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.total}
                />
                {errors.total && touched.total && (
                  <span className="input-error">{errors.total}</span>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ marginRight: 13 }}
              >
                Save Changes
              </button>
              <button className="alt-btn" onClick={() => history.push("/")}>
                Cancel
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Update;
