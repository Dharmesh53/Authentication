import { CheckCircledIcon } from "@radix-ui/react-icons"

interface FormSuccessProps {
  message?: string
}

export const FormSuccess = ({
  message
}: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="rounded-md bg-emerald-500/15 p-3 flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="size-4" />
      <p>
        {message}
      </p>
    </div>
  )
}
