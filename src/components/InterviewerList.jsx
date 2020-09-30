import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewer, interviewers, setInterviewer } = props;

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
              selected={i.id === interviewer}
              setInterviewer={setInterviewer}
            />
          );
        })}
      </ul>
    </section>
  );
}
