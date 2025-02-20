import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import classNames from "classnames";
import css from "./index.module.scss";
import React, { useState, useEffect } from "react";
import PageContain from "components/page-contain";
import { formatFullDate } from "utils/date";
import { Link, useParams } from "react-router-dom";
import { programData as pd } from "data/program";

const Program = () => {
  const { day } = useParams();
  const days = Object.keys(pd);
  const currentIndex = days.indexOf(day || "day1");

  const prevDay = currentIndex > 0 ? days[currentIndex - 1] : null;
  const nextDay = currentIndex < days.length - 1 ? days[currentIndex + 1] : null;

  const selectedDay = day || "day1";
  const dayProgram = pd[selectedDay];

  const [activeTab, setActiveTab] = useState(selectedDay);

  useEffect(() => {
    setActiveTab(selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    const today = new Date();
    const formattedToday = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}-${today.getFullYear()}`;
  
    const currentDay = Object.entries(pd).find(([key, data]) => data.date === formattedToday)?.[0] || "day1";
    setActiveTab(day || currentDay);
  }, [day]);

  if (!dayProgram) {
    return (
      <PageContain padding={false}>
        <h2>Program not found</h2>
        <p>The requested program day does not exist.</p>
      </PageContain>
    );
  }

  return (
    <PageContain title="Daily Program"> 
        <p>Times are in CEST = UTC + 2h</p>
    
        <div className={classNames(css.arrows, 'd-flex justify-content-between align-items-center mb-4 mt-3 d-md-none')}>
          {prevDay ? (
            <Link to={`/program/${prevDay}`} className={css.arrow}>
              <SlArrowLeft />
            </Link>
          ) : <div />}

          <h3 className="m-0">{formatFullDate(dayProgram.date, false)}</h3>

          {nextDay ? (
            <Link to={`/program/${nextDay}`} className={css.arrow}>
              <SlArrowRight />
            </Link>
          ) : <div />}
        </div>

        <div className={classNames("mt-3", css.programWrap)}>
          {Object.entries(pd).map(([day, data]) => (
            <div key={day} hidden={activeTab !== day}>
              <h3 className="mt-0 mb-4 border-bottom pb-2 d-none d-md-flex align-items-center gap-3">
                {prevDay && (
                  <Link to={`/program/${prevDay}`} className={css.arrow}>
                    <SlArrowLeft />
                  </Link>
                )}
                {formatFullDate(data.date, false)}
                {nextDay ? (
                  <Link to={`/program/${nextDay}`} className={css.arrow}>
                    <SlArrowRight />
                  </Link>
                ) : <div />}

              </h3>
              <dl>
                {data.program.map((item, index) => (
                  <div className={classNames('d-flex flex-column flex-md-row', item?.lectures?.length > 0 && 'flex-column flex-md-column')} key={index}>
                    {item.session ? (
                      <>
                        <div className={classNames(item?.lectures?.length > 0 && css.sessionWrap, 'border-bottom pb-2 mb-2')}>
                          <h5 className="mb-0 mt-3">{item.session}</h5>
                          {item.chair && <p className="mb-0"><b>Chair:</b> {item.chair}</p>}
                        </div>
                        {item.lectures && (
                          item.lectures.map((lecture, idx) => (
                            <div className="d-flex flex-column flex-md-row" key={idx}>
                              <dt>{lecture.period}</dt>
                              <dd className={classNames(item.type === 'sep' && css.sep, 'mt-1 mt-md-0 ms-2 ms-md-0')}>
                                <strong className="d-block">{lecture.title}</strong>
                                <i>{lecture.authors}</i>{" "}
                                {lecture.linkTitle && (
                                  <a href={lecture.linkTitle} target="_blank" rel="noopener noreferrer">[Link]</a>
                                )}
                                {lecture.display}
                              </dd>
                            </div>
                          ))
                        )}
                      </>
                    ) : (
                      <>
                        <dt>{item.period}</dt>
                        <dd className={classNames(item.type === 'sep' && css.sep, 'mt-1 mt-md-0 ms-2 ms-md-0 mb-4')}>{item.display}</dd>
                      </>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div> 
    </PageContain>
  );
};

export default Program;
