import './tag.css';

const Tag = (props: { tag: string }): JSX.Element => {
  return (
    <>
      <div className="tag-container">{props.tag}</div>
    </>
  );
};

export default Tag;
