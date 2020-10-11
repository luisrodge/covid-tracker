import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const UpdateSchema = Yup.object().shape({
  total: Yup.number().min(1, "Must be at least 1").required("Required"),
  type: Yup.string().required("Required"),
  district: Yup.string().required("Required"),
});

const Update = () => {
  const history = useHistory();

  const handleSubmit = (values, setSubmitting) => {
    console.log(values);
  };

  return (
    <div className="update-wrapper">
      <h3>Update covid data</h3>
      <div className="update-form-wrapper">
        <Formik
          initialValues={{ total: 0, type: "", district: "" }}
          validationSchema={UpdateSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
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
                  <option value="red">Cayo</option>
                  <option value="green">Belize</option>
                  <option value="blue">Orange Walk</option>
                </Field>
                {errors.district && touched.district && <span className="input-error">{errors.district}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="type">Type</label>
                <Field as="select" name="type">
                  <option defaultValue>Select type</option>
                  <option value="active">Active</option>
                  <option value="recovery">Recovery</option>
                  <option value="death">Death</option>
                </Field>
                {errors.type && touched.type && <span className="input-error">{errors.type}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="total">Total</label>
                <input
                  type="number"
                  name="total"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.total}
                />
                {errors.total && touched.total && <span className="input-error">{errors.total}</span>}
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
