const useTraverseTree = () => {
  const createComment = (tree, message, isRoot, id) => {
    if (isRoot || id===tree?.id) {
      return {
        ...tree,
        items: [
          ...tree.items,
          {
            isRoot: false,
            name: "Deepali",
            message,
            items: [],
            isCollapse: false,
            id: Date.now(),
          },
        ],
      };
    }
    let latestNode = [];
    latestNode = tree.items.map(obj => {
     return createComment(obj, message, false, id)
   })
   return {...tree, items: latestNode};
  };
  const deleteComment = (tree, id, isRoot, objId) => {
    if (isRoot || objId === tree.id) {
      const data = tree.items.filter((data) => data.id !== id);
      return { ...tree, items: data };
    }
    let latestNode = [];
    latestNode = tree.items.map(obj => {
        return deleteComment(obj, id, false, objId);
    })
    return {...tree, items: latestNode};
  };
  const updateComment = (tree, value, id, isRoot, objId) => {
      console.log('objId: ', objId, id, value);
      if (isRoot || objId === tree.id) {
        console.log('value: ', value);
      const data = tree.items.map((data) => {
        if (data.id === id) return { ...data, message: value };
        else return data;
      });
      return { ...tree, items: data };
    }
    let latestNode = [];
    latestNode = tree.items.map(obj => {
        return updateComment(obj, value, id, false, objId);
    })
    return { ...tree, items: latestNode };
  };
  return { createComment, deleteComment, updateComment };
};

export default useTraverseTree;
