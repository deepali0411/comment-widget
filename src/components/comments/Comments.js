import React, { useCallback, useContext, useState } from "react";
import styles from "./comments.module.scss";
import CommentContainer from "../commentsContainer/CommentContainer";
import AllComments from "../allComments/AllComments";
import { context } from "../../context";

const Comments = (props) => {
  const { handleUpdateComments } = props;
  const commentsData = useContext(context);
  const [formValues, setFormValues] = useState({ value: "", isEdit: false });

  const handleSetFormValues = useCallback((value, id, isEdit) => {
    setFormValues({ value, isEdit, id });
  }, []);

  return (
    <div className={styles.container}>
      <CommentContainer
        handleUpdateComments={handleUpdateComments}
        isRoot={true}
        formValues={formValues}
      />
      <AllComments
      commentsData={commentsData}
        handleUpdateComments={handleUpdateComments}
        handleSetFormValues={handleSetFormValues}
      />
    </div>
  );
};
export default Comments;
