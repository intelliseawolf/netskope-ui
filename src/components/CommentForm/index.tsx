import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

interface CommentFormProps {
  submitForm: Function;
}

export interface CommentFormData {
  comment: string;
  name: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("*Name is required"),
  comment: Yup.string().required("*Comment is required"),
});

const CommentForm = ({ submitForm }: CommentFormProps) => {
  return (
    <Formik
      initialValues={{ name: "", comment: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        resetForm();
        submitForm(values);
        setSubmitting(false);
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
        <Form onSubmit={handleSubmit} className="mx-auto">
          <Form.Group controlId="formName">
            <Form.Label>Comment :</Form.Label>
            <Form.Control
              as="textarea"
              name="comment"
              placeholder="Comment"
              rows={4}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.comment}
              className={
                touched.comment && errors.comment ? "error" : undefined
              }
            />
            {touched.comment && errors.comment ? (
              <div className="error-message">{errors.comment}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className={touched.name && errors.name ? "error" : undefined}
            />
            {touched.name && errors.name ? (
              <div className="error-message">{errors.name}</div>
            ) : null}
          </Form.Group>
          <Button
            variant="primary"
            className="mt-2"
            type="submit"
            disabled={isSubmitting}
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;
