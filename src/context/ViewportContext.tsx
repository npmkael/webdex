import { createContext, useContext, useEffect, useState } from "react";

type ViewportContextType = {
  isMobileView: boolean;
};

const ViewportContext = createContext<ViewportContextType | undefined>(
  undefined
);

export const ViewportProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1020);

  useEffect(() => {
    const checkViewportSize = () => {
      setIsMobileView(window.innerWidth < 1020);
    };

    window.addEventListener("resize", checkViewportSize);
    return () => window.removeEventListener("resize", checkViewportSize);
  }, []);

  return (
    <ViewportContext.Provider value={{ isMobileView }}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = () => {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error("useViewport must be used within a ViewportProvider");
  }
  return context;
};
