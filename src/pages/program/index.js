import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import classNames from "classnames";
import css from "./index.module.scss";
import bookletPdf from '@/assets/files/abstracts_booklet.pdf';
import React, { useState, useEffect, useMemo } from "react";
import PageContain from "components/page-contain";
import { formatFullDate } from "utils/date";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { programData as pd } from "data/program";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { resolveLectureHref, getFileExtTag } from 'utils/resolve-lecture-href';
 
 
/** --- Date helpers (Safari-safe) --- */
// returns local date as 'YYYY-MM-DD'
const getTodayLocalISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

// accepts Date | 'YYYY-MM-DD' | 'MM-DD-YYYY' and returns 'YYYY-MM-DD'
const toISODateString = (input) => {
  if (input instanceof Date) {
    const d = new Date(input.getTime());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }
  if (typeof input === "string") {
    // already ISO?
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;
    // handle MM-DD-YYYY robustly (avoid native Date parsing)
    const mdy = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(input);
    if (mdy) {
      const [_, m, d, y] = mdy.map(Number);
      const date = new Date(Date.UTC(y, m - 1, d));
      return date.toISOString().slice(0, 10);
    }
  }
  // fallback: try Date constructor but normalize to local ISO
  const d = new Date(input);
  if (!isNaN(d)) {
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }
  return ""; // triggers 404/guard if bad
};

 


const Program = () => {
  const { day } = useParams();
  const navigate = useNavigate();

  const days = useMemo(() => Object.keys(pd), []);
  const selectedDay = day || "day1";
  const dayProgram = pd[selectedDay];

  const currentIndex = days.indexOf(selectedDay);
  const prevDay = currentIndex > 0 ? days[currentIndex - 1] : null;
  const nextDay = currentIndex < days.length - 1 ? days[currentIndex + 1] : null;

  const [activeTab, setActiveTab] = useState(selectedDay);
  const [direction, setDirection] = useState(0);

  // keep active tab in sync with the route
  useEffect(() => {
    setActiveTab(selectedDay);
  }, [selectedDay]);

  // if no 'day' in URL, pick today's program (by local date) if available
  useEffect(() => {
    if (day) return;
    const todayISO = getTodayLocalISO();
    const match = Object.entries(pd).find(([_, data]) => {
      const iso = toISODateString(data.date);
      return iso && iso === todayISO;
    });
    if (match) {
      setActiveTab(match[0]);
      navigate(`/program/${match[0]}`, { replace: true });
    } else {
      // default to first day if today not found
      setActiveTab("day1");
      navigate(`/program/day1`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, navigate]);

  if (!dayProgram) {
    return <Navigate to="/404" replace />;
  }

  // normalize the displayed date once
  const displayISO = toISODateString(dayProgram.date);

  const goPrevDay = () => {
    if (!prevDay) return;
    setDirection(-1);
    navigate(`/program/${prevDay}`);
  };
  const goNextDay = () => {
    if (!nextDay) return;
    setDirection(1);
    navigate(`/program/${nextDay}`);
  };

  useEffect(() => {
    const isEditable = (el) => {
      if (!el) return false;
      const tag = el.tagName;
      return el.isContentEditable || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
    };
    const onKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditable(document.activeElement)) return;
      if (e.key === "ArrowLeft" && prevDay) {
        e.preventDefault();
        goPrevDay();
      } else if (e.key === "ArrowRight" && nextDay) {
        e.preventDefault();
        goNextDay();
      } else if (e.key === "Home" && days.length) {
        e.preventDefault();
        setDirection(-1);
        navigate(`/program/${days[0]}`);
      } else if (e.key === "End" && days.length) {
        e.preventDefault();
        setDirection(1);
        navigate(`/program/${days[days.length - 1]}`);
      }
    };
    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [prevDay, nextDay, days, navigate]);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextDay && (setDirection(1), navigate(`/program/${nextDay}`)),
    onSwipedRight: () => prevDay && (setDirection(-1), navigate(`/program/${prevDay}`)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const swipeVariants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <PageContain title="Daily Program">  
      <div className="d-flex flex-column flex-md-row gap-1 justify-content-md-between mb-3">
        <span>Times are in CEST = UTC + 2h</span>
        <a href={bookletPdf} target="_blank" rel="noopener noreferrer"><b>Download Abstract Booklet (PDF)</b></a>
      </div>

      <div {...handlers}>
        <div className={classNames(css.arrows, "d-flex justify-content-between align-items-center mb-4 mt-3 d-md-none")}>
          {prevDay ? (
            <Link to={`/program/${prevDay}`} className={css.arrow} onClick={() => setDirection(-1)}>
              <SlArrowLeft />
            </Link>
          ) : (
            <div />
          )}

          {/* Ensure formatFullDate can handle 'YYYY-MM-DD'. If it expects a Date, wrap with new Date(displayISO). */}
          <h3 className="m-0">{formatFullDate(displayISO, false)}</h3>

          {nextDay ? (
            <Link to={`/program/${nextDay}`} className={css.arrow} onClick={() => setDirection(1)}>
              <SlArrowRight />
            </Link>
          ) : (
            <div />
          )}
        </div>

        <div className={classNames("mt-3", css.programWrap)}>
          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <motion.div
              key={activeTab}
              custom={direction}
              variants={swipeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
            >
              <h3 className="mt-0 mb-4 border-bottom pb-2 d-none d-md-flex align-items-center gap-3">
                {prevDay && (
                  <Link to={`/program/${prevDay}`} className={css.arrow} onClick={() => setDirection(-1)}>
                    <SlArrowLeft />
                  </Link>
                )}
                {formatFullDate(displayISO, false)}
                {nextDay ? (
                  <Link to={`/program/${nextDay}`} className={css.arrow} onClick={() => setDirection(1)}>
                    <SlArrowRight />
                  </Link>
                ) : (
                  <div />
                )}
              </h3>

              <dl>
                {dayProgram.program.map((item, index) => (
                  <div
                    className={classNames(
                      "d-flex flex-column flex-md-row",
                      item?.lectures?.length > 0 && "flex-column flex-md-column"
                    )}
                    key={index}
                  >
                    {item.session ? (
                      <>
                        <div className={classNames(item?.lectures?.length > 0 && css.sessionWrap, "border-bottom pb-2 mb-2")}>
                          <h5 className="mb-0 mt-3">{item.session}</h5>
                          {item.chair && (
                            <p className="mb-0">
                              <b>Chair:</b> {item.chair}
                            </p>
                          )}
                        </div>
                        {item.lectures &&
                          item.lectures.map((lecture, idx) => (
                            <div className="d-flex flex-column flex-md-row" key={idx}>
                              <dt>{lecture.period}</dt>
                              <dd className={classNames(item.type === "sep" && css.sep, "mt-1 mt-md-0 ms-2 ms-md-0")}>
                                <strong className="d-block">
                                  {(() => {
                                    const href = resolveLectureHref(lecture.link);
                                    const ext = getFileExtTag(lecture.link || href);
                                    const badge = ext ? <span className={css.fileBadge}>[{ext}]</span> : null;

                                    return href ? (
                                      <a href={href} target="_blank" rel="noopener noreferrer">
                                        {lecture.title} {badge}
                                      </a>
                                    ) : (
                                      <>
                                        {lecture.title} {badge}
                                      </>
                                    );
                                  })()}
                                </strong>
                                <i>{lecture.authors}</i>{" "}
                                {lecture.display}
                              </dd>
                            </div>
                          ))}
                      </>
                    ) : (
                      <>
                        <dt>{item.period}</dt>
                        <dd className={classNames(item.type === "sep" ? css.sep : "fw-bolder", "mt-1 mt-md-0 ms-2 ms-md-0 mb-4")}>
                          {item?.linkTitle ? <a href={item.linkTitle}>{item.display}</a> : item.display}
                        </dd>
                      </>
                    )}
                  </div>
                ))}
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageContain>
  );
};

export default Program;
