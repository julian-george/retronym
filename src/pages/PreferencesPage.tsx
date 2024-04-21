import { useCallback, useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import Title from "../components/Title";
import { IPreferences, useUser } from "../context/userContext";

const KeywordsForm: React.FC<{
  onSubmit: (keywords: string[]) => Promise<boolean>;
}> = ({ onSubmit }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string[]>(
    user?.preferences?.searchTerms || []
  );
  const [rawKeywords, setRawKeywords] = useState<string>(
    user?.preferences?.searchTerms?.join(" ") || ""
  );
  const onRawKeywordsChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      setRawKeywords(newValue);
      setKeywords(newValue.split(" "));
    },
    []
  );
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      setIsLoading(true);
      event.preventDefault();
      const result = await onSubmit(keywords);
      if (!result)
        setRawKeywords(user?.preferences?.searchTerms?.join(" ") || "");
      setIsLoading(false);
    },
    [onSubmit, keywords]
  );
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-1/3 ">
      <textarea value={rawKeywords} onChange={onRawKeywordsChange}></textarea>
      <button className="text-right" type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

const ControlsForm: React.FC<{
  onSubmit: ({
    maxScrollingTime,
  }: {
    maxScrollingTime: number;
  }) => Promise<boolean>;
}> = ({ onSubmit }) => {
  const { user } = useUser();
  const [maxScrollingTime, setMaxScrollingTime] = useState(
    user?.preferences.maxScrollingTime
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleMaxScrollingTimeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMaxScrollingTime(parseInt(event.target.value));
    },
    []
  );
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      if (!maxScrollingTime) return;
      setIsLoading(true);
      event.preventDefault();
      const result = await onSubmit({ maxScrollingTime });
      if (!result) setMaxScrollingTime(user?.preferences.maxScrollingTime);
      setIsLoading(false);
    },
    [onSubmit, maxScrollingTime]
  );
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-1/3 ">
      <div className="flex flex-col">
        <label htmlFor="Scrolling Time">Maximum Scrolling Time</label>
        <p className="text-sm">
          How long would you like to scroll before getting a friendly reminder
          to stop?
        </p>
        <input
          id="Scrolling Time"
          value={maxScrollingTime}
          onChange={handleMaxScrollingTimeChange}
          required
          type="number"
        />
      </div>

      <button className="text-right" type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

function PreferencesPage() {
  const { updatePreferences } = useUser();
  const onKeywordsSubmit = useCallback(async (keywords: string[]) => {
    return updatePreferences({ searchTerms: keywords }).then(
      (result) => result
    );
  }, []);
  const onControlsSubmit = useCallback(
    async (controls: Partial<IPreferences>) => {
      return updatePreferences(controls).then((result) => result);
    },
    []
  );
  return (
    <PageWrapper>
      <div className="flex items-center w-full h-fit">
        <div className="flex-1"></div>
        <div className="flex-1">
          <Title />
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="w-3/5 font-serif">
        <div>
          <h2 className="text-xl">Integrations</h2>
          <p>Add or remove app integrations</p>
        </div>
        <div>
          <h2 className="text-xl">Keywords</h2>
          <p>
            Change the words we use to generate posts. Separate them by space
          </p>
          <KeywordsForm onSubmit={onKeywordsSubmit} />
        </div>
        <div>
          <h2 className="text-xl">Scroll Control</h2>
          <p>Modify your self-set limits on content use</p>
          <ControlsForm onSubmit={onControlsSubmit} />
        </div>
      </div>
    </PageWrapper>
  );
}

export default PreferencesPage;
