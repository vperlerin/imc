import { useEffect } from "react";
import { useBeforeUnload, useNavigate, useLocation } from "react-router-dom";

export const useBlockNavigation = (unsavedChanges) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes. Do you really want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  useEffect(() => {
    const handleNavigation = (event) => {
      if (unsavedChanges) {
        const confirmLeave = window.confirm("You have unsaved changes. Do you really want to leave?");
        if (!confirmLeave) {
          event.preventDefault();
          navigate(location.pathname, { replace: true }); // Stay on the same page
        }
      }
    };

    window.addEventListener("popstate", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [unsavedChanges, navigate, location.pathname]);
};

 