import useLocalStorage from "./useLocalStorage";

const useToggle = (key: string, initValue: boolean) => {
  const [value, setValue] = useLocalStorage<boolean>(key, initValue);

  const toggle = (val?: boolean) => {
    setValue((prev) => {
      return typeof val === "boolean" ? val : !prev;
    });
  };

  return [value, toggle] as const;
};

export default useToggle;

