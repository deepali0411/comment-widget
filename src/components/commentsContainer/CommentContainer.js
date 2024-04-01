import react, { useEffect, useState } from "react";

import styles from "./commentContainer.module.scss";

const CommentContainer = ({ handleUpdateComments, isRoot, formValues, id, setIsReplyClick }) => {
  const [value, setValue] = useState(formValues.value || "");

  useEffect(()=> {
    setValue(formValues.value);
  }, [formValues])

  const handlesubmit = (e) => {
    if (e.keyCode === 13 && !e.shiftKey && e.target.value) {
      if (!formValues.isEdit) handleUpdateComments("create", value, isRoot, id, formValues?.objId);
      else handleUpdateComments("update", value, isRoot, formValues?.id, formValues?.objId);
      setValue("");
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        value={value}
        maxLength={200}
        label="Country"
        placeholder="write the comment"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handlesubmit}
        className={styles.textArea}
        autoFocus
        onBlur={()=> {if(!isRoot) setIsReplyClick(0)}}
      />
    </div>
  );
};
export default CommentContainer;
