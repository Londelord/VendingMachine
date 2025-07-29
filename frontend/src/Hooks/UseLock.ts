import { useEffect } from "react";
import { BackendService } from "../BackendService/BackendService.ts";
import { useNavigate } from "react-router-dom";

function unlock() {
  const token = BackendService.getOrCreateToken();
  navigator.sendBeacon(BackendService.baseURl + `/vendingmachine/unlock?token=${token}`)
}

function useLock() {
  const navigate = useNavigate();

  useEffect(() => {
    const tryLock = async () => {
      const result = await BackendService.TryLock();
      if (!result) {
        navigate("/waiting");
      }
    };
    tryLock();
  }, [navigate]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        unlock();
      }
    };

    const handlePageHide = () => {
      unlock();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);
}

export default useLock;