export const onPreventDefault = (e) => {
  if (!e) {
    return;
  }
  e.preventDefault();
};

export const onPreventStop = (e) => {
  onPreventDefault(e);
  onStopPropagation(e);
};

export const onStopPropagation = (e) => {
  if (!e) {
    return;
  }
  e.stopPropagation();
};
