import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogTermsOfService from "./pages/BlogTermsOfService";
import BlogPrivacyPolicy from "./pages/BlogPrivacyPolicy";
import Creators from "./pages/Creators";
import OurStory from "./pages/OurStory";
import PostModal from "./components/modals/postModal/PostModal";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import PostPage from "./pages/PostPage";
import AuthorProfilePage from "./pages/AuthorProfilePage";
import { allUsers } from "./features/users/usersSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { allPosts } from "./features/post/postsSlice";
import BookmarksPage from "./pages/BookmarksPage";
import ConnectModal from "./components/modals/connectModal/ConnectModal";
import ShareModal from "./components/modals/shareModal/ShareModal";
import EditProfileModal from "./components/modals/editProfileModal/EditProfileModal";
import FollowingPage from "./pages/FollowingPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUsers());
    dispatch(allPosts());
  }, []);
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<OurStory />} />

          <Route path="/creators" element={<Creators />} />

          <Route path="/post/:id" element={<PostPage />} />

          <Route path="/profile/:id" element={<AuthorProfilePage />} />

          <Route
            path="/blog-terms-of-service"
            element={<BlogTermsOfService />}
          />

          <Route path="/blog-privacy-policy" element={<BlogPrivacyPolicy />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <BookmarksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/following"
            element={
              <ProtectedRoute>
                <FollowingPage />
              </ProtectedRoute>
            }
          />
        </Routes>

        <PostModal />
        <ShareModal />
        <EditProfileModal />
        <ConnectModal />
      </Router>

      <ToastContainer position="top-center" transition={Slide} />
    </>
  );
}

export default App;
