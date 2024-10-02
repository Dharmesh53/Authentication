import { ChangeEvent } from "react";
import useLocalStorage from "./useLocalStorage";

const useInput = <T>(key: string, initValue: T) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const reset = () => setValue(initValue);

  const attributeObj = {
    value, onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value as T)
  }

  return [value, reset, attributeObj] as const
}

export default useInput;
