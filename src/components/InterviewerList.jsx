import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

function InterviewerList(props) {
  const { value, interviewers, onChange } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((i) => {
          return (
            <InterviewerListItem
              key={i.id}
              name={i.name}
              avatar={i.avatar}
              selected={i.id === value}
              setInterviewer={() => onChange(i.id)}
            />
          );
        })}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
