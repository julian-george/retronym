import { useCallback, useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import Title from "../components/Title";

function KeywordsForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string[]>([""]);
  const [rawKeywords, setRawKeywords] = useState<string>("");
  const onRawKeywordsChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      setRawKeywords(newValue);
      setKeywords(newValue.split(" "));
    },
    []
  );
  const handleSubmit = useCallback(() => {}, []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-1/3 ">
      <textarea value={rawKeywords} onChange={onRawKeywordsChange}>
        At w3schools.com you will learn how to make a website. They offer free
        tutorials in all web development technologies.
      </textarea>
      <button className="text-right" type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

function ControlsForm() {
  const [maxScrollingTime, setMaxScrollingTime] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  const handleMaxScrollingTimeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMaxScrollingTime(parseInt(event.target.value));
    },
    []
  );
  const handleSubmit = useCallback(() => {}, []);
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
}

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
          <KeywordsForm />
        </div>
        <div>
          <h2 className="text-xl">Scroll Control</h2>
          <p>Modify your self-set limits on content use</p>
          <ControlsForm />
        </div>
      </div>
    </PageWrapper>
  );
}

export default PreferencesPage;
