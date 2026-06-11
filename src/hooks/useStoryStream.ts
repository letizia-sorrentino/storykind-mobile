import { useState, useRef, useCallback, useEffect } from "react";
import EventSource from "react-native-sse";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type GenerateArgs = { name: string; age: number; scenario: string };

export function useStoryStream() {
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const esRef = useRef<EventSource | null>(null);

  const stop = useCallback(() => {
    esRef.current?.close();
    setLoading(false);
  }, []);

  const reset = () => {
    stop();
    setStory("");
    setError(null);
  };

  const generate = ({ name, age, scenario }: GenerateArgs) => {
    if (!API_URL) {
      setError("API URL is not defined");
      return;
    }
    setLoading(true);
    setError(null);
    setStory("");

    const es = new EventSource(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: `Write a preparation story for ${name}, age ${age}, about ${scenario}.`,
          },
        ],
      }),
      pollingInterval: 0,
    });
    esRef.current = es;

    es.addEventListener("message", (event) => {
      if (event.data === "[DONE]") {
        es.close();
        setLoading(false);
        return;
      }
      if (event.data) {
        setStory((prev) => prev + JSON.parse(event.data as string));
      }
    });

    es.addEventListener("error", () => {
      setError("Something went wrong while streaming the story.");
      setLoading(false);
      es.close();
    });
  };

  useEffect(() => () => esRef.current?.close(), []);

  return { story, loading, error, generate, stop, reset };
}
