import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";

//Contexts
import artistsData from "./data/artists.json";
import { UserContext } from "./context/UserContext.tsx";
import { WebManagementContext } from "./context/WebManagementContext.tsx";

//PAGES
import Header from "./routes/header/Header.tsx";
import HomePage from "./routes/homePage/HomePage.tsx";
import ProfilePage from "./routes/profilePage/ProfilePage.tsx";
import { SettingsPage } from "./routes/settingsPage/SettingsPage.tsx";
import { ProfileInfo } from "./routes/settingsPage/ProfileInfo.tsx";
import { PersonalizationPage } from "./routes/settingsPage/PersonalizationPage.tsx";
import { ReportingPage } from "./routes/settingsPage/ReportingPage.tsx";
import { ContentPreviewPage } from "./routes/ContentPreviewPage/ContentPreviewPage.tsx";
import { GuestPage } from "./routes/guestPage/GuestPage.tsx";
import { LoginPage } from "./routes/loginPage/LoginPage.tsx";

//ERROR HANDLING
import { PageNotFound } from "./routes/pageNotFound/PageNotFound.tsx";
import { NoInternetErrorPopup } from "./components/InfoBlock/info-types/NoInternetErrorPopup.jsx";
import { SystemErrorPopup } from "./components/InfoBlock/info-types/SystemErrorPopup.jsx";
import { ErrorBoundary } from "react-error-boundary";

//EXTRA
import { ProtectedRoutes } from "./utils/ProtectedRoutes.tsx";
import { userRoles } from "./utils/userRoles.js"
import { preloadData } from "./utils/services/preLoadContent.ts";
import { ScrollToTop } from "./utils/ScrollToTop.tsx";

import "./App.css";
import "./index.css";
import "./animations/animations.css"

export type TCard = {
  id: number;
  image: string;
  link?: string;
  name: string;
  genres: string[];
};

function App() {
  const [artists, setArtists] = useState(artistsData);
  const [filteredArtists, setFilteredData] = useState(artists);
  
  const { isUserOnline } = useContext(WebManagementContext);

  useEffect(() => {
    preloadData();
  }, [])

  return (
    <ErrorBoundary FallbackComponent={SystemErrorPopup} key={location.pathname}>
      <div className="appContainer">
        {!isUserOnline && <NoInternetErrorPopup />}
        <ScrollToTop>
          <Routes>
            <Route element={<ProtectedRoutes requiredRole={userRoles.GUEST} />}>
              <Route path="guest" element={<GuestPage />} />
              <Route path="login" element={<LoginPage />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Header data={artists} setResults={setFilteredData} />}>
                <Route index element={<HomePage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="preview/:dataID" element={<ContentPreviewPage />} />
                <Route path="settings" element={<SettingsPage />}>
                  <Route path="profileInfo" element={<ProfileInfo />} />
                  <Route path="personalization" element={<PersonalizationPage />} />
                  <Route element={<ProtectedRoutes requiredRole={userRoles.ADMIN} />}>
                    <Route path="reporting" element={<ReportingPage />} />
                  </Route>
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ScrollToTop>
      </div>
    </ErrorBoundary>
  );
}

export default App;
