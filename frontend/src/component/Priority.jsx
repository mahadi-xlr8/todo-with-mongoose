const Priority = (props) => {
  let name = "priority fa fa-star";

  if (!props.important) name += "-o";

  return (
    <i
      className={name}
      onClick={() => props.onChange(props.id)}
      style={{ color: "rgb(248, 198, 105)" }}
    ></i>
  );
};

export default Priority;
