import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import classNames from "classnames";
import css from "./index.module.scss";
import React, { useState, useEffect } from "react";
import PageContain from "components/page-contain";
import { formatFullDate } from "utils/date";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { programData as pd } from "data/program";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

const Program = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const days = Object.keys(pd);
  const currentIndex = days.indexOf(day || "day1");

  const prevDay = currentIndex > 0 ? days[currentIndex - 1] : null;
  const nextDay = currentIndex < days.length - 1 ? days[currentIndex + 1] : null;

  const selectedDay = day || "day1";
  const dayProgram = pd[selectedDay];

  const [activeTab, setActiveTab] = useState(selectedDay);
  const [direction, setDirection] = useState(0); // Controls swipe direction

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
    return <Navigate to="/404" replace />;
  }

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
      return (
        el.isContentEditable ||
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT"
      );
    };
    const onKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;      // don't hijack shortcuts
      if (isEditable(document.activeElement)) return;       // don't interfere with forms
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

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (nextDay) {
        setDirection(1); // Swipe left
        navigate(`/program/${nextDay}`);
      }
    },
    onSwipedRight: () => {
      if (prevDay) {
        setDirection(-1); // Swipe right
        navigate(`/program/${prevDay}`);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Animation variants
  const swipeVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <PageContain title="Daily Program">
      <p>Times are in CEST = UTC + 2h</p>

      {/* Swipeable Container */}
      <div {...handlers}>
        <div className={classNames(css.arrows, 'd-flex justify-content-between align-items-center mb-4 mt-3 d-md-none')}>
          {prevDay ? (
            <Link to={`/program/${prevDay}`} className={css.arrow} onClick={() => setDirection(-1)}>
              <SlArrowLeft />
            </Link>
          ) : <div />}

          <h3 className="m-0">{formatFullDate(dayProgram.date, false)}</h3>

          {nextDay ? (
            <Link to={`/program/${nextDay}`} className={css.arrow} onClick={() => setDirection(1)}>
              <SlArrowRight />
            </Link>
          ) : <div />}
        </div>

        {/* Animation Wrapper */}
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
                {formatFullDate(dayProgram.date, false)}
                {nextDay ? (
                  <Link to={`/program/${nextDay}`} className={css.arrow} onClick={() => setDirection(1)}>
                    <SlArrowRight />
                  </Link>
                ) : <div />}
              </h3>
              <dl>
                {dayProgram.program.map((item, index) => (
                  <div
                    className={classNames('d-flex flex-column flex-md-row', item?.lectures?.length > 0 && 'flex-column flex-md-column')}
                    key={index}
                  >
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
                        <dd className={classNames(item.type === 'sep' ? css.sep : 'fw-bolder', 'mt-1 mt-md-0 ms-2 ms-md-0 mb-4')}>
                          {item?.linkTitle ? (
                            <a href={item.linkTitle}>
                              {item.display}
                            </a>
                          ) : (
                            item.display
                          )}
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
