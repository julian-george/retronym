import PageWrapper from "../components/PageWrapper";
import Title from "../components/Title";

function PreferencesPage() {
  return (
    <PageWrapper>
      <div className="flex items-center w-full h-fit">
        <div className="flex-1"></div>
        <div className="flex-1">
          <Title />
        </div>
        <div className="flex-1"></div>
      </div>
    </PageWrapper>
  );
}

export default PreferencesPage;
