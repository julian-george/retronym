import React, {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import { useUser } from "../context/userContext";
import Title from "../components/Title";
import Feed from "../components/Feed";
import PageWrapper from "../components/PageWrapper";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { logout, user } = useUser();
  const navigate = useNavigate();
  const onLogout = useCallback(() => {
    logout();
    navigate("auth");
  }, []);
  return (
    <>
      <div
        className={`bg-orange w-64 px-2 absolute inset-y-0 left-0 flex flex-col transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition duration-200 ease-in-out`}
      >
        <div className="flex-1 font-default">
          {user && <div className="text-center">Hey, {user.username}</div>}
          <div className="bg-dog h-[136px] w-[136px]" />
          <button onClick={() => navigate("preferences")}>
            <a>Preferences</a>
          </button>
        </div>
        <button onClick={onLogout}>Log Out</button>
      </div>

      {/* Overlay to close sidebar on mobile */}
      <div
        className={`fixed inset-0 bg-black opacity-0 z-20 left-64 transition-opacity ${
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
    </>
  );
};

const MAX_SCROLL_TIME = 30;

function FeedPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attentionModalOpen, setAttentionModalOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, [setSidebarOpen]);
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, []);

  return user ? (
    <PageWrapper>
      <Modal
        isOpen={attentionModalOpen}
        closeModal={() => setAttentionModalOpen(false)}
      >
        <div>You're spending too much time!!</div>
      </Modal>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex items-center w-full h-fit">
        <div className="flex-1">
          <button className="text-left" onClick={toggleSidebar}>
            Options
          </button>
        </div>
        <div className="flex-1">
          <Title />
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="h-16"></div>
      <div className="w-3/5">
        <Feed />
      </div>
    </PageWrapper>
  ) : null;
}

export default FeedPage;
