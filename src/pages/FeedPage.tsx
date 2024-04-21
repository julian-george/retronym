import React, {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import Title from "../components/Title";
import Feed from "../components/Feed";
import PageWrapper from "../components/PageWrapper";
import Modal from "../components/Modal";

const Sidebar: React.FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { logout } = useUser();
  return (
    <>
      <div
        className={`bg-gray-200 w-64 absolute inset-y-0 left-0 flex flex-col transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition duration-200 ease-in-out`}
      >
        <div className="flex-1"></div>
        <button onClick={() => logout()}>Log Out</button>
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
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, [setSidebarOpen]);
  const navigate = useNavigate();

  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, []);

  return (
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
          <div className="text-left" onClick={toggleSidebar}>
            Sidebar
          </div>
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
  );
}

export default FeedPage;
