import { tagType } from '../Constants/constants';

import './tag.css';

const Tag = (props: {
  tag: string;
  type: string;
  onClick?: () => void;
  index?: number;
}): JSX.Element => {
  return (
    <>
      <div className="tag-container">
        <div className="tag-text">{props.tag}</div>
        {props.type === tagType.delete && (
          <div className="tag-delete" onClick={props.onClick}></div>
        )}
      </div>
    </>
  );
};

export default Tag;
