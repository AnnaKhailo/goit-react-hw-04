import { Formik, Form, Field } from "formik";
import { HiSearch } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const notify = () => toast.error("Please fill in the search field!");

  const handleSubmit = (values, actions) => {
    values.query.trim() === "" && notify();
    onSearch(values.query);
    actions.resetForm();
  };

  return (
    <header>
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form className={css.searchForm}>
          <Field
            className={css.searchField}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          ></Field>
          <button className={css.searchBtn} type="submit">
            <HiSearch className={css.iconSearch} />
          </button>
        </Form>
      </Formik>
      <Toaster />
    </header>
  );
}
