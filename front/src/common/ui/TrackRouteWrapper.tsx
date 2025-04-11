"use client";

import { useTrackRouteChange } from "@/hooks/change-back/useTrackRouteChange";

const TrackRouteWrapper = () => {
  useTrackRouteChange();
  return null;
};

export default TrackRouteWrapper;
