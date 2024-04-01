import react, { useEffect, useState } from "react";
import styles from "./allComments.module.scss";
import { context } from "../../context";
import CommentContainer from "../commentsContainer/CommentContainer";

const AllComments = ({
  handleUpdateComments,
  handleSetFormValues,
  commentsData,
}) => {
  const [isReplyClick, setIsReplyClick] = useState(0);
  const [repliedValues, setRepliedValues] = useState({
      value: "",
      isEdit: false,
    });

  useEffect(() => {
    setIsReplyClick(0);
  }, [commentsData]);

  const handleDelete = (data, e) => {
    e.stopPropagation();
    const result = window.confirm("Do you want to delete the comment ?");
    if (result) {
      handleUpdateComments(
        "delete",
        data.message,
        commentsData.isRoot,
        data.id,
        commentsData.id
      );
    }
  };

  const handleEdit = (data, e) => {
    e.stopPropagation();
    if (commentsData.isRoot) {
      handleSetFormValues(data.message, data.id, true);
    } else {
      setIsReplyClick(data.id);
      setRepliedValues({
        value: data.message,
        isEdit: true,
        id: data.id,
        objId: commentsData.id,
      });
    }
  };

  const handleReply = (data, e) => {
    console.log("data: ", data);
    setRepliedValues({
        value: '',
        isEdit: false,
        id: data.id,
        objId: commentsData.id,
      })
    setIsReplyClick(data.id);
  };

  return (
    <div className={styles.container}>
      {commentsData.items.map((data) => {
        return (
          <div className={styles.comment}>
            <div className={styles.name}>{data?.name}</div>
            <div className={styles.message}>{data?.message}</div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.deleteButton}
                onClick={(e) => handleDelete(data, e)}
              >
                Delete
              </button>
              <button
                className={styles.editButton}
                onClick={(e) => handleEdit(data, e)}
              >
                Edit
              </button>
              <button
                className={styles.replyButton}
                onClick={(e) => handleReply(data, e)}
              >
                Reply
              </button>
            </div>
            <div className={styles.replyContainer}>
              {isReplyClick === data.id && (
                <CommentContainer
                  formValues={repliedValues}
                  handleUpdateComments={handleUpdateComments}
                  isRoot={false}
                  id={data.id}
                  setIsReplyClick={setIsReplyClick}
                />
              )}
              {data.items && (
                <AllComments
                  commentsData={data}
                  handleUpdateComments={handleUpdateComments}
                  handleSetFormValues={handleSetFormValues}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default AllComments;
