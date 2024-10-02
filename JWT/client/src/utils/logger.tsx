import { useEffect } from "react";

const Logger = <PropsType extends object>(WrappedComponent: React.ComponentType<PropsType>) => {

  const ComponentWithLogging = (props: PropsType) => {
    useEffect(() => {
      console.log(`${WrappedComponent.name} mounted`);

      return () => {
        console.log(`${WrappedComponent.name} unmounted`)
      }
    }, [])
    return <WrappedComponent {...props} />
  }

  return ComponentWithLogging;
}

export default Logger;
