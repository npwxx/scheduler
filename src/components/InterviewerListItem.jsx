import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";

export default function InterviewListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  const handleClick = () => {
    if (setInterviewer) {
      setInterviewer();
    }
  };

  return (
    <li className={interviewerClass} onClick={handleClick}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
